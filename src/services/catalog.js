import { DEMO_CATALOG, DEMO_EPISODES, DEMO_GENRES } from "../data/demoCatalog.js";

const TMDB_API_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p";
const env = import.meta.env || {};

const validCredential = (value) => {
  const credential = String(value || "").trim();
  const normalized = credential.toLowerCase();
  const isPlaceholder =
    ["undefined", "null", "none"].includes(normalized) ||
    /^(?:your|replace|insert|example|demo)[-_\s]/.test(normalized) ||
    normalized.includes("your_tmdb_") ||
    normalized.includes("token_here") ||
    normalized.includes("key_here");

  return isPlaceholder ? "" : credential;
};

const bearerToken = validCredential(env.VITE_TMDB_BEARER);
const apiKey = validCredential(env.VITE_TMDB_API_KEY);
const itemCache = new Map();

export const hasLiveCatalog = Boolean(bearerToken || apiKey);

const isAbsoluteUrl = (value) => /^(?:https?:|data:|blob:)/i.test(value);

export function imageUrl(path, size = "w500") {
  if (!path || typeof path !== "string") return null;
  if (isAbsoluteUrl(path)) return path;

  const safeSize = /^(?:original|[wh]\d+)$/.test(size) ? size : "w500";
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${TMDB_IMAGE_URL}/${safeSize}${safePath}`;
}

const normalizeType = (type) => {
  const value = String(type || "").toLowerCase();
  return ["tv", "show", "shows", "series"].includes(value) ? "tv" : "movie";
};

const genreFor = (id, type) => {
  const list = DEMO_GENRES[normalizeType(type)];
  return list.find((genre) => Number(genre.id) === Number(id)) || {
    id: Number(id),
    name: "Other",
  };
};

const normalizeGenres = (raw, type) => {
  if (Array.isArray(raw.genres) && raw.genres.length > 0) {
    return raw.genres
      .map((genre) => {
        if (typeof genre === "string") return { id: genre, name: genre };
        return { id: genre.id, name: genre.name || "Other" };
      })
      .filter((genre) => genre.id !== undefined && genre.id !== null);
  }

  const ids = raw.genre_ids || raw.genreIds || [];
  return ids.map((id) => genreFor(id, type));
};

const normalizePerson = (person, role) => ({
  id: person.id,
  name: person.name || person.original_name || "Unknown",
  role: person.character || person.job || role || "",
  character: person.character || "",
  job: person.job || "",
  department: person.department || person.known_for_department || "",
  profilePath: person.profile_path || person.profilePath || null,
  profile_path: person.profile_path || person.profilePath || null,
  profileUrl: imageUrl(person.profile_path || person.profilePath, "w185"),
});

const normalizeVideo = (video) => ({
  id: video.id,
  key: video.key || "",
  name: video.name || "Trailer",
  site: video.site || "",
  type: video.type || "",
  official: Boolean(video.official),
  url:
    video.site === "YouTube" && video.key
      ? `https://www.youtube.com/watch?v=${encodeURIComponent(video.key)}`
      : null,
});

const reviewAvatarUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("/http")) return path.slice(1);
  return imageUrl(path, "w185");
};

const normalizeReview = (review) => {
  const authorDetails = review.author_details || review.authorDetails || {};
  const rating = Number(authorDetails.rating);

  return {
    id: review.id,
    author: review.author || authorDetails.name || "Guest viewer",
    content: review.content || "",
    createdAt: review.created_at || review.createdAt || null,
    created_at: review.created_at || review.createdAt || null,
    rating: Number.isFinite(rating) ? rating : null,
    avatarUrl: reviewAvatarUrl(authorDetails.avatar_path || authorDetails.avatarPath),
    authorDetails,
    author_details: authorDetails,
  };
};

