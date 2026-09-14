import { useEffect, useRef, useState } from "react";
import {
  Bookmark,
  Clapperboard,
  Home,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const primaryLinks = [
  { label: "Home", to: "/", end: true },
  { label: "Browse", to: "/browse/movies", match: "/browse/" },
  { label: "My List", to: "/watchlist" },
  { label: "Support", to: "/support" },
  { label: "Plans", to: "/subscriptions" },
];

const mobileLinks = [
  { label: "Home", to: "/", end: true, icon: Home },
  { label: "Browse", to: "/browse/movies", icon: Clapperboard, match: "/browse/" },
  { label: "My List", to: "/watchlist", icon: Bookmark },
  { label: "Plans", to: "/subscriptions", icon: Sparkles },
];

function BrandMark() {
  return (
    <span
      aria-hidden="true"
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-500/40 bg-red-600/10 shadow-[0_0_28px_rgba(229,0,0,0.18)]"
    >
      <span className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-red-500" />
    </span>
  );
}

function NavigationBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const searchTriggerRef = useRef(null);

  const openSearch = (event) => {
    searchTriggerRef.current = event.currentTarget;
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  useEffect(() => {
    if (!isSearchOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsSearchOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = dialogRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      searchTriggerRef.current?.focus();
    };
  }, [isSearchOpen]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      inputRef.current?.focus();
      return;
    }

    navigate(`/search?q=${encodeURIComponent(normalizedQuery)}`);
    setQuery("");
    setIsSearchOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#0b0b0d]/80 text-white shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:h-24 lg:px-10">
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b0b0d]"
            aria-label="StreamVibe home"
          >
            <BrandMark />
            <span className="text-xl font-semibold tracking-[-0.035em] sm:text-2xl">
              Stream<span className="text-red-500">Vibe</span>
            </span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 rounded-2xl border border-white/[0.08] bg-black/30 p-1.5 shadow-inner lg:flex"
          >
            {primaryLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => {
                  const isCurrent = isActive || (link.match && pathname.startsWith(link.match));
                  return `rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                    isCurrent
                      ? "bg-white/[0.09] text-white shadow-sm"
                      : "text-zinc-400 hover:bg-white/[0.05] hover:text-white"
                  }`;
                }}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={openSearch}
            className="hidden h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-zinc-300 transition-colors hover:border-white/15 hover:bg-white/[0.08] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 lg:inline-flex"
            aria-label="Open search"
            aria-haspopup="dialog"
            aria-expanded={isSearchOpen}
          >
            <Search className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </header>

      <div className="h-20 lg:h-24" aria-hidden="true" />

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 items-end rounded-2xl border border-white/10 bg-[#101012]/95 px-1 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-2 text-white shadow-[0_16px_50px_rgba(0,0,0,0.65)] backdrop-blur-xl lg:hidden"
      >
        {mobileLinks.slice(0, 2).map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => {
                const isCurrent = isActive || (link.match && pathname.startsWith(link.match));
                return `flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                  isCurrent ? "text-red-500" : "text-zinc-500 hover:text-zinc-200"
                }`;
              }}
            >
              <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}

        <button
          type="button"
          onClick={openSearch}
          className="group -mt-7 flex min-h-16 flex-col items-center justify-end gap-1 rounded-xl text-[10px] font-medium text-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          aria-label="Open search"
          aria-haspopup="dialog"
          aria-expanded={isSearchOpen}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_8px_24px_rgba(220,38,38,0.4)] transition-transform group-hover:-translate-y-0.5 group-active:scale-95">
            <Search className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
          </span>
          <span>Search</span>
        </button>

        {mobileLinks.slice(2).map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                  isActive ? "text-red-500" : "text-zinc-500 hover:text-zinc-200"
                }`
              }
            >
              <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 px-4 pt-20 backdrop-blur-md sm:items-center sm:pt-0"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSearch();
          }}
        >
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-dialog-title"
            aria-describedby="search-dialog-description"
            className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#151517] shadow-[0_32px_100px_rgba(0,0,0,0.7)]"
          >
            <div className="flex items-start justify-between border-b border-white/[0.07] px-5 py-5 sm:px-7 sm:py-6">
              <div>
                <h2 id="search-dialog-title" className="text-xl font-semibold text-white sm:text-2xl">
                  Find your next favorite
                </h2>
                <p id="search-dialog-description" className="mt-1 text-sm text-zinc-500">
                  Search movies, series, genres, and people.
                </p>
              </div>
              <button
                type="button"
                onClick={closeSearch}
                className="ml-4 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                aria-label="Close search"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="p-5 sm:p-7">
              <label htmlFor="site-search" className="sr-only">
                Search StreamVibe
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-2 pl-4 transition-colors focus-within:border-red-500/70 focus-within:ring-4 focus-within:ring-red-500/10">
                <Search className="h-5 w-5 shrink-0 text-zinc-500" aria-hidden="true" />
                <input
                  ref={inputRef}
                  id="site-search"
                  name="q"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search for a movie or show"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent py-2 text-base text-white outline-none placeholder:text-zinc-600"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:px-6"
                >
                  Search
                </button>
              </div>
              <p className="mt-3 text-xs text-zinc-600">
                Press Enter to search or Escape to close.
              </p>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default NavigationBar;
