import { Clapperboard, Home, Search, Tv } from "lucide-react";
import { Link } from "react-router-dom";

const destinations = [
  { to: "/browse/movies", icon: Clapperboard, label: "Browse movies" },
  { to: "/browse/shows", icon: Tv, label: "Browse shows" },
  { to: "/search", icon: Search, label: "Search catalog" },
];

function NotFound() {
  return (
    <main className="page-shell grid min-h-[72vh] place-items-center py-16 text-white">
      <section className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] px-5 py-14 text-center sm:px-10 sm:py-20" aria-labelledby="not-found-title">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-600/10 blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <p className="text-7xl font-semibold tracking-tighter text-white/[0.08] sm:text-9xl">404</p>
          <p className="-mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-rose-400 sm:-mt-8">Scene not found</p>
          <h1 id="not-found-title" className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">This title left the catalog</h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
            The address may have changed, but your next great watch is still close by.
          </p>
          <Link to="/" className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500">
            <Home aria-hidden="true" className="h-4 w-4" /> Back to home
          </Link>

          <nav aria-label="Useful destinations" className="mt-10 grid gap-3 sm:grid-cols-3">
            {destinations.map(({ to, icon: Icon, label }) => (
              <Link key={to} to={to} className="group flex items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-black/20 px-4 py-4 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white">
                <Icon aria-hidden="true" className="h-4 w-4 text-zinc-500 transition group-hover:text-rose-300" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
