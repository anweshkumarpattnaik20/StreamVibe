/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import {
  Bookmark,
  CalendarDays,
  Check,
  Clock3,
  Languages,
  Play,
  RefreshCw,
  ShieldCheck,
  Star,
  Users,
  X,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import MediaArtwork from "../components/MediaArtwork";
import MediaRail from "../components/MediaRail";
import { getMediaDetails, getSeasonEpisodes } from "../services/catalog";
import {
  isInWatchlist,
  toggleWatchlist,
  WATCHLIST_EVENT,
} from "../utils/storage";

function normalizeType(value) {
  const type = String(value || "").toLowerCase();
  if (type === "movie") return "movie";
  if (["tv", "show", "shows", "series"].includes(type)) return "tv";
  return null;
}

function formatDate(value) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatCount(value) {
  const count = Number(value);
  return Number.isFinite(count) && count > 0
    ? new Intl.NumberFormat("en", { notation: "compact" }).format(count)
    : null;
}

function DetailLoading() {
  return (
    <main className="page-shell pb-20 pt-8" aria-busy="true" aria-label="Loading title details">
      <div className="min-h-[620px] animate-pulse rounded-[2rem] border border-white/[0.07] bg-white/[0.035]" />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        <div className="h-60 animate-pulse rounded-3xl bg-white/[0.035] lg:col-span-2" />
        <div className="h-60 animate-pulse rounded-3xl bg-white/[0.035]" />
      </div>
    </main>
  );
}

function DetailError({ invalidType, onRetry }) {
  return (
    <main className="page-shell grid min-h-[72vh] place-items-center py-20 text-center">
      <div className="max-w-lg rounded-3xl border border-white/10 bg-white/[0.035] p-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-400">
          {invalidType ? "Unknown destination" : "Title unavailable"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          {invalidType ? "That route is not in our catalog." : "This story is taking a moment to load."}
        </h1>
        <p className="mt-4 text-sm leading-6 text-zinc-400">
          {invalidType
            ? "Browse movies and shows to find a title that is ready to open."
            : "Check your connection and try once more."}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {!invalidType ? (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Try again
            </button>
          ) : null}
          <Link
            to="/browse/movies"
            className="inline-flex items-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.05]"
          >
            Browse catalog
          </Link>
        </div>
      </div>
    </main>
  );
}

function TrailerDialog({ trailerKey, title, onClose, returnFocusRef }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const returnFocusTarget = returnFocusRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      returnFocusTarget?.focus();
    };
  }, [onClose, returnFocusRef]);

  return (
    <div
      className="fixed inset-0 z-[110] grid place-items-center bg-black/90 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="trailer-title"
        className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#101012] shadow-2xl shadow-black"
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-400">Official trailer</p>
            <h2 id="trailer-title" className="mt-1 truncate text-lg font-semibold text-white">{title}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 text-zinc-300 transition hover:bg-white/[0.07] hover:text-white"
            aria-label="Close trailer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="aspect-video bg-black">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailerKey)}?autoplay=1&rel=0`}
            title={`${title} trailer`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>
    </div>
  );
}

function PersonCard({ person }) {
  const name = person.name || "Unknown";
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <li className="w-32 shrink-0 snap-start sm:w-36">
      <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-zinc-800 to-zinc-950">
        {person.profileUrl ? (
          <img src={person.profileUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full place-items-center text-2xl font-semibold text-white/50" aria-hidden="true">
            {initials}
          </div>
        )}
      </div>
      <p className="mt-3 truncate text-sm font-semibold text-white">{name}</p>
      <p className="mt-1 truncate text-xs text-zinc-500">{person.character || person.role || "Cast"}</p>
    </li>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 border-b border-white/[0.06] py-4 last:border-0">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/[0.045] text-zinc-400">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <dt className="text-xs text-zinc-500">{label}</dt>
        <dd className="mt-1 text-sm font-medium text-zinc-200">{value}</dd>
      </div>
    </div>
  );
}

