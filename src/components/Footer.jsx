import { Play } from "lucide-react";
import { Link } from "react-router-dom";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "Browse", to: "/browse/movies" },
      { label: "Search", to: "/search" },
      { label: "My List", to: "/watchlist" },
    ],
  },
  {
    title: "StreamVibe",
    links: [
      { label: "Plans", to: "/subscriptions" },
      { label: "Support", to: "/support" },
    ],
  },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[#0b0b0d] px-4 pb-32 pt-14 text-zinc-400 sm:px-6 sm:pt-16 lg:px-10 lg:pb-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 border-b border-white/[0.07] pb-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10 lg:pb-16">
          <div className="sm:col-span-2 lg:col-span-3 lg:max-w-xl">
            <Link
              to="/"
              aria-label="StreamVibe home"
              className="inline-flex items-center gap-2.5 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b0b0d]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500/30 bg-red-600/10 text-red-500">
                <Play className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden="true" />
              </span>
              <span className="text-xl font-semibold tracking-[-0.035em]">
                Stream<span className="text-red-500">Vibe</span>
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-6 text-zinc-500">
              A cinematic home for discovering movies and series worth watching.
            </p>
            <p className="mt-5 max-w-lg text-xs leading-5 text-zinc-600">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={`${group.title} footer links`}>
              <h2 className="text-sm font-semibold text-white">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="inline-flex rounded text-sm transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-2 py-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} StreamVibe. All rights reserved.</p>
          <p>Made for movie nights, big screens, and great stories.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
