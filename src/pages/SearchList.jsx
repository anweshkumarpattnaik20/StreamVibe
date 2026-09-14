import { Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import MediaCard from "../components/MediaCard";
import { searchCatalog } from "../services/catalog";

const initialSearchState = { data: null, error: "", loading: false };

function SearchList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const legacySearch = typeof location.state?.search === "string"
    ? location.state.search.trim()
    : "";
  const query = (searchParams.get("q") || legacySearch).trim();
  const [draft, setDraft] = useState(query);
  const [searchState, setSearchState] = useState(initialSearchState);

  useEffect(() => {
    setDraft(query);

    if (!query) {
      setSearchState(initialSearchState);
      return undefined;
    }

    const controller = new AbortController();
    setSearchState((current) => ({ ...current, error: "", loading: true }));

    searchCatalog(query, controller.signal)
      .then((data) => setSearchState({ data, error: "", loading: false }))
      .catch((error) => {
        if (error?.name === "AbortError") return;
        setSearchState({
          data: null,
          error: "We couldn't complete that search. Please try again.",
          loading: false,
        });
      });

    return () => controller.abort();
  }, [query]);

  const submitSearch = (event) => {
    event.preventDefault();
    const nextQuery = draft.trim();
    navigate(nextQuery ? `/search?q=${encodeURIComponent(nextQuery)}` : "/search");
  };

  const results = searchState.data?.results || [];
  const resultCount = searchState.data?.totalResults ?? results.length;

  return (
    <main className="min-h-[70vh] pb-20 pt-10 text-white sm:pt-16">
      <section className="page-shell" aria-labelledby="search-page-title">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.035] px-5 py-9 sm:px-9 sm:py-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-rose-600/15 blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-rose-400">Find your next story</p>
            <h1 id="search-page-title" className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">Search movies and shows</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">Explore cinematic releases, acclaimed series, genres, and cast members from one focused search.</p>

            <form onSubmit={submitSearch} role="search" className="mt-7 flex max-w-2xl gap-2">
              <label htmlFor="catalog-search" className="sr-only">Search the StreamVibe catalog</label>
              <div className="relative min-w-0 flex-1">
                <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                <input
                  id="catalog-search"
                  type="search"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  autoComplete="off"
                  placeholder="Search by title, genre, or cast"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black/35 pl-12 pr-4 text-sm text-white placeholder:text-zinc-600 focus:border-rose-500/60 focus:outline-none"
                />
              </div>
              <button type="submit" className="h-12 shrink-0 rounded-xl bg-rose-600 px-5 text-sm font-semibold text-white transition hover:bg-rose-500">Search</button>
            </form>
          </div>
        </div>

        {!query ? (
          <div className="grid min-h-64 place-items-center text-center">
            <div className="max-w-md">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-400"><Search aria-hidden="true" className="h-5 w-5" /></span>
              <h2 className="mt-5 text-xl font-semibold">Start with a title you love</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500">Try a movie, series, genre, or performer to discover something worth watching.</p>
            </div>
          </div>
        ) : (
          <div className="pt-10 sm:pt-14" aria-busy={searchState.loading}>
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">Search results</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">{searchState.loading ? "Searching…" : `Results for “${query}”`}</h2>
              </div>
              {!searchState.loading && !searchState.error && (
                <p className="text-sm text-zinc-500">{resultCount.toLocaleString()} {resultCount === 1 ? "title" : "titles"} found</p>
              )}
            </div>

            {searchState.data?.isFallback && (
              <div className="mb-7 flex items-start gap-3 rounded-2xl border border-amber-400/15 bg-amber-300/[0.06] px-4 py-3 text-sm leading-6 text-amber-100/80">
                <Sparkles aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <p>You are browsing StreamVibe’s curated demo catalog. Connect TMDB credentials to search the live catalog.</p>
              </div>
            )}

            {searchState.loading ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" aria-label="Loading search results">
                {Array.from({ length: 12 }, (_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="aspect-[2/3] rounded-2xl bg-white/[0.06]" />
                    <div className="mt-4 h-3 w-4/5 rounded bg-white/[0.06]" />
                    <div className="mt-3 h-2.5 w-2/5 rounded bg-white/[0.04]" />
                  </div>
                ))}
              </div>
            ) : searchState.error ? (
              <div role="alert" className="rounded-2xl border border-red-500/20 bg-red-500/[0.08] px-5 py-6 text-sm text-red-100">{searchState.error}</div>
            ) : results.length === 0 ? (
              <div className="grid min-h-52 place-items-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 text-center">
                <div className="max-w-md">
                  <h3 className="text-lg font-semibold">No matching titles yet</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">Check the spelling or try a broader title, genre, or cast member.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {results.map((item) => <MediaCard key={`${item.media_type}-${item.id}`} item={item} />)}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default SearchList;