const normalizeSeason = (season) => ({
  id: season.id,
  name: season.name || `Season ${season.season_number ?? season.seasonNumber ?? ""}`.trim(),
  seasonNumber: season.season_number ?? season.seasonNumber ?? 0,
  season_number: season.season_number ?? season.seasonNumber ?? 0,
  episodeCount: season.episode_count ?? season.episodeCount ?? 0,
  episode_count: season.episode_count ?? season.episodeCount ?? 0,
  airDate: season.air_date || season.airDate || null,
  air_date: season.air_date || season.airDate || null,
  overview: season.overview || "",
  posterPath: season.poster_path || season.posterPath || null,
  poster_path: season.poster_path || season.posterPath || null,
  posterUrl: imageUrl(season.poster_path || season.posterPath),
});

const findCertification = (raw, type) => {
  if (raw.certification) return raw.certification;

  if (type === "movie") {
    const release = raw.release_dates?.results
      ?.find((country) => country.iso_3166_1 === "US")
      ?.release_dates?.find((entry) => entry.certification);
    return release?.certification || null;
  }

  return (
    raw.content_ratings?.results?.find((country) => country.iso_3166_1 === "US")
      ?.rating || null
  );
};

const formatRuntime = (minutes) => {
  if (!Number.isFinite(minutes) || minutes <= 0) return null;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (!hours) return `${remainder}m`;
  return `${hours}h${remainder ? ` ${remainder}m` : ""}`;
};

export function normalizeMedia(raw = {}, forcedType, includeRelated = true) {
  const mediaType = normalizeType(forcedType || raw.media_type || raw.mediaType || raw.type);
  const title = raw.title || raw.name || raw.original_title || raw.original_name || "Untitled";
  const originalTitle = raw.original_title || raw.original_name || title;
  const releaseDate = raw.release_date || raw.first_air_date || raw.releaseDate || null;
  const year = releaseDate ? Number(String(releaseDate).slice(0, 4)) || null : null;
  const genres = normalizeGenres(raw, mediaType);
  const genreIds = genres.map((genre) => genre.id);
  const ratingValue = Number(raw.vote_average ?? raw.rating);
  const rating = Number.isFinite(ratingValue) ? ratingValue : 0;
  const voteCountValue = Number(raw.vote_count ?? raw.voteCount);
  const voteCount = Number.isFinite(voteCountValue) ? voteCountValue : 0;
  const runtimeValue = Number(
    raw.runtime || raw.episode_run_time?.[0] || raw.episodeRuntime || raw.last_episode_to_air?.runtime,
  );
  const runtime = Number.isFinite(runtimeValue) && runtimeValue > 0 ? runtimeValue : null;
  const castSource = raw.credits?.cast || raw.cast || [];
  const crewSource = raw.credits?.crew || raw.crew || [];
  const videoSource = raw.videos?.results || raw.videos || [];
  const reviewSource = raw.reviews?.results || raw.reviews || [];
  const recommendationSource = raw.recommendations?.results || raw.recommendations || [];
  const videos = videoSource.map(normalizeVideo);
  const trailer =
    videos.find((video) => video.site === "YouTube" && video.type === "Trailer" && video.official) ||
    videos.find((video) => video.site === "YouTube" && video.type === "Trailer") ||
    videos.find((video) => video.site === "YouTube") ||
    null;
  const posterPath = raw.poster_path || raw.posterPath || null;
  const backdropPath = raw.backdrop_path || raw.backdropPath || posterPath;
  const seasons = (raw.seasons || [])
    .filter((season) => (season.season_number ?? season.seasonNumber ?? 0) > 0)
    .map(normalizeSeason);

  const item = {
    id: raw.id,
    mediaType,
    media_type: mediaType,
    type: mediaType,
    title,
    name: title,
    originalTitle,
    tagline: raw.tagline || "",
    overview: raw.overview || "No description is available yet.",
    releaseDate,
    release_date: mediaType === "movie" ? releaseDate : raw.release_date || null,
    first_air_date: mediaType === "tv" ? releaseDate : raw.first_air_date || null,
    year,
    runtime,
    runtimeLabel: formatRuntime(runtime),
    episodeRuntime: mediaType === "tv" ? runtime : null,
    genres,
    genreIds,
    genre_ids: genreIds,
    rating,
    vote_average: rating,
    voteCount,
    vote_count: voteCount,
    popularity: Number(raw.popularity) || 0,
    posterPath,
    poster_path: posterPath,
    backdropPath,
    backdrop_path: backdropPath,
    posterUrl: imageUrl(posterPath),
    backdropUrl: imageUrl(backdropPath, "original"),
    images: {
      poster: imageUrl(posterPath),
      card: imageUrl(posterPath || backdropPath, "w500"),
      backdrop: imageUrl(backdropPath, "w1280"),
      hero: imageUrl(backdropPath, "original"),
    },
    originalLanguage: raw.original_language || raw.originalLanguage || "en",
    original_language: raw.original_language || raw.originalLanguage || "en",
    status: raw.status || "",
    certification: findCertification(raw, mediaType),
    numberOfSeasons: Number(raw.number_of_seasons ?? raw.numberOfSeasons) || seasons.length || null,
    number_of_seasons: Number(raw.number_of_seasons ?? raw.numberOfSeasons) || seasons.length || null,
    numberOfEpisodes: Number(raw.number_of_episodes ?? raw.numberOfEpisodes) || null,
    number_of_episodes: Number(raw.number_of_episodes ?? raw.numberOfEpisodes) || null,
    seasons,
    cast: castSource.map((person) => normalizePerson(person, "Cast")),
    crew: crewSource.map((person) => normalizePerson(person, "Crew")),
    videos,
    trailer,
    trailerKey: trailer?.key || null,
    reviews: reviewSource.map(normalizeReview),
    recommendations: includeRelated
      ? recommendationSource
          .filter((entry) => ["movie", "tv", undefined].includes(entry.media_type))
          .map((entry) => normalizeMedia(entry, entry.media_type || mediaType, false))
      : [],
  };

  return item;
}

