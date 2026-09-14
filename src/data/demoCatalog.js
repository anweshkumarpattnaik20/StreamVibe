const movieGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 36, name: "History" },
  { id: 9648, name: "Mystery" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
];

const tvGenres = [
  { id: 10759, name: "Action & Adventure" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 9648, name: "Mystery" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
];

const genreNames = new Map(
  [...movieGenres, ...tvGenres].map((genre) => [genre.id, genre.name]),
);

const withGenres = (item) => ({
  ...item,
  genres: item.genre_ids.map((id) => ({ id, name: genreNames.get(id) || "Other" })),
});

const demoReview = (id, author, content, rating) => ({
  id,
  author,
  content,
  created_at: "2025-01-18T12:00:00.000Z",
  author_details: {
    name: author,
    username: author.toLowerCase().replaceAll(" ", "_"),
    avatar_path: null,
    rating,
  },
});

const movies = [
  withGenres({
    id: 693134,
    media_type: "movie",
    title: "Dune: Part Two",
    tagline: "Long live the fighters.",
    overview:
      "Paul Atreides unites with Chani and the Fremen while seeking justice for his family. Faced with a choice between love and the fate of the universe, he works to prevent a future only he can foresee.",
    release_date: "2024-02-27",
    runtime: 166,
    genre_ids: [878, 12, 18],
    vote_average: 8.2,
    vote_count: 6400,
    popularity: 99,
    poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    original_language: "en",
    status: "Released",
    certification: "PG-13",
    cast: [
      { id: 1190668, name: "Timothée Chalamet", character: "Paul Atreides", profile_path: null },
      { id: 505710, name: "Zendaya", character: "Chani", profile_path: null },
      { id: 933238, name: "Rebecca Ferguson", character: "Lady Jessica", profile_path: null },
      { id: 16828, name: "Javier Bardem", character: "Stilgar", profile_path: null },
    ],
    crew: [
      { id: 137427, name: "Denis Villeneuve", job: "Director", department: "Directing" },
      { id: 137427, name: "Denis Villeneuve", job: "Screenplay", department: "Writing" },
    ],
    videos: [
      { id: "dune-two-trailer", key: "Way9Dexny3w", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true },
    ],
    reviews: [
      demoReview(
        "dune-review",
        "Maya Reed",
        "A towering science-fiction epic with patient world-building, tactile scale, and a deeply human center.",
        9,
      ),
    ],
    recommendation_ids: [872585, 569094, 27205],
  }),
  withGenres({
    id: 872585,
    media_type: "movie",
    title: "Oppenheimer",
    tagline: "The world forever changes.",
    overview:
      "The story of J. Robert Oppenheimer and the team of scientists whose work on the Manhattan Project ushered the world into the atomic age.",
    release_date: "2023-07-19",
    runtime: 181,
    genre_ids: [18, 36],
    vote_average: 8.1,
    vote_count: 9100,
    popularity: 93,
    poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop_path: "/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    original_language: "en",
    status: "Released",
    certification: "R",
    cast: [
      { id: 2037, name: "Cillian Murphy", character: "J. Robert Oppenheimer", profile_path: null },
      { id: 5081, name: "Emily Blunt", character: "Kitty Oppenheimer", profile_path: null },
      { id: 1892, name: "Matt Damon", character: "Leslie Groves", profile_path: null },
      { id: 3223, name: "Robert Downey Jr.", character: "Lewis Strauss", profile_path: null },
    ],
    crew: [
      { id: 525, name: "Christopher Nolan", job: "Director", department: "Directing" },
      { id: 525, name: "Christopher Nolan", job: "Writer", department: "Writing" },
    ],
    videos: [
      { id: "oppenheimer-trailer", key: "uYPbbksJxIg", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true },
    ],
    reviews: [
      demoReview(
        "oppenheimer-review",
        "Noah Bennett",
        "A precise, urgent character study that turns history, ambition, and consequence into gripping cinema.",
        9,
      ),
    ],
    recommendation_ids: [693134, 27205, 155],
  }),
  withGenres({
    id: 569094,
    media_type: "movie",
    title: "Spider-Man: Across the Spider-Verse",
    tagline: "It is how you wear the mask that matters.",
    overview:
      "Miles Morales is catapulted across the Multiverse, where he encounters a team of Spider-People charged with protecting its existence and must redefine what it means to be a hero.",
    release_date: "2023-05-31",
    runtime: 140,
    genre_ids: [16, 28, 12],
    vote_average: 8.4,
    vote_count: 7200,
    popularity: 90,
    poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop_path: "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    original_language: "en",
    status: "Released",
    certification: "PG",
    cast: [
      { id: 1459217, name: "Shameik Moore", character: "Miles Morales", profile_path: null },
      { id: 130640, name: "Hailee Steinfeld", character: "Gwen Stacy", profile_path: null },
      { id: 25072, name: "Brian Tyree Henry", character: "Jeff Morales", profile_path: null },
      { id: 16851, name: "Jake Johnson", character: "Peter B. Parker", profile_path: null },
    ],
    crew: [
      { id: 2210720, name: "Joaquim Dos Santos", job: "Director", department: "Directing" },
      { id: 169187, name: "Kemp Powers", job: "Director", department: "Directing" },
    ],
    videos: [
      { id: "spider-verse-trailer", key: "cqGjhVJWtEg", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true },
    ],
    reviews: [
      demoReview(
        "spider-review",
        "Ari Collins",
        "Inventive, heartfelt, and visually fearless. Every frame feels handcrafted without losing sight of Miles as a person.",
        9,
      ),
    ],
    recommendation_ids: [693134, 545611, 299534],
  }),
  withGenres({
    id: 414906,
    media_type: "movie",
    title: "The Batman",
    tagline: "Unmask the truth.",
    overview:
      "In his second year of fighting crime, Batman uncovers corruption in Gotham City while pursuing a serial killer who targets the city's elite.",
    release_date: "2022-03-01",
    runtime: 176,
    genre_ids: [80, 9648, 53],
    vote_average: 7.7,
    vote_count: 10300,
    popularity: 86,
    poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    backdrop_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    original_language: "en",
    status: "Released",
    certification: "PG-13",
    cast: [
      { id: 11288, name: "Robert Pattinson", character: "Bruce Wayne", profile_path: null },
      { id: 37153, name: "Zoë Kravitz", character: "Selina Kyle", profile_path: null },
      { id: 5294, name: "Paul Dano", character: "The Riddler", profile_path: null },
    ],
    crew: [
      { id: 32278, name: "Matt Reeves", job: "Director", department: "Directing" },
      { id: 10225, name: "Michael Giacchino", job: "Original Music Composer", department: "Sound" },
    ],
    videos: [
      { id: "batman-trailer", key: "mqqft2x_Aa4", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true },
    ],
    reviews: [
      demoReview(
        "batman-review",
        "Leah Morgan",
        "A rain-soaked detective story with patient tension, striking photography, and a refreshingly focused point of view.",
        8,
      ),
    ],
    recommendation_ids: [155, 693134, 872585],
  }),
  withGenres({
    id: 361743,
    media_type: "movie",
    title: "Top Gun: Maverick",
    tagline: "Feel the need... the need for speed.",
    overview:
      "After decades as a test pilot, Maverick confronts his past while training an elite group of graduates for a mission unlike anything they have faced.",
    release_date: "2022-05-24",
    runtime: 131,
    genre_ids: [28, 18],
    vote_average: 8.2,
    vote_count: 9100,
    popularity: 82,
    poster_path: "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    backdrop_path: "/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg",
    original_language: "en",
    status: "Released",
    certification: "PG-13",
    cast: [
      { id: 500, name: "Tom Cruise", character: "Pete 'Maverick' Mitchell", profile_path: null },
      { id: 996701, name: "Miles Teller", character: "Bradley 'Rooster' Bradshaw", profile_path: null },
      { id: 10859, name: "Jennifer Connelly", character: "Penny Benjamin", profile_path: null },
    ],
    crew: [
      { id: 11694, name: "Joseph Kosinski", job: "Director", department: "Directing" },
    ],
    videos: [
      { id: "maverick-trailer", key: "qSqVVswa420", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true },
    ],
    reviews: [
      demoReview(
        "maverick-review",
        "Evan Brooks",
        "A muscular, sincere blockbuster whose practical aerial photography gives every set piece real momentum.",
        8,
      ),
    ],
    recommendation_ids: [693134, 414906, 872585],
  }),
  withGenres({
    id: 545611,
    media_type: "movie",
    title: "Everything Everywhere All at Once",
    tagline: "The universe is so much bigger than you realize.",
    overview:
      "An overwhelmed laundromat owner is swept into a wild adventure in which she alone can save existence by connecting with lives she could have led in other universes.",
    release_date: "2022-03-24",
    runtime: 140,
    genre_ids: [28, 12, 878, 35],
    vote_average: 7.8,
    vote_count: 6500,
    popularity: 79,
    poster_path: "/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    backdrop_path: "/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg",
    original_language: "en",
    status: "Released",
    certification: "R",
    cast: [
      { id: 1620, name: "Michelle Yeoh", character: "Evelyn Wang", profile_path: null },
      { id: 118131, name: "Ke Huy Quan", character: "Waymond Wang", profile_path: null },
      { id: 8944, name: "Jamie Lee Curtis", character: "Deirdre Beaubeirdre", profile_path: null },
    ],
    crew: [
      { id: 1383612, name: "Daniel Kwan", job: "Director", department: "Directing" },
      { id: 1383613, name: "Daniel Scheinert", job: "Director", department: "Directing" },
    ],
    videos: [
      { id: "eeaao-trailer", key: "wxN1T1uxQ2g", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true },
    ],
    reviews: [
      demoReview(
        "eeaao-review",
        "Samira Khan",
        "Playful and moving in equal measure, with maximalist imagination anchored by a tender family story.",
        9,
      ),
    ],
    recommendation_ids: [569094, 693134, 361743],
  }),
];

const shows = [
  withGenres({
    id: 95396,
    media_type: "tv",
    name: "Severance",
    tagline: "We are people, not parts of people.",
    overview:
      "Office workers whose memories have been surgically divided between work and personal lives begin a journey to discover the truth about their jobs and themselves.",
    first_air_date: "2022-02-17",
    episode_run_time: [50],
    number_of_seasons: 2,
    number_of_episodes: 19,
    genre_ids: [18, 9648, 10765],
    vote_average: 8.4,
    vote_count: 1600,
    popularity: 98,
    poster_path: "/pPHpeI2X1qEd1CS1SeyrdhZ4qnT.jpg",
    backdrop_path: "/9LUI9tAUSiJC3P7f7Yp3mQ8dXvw.jpg",
    original_language: "en",
    status: "Returning Series",
    certification: "TV-MA",
    seasons: [
      { id: 138385, name: "Season 1", season_number: 1, episode_count: 9, air_date: "2022-02-17", poster_path: null },
      { id: 412760, name: "Season 2", season_number: 2, episode_count: 10, air_date: "2025-01-16", poster_path: null },
    ],
    cast: [
      { id: 21007, name: "Adam Scott", character: "Mark Scout", profile_path: null },
      { id: 1920, name: "Britt Lower", character: "Helly Riggs", profile_path: null },
      { id: 4785, name: "Patricia Arquette", character: "Harmony Cobel", profile_path: null },
      { id: 4764, name: "John Turturro", character: "Irving Bailiff", profile_path: null },
    ],
    crew: [
      { id: 7399, name: "Ben Stiller", job: "Executive Producer", department: "Production" },
      { id: 1549365, name: "Dan Erickson", job: "Creator", department: "Writing" },
    ],
    videos: [
      { id: "severance-trailer", key: "xEQP4VVuyrY", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true },
    ],
    reviews: [
      demoReview(
        "severance-review",
        "Jordan Kim",
        "Meticulous production design and quietly escalating dread turn a workplace mystery into something deeply personal.",
        9,
      ),
    ],
    recommendation_ids: [100088, 66732, 95480],
  }),
  withGenres({
    id: 100088,
    media_type: "tv",
    name: "The Last of Us",
    tagline: "When you are lost in the darkness, look for the light.",
    overview:
      "Twenty years after civilization collapses, a hardened survivor is hired to escort a teenager across a dangerous and fractured America.",
    first_air_date: "2023-01-15",
    episode_run_time: [55],
    number_of_seasons: 2,
    number_of_episodes: 16,
    genre_ids: [18, 10759],
    vote_average: 8.6,
    vote_count: 5200,
    popularity: 95,
    poster_path: "/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    backdrop_path: "/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
    original_language: "en",
    status: "Returning Series",
    certification: "TV-MA",
    seasons: [
      { id: 144593, name: "Season 1", season_number: 1, episode_count: 9, air_date: "2023-01-15", poster_path: null },
      { id: 445020, name: "Season 2", season_number: 2, episode_count: 7, air_date: "2025-04-13", poster_path: null },
    ],
    cast: [
      { id: 1253360, name: "Pedro Pascal", character: "Joel Miller", profile_path: null },
      { id: 1306377, name: "Bella Ramsey", character: "Ellie Williams", profile_path: null },
      { id: 1498158, name: "Gabriel Luna", character: "Tommy Miller", profile_path: null },
    ],
    crew: [
      { id: 1223199, name: "Craig Mazin", job: "Creator", department: "Writing" },
      { id: 133590, name: "Neil Druckmann", job: "Creator", department: "Writing" },
    ],
    videos: [
      { id: "last-of-us-trailer", key: "uLtkt8BonwM", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true },
    ],
    reviews: [
      demoReview(
        "last-of-us-review",
        "Clara Owens",
        "A compassionate survival drama that makes its quiet character moments every bit as consequential as its set pieces.",
        9,
      ),
    ],
    recommendation_ids: [66732, 95396, 126308],
  }),
  withGenres({
    id: 66732,
    media_type: "tv",
    name: "Stranger Things",
    tagline: "Every ending has a beginning.",
    overview:
      "When a boy vanishes from a small town, his friends, family, and a determined police chief uncover secret experiments and a frightening supernatural mystery.",
    first_air_date: "2016-07-15",
    episode_run_time: [52],
    number_of_seasons: 4,
    number_of_episodes: 34,
    genre_ids: [18, 9648, 10765],
    vote_average: 8.6,
    vote_count: 18000,
    popularity: 91,
    poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdrop_path: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    original_language: "en",
    status: "Returning Series",
    certification: "TV-14",
    seasons: [
      { id: 77680, name: "Season 1", season_number: 1, episode_count: 8, air_date: "2016-07-15", poster_path: null },
      { id: 83248, name: "Season 2", season_number: 2, episode_count: 9, air_date: "2017-10-27", poster_path: null },
      { id: 92735, name: "Season 3", season_number: 3, episode_count: 8, air_date: "2019-07-04", poster_path: null },
      { id: 163313, name: "Season 4", season_number: 4, episode_count: 9, air_date: "2022-05-27", poster_path: null },
    ],
    cast: [
      { id: 1356210, name: "Millie Bobby Brown", character: "Eleven", profile_path: null },
      { id: 1591666, name: "Finn Wolfhard", character: "Mike Wheeler", profile_path: null },
      { id: 117642, name: "David Harbour", character: "Jim Hopper", profile_path: null },
    ],
    crew: [
      { id: 1218281, name: "Matt Duffer", job: "Creator", department: "Writing" },
      { id: 1218282, name: "Ross Duffer", job: "Creator", department: "Writing" },
    ],
    videos: [
      { id: "stranger-things-trailer", key: "b9EkMc79ZSU", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true },
    ],
    reviews: [
      demoReview(
        "stranger-review",
        "Priya Shah",
        "Warm friendships and an irresistible sense of discovery keep the supernatural adventure emotionally grounded.",
        8,
      ),
    ],
    recommendation_ids: [95396, 100088, 126308],
  }),
  withGenres({
    id: 126308,
    media_type: "tv",
    name: "Shōgun",
    tagline: "An epic saga of war, passion, and power.",
    overview:
      "In seventeenth-century Japan, a shipwrecked English navigator becomes entangled in a contest of loyalty and power as a lord fights for survival against formidable rivals.",
    first_air_date: "2024-02-27",
    episode_run_time: [60],
    number_of_seasons: 1,
    number_of_episodes: 10,
    genre_ids: [18, 10759],
    vote_average: 8.5,
    vote_count: 1200,
    popularity: 89,
    poster_path: "/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg",
    backdrop_path: "/8UOAYjhwSF3aPZhm6wgLuyHRyrR.jpg",
    original_language: "en",
    status: "Returning Series",
    certification: "TV-MA",
    seasons: [
      { id: 337179, name: "Season 1", season_number: 1, episode_count: 10, air_date: "2024-02-27", poster_path: null },
    ],
    cast: [
      { id: 72401, name: "Hiroyuki Sanada", character: "Yoshii Toranaga", profile_path: null },
      { id: 1531588, name: "Cosmo Jarvis", character: "John Blackthorne", profile_path: null },
      { id: 1449908, name: "Anna Sawai", character: "Toda Mariko", profile_path: null },
    ],
    crew: [
      { id: 58431, name: "Rachel Kondo", job: "Creator", department: "Writing" },
      { id: 1251402, name: "Justin Marks", job: "Creator", department: "Writing" },
    ],
    videos: [
      { id: "shogun-trailer", key: "yAN5uspO_hk", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true },
    ],
    reviews: [
      demoReview(
        "shogun-review",
        "Theo Wallace",
        "Richly textured and confident, with political tension carried through precise performances and beautiful visual storytelling.",
        9,
      ),
    ],
    recommendation_ids: [100088, 95480, 95396],
  }),
  withGenres({
    id: 136315,
    media_type: "tv",
    name: "The Bear",
    tagline: "Every second counts.",
    overview:
      "A gifted young chef returns home to run his family's sandwich shop, where he must balance grief, a resistant kitchen crew, and the pressure of building something better.",
    first_air_date: "2022-06-23",
    episode_run_time: [32],
    number_of_seasons: 3,
    number_of_episodes: 28,
    genre_ids: [18, 35],
    vote_average: 8.2,
    vote_count: 1100,
    popularity: 85,
    poster_path: "/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg",
    backdrop_path: "/m54TxdK4q2JdPoXbaPe87WKguyR.jpg",
    original_language: "en",
    status: "Returning Series",
    certification: "TV-MA",
    seasons: [
      { id: 205257, name: "Season 1", season_number: 1, episode_count: 8, air_date: "2022-06-23", poster_path: null },
      { id: 342533, name: "Season 2", season_number: 2, episode_count: 10, air_date: "2023-06-22", poster_path: null },
      { id: 387428, name: "Season 3", season_number: 3, episode_count: 10, air_date: "2024-06-26", poster_path: null },
    ],
    cast: [
      { id: 1373957, name: "Jeremy Allen White", character: "Carmen Berzatto", profile_path: null },
      { id: 1443740, name: "Ayo Edebiri", character: "Sydney Adamu", profile_path: null },
      { id: 1397778, name: "Ebon Moss-Bachrach", character: "Richard Jerimovich", profile_path: null },
    ],
    crew: [
      { id: 1219647, name: "Christopher Storer", job: "Creator", department: "Writing" },
    ],
    videos: [
      { id: "bear-trailer", key: "gBmkI4jlaIo", name: "Official Trailer", site: "YouTube", type: "Trailer", official: true },
    ],
    reviews: [
      demoReview(
        "bear-review",
        "Olivia Grant",
        "Funny, bruising, and unusually attentive to the way people communicate under pressure.",
        8,
      ),
    ],
    recommendation_ids: [95480, 95396, 126308],
  }),
  withGenres({
    id: 95480,
    media_type: "tv",
    name: "Slow Horses",
    tagline: "Old sins cast new shadows.",
    overview:
      "A dysfunctional team of British intelligence agents and their brilliant but irascible leader navigate the smoke and mirrors of espionage.",
    first_air_date: "2022-04-01",
    episode_run_time: [48],
    number_of_seasons: 4,
    number_of_episodes: 24,
    genre_ids: [80, 18],
    vote_average: 8.0,
    vote_count: 420,
    popularity: 80,
    poster_path: "/cvUV7tBqjLrLDjAapUXvABvMsjj.jpg",
    backdrop_path: "/5PCKxpFcCTDFT3b1olJGPaAIM9e.jpg",
    original_language: "en",
    status: "Returning Series",
    certification: "TV-MA",
    seasons: [
      { id: 191147, name: "Season 1", season_number: 1, episode_count: 6, air_date: "2022-04-01", poster_path: null },
      { id: 307514, name: "Season 2", season_number: 2, episode_count: 6, air_date: "2022-12-02", poster_path: null },
      { id: 363793, name: "Season 3", season_number: 3, episode_count: 6, air_date: "2023-11-29", poster_path: null },
      { id: 405699, name: "Season 4", season_number: 4, episode_count: 6, air_date: "2024-09-04", poster_path: null },
    ],
    cast: [
      { id: 64, name: "Gary Oldman", character: "Jackson Lamb", profile_path: null },
      { id: 1215280, name: "Jack Lowden", character: "River Cartwright", profile_path: null },
      { id: 1038, name: "Kristin Scott Thomas", character: "Diana Taverner", profile_path: null },
    ],
    crew: [
      { id: 122667, name: "Will Smith", job: "Executive Producer", department: "Production" },
    ],
    videos: [],
    reviews: [
      demoReview(
        "slow-horses-review",
        "Daniel Price",
        "Sharp dialogue, lived-in characters, and wonderfully unglamorous tradecraft make this spy drama sing.",
        8,
      ),
    ],
    recommendation_ids: [95396, 126308, 136315],
  }),
];

const episode = (showId, season, number, name, overview, runtime, airDate) => ({
  id: Number(`${showId}${season}${String(number).padStart(2, "0")}`),
  show_id: showId,
  season_number: season,
  episode_number: number,
  name,
  overview,
  runtime,
  air_date: airDate,
  still_path: null,
  vote_average: 8,
});

const episodes = {
  "95396:1": [
    episode(95396, 1, 1, "Good News About Hell", "Mark is promoted to lead a team whose carefully separated lives conceal a much larger mystery.", 57, "2022-02-17"),
    episode(95396, 1, 2, "Half Loop", "The team welcomes a new colleague while Mark tests the boundaries of Lumon's rules.", 54, "2022-02-24"),
    episode(95396, 1, 3, "In Perpetuity", "A visit to the perpetuity wing raises unsettling questions about the company and its history.", 56, "2022-03-03"),
  ],
  "95396:2": [
    episode(95396, 2, 1, "Hello, Ms. Cobel", "The innies return to a changed floor and learn that their choices have reshaped Lumon.", 52, "2025-01-16"),
    episode(95396, 2, 2, "Goodbye, Mrs. Selvig", "Outies and innies search for answers on opposite sides of the severed floor.", 47, "2025-01-23"),
  ],
  "100088:1": [
    episode(100088, 1, 1, "When You're Lost in the Darkness", "A hardened survivor is given a mission that could change everything.", 81, "2023-01-15"),
    episode(100088, 1, 2, "Infected", "Joel, Tess, and Ellie cross a ruined city while danger closes in around them.", 53, "2023-01-22"),
    episode(100088, 1, 3, "Long, Long Time", "A chance encounter grows into a life built amid the collapse of the old world.", 76, "2023-01-29"),
  ],
  "100088:2": [
    episode(100088, 2, 1, "Future Days", "Five years later, Joel and Ellie face new tensions as winter settles over Jackson.", 60, "2025-04-13"),
    episode(100088, 2, 2, "Through the Valley", "A gathering threat forces Jackson to defend the life its people have built.", 57, "2025-04-20"),
  ],
  "66732:1": [
    episode(66732, 1, 1, "The Vanishing of Will Byers", "A quiet town is shaken by a disappearance and the arrival of a mysterious girl.", 49, "2016-07-15"),
    episode(66732, 1, 2, "The Weirdo on Maple Street", "The search widens as the children hide their unexpected new friend.", 56, "2016-07-15"),
  ],
  "126308:1": [
    episode(126308, 1, 1, "Anjin", "A foreign ship and its pilot upset a precarious balance of power in Osaka.", 70, "2024-02-27"),
    episode(126308, 1, 2, "Servants of Two Masters", "Toranaga weighs a dangerous alliance while Blackthorne tries to understand his captors.", 59, "2024-02-27"),
  ],
  "136315:1": [
    episode(136315, 1, 1, "System", "Carmy returns to Chicago and discovers a kitchen held together by habit, loyalty, and debt.", 27, "2022-06-23"),
    episode(136315, 1, 2, "Hands", "A new brigade structure tests the patience of the entire staff.", 31, "2022-06-23"),
  ],
  "95480:1": [
    episode(95480, 1, 1, "Failure's Contagious", "A routine surveillance mistake sends River Cartwright into the orbit of Slough House.", 54, "2022-04-01"),
    episode(95480, 1, 2, "Work Drinks", "The slow horses chase a lead while Jackson Lamb tests their resolve.", 50, "2022-04-08"),
  ],
};

export const DEMO_GENRES = Object.freeze({
  movie: movieGenres,
  tv: tvGenres,
});

export const DEMO_CATALOG = Object.freeze({
  movies,
  shows,
  all: [...movies, ...shows],
});

export const DEMO_EPISODES = Object.freeze(episodes);
