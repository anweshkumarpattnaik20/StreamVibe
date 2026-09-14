/* eslint-disable react/prop-types */
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import MediaCard from "./MediaCard";

export default function MediaRail({
  title,
  eyebrow,
  description,
  items = [],
}) {
  const headingId = useId();
  const railRef = useRef(null);
  const mediaItems = Array.isArray(items) ? items : [];
  const [scrollState, setScrollState] = useState({
    canGoBack: false,
    canGoForward: false,
  });

  const updateScrollState = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const maximum = Math.max(0, rail.scrollWidth - rail.clientWidth);
    setScrollState({
      canGoBack: rail.scrollLeft > 4,
      canGoForward: rail.scrollLeft < maximum - 4,
    });
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;

    updateScrollState();
    rail.addEventListener("scroll", updateScrollState, { passive: true });

    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(updateScrollState);
    resizeObserver?.observe(rail);

    return () => {
      rail.removeEventListener("scroll", updateScrollState);
      resizeObserver?.disconnect();
    };
  }, [mediaItems.length, updateScrollState]);

  const moveRail = (direction) => {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction * Math.max(280, rail.clientWidth * 0.82),
      behavior: "smooth",
    });
  };

  return (
    <section aria-labelledby={headingId} className="py-7 sm:py-9">
      <div className="mb-5 flex items-end justify-between gap-5 sm:mb-6">
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#ef4444] sm:text-xs">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={headingId}
            className="text-xl font-black tracking-tight text-white sm:text-2xl lg:text-3xl"
          >
            {title || "Explore"}
          </h2>
          {description ? (
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#a1a1aa]">
              {description}
            </p>
          ) : null}
        </div>

        {mediaItems.length > 0 ? (
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => moveRail(-1)}
              disabled={!scrollState.canGoBack}
              aria-label={`Scroll ${title || "media"} backward`}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-white/20 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef4444] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft aria-hidden="true" size={18} />
            </button>
            <button
              type="button"
              onClick={() => moveRail(1)}
              disabled={!scrollState.canGoForward}
              aria-label={`Scroll ${title || "media"} forward`}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-white/20 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef4444] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowRight aria-hidden="true" size={18} />
            </button>
          </div>
        ) : null}
      </div>

      {mediaItems.length > 0 ? (
        <ul
          ref={railRef}
          aria-label={`${title || "Media"} titles`}
          className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4 lg:gap-5"
        >
          {mediaItems.map((item, index) => (
            <li
              key={`${item?.media_type || "media"}-${item?.id ?? index}`}
              className="w-[42vw] max-w-[205px] shrink-0 snap-start sm:w-[29vw] lg:w-[19vw] xl:w-[15.5vw]"
            >
              <MediaCard item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.025] px-6 py-10 text-center text-sm text-[#71717a]">
          There are no titles to show here yet.
        </div>
      )}
    </section>
  );
}
