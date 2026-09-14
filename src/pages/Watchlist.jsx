import { Bookmark, Compass } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MediaCard from "../components/MediaCard";
import {
  getWatchlist,
  WATCHLIST_EVENT,
} from "../utils/storage";

function Watchlist() {
  const [items, setItems] = useState(() => getWatchlist());

  useEffect(() => {
    const refresh = () => setItems(getWatchlist());
    window.addEventListener("storage", refresh);
    window.addEventListener(WATCHLIST_EVENT, refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(WATCHLIST_EVENT, refresh);
    };
  }, []);

  return (
    <main className="page-shell py-12 sm:py-16 lg:py-20">
      <header className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-rose-950/50 via-[#151517] to-[#0d0d0f] px-6 py-10 sm:px-10 sm:py-14">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-rose-600/15 blur-3xl"
        />
        <div className="relative max-w-2xl">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-500/10 text-rose-300">
            <Bookmark className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-rose-400">
            Saved for later
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
            My watchlist
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
            Keep the stories that caught your eye in one private list, saved only in this browser.
          </p>
        </div>
      </header>

      {items.length > 0 ? (
        <section aria-labelledby="saved-titles" className="py-12 sm:py-16">
          <div className="mb-7 flex items-end justify-between gap-5">
            <div>
              <h2 id="saved-titles" className="text-2xl font-semibold tracking-tight text-white">
                Saved titles
              </h2>
              <p className="mt-2 text-sm text-zinc-500">
                {items.length} {items.length === 1 ? "title" : "titles"} in your list
              </p>
            </div>
            <Link
              to="/browse/movies"
              className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:border-white/20 hover:text-white sm:inline-flex"
            >
              Discover more
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {items.map((item) => (
              <li key={`${item.media_type}:${item.id}`}>
                <MediaCard item={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="py-16 text-center sm:py-24" aria-labelledby="empty-watchlist">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-500">
            <Bookmark className="h-7 w-7" aria-hidden="true" />
          </span>
          <h2 id="empty-watchlist" className="mt-6 text-2xl font-semibold text-white">
            Your watchlist is ready for a first pick
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
            Use the bookmark on any movie or series and it will appear here instantly.
          </p>
          <Link
            to="/browse/movies"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
          >
            <Compass className="h-4 w-4" aria-hidden="true" />
            Explore the catalog
          </Link>
        </section>
      )}
    </main>
  );
}

export default Watchlist;
