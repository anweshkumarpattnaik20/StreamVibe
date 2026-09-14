/* eslint-disable react/prop-types */
import { useId } from "react";
import { ArrowRight, Clapperboard, Play, Star } from "lucide-react";
import { Link } from "react-router-dom";
import MediaArtwork from "./MediaArtwork";

function itemType(item) {
  return item?.media_type === "tv" ? "tv" : "movie";
}

function yearFor(item) {
  const date = item?.release_date || item?.first_air_date;
  const year = Number.parseInt(String(date || "").slice(0, 4), 10);

  return Number.isFinite(year) ? year : null;
}

function runtimeFor(item) {
  const minutes = Number(item?.runtime || item?.episode_run_time?.[0]);
  if (!Number.isFinite(minutes) || minutes <= 0) return null;

  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours}h ${remainder}m` : `${hours}h`;
}

function EmptyHero({ compact }) {
  return (
    <section
      aria-label="Featured entertainment"
      className={`relative isolate flex overflow-hidden rounded-3xl border border-white/10 bg-[#09090b] px-6 shadow-2xl shadow-black/30 sm:px-10 ${
        compact ? "min-h-[360px]" : "min-h-[500px] lg:min-h-[620px]"
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 20%, rgba(220, 38, 38, 0.26), transparent 35%), radial-gradient(circle at 15% 80%, rgba(63, 63, 70, 0.5), transparent 45%)",
        }}
      />
      <div className="relative z-10 my-auto max-w-xl py-16">
        <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-[#ef4444]/30 bg-[#ef4444]/10 text-[#f87171]">
          <Clapperboard aria-hidden="true" size={23} />
        </div>
        <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#ef4444]">
          Your next story is waiting
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-5xl">
          Find something unforgettable.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-[#a1a1aa] sm:text-base">
          Browse movies, discover hidden gems, and build a watchlist made for
          your next night in.
        </p>
        <Link
          to="/browse/movies"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#dc2626] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#ef4444] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f87171] focus-visible:ring-offset-4 focus-visible:ring-offset-[#09090b]"
        >
          Browse movies
          <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </section>
  );
}

export default function HeroBanner({
  item,
  kicker = "Featured tonight",
  compact = false,
}) {
  const headingId = useId();

  if (!item) return <EmptyHero compact={compact} />;

  const title = item.title || item.name || "Untitled";
  const type = itemType(item);
  const year = yearFor(item);
  const runtime = runtimeFor(item);
  const numericRating = Number(item.vote_average);
  const rating = Number.isFinite(numericRating) && numericRating > 0
    ? numericRating.toFixed(1)
    : null;
  const hasDetails = item.id !== undefined && item.id !== null;
  const detailsPath = `/${type}/${item.id}`;
  const browsePath = type === "tv" ? "/browse/shows" : "/browse/movies";
  const browseLabel = type === "tv" ? "Browse series" : "Browse movies";

  return (
    <section
      aria-labelledby={headingId}
      className={`group relative isolate flex overflow-hidden rounded-3xl border border-white/10 bg-[#09090b] shadow-2xl shadow-black/30 ${
        compact ? "min-h-[400px]" : "min-h-[540px] lg:min-h-[660px]"
      }`}
    >
      <MediaArtwork
        item={item}
        variant="backdrop"
        priority
        className="!absolute inset-0 h-full w-full"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/5"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/25"
      />

      <div
        className={`relative z-10 mt-auto w-full px-6 sm:px-10 lg:px-14 ${
          compact ? "pb-9 pt-24" : "pb-12 pt-32 sm:pb-16 lg:pb-20"
        }`}
      >
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#f87171] sm:text-xs">
            <span aria-hidden="true" className="h-px w-7 bg-[#ef4444]" />
            {kicker}
          </p>

          <h1
            id={headingId}
            className={`mt-4 font-black leading-[0.98] tracking-[-0.045em] text-white drop-shadow-xl ${
              compact
                ? "text-3xl sm:text-5xl"
                : "text-4xl sm:text-6xl lg:text-7xl"
            }`}
          >
            {title}
          </h1>

          <ul
            aria-label={`${title} information`}
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold uppercase tracking-[0.1em] text-[#d4d4d8] sm:text-sm"
          >
            <li>{type === "tv" ? "Series" : "Movie"}</li>
            {year ? (
              <li className="before:mr-3 before:text-[#52525b] before:content-['•']">
                {year}
              </li>
            ) : null}
            {runtime ? (
              <li className="before:mr-3 before:text-[#52525b] before:content-['•']">
                {runtime}
              </li>
            ) : null}
            {rating ? (
              <li className="flex items-center gap-1.5 before:mr-1.5 before:text-[#52525b] before:content-['•']">
                <Star
                  aria-hidden="true"
                  size={15}
                  className="fill-[#fbbf24] text-[#fbbf24]"
                />
                <span className="sr-only">Rating </span>
                {rating}
              </li>
            ) : null}
          </ul>

          <p
            className={`mt-5 max-w-xl text-sm leading-7 text-[#d4d4d8] sm:text-base ${
              compact ? "line-clamp-2" : "line-clamp-3 sm:leading-8"
            }`}
          >
            {item.overview ||
              "Step into a new story. Open the title to see cast, ratings, and more."}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {hasDetails ? (
              <Link
                to={detailsPath}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#dc2626] px-5 py-3 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#ef4444] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f87171] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              >
                <Play aria-hidden="true" size={17} className="fill-current" />
                View details
              </Link>
            ) : null}
            <Link
              to={browsePath}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-black/35 px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            >
              {browseLabel}
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
