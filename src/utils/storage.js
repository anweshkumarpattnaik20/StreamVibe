const WATCHLIST_KEY = "streamvibe:watchlist:v1";
const WATCHLIST_EVENT = "streamvibe:watchlist-change";
const TYPE_ALIASES = ["movie", "movies", "tv", "show", "shows", "series"];
let memoryWatchlist = [];
let storageUnavailable = false;

const storage = () => {
  if (storageUnavailable || typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    storageUnavailable = true;
    return null;
  }
};

const mediaTypeOf = (item, fallback) => {
  const value = String(
    (typeof item === "object" && item
      ? item.mediaType || item.media_type || item.type
      : fallback) || "movie",
  ).toLowerCase();
  return ["tv", "show", "shows", "series"].includes(value) ? "tv" : "movie";
};

const identityOf = (itemOrId, type) => {
  if (
    typeof itemOrId === "string" &&
    TYPE_ALIASES.includes(itemOrId.toLowerCase()) &&
    type !== undefined &&
    type !== null
  ) {
    return `${mediaTypeOf(null, itemOrId)}:${String(type)}`;
  }

  const id =
    typeof itemOrId === "object" && itemOrId !== null ? itemOrId.id : itemOrId;
  if (id === undefined || id === null || id === "") return null;
  return `${mediaTypeOf(itemOrId, type)}:${String(id)}`;
};

const cleanItem = (item) => {
  if (!item || typeof item !== "object" || identityOf(item) === null) return null;

  const mediaType = mediaTypeOf(item);
  const title = item.title || item.name || "Untitled";
  const releaseDate = item.releaseDate || item.release_date || item.first_air_date || null;
  const posterPath = item.posterPath || item.poster_path || null;
  const backdropPath = item.backdropPath || item.backdrop_path || null;

  return {
    id: item.id,
    mediaType,
    media_type: mediaType,
    type: mediaType,
    title,
    name: title,
    overview: item.overview || "",
    releaseDate,
    release_date: mediaType === "movie" ? releaseDate : null,
    first_air_date: mediaType === "tv" ? releaseDate : null,
    year: item.year || (releaseDate ? Number(String(releaseDate).slice(0, 4)) || null : null),
    rating: Number(item.rating ?? item.vote_average) || 0,
    vote_average: Number(item.rating ?? item.vote_average) || 0,
    posterPath,
    poster_path: posterPath,
    backdropPath,
    backdrop_path: backdropPath,
    posterUrl: item.posterUrl || item.images?.poster || null,
    backdropUrl: item.backdropUrl || item.images?.backdrop || null,
    genres: Array.isArray(item.genres)
      ? item.genres.slice(0, 5).map((genre) => ({ id: genre.id, name: genre.name }))
      : [],
    addedAt: item.addedAt || new Date().toISOString(),
  };
};

const parseWatchlist = (value) => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    const items = Array.isArray(parsed) ? parsed : parsed?.items;
    if (!Array.isArray(items)) return [];

    const seen = new Set();
    return items.reduce((result, item) => {
      const clean = cleanItem(item);
      const key = clean ? identityOf(clean) : null;
      if (clean && !seen.has(key)) {
        seen.add(key);
        result.push(clean);
      }
      return result;
    }, []);
  } catch {
    return [];
  }
};

const saveWatchlist = (items) => {
  memoryWatchlist = items.map((item) => ({ ...item }));
  const localStorage = storage();
  if (!localStorage) return false;

  try {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(items));
    return true;
  } catch {
    storageUnavailable = true;
    return false;
  }
};

const announceChange = (items) => {
  if (typeof window === "undefined" || typeof window.dispatchEvent !== "function") return;
  try {
    window.dispatchEvent(
      new CustomEvent(WATCHLIST_EVENT, {
        detail: { items: items.map((item) => ({ ...item })) },
      }),
    );
  } catch {
    // Storage remains usable in browsers that do not support CustomEvent construction.
  }
};

export function getWatchlist() {
  const localStorage = storage();
  if (!localStorage) return memoryWatchlist.map((item) => ({ ...item }));

  try {
    const items = parseWatchlist(localStorage.getItem(WATCHLIST_KEY));
    memoryWatchlist = items;
    return items.map((item) => ({ ...item }));
  } catch {
    storageUnavailable = true;
    return memoryWatchlist.map((item) => ({ ...item }));
  }
}

export function isInWatchlist(itemOrId, type) {
  const wanted = identityOf(itemOrId, type);
  if (!wanted) return false;
  return getWatchlist().some((item) => identityOf(item) === wanted);
}

export function toggleWatchlist(item) {
  const clean = cleanItem(item);
  if (!clean) return false;

  const wanted = identityOf(clean);
  const current = getWatchlist();
  const existingIndex = current.findIndex((entry) => identityOf(entry) === wanted);
  let next;
  let isAdded;

  if (existingIndex >= 0) {
    next = current.filter((_, index) => index !== existingIndex);
    isAdded = false;
  } else {
    next = [clean, ...current];
    isAdded = true;
  }

  saveWatchlist(next);
  announceChange(next);
  return isAdded;
}

export { WATCHLIST_EVENT };
