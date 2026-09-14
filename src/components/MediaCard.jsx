/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Bookmark, Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import {
  getWatchlist,
  isInWatchlist,
  toggleWatchlist,
} from "../utils/storage";
import MediaArtwork from "./MediaArtwork";

const WATCHLIST_EVENT = "streamvibe:watchlist-change";

function mediaTypeFor(item) {
  return item?.media_type === "tv" ? "tv" : "movie";
}

function itemTitle(item) {
  return item?.title || item?.name || "Untitled";
}

function releaseYear(item) {
  const date = item?.release_date || item?.first_air_date;
  const year = Number.parseInt(String(date || "").slice(0, 4), 10);

  return Number.isFinite(year) ? year : null;
}

function itemIsSaved(type, id) {
  if (id === undefined || id === null) return false;

  try {
    return isInWatchlist(type, id);
  } catch {
    try {
      return getWatchlist().some(
        (entry) =>
          String(entry?.id) === String(id) && mediaTypeFor(entry) === type,
      );
    } catch {
      return false;
    }
  }
}

export default function MediaCard({ item }) {
  const type = mediaTypeFor(item);
  const title = itemTitle(item);
  const year = releaseYear(item);
  const numericRating = Number(item?.vote_average);
  const rating = Number.isFinite(numericRating) && numericRating > 0
    ? numericRating.toFixed(1)
    : null;
  const hasDetails = item?.id !== undefined && item?.id !== null;
  const detailsPath = `/${type}/${item?.id}`;
  const [isSaved, setIsSaved] = useState(() =>
    itemIsSaved(type, item?.id),
  );

  useEffect(() => {
    const syncSavedState = () => setIsSaved(itemIsSaved(type, item?.id));

    syncSavedState();
    window.addEventListener("storage", syncSavedState);
    window.addEventListener(WATCHLIST_EVENT, syncSavedState);

    return () => {
      window.removeEventListener("storage", syncSavedState);
      window.removeEventListener(WATCHLIST_EVENT, syncSavedState);
    };
  }, [item?.id, type]);

  const handleWatchlistToggle = () => {
    if (!hasDetails) return;

    try {
      const updatedItems = toggleWatchlist({ ...item, media_type: type });
      const nextSaved = Array.isArray(updatedItems)
        ? updatedItems.some(
            (entry) =>
              String(entry?.id) === String(item.id) &&
              mediaTypeFor(entry) === type,
          )
        : itemIsSaved(type, item.id);

      setIsSaved(nextSaved);
      window.dispatchEvent(new Event(WATCHLIST_EVENT));
    } catch {
      setIsSaved(false);
    }
  };

  const cardContent = (
    <>
      <div className="relative transition duration-300 ease-out group-hover/card:-translate-y-1">
        <MediaArtwork
          item={item}
          className="aspect-[2/3] w-full rounded-2xl border border-white/10 shadow-xl shadow-black/20 transition-colors group-hover/card:border-white/20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 rounded-b-2xl bg-gradient-to-t from-black/55 to-transparent"
        />
      </div>
      <div className="relative space-y-2.5 px-1 pb-1 pt-3.5">
        <h3 className="truncate text-sm font-bold tracking-tight text-white transition-colors group-hover/card:text-[#fca5a5] sm:text-[15px]">
          {title}
        </h3>
        <div className="flex min-h-5 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#a1a1aa]">
          <span>{type === "tv" ? "Series" : "Movie"}</span>
          {year ? (
            <>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#3f3f46]" />
              <span>{year}</span>
            </>
          ) : null}
          {rating ? (
            <span className="ml-auto flex items-center gap-1 text-[#d4d4d8]">
              <Star
                aria-hidden="true"
                size={12}
                className="fill-[#fbbf24] text-[#fbbf24]"
              />
              <span className="sr-only">Rated </span>
              {rating}
            </span>
          ) : null}
        </div>
      </div>
    </>
  );

  return (
    <article className="group/card relative min-w-0">
      {hasDetails ? (
        <Link
          to={detailsPath}
          aria-label={`View details for ${title}`}
          className="block rounded-2xl outline-none ring-[#ef4444]/80 transition focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-[#141414]"
        >
          {cardContent}
        </Link>
      ) : (
        <div className="rounded-2xl opacity-80">{cardContent}</div>
      )}

      <button
        type="button"
        onClick={handleWatchlistToggle}
        disabled={!hasDetails}
        aria-label={`${isSaved ? "Remove" : "Add"} ${title} ${
          isSaved ? "from" : "to"
        } watchlist`}
        aria-pressed={isSaved}
        className={`absolute right-2.5 top-2.5 z-10 grid h-9 w-9 place-items-center rounded-full border text-white shadow-xl backdrop-blur-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f87171] disabled:cursor-not-allowed disabled:opacity-40 ${
          isSaved
            ? "border-[#f87171]/50 bg-[#dc2626] hover:bg-[#ef4444]"
            : "border-white/15 bg-black/65 hover:border-white/30 hover:bg-black/85"
        }`}
      >
        {isSaved ? (
          <Check aria-hidden="true" size={17} strokeWidth={2.5} />
        ) : (
          <Bookmark aria-hidden="true" size={16} strokeWidth={2} />
        )}
      </button>
    </article>
  );
}