function Episodes({ media, selectedSeason, setSelectedSeason }) {
  const [state, setState] = useState({ episodes: [], loading: false, error: "" });

  useEffect(() => {
    if (!media?.id || !selectedSeason) {
      setState({ episodes: [], loading: false, error: "" });
      return undefined;
    }

    const controller = new AbortController();
    setState({ episodes: [], loading: true, error: "" });
    getSeasonEpisodes(media.id, selectedSeason, controller.signal)
      .then((episodes) => setState({ episodes, loading: false, error: "" }))
      .catch((error) => {
        if (error?.name !== "AbortError") {
          setState({ episodes: [], loading: false, error: "Episodes could not be loaded." });
        }
      });

    return () => controller.abort();
  }, [media?.id, selectedSeason]);

  if (!media?.seasons?.length) return null;

  return (
    <section className="py-10 sm:py-14" aria-labelledby="episodes-heading">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-400">Episode guide</p>
          <h2 id="episodes-heading" className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Choose a season</h2>
        </div>
        <label className="text-sm text-zinc-400">
          <span className="sr-only">Season</span>
          <select
            value={selectedSeason || ""}
            onChange={(event) => setSelectedSeason(Number(event.target.value))}
            className="min-w-44 rounded-xl border border-white/10 bg-[#151517] px-4 py-3 font-semibold text-white"
          >
            {media.seasons.map((season) => (
              <option key={season.id || season.seasonNumber} value={season.seasonNumber}>
                {season.name} · {season.episodeCount} episodes
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6" aria-busy={state.loading}>
        {state.loading ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="h-32 animate-pulse rounded-2xl bg-white/[0.035]" />
            ))}
          </div>
        ) : state.error ? (
          <p role="alert" className="rounded-2xl border border-red-500/20 bg-red-500/[0.08] p-5 text-sm text-red-100">{state.error}</p>
        ) : (
          <ol className="grid gap-3 sm:grid-cols-2">
            {state.episodes.map((episode) => (
              <li key={episode.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-rose-500/10 text-sm font-bold text-rose-300">
                    {episode.episodeNumber}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white">{episode.name}</h3>
                    <p className="mt-1 text-xs text-zinc-500">
                      {[episode.runtimeLabel, formatDate(episode.airDate)].filter(Boolean).join(" · ") || "Episode details coming soon"}
                    </p>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">{episode.overview}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

function MovieDetails() {
  const { categoryType, id } = useParams();
  const type = normalizeType(categoryType);
  const [detailState, setDetailState] = useState({ media: null, loading: Boolean(type), error: false });
  const [requestVersion, setRequestVersion] = useState(0);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const trailerTriggerRef = useRef(null);

  useEffect(() => {
    if (!type || !id) {
      setDetailState({ media: null, loading: false, error: true });
      return undefined;
    }

    const controller = new AbortController();
    setDetailState({ media: null, loading: true, error: false });
    getMediaDetails(type, id, controller.signal)
      .then((media) => {
        setDetailState({ media, loading: false, error: false });
        setSelectedSeason(media.seasons?.[0]?.seasonNumber || null);
      })
      .catch((error) => {
        if (error?.name !== "AbortError") {
          setDetailState({ media: null, loading: false, error: true });
        }
      });

    return () => controller.abort();
  }, [id, requestVersion, type]);

  const media = detailState.media;

  useEffect(() => {
    if (!media) return undefined;
    const refresh = () => setIsSaved(isInWatchlist(media.id, media.mediaType));
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(WATCHLIST_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(WATCHLIST_EVENT, refresh);
    };
  }, [media]);

  useEffect(() => {
    if (!media?.title) return undefined;
    const previousTitle = document.title;
    document.title = `${media.title} — StreamVibe`;
    return () => {
      document.title = previousTitle;
    };
  }, [media?.title]);

  if (!type) return <DetailError invalidType />;
  if (detailState.loading) return <DetailLoading />;
  if (detailState.error || !media) {
    return <DetailError onRetry={() => setRequestVersion((version) => version + 1)} />;
  }

  const title = media.title || media.name;
  const date = formatDate(media.releaseDate);
  const voteCount = formatCount(media.voteCount);
  const trailerKey = /^[A-Za-z0-9_-]{6,24}$/.test(media.trailerKey || "") ? media.trailerKey : null;
  const keyCrew = (media.crew || [])
    .filter((person) => ["Director", "Creator", "Executive Producer", "Writer", "Screenplay"].includes(person.job))
    .filter((person, index, people) => people.findIndex((entry) => entry.id === person.id && entry.job === person.job) === index)
    .slice(0, 5);

  return (
    <main className="pb-16 text-white sm:pb-20">
      <div className="page-shell pt-8 sm:pt-10">
        <section className="relative isolate flex min-h-[620px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0d] shadow-2xl shadow-black/40 lg:min-h-[700px]" aria-labelledby="detail-title">
          <MediaArtwork item={media} variant="backdrop" priority className="!absolute inset-0 h-full w-full" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/10" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/25" />

          <div className="relative z-10 mt-auto w-full px-6 pb-10 pt-36 sm:px-10 sm:pb-14 lg:px-14 lg:pb-16">
            <div className="max-w-3xl">
              {media.tagline ? <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-400">{media.tagline}</p> : null}
              <h1 id="detail-title" className="mt-3 text-balance text-4xl font-black leading-none tracking-[-0.05em] sm:text-6xl lg:text-7xl">{title}</h1>
              <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-300 sm:text-sm">
                <li>{type === "tv" ? "Series" : "Movie"}</li>
                {media.year ? <li className="before:mr-3 before:text-zinc-600 before:content-['•']">{media.year}</li> : null}
                {media.runtimeLabel ? <li className="before:mr-3 before:text-zinc-600 before:content-['•']">{media.runtimeLabel}</li> : null}
                {media.certification ? <li className="before:mr-3 before:text-zinc-600 before:content-['•']">{media.certification}</li> : null}
                {media.rating ? (
                  <li className="flex items-center gap-1.5 before:mr-1.5 before:text-zinc-600 before:content-['•']">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    {media.rating.toFixed(1)}
                  </li>
                ) : null}
              </ul>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8">{media.overview}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {trailerKey ? (
                  <button ref={trailerTriggerRef} type="button" onClick={() => setIsTrailerOpen(true)} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-rose-500">
                    <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                    Play trailer
                  </button>
                ) : null}
                <button
                  type="button"
                  aria-pressed={isSaved}
                  onClick={() => setIsSaved(toggleWatchlist(media))}
                  className={`inline-flex min-h-12 items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold transition ${isSaved ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border-white/15 bg-black/35 text-white hover:border-white/30 hover:bg-white/10"}`}
                >
                  {isSaved ? <Check className="h-4 w-4" aria-hidden="true" /> : <Bookmark className="h-4 w-4" aria-hidden="true" />}
                  {isSaved ? "Saved to My List" : "Add to My List"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {media.isFallback ? (
          <p className="mt-4 rounded-2xl border border-sky-400/15 bg-sky-400/[0.07] px-4 py-3 text-xs leading-5 text-sky-100/80" role="status">
            You are viewing StreamVibe’s curated preview catalog. Connect TMDB credentials for live title data.
          </p>
        ) : null}

        <div className="grid min-w-0 grid-cols-1 gap-6 py-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:py-14">
          <div className="min-w-0 space-y-10">
            <section aria-labelledby="about-heading">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-400">The story</p>
              <h2 id="about-heading" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">About {title}</h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">{media.overview}</p>
              {media.genres?.length ? (
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Genres">
                  {media.genres.map((genre) => <li key={genre.id} className="rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-xs font-semibold text-zinc-300">{genre.name}</li>)}
                </ul>
              ) : null}
            </section>

            {media.cast?.length ? (
              <section aria-labelledby="cast-heading">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-400">On screen</p>
                <h2 id="cast-heading" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Cast</h2>
                <ul className="no-scrollbar mt-6 flex snap-x gap-4 overflow-x-auto pb-3">
                  {media.cast.slice(0, 12).map((person) => <PersonCard key={`${person.id}-${person.character}`} person={person} />)}
                </ul>
              </section>
            ) : null}

            {media.reviews?.length ? (
              <section aria-labelledby="reviews-heading">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-400">Viewer notes</p>
                <h2 id="reviews-heading" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Reviews</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {media.reviews.slice(0, 4).map((review) => (
                    <article key={review.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold text-white">{review.author}</h3>
                        {review.rating ? <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300"><Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />{review.rating}/10</span> : null}
                      </div>
                      <p className="mt-4 line-clamp-6 text-sm leading-6 text-zinc-400">{review.content}</p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="h-fit min-w-0 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6" aria-label="Title facts">
            <h2 className="text-lg font-semibold text-white">At a glance</h2>
            <dl className="mt-2">
              <InfoItem icon={CalendarDays} label={type === "tv" ? "First aired" : "Released"} value={date} />
              <InfoItem icon={Clock3} label={type === "tv" ? "Episode length" : "Runtime"} value={media.runtimeLabel} />
              <InfoItem icon={Languages} label="Original language" value={media.originalLanguage?.toUpperCase()} />
              <InfoItem icon={ShieldCheck} label="Status" value={[media.status, media.certification].filter(Boolean).join(" · ")} />
              <InfoItem icon={Users} label="Audience ratings" value={voteCount ? `${voteCount} votes` : null} />
            </dl>
            {keyCrew.length ? (
              <div className="mt-5 border-t border-white/[0.07] pt-5">
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Key crew</h3>
                <ul className="mt-4 space-y-3">
                  {keyCrew.map((person) => (
                    <li key={`${person.id}-${person.job}`}>
                      <p className="text-sm font-semibold text-zinc-200">{person.name}</p>
                      <p className="mt-0.5 text-xs text-zinc-500">{person.job}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>

        {type === "tv" ? <Episodes media={media} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} /> : null}

        {media.recommendations?.length ? (
          <MediaRail eyebrow="Keep exploring" title="More like this" description="Stories selected from the same corner of the catalog." items={media.recommendations} />
        ) : null}
      </div>

      {isTrailerOpen && trailerKey ? (
        <TrailerDialog trailerKey={trailerKey} title={title} onClose={() => setIsTrailerOpen(false)} returnFocusRef={trailerTriggerRef} />
      ) : null}
    </main>
  );
}

export default MovieDetails;
