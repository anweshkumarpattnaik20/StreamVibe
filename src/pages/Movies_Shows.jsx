/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Film, Info, RefreshCw, Tv } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import MediaRail from "../components/MediaRail";
import { getBrowseCatalog } from "../services/catalog";

const sectionDetails = {
  trending: { eyebrow: "In the conversation", title: "Trending this week" },
  popular: { eyebrow: "Audience favorites", title: "Most watched" },
  newReleases: { eyebrow: "Just arrived", title: "New releases" },
  topRated: { eyebrow: "Highly recommended", title: "Top rated" },
};

function normalizeMediaType(value) {
  return ["tv", "show", "shows", "series"].includes(String(value || "").toLowerCase()) ? "tv" : "movie";
}

function itemMatchesGenre(item, genreId) {
  if (genreId === null) return true;
  const ids = item?.genreIds || item?.genre_ids || [];
  return ids.some((id) => String(id) === String(genreId));
}

function BrowseLoading() {
  return (
    <main className="page-shell pb-20 pt-8 sm:pt-10" aria-busy="true" aria-label="Loading catalog">
      <div className="mb-8 h-12 w-72 animate-pulse rounded-full bg-white/[0.045]" />
      <div className="min-h-[400px] animate-pulse rounded-3xl border border-white/[0.07] bg-white/[0.035]" />
      <div className="mt-10 h-8 w-56 animate-pulse rounded-lg bg-white/[0.045]" />
      <div className="mt-6 flex gap-4 overflow-hidden">
        {[0, 1, 2, 3, 4].map((card) => (
          <div key={card} className="aspect-[2/3] w-[42vw] max-w-[205px] shrink-0 animate-pulse rounded-2xl bg-white/[0.04]" />
        ))}
      </div>
    </main>
  );
}

function BrowseError({ onRetry }) {
  return (
    <main className="page-shell grid min-h-[72vh] place-items-center py-16">
      <div className="max-w-lg rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-400">Could not load this shelf</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Let’s try that again.</h1>
        <p className="mt-4 text-sm leading-6 text-zinc-400">The catalog did not respond. A quick retry usually gets discovery moving again.</p>
        <button type="button" onClick={onRetry} className="mt-7 inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400">
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </main>
  );
}

function MediaTabs({ type }) {
  const tabs = [
    { type: "movie", label: "Movies", to: "/browse/movies", icon: Film },
    { type: "tv", label: "TV Shows", to: "/browse/shows", icon: Tv },
  ];

  return (
    <nav aria-label="Browse by media type" className="inline-flex rounded-full border border-white/10 bg-black/35 p-1.5 shadow-xl shadow-black/20">
      {tabs.map(({ type: tabType, label, to, icon: Icon }) => {
        const active = type === tabType;
        return (
          <Link key={tabType} to={to} aria-current={active ? "page" : undefined} className={`inline-flex min-h-10 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 sm:px-5 ${active ? "bg-white text-black" : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"}`}>
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function MoviesShows() {
  const { mediaType: routeMediaType } = useParams();
  const type = normalizeMediaType(routeMediaType);
  const [catalog, setCatalog] = useState(null);
  const [error, setError] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getBrowseCatalog(type, controller.signal)
      .then((result) => {
        setCatalog(result);
        setError(false);
      })
      .catch((requestError) => {
        if (requestError?.name !== "AbortError") setError(true);
      });

    return () => controller.abort();
  }, [requestVersion, type]);

  if (error && !catalog) {
    return <BrowseError onRetry={() => setRequestVersion((version) => version + 1)} />;
  }

  if (!catalog || catalog.type !== type) return <BrowseLoading />;

  const genres = Array.isArray(catalog.genres) ? catalog.genres : [];
  const activeGenre = genres.some((genre) => String(genre.id) === String(selectedGenre)) ? selectedGenre : null;
  const filteredSections = Object.entries(catalog.sections || {}).map(([key, items]) => ({
    key,
    items: (items || []).filter((item) => itemMatchesGenre(item, activeGenre)),
  }));
  const visibleSections = filteredSections.filter(({ items }) => items.length > 0);
  const firstFilteredItem = visibleSections[0]?.items[0];
  const featuredItem = activeGenre === null ? catalog.featured : firstFilteredItem;
  const contentLabel = type === "tv" ? "shows" : "movies";
  const selectedGenreName = genres.find((genre) => String(genre.id) === String(activeGenre))?.name;

  return (
    <main className="pb-20">
      <div className="page-shell pb-4 pt-8 sm:pt-10">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-400">Explore the catalog</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">Switch shelves or narrow the collection by genre. Every title opens into its full story.</p>
          </div>
          <MediaTabs type={type} />
        </div>

        <HeroBanner item={featuredItem} kicker={selectedGenreName ? `${selectedGenreName} spotlight` : `${type === "tv" ? "Series" : "Movie"} spotlight`} compact />

        {catalog.source === "demo" ? (
          <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-sky-400/15 bg-sky-400/[0.07] px-4 py-3 text-xs leading-5 text-sky-100/80" role="status">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" aria-hidden="true" />
            <p><span className="font-semibold text-sky-200">Preview catalog:</span> These hand-picked titles keep browsing useful until a live TMDB credential is configured.</p>
          </div>
        ) : null}
      </div>

      <div className="page-shell mt-8">
        <section aria-labelledby="genre-filter-heading" className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 id="genre-filter-heading" className="text-lg font-semibold text-white">Find your kind of {contentLabel}</h2>
              <p className="mt-1 text-sm text-zinc-500">Choose a genre to focus every shelf.</p>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label={`Filter ${contentLabel} by genre`}>
              <button type="button" aria-pressed={activeGenre === null} onClick={() => setSelectedGenre(null)} className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${activeGenre === null ? "border-white bg-white text-black" : "border-white/10 bg-white/[0.035] text-zinc-300 hover:border-white/20 hover:text-white"}`}>
                All genres
              </button>
              {genres.map((genre) => {
                const active = String(activeGenre) === String(genre.id);
                return (
                  <button key={genre.id} type="button" aria-pressed={active} onClick={() => setSelectedGenre(genre.id)} className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${active ? "border-rose-500 bg-rose-600 text-white" : "border-white/10 bg-white/[0.035] text-zinc-300 hover:border-white/20 hover:text-white"}`}>
                    {genre.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {visibleSections.length > 0 ? (
          <div className="mt-6">
            {visibleSections.map(({ key, items }) => {
              const details = sectionDetails[key] || { title: key, eyebrow: "Explore" };
              return <MediaRail key={key} eyebrow={details.eyebrow} title={selectedGenreName ? `${selectedGenreName}: ${details.title}` : details.title} items={items} />;
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center">
            <h2 className="text-xl font-semibold text-white">No titles match this genre yet.</h2>
            <p className="mt-2 text-sm text-zinc-500">Reset the filter to see the full collection.</p>
            <button type="button" onClick={() => setSelectedGenre(null)} className="mt-6 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200">Show all genres</button>
          </div>
        )}
      </div>
    </main>
  );
}

export default MoviesShows;
