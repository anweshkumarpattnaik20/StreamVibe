/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Info, RefreshCw } from "lucide-react";
import Devices from "../components/Devices";
import Faq from "../components/Faq";
import HeroBanner from "../components/HeroBanner";
import MediaRail from "../components/MediaRail";
import Plan from "../components/Plan";
import { getHomeCatalog } from "../services/catalog";

function mergeHighlights(newReleases = [], topRated = []) {
  const seen = new Set();

  return [...newReleases.slice(0, 8), ...topRated.slice(0, 8)].filter((item) => {
    const key = `${item?.mediaType || item?.media_type}:${item?.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function HomeLoading() {
  return (
    <main className="page-shell pb-16 pt-8 sm:pt-10" aria-busy="true" aria-label="Loading StreamVibe catalog">
      <div className="min-h-[540px] animate-pulse rounded-3xl border border-white/[0.07] bg-white/[0.035] lg:min-h-[660px]" />
      <div className="space-y-14 py-14">
        {[0, 1, 2].map((row) => (
          <section key={row}>
            <div className="mb-6 h-7 w-52 animate-pulse rounded-lg bg-white/[0.055]" />
            <div className="flex gap-4 overflow-hidden">
              {[0, 1, 2, 3, 4].map((card) => (
                <div key={card} className="aspect-[2/3] w-[42vw] max-w-[205px] shrink-0 animate-pulse rounded-2xl bg-white/[0.04]" />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function HomeError({ onRetry }) {
  return (
    <main className="page-shell grid min-h-[70vh] place-items-center py-16">
      <div className="max-w-lg rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-400">Catalog unavailable</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">The stories are taking a moment to load.</h1>
        <p className="mt-4 text-sm leading-6 text-zinc-400">Check your connection and try again. Your saved titles are still safe on this device.</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </main>
  );
}

function Home() {
  const [catalog, setCatalog] = useState(null);
  const [error, setError] = useState(false);
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getHomeCatalog(controller.signal)
      .then((result) => {
        setCatalog(result);
        setError(false);
      })
      .catch((requestError) => {
        if (requestError?.name !== "AbortError") setError(true);
      });

    return () => controller.abort();
  }, [requestVersion]);

  if (error && !catalog) {
    return <HomeError onRetry={() => setRequestVersion((version) => version + 1)} />;
  }

  if (!catalog) return <HomeLoading />;

  const freshAndAcclaimed = mergeHighlights(catalog.newReleases, catalog.topRated);

  return (
    <main>
      <div className="page-shell pb-4 pt-8 sm:pt-10">
        <HeroBanner item={catalog.featured || catalog.hero?.[0]} />

        {catalog.source === "demo" ? (
          <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-sky-400/15 bg-sky-400/[0.07] px-4 py-3 text-xs leading-5 text-sky-100/80" role="status">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" aria-hidden="true" />
            <p><span className="font-semibold text-sky-200">Preview catalog:</span> StreamVibe is using its built-in collection. Add a TMDB credential to the environment to load the live catalog.</p>
          </div>
        ) : null}
      </div>

      <div className="page-shell pb-12">
        <MediaRail
          eyebrow="What everyone is watching"
          title="Trending this week"
          description="The movies and series earning the most attention right now."
          items={catalog.trending}
        />
        <MediaRail
          eyebrow="Movie night"
          title="Feature films worth your time"
          items={catalog.movies}
        />
        <MediaRail
          eyebrow="One more episode"
          title="Series to settle into"
          items={catalog.shows}
        />
        <MediaRail
          eyebrow="Fresh and acclaimed"
          title="New arrivals, proven favorites"
          description="A focused mix of recent releases and the highest-rated stories in the catalog."
          items={freshAndAcclaimed}
        />
      </div>

      <div className="border-y border-white/[0.06] bg-white/[0.018]">
        <Devices />
      </div>
      <Plan />
      <div className="border-t border-white/[0.06] bg-white/[0.018]">
        <Faq />
      </div>
    </main>
  );
}

export default Home;
