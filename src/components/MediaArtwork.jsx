/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { ImageOff } from "lucide-react";
import { imageUrl } from "../services/catalog";

const FALLBACK_GRADIENTS = [
  ["#450a0a", "#18181b", "#09090b"],
  ["#172554", "#18181b", "#09090b"],
  ["#3b0764", "#18181b", "#09090b"],
  ["#052e16", "#18181b", "#09090b"],
  ["#422006", "#18181b", "#09090b"],
];

function artworkTitle(item) {
  return item?.title || item?.name || "Untitled";
}

function initialsFor(title) {
  const words = title.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "SV";

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function gradientFor(item, title) {
  const seed = String(item?.id ?? title);
  const hash = Array.from(seed).reduce(
    (value, character) => (value * 31 + character.charCodeAt(0)) >>> 0,
    0,
  );
  const colors = FALLBACK_GRADIENTS[hash % FALLBACK_GRADIENTS.length];

  return `linear-gradient(145deg, ${colors[0]} 0%, ${colors[1]} 52%, ${colors[2]} 100%)`;
}

/**
 * Resilient artwork for catalogue cards and cinematic backdrops.
 */
export default function MediaArtwork({
  item,
  variant = "poster",
  className = "",
  priority = false,
}) {
  const title = artworkTitle(item);
  const isBackdrop = variant === "backdrop";
  const artworkPath = isBackdrop
    ? item?.backdrop_path || item?.poster_path
    : item?.poster_path || item?.backdrop_path;
  const source = artworkPath
    ? imageUrl(artworkPath, isBackdrop ? "w1280" : "w500")
    : null;
  const [hasFailed, setHasFailed] = useState(!source);

  useEffect(() => {
    setHasFailed(!source);
  }, [source]);

  const fallbackGradient = useMemo(
    () => gradientFor(item, title),
    [item, title],
  );

  return (
    <div
      className={`relative isolate overflow-hidden bg-[#18181b] ${className}`}
      style={hasFailed ? { backgroundImage: fallbackGradient } : undefined}
    >
      {!hasFailed && source ? (
        <img
          src={source}
          alt={`${title} ${isBackdrop ? "backdrop" : "poster"}`}
          className="h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setHasFailed(true)}
        />
      ) : (
        <div
          className="flex h-full min-h-40 w-full flex-col items-center justify-center gap-3 px-5 text-center text-white/80"
          role="img"
          aria-label={`${title} artwork unavailable`}
        >
          <span
            aria-hidden="true"
            className="text-4xl font-black tracking-[-0.08em] text-white/90 drop-shadow-lg"
          >
            {initialsFor(title)}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
            <ImageOff aria-hidden="true" size={13} strokeWidth={1.75} />
            Artwork unavailable
          </span>
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/[0.04]"
      />
    </div>
  );
}
