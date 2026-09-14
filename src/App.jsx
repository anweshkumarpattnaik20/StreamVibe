import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import FreeTrial from "./components/FreeTrial";
import NavigationBar from "./components/NavigationBar";

const Home = lazy(() => import("./pages/Home"));
const Browse = lazy(() => import("./pages/Movies_Shows"));
const Search = lazy(() => import("./pages/SearchList"));
const Watchlist = lazy(() => import("./pages/Watchlist"));
const Details = lazy(() => import("./pages/MovieDetails"));
const Support = lazy(() => import("./pages/Support"));
const Subscriptions = lazy(() => import("./pages/Subscriptions"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageLoader() {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center px-5" role="status">
      <div className="flex items-center gap-3 text-sm text-zinc-400">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
        Preparing your screen
      </div>
    </div>
  );
}

function ScrollManager() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    let frameId;
    let timeoutId;

    if (hash) {
      let attempts = 0;
      const revealTarget = () => {
        const target = document.getElementById(hash.slice(1));

        if (target) {
          frameId = requestAnimationFrame(() =>
            target.scrollIntoView({ block: "start" }),
          );
          return;
        }

        attempts += 1;
        if (attempts < 8) timeoutId = window.setTimeout(revealTarget, 50);
      };

      revealTarget();
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [hash, pathname, search]);

  return null;
}

function App() {
  const { pathname } = useLocation();
  const showTrial = !["/subscriptions", "/support"].includes(pathname);

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-red-600 selection:text-white">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <ScrollManager />
      <NavigationBar />
      <div id="main-content" className="min-h-[70vh]">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse/:mediaType" element={<Browse />} />
            <Route path="/movies" element={<Navigate replace to="/browse/movies" />} />
            <Route path="/shows" element={<Navigate replace to="/browse/shows" />} />
            <Route path="/search" element={<Search />} />
            <Route path="/searchlist" element={<Search />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/support" element={<Support />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/:categoryType/:id" element={<Details />} />
            <Route path="/categoriesList" element={<Navigate replace to="/browse/movies" />} />
            <Route path="/topGenreList" element={<Navigate replace to="/browse/movies" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      {showTrial && <FreeTrial />}
      <Footer />
    </div>
  );
}

export default App;