const cacheItems = (items) => {
  items.forEach((item) => {
    if (item?.id !== undefined && item?.id !== null) {
      itemCache.set(`${item.mediaType}:${item.id}`, item);
    }
  });
  return items;
};

const normalizeList = (items, forcedType) =>
  cacheItems(
    (items || [])
      .filter((item) => item && item.id !== undefined)
      .map((item) => normalizeMedia(item, forcedType))
      .filter((item) => item.posterPath || item.backdropPath),
  );

const request = async (path, params = {}, signal) => {
  if (!hasLiveCatalog) throw new Error("Live catalog is not configured");

  const url = new URL(`${TMDB_API_URL}${path}`);
  Object.entries({ language: "en-US", ...params }).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const headers = { accept: "application/json" };
  if (bearerToken) {
    headers.Authorization = bearerToken.startsWith("Bearer ")
      ? bearerToken
      : `Bearer ${bearerToken}`;
  } else {
    url.searchParams.set("api_key", apiKey);
  }

  const response = await fetch(url, { headers, signal });
  if (!response.ok) {
    throw new Error(`Catalog request failed with status ${response.status}`);
  }
  return response.json();
};

const shouldRethrow = (error) => error?.name === "AbortError";

const mergeUnique = (...groups) => {
  const seen = new Set();
  return groups.flat().filter((item) => {
    const key = `${item.mediaType}:${item.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const genreGroups = (genres, items) =>
  genres
    .map((genre) => ({
      ...genre,
      items: items.filter((item) => item.genreIds.includes(genre.id)).slice(0, 4),
    }))
    .filter((genre) => genre.items.length > 0);

const resolveDemoRecommendations = (raw) => ({
  ...raw,
  recommendations: {
    results: (raw.recommendation_ids || [])
      .map((id) => DEMO_CATALOG.all.find((item) => Number(item.id) === Number(id)))
      .filter(Boolean),
  },
});

const normalizedDemoItems = (type) => {
  const source = normalizeType(type) === "tv" ? DEMO_CATALOG.shows : DEMO_CATALOG.movies;
  return cacheItems(source.map((item) => normalizeMedia(item, item.media_type)));
};

const demoHomeCatalog = () => {
  const movies = normalizedDemoItems("movie");
  const shows = normalizedDemoItems("tv");
  const trending = mergeUnique(
    [movies[0], shows[0], shows[1], movies[1], movies[2], shows[2]],
    movies,
    shows,
  );
  const newReleases = [...movies, ...shows].sort(
    (left, right) => new Date(right.releaseDate || 0) - new Date(left.releaseDate || 0),
  );
  const topRated = [...movies, ...shows].sort((left, right) => right.rating - left.rating);
  const hero = [movies[0], shows[0], shows[1], movies[2]].filter(Boolean);

  return {
    source: "demo",
    isFallback: true,
    featured: hero[0] || null,
    hero,
    trending,
    newReleases,
    topRated,
    movies,
    shows,
    genres: {
      movie: genreGroups(DEMO_GENRES.movie, movies),
      tv: genreGroups(DEMO_GENRES.tv, shows),
    },
    genreLists: DEMO_GENRES,
    sections: { trending, newReleases, topRated },
  };
};

const demoBrowseCatalog = (type) => {
  const mediaType = normalizeType(type);
  const items = normalizedDemoItems(mediaType);
  const trending = [...items].sort((left, right) => right.popularity - left.popularity);
  const popular = [...items];
  const newReleases = [...items].sort(
    (left, right) => new Date(right.releaseDate || 0) - new Date(left.releaseDate || 0),
  );
  const topRated = [...items].sort((left, right) => right.rating - left.rating);

  return {
    source: "demo",
    isFallback: true,
    type: mediaType,
    featured: trending[0] || null,
    genres: genreGroups(DEMO_GENRES[mediaType], items),
    genreList: DEMO_GENRES[mediaType],
    sections: { trending, popular, newReleases, topRated },
  };
};

export async function getHomeCatalog(signal) {
  if (!hasLiveCatalog) return demoHomeCatalog();

  try {
    const [
      trendingResponse,
      moviesResponse,
      showsResponse,
      newMoviesResponse,
      newShowsResponse,
      topMoviesResponse,
      topShowsResponse,
      movieGenresResponse,
      tvGenresResponse,
    ] = await Promise.all([
      request("/trending/all/week", { include_adult: false }, signal),
      request("/movie/popular", { page: 1 }, signal),
      request("/tv/popular", { page: 1 }, signal),
      request("/movie/now_playing", { page: 1 }, signal),
      request("/tv/airing_today", { page: 1 }, signal),
      request("/movie/top_rated", { page: 1 }, signal),
      request("/tv/top_rated", { page: 1 }, signal),
      request("/genre/movie/list", {}, signal),
      request("/genre/tv/list", {}, signal),
    ]);

    const movies = normalizeList(moviesResponse.results, "movie");
    const shows = normalizeList(showsResponse.results, "tv");
    const trending = normalizeList(
      trendingResponse.results?.filter((item) => ["movie", "tv"].includes(item.media_type)),
    );
    const newReleases = mergeUnique(
      normalizeList(newMoviesResponse.results, "movie"),
      normalizeList(newShowsResponse.results, "tv"),
    );
    const topRated = mergeUnique(
      normalizeList(topMoviesResponse.results, "movie"),
      normalizeList(topShowsResponse.results, "tv"),
    ).sort((left, right) => right.rating - left.rating);
    const movieGenres = movieGenresResponse.genres || [];
    const tvGenres = tvGenresResponse.genres || [];
    const hero = mergeUnique(trending, movies, shows)
      .filter((item) => item.backdropPath)
      .slice(0, 5);

    return {
      source: "live",
      isFallback: false,
      featured: hero[0] || movies[0] || shows[0] || null,
      hero,
      trending,
      newReleases,
      topRated,
      movies,
      shows,
      genres: {
        movie: genreGroups(movieGenres, movies),
        tv: genreGroups(tvGenres, shows),
      },
      genreLists: { movie: movieGenres, tv: tvGenres },
      sections: { trending, newReleases, topRated },
    };
  } catch (error) {
    if (shouldRethrow(error)) throw error;
    return demoHomeCatalog();
  }
}

export async function getBrowseCatalog(type, signal) {
  const mediaType = normalizeType(type);
  if (!hasLiveCatalog) return demoBrowseCatalog(mediaType);

  try {
    const newReleasePath = mediaType === "tv" ? "/tv/airing_today" : "/movie/now_playing";
    const [trendingResponse, popularResponse, newResponse, topResponse, genresResponse] =
      await Promise.all([
        request(`/trending/${mediaType}/week`, { page: 1 }, signal),
        request(`/${mediaType}/popular`, { page: 1 }, signal),
        request(newReleasePath, { page: 1 }, signal),
        request(`/${mediaType}/top_rated`, { page: 1 }, signal),
        request(`/genre/${mediaType}/list`, {}, signal),
      ]);

    const trending = normalizeList(trendingResponse.results, mediaType);
    const popular = normalizeList(popularResponse.results, mediaType);
    const newReleases = normalizeList(newResponse.results, mediaType);
    const topRated = normalizeList(topResponse.results, mediaType);
    const genres = genresResponse.genres || [];
    const availableItems = mergeUnique(popular, trending, newReleases, topRated);

    return {
      source: "live",
      isFallback: false,
      type: mediaType,
      featured: trending.find((item) => item.backdropPath) || popular[0] || null,
      genres: genreGroups(genres, availableItems),
      genreList: genres,
      sections: { trending, popular, newReleases, topRated },
    };
  } catch (error) {
    if (shouldRethrow(error)) throw error;
    return demoBrowseCatalog(mediaType);
  }
}

const demoSearch = (query) => {
  const terms = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return DEMO_CATALOG.all
    .filter((item) => {
      const searchable = [
        item.title,
        item.name,
        item.overview,
        ...item.genres.map((genre) => genre.name),
        ...(item.cast || []).map((person) => person.name),
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase();
      return terms.every((term) => searchable.includes(term));
    })
    .map((item) => normalizeMedia(item, item.media_type));
};

export async function searchCatalog(query, signal) {
  const cleanQuery = String(query || "").trim().slice(0, 100);
  if (!cleanQuery) {
    return {
      source: hasLiveCatalog ? "live" : "demo",
      isFallback: !hasLiveCatalog,
      query: "",
      results: [],
      page: 1,
      totalPages: 0,
      totalResults: 0,
    };
  }

  if (!hasLiveCatalog) {
    const results = cacheItems(demoSearch(cleanQuery));
    return {
      source: "demo",
      isFallback: true,
      query: cleanQuery,
      results,
      page: 1,
      totalPages: results.length ? 1 : 0,
      totalResults: results.length,
    };
  }

  try {
    const response = await request(
      "/search/multi",
      { query: cleanQuery, include_adult: false, page: 1 },
      signal,
    );
    const results = normalizeList(
      response.results?.filter((item) => ["movie", "tv"].includes(item.media_type)),
    );

    return {
      source: "live",
      isFallback: false,
      query: cleanQuery,
      results,
      page: response.page || 1,
      totalPages: response.total_pages || (results.length ? 1 : 0),
      totalResults: response.total_results ?? results.length,
    };
  } catch (error) {
    if (shouldRethrow(error)) throw error;
    const results = cacheItems(demoSearch(cleanQuery));
    return {
      source: "demo",
      isFallback: true,
      query: cleanQuery,
      results,
      page: 1,
      totalPages: results.length ? 1 : 0,
      totalResults: results.length,
    };
  }
}

const demoDetails = (type, id) => {
  const mediaType = normalizeType(type);
  const raw = DEMO_CATALOG.all.find(
    (item) => item.media_type === mediaType && String(item.id) === String(id),
  );

  if (raw) {
    return { ...normalizeMedia(resolveDemoRecommendations(raw), mediaType), source: "demo", isFallback: true };
  }

  const cached = itemCache.get(`${mediaType}:${id}`);
  if (cached) {
    const suggestions = normalizedDemoItems(mediaType).slice(0, 4);
    return {
      ...cached,
      source: "demo",
      isFallback: true,
      recommendations: suggestions,
    };
  }

  const fallback = mediaType === "tv" ? DEMO_CATALOG.shows[0] : DEMO_CATALOG.movies[0];
  return { ...normalizeMedia(resolveDemoRecommendations(fallback), mediaType), source: "demo", isFallback: true };
};

export async function getMediaDetails(type, id, signal) {
  const mediaType = normalizeType(type);
  if (!hasLiveCatalog) return demoDetails(mediaType, id);

  try {
    const response = await request(
      `/${mediaType}/${encodeURIComponent(String(id))}`,
      {
        append_to_response:
          "credits,videos,reviews,recommendations,release_dates,content_ratings,external_ids",
        include_image_language: "en,null",
      },
      signal,
    );
    const result = { ...normalizeMedia(response, mediaType), source: "live", isFallback: false };
    cacheItems([result]);
    return result;
  } catch (error) {
    if (shouldRethrow(error)) throw error;
    return demoDetails(mediaType, id);
  }
}

export function normalizeEpisode(raw = {}) {
  const runtimeValue = Number(raw.runtime);
  const stillPath = raw.still_path || raw.stillPath || null;
  const seasonNumber = raw.season_number ?? raw.seasonNumber ?? 0;
  const episodeNumber = raw.episode_number ?? raw.episodeNumber ?? 0;
  const ratingValue = Number(raw.vote_average ?? raw.rating);

  return {
    id: raw.id ?? `${raw.show_id || "show"}-${seasonNumber}-${episodeNumber}`,
    name: raw.name || `Episode ${episodeNumber}`,
    overview: raw.overview || "Episode information will be available soon.",
    seasonNumber,
    season_number: seasonNumber,
    episodeNumber,
    episode_number: episodeNumber,
    runtime: Number.isFinite(runtimeValue) && runtimeValue > 0 ? runtimeValue : null,
    runtimeLabel: formatRuntime(runtimeValue),
    airDate: raw.air_date || raw.airDate || null,
    air_date: raw.air_date || raw.airDate || null,
    stillPath,
    still_path: stillPath,
    stillUrl: imageUrl(stillPath, "w500"),
    rating: Number.isFinite(ratingValue) ? ratingValue : 0,
    vote_average: Number.isFinite(ratingValue) ? ratingValue : 0,
  };
}

const genericDemoEpisodes = (tvId, seasonNumber) => {
  const show = DEMO_CATALOG.shows.find((item) => String(item.id) === String(tvId));
  const season = show?.seasons?.find(
    (entry) => Number(entry.season_number) === Number(seasonNumber),
  );
  if (!show || !season) return [];

  return Array.from({ length: season.episode_count || 0 }, (_, index) => ({
    id: `${tvId}-${seasonNumber}-${index + 1}`,
    show_id: tvId,
    season_number: Number(seasonNumber),
    episode_number: index + 1,
    name: `Episode ${index + 1}`,
    overview: `Continue ${show.name} with episode ${index + 1} of ${season.name}.`,
    runtime: show.episode_run_time?.[0] || null,
    air_date: null,
    still_path: null,
    vote_average: show.vote_average,
  }));
};

const demoSeasonEpisodes = (tvId, seasonNumber) => {
  const key = `${tvId}:${Number(seasonNumber)}`;
  const episodes = DEMO_EPISODES[key] || genericDemoEpisodes(tvId, seasonNumber);
  return episodes.map(normalizeEpisode);
};

export async function getSeasonEpisodes(tvId, seasonNumber, signal) {
  if (!hasLiveCatalog) return demoSeasonEpisodes(tvId, seasonNumber);

  try {
    const response = await request(
      `/tv/${encodeURIComponent(String(tvId))}/season/${encodeURIComponent(String(seasonNumber))}`,
      {},
      signal,
    );
    return (response.episodes || []).map(normalizeEpisode);
  } catch (error) {
    if (shouldRethrow(error)) throw error;
    return demoSeasonEpisodes(tvId, seasonNumber);
  }
}
