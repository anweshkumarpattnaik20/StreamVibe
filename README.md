# 🎬 StreamVibe

<div align="center">

### Discover. Explore. Watch.

**A modern, cinematic movie & TV discovery platform built for an immersive browsing experience.**

StreamVibe combines a polished streaming-inspired interface with powerful discovery features, detailed movie and TV information, intelligent search, and a persistent personal watchlist.

<br />

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)
![TMDB](https://img.shields.io/badge/TMDB-API-01B4E4?style=for-the-badge\&logo=themoviedatabase\&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Ready-000000?style=for-the-badge\&logo=vercel\&logoColor=white)

<br />

**Responsive • Accessible • Fast • Cinematic**

</div>

---

## ✨ About StreamVibe

**StreamVibe** is a modern movie and television discovery web application designed to provide a premium, streaming-platform-inspired browsing experience.

Users can discover movies and TV shows, search across entertainment content, explore detailed information about titles, browse seasons and episodes, view cast and crew information, discover recommendations, and maintain their own watchlist.

The application is also designed to remain fully usable without external API credentials.

If TMDB credentials aren't configured, StreamVibe automatically switches to a **curated demo catalog**, preventing broken pages or empty interfaces during development and evaluation.

---

## 🚀 Features

| Feature               | Description                                                            |
| --------------------- | ---------------------------------------------------------------------- |
| 🎬 Movie Discovery    | Browse movies through a cinematic and responsive interface             |
| 📺 TV Series          | Discover television series and explore their seasons                   |
| 🔍 Smart Search       | Search titles, genres, cast members, and descriptions                  |
| 🎭 Detailed Pages     | View cast, crew, genres, ratings, reviews, and metadata                |
| ▶️ Trailers           | Explore available trailers and related media                           |
| 📚 Seasons & Episodes | Navigate television seasons and episode information                    |
| ❤️ Watchlist          | Save favorite movies and shows directly in the browser                 |
| 🎯 Recommendations    | Discover related movies and television series                          |
| 🎨 Responsive UI      | Optimized for desktop, tablet, and mobile devices                      |
| ♿ Accessibility       | Keyboard navigation, focus states, dialogs, and reduced-motion support |
| ⚡ Code Splitting      | Route-level loading helps improve application performance              |
| 🖼️ Artwork Fallbacks | Graceful handling of unavailable posters and backdrops                 |
| 🛟 Support Flow       | Secure support form with optional backend integration                  |
| 📴 Demo Mode          | Works even without TMDB API credentials                                |

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **Vite**
* **Tailwind CSS**
* **JavaScript / JSX**
* **HTML5**
* **CSS3**

### APIs & Data

* **TMDB API**
* Curated fallback catalog for demo mode
* Browser Local Storage for watchlist persistence

### Development & Deployment

* **ESLint**
* **npm**
* **Git & GitHub**
* **Vercel**

---

## 🏗️ Project Architecture

```text
StreamVibe/
│
├── public/
│   └── ...
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── hooks/
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

> The exact structure may evolve as StreamVibe grows.

---

## 💻 Getting Started

### Prerequisites

Before running StreamVibe locally, make sure you have:

* **Node.js 20.19+**
* **Node.js 22.12+ recommended**
* **npm**
* **Git**

Check your installed versions:

```bash
node --version
npm --version
git --version
```

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/anweshkumarpattnaik20/StreamVibe.git
```

### 2. Enter the project

```bash
cd StreamVibe
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create your environment file

```bash
cp .env.example .env
```

### 5. Start the development server

```bash
npm run dev
```

Open the local URL displayed by Vite in your terminal.

Usually:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root.

```env
VITE_TMDB_API_KEY=
VITE_TMDB_BEARER=
VITE_SUPPORT_ENDPOINT=
```

### TMDB Configuration

You can configure either:

```env
VITE_TMDB_API_KEY=your_api_key
```

or:

```env
VITE_TMDB_BEARER=your_bearer_token
```

StreamVibe uses these credentials to retrieve live movie and television information.

If neither credential is provided, the application automatically switches to its built-in **demo catalog**.

> ⚠️ Never commit your real `.env` file or API credentials to GitHub.

---

## 🎞️ TMDB Integration

StreamVibe can retrieve live entertainment information from **The Movie Database (TMDB)**.

Live data can include:

* Movies
* Television shows
* Posters
* Backdrops
* Genres
* Ratings
* Cast
* Crew
* Seasons
* Episodes
* Reviews
* Recommendations
* Trailers

Create your TMDB API credentials from the official TMDB developer settings.

---

## ❤️ Persistent Watchlist

StreamVibe includes a browser-based watchlist system.

Users can:

* Add movies and TV shows
* Remove saved titles
* Return to saved content later
* Maintain the watchlist across browser sessions

Watchlist information is stored locally in the user's browser.

This means no account or external database is required for the basic watchlist experience.

---

## 🛟 Support Form

The support system is designed with privacy and safe defaults in mind.

When:

```env
VITE_SUPPORT_ENDPOINT=
```

is empty, StreamVibe:

1. Validates the user's input
2. Creates a local preview
3. Does **not** transmit personal information

If you want to connect the form to a backend service, configure:

```env
VITE_SUPPORT_ENDPOINT=https://your-secure-endpoint.com/api/support
```

The endpoint should:

* Use **HTTPS**
* Accept **JSON**
* Validate incoming data
* Apply appropriate security protections

---

## ♿ Accessibility

Accessibility is treated as a core part of the StreamVibe experience.

The interface includes support for:

* Keyboard navigation
* Visible focus states
* Accessible dialogs
* Semantic UI structure
* Reduced-motion preferences
* Responsive interaction patterns
* Graceful content fallbacks

---

## ⚡ Performance

StreamVibe uses several techniques to maintain a fast browsing experience.

### Route-Level Code Splitting

Pages can be loaded only when required, reducing unnecessary initial JavaScript.

### Resilient Artwork

Unavailable artwork is handled gracefully instead of leaving broken image elements.

### Optimized Production Build

Vite generates optimized production assets for deployment.

---

## 🧪 Quality Checks

Run the project's complete quality checks with:

```bash
npm run check
```

This performs the configured lint and production-build validation.

You can also run individual commands when available:

```bash
npm run lint
npm run build
```

---

## 👀 Preview Production Build

After creating a production build:

```bash
npm run build
```

Preview it locally with:

```bash
npm run preview
```

This allows you to test the production version before deployment.

---

## 🌐 Deployment

StreamVibe is configured for deployment on **Vercel**.

The included:

```text
vercel.json
```

provides the required SPA routing configuration.

### Deployment Process

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Deploy the project.

Add production environment variables through your hosting provider rather than uploading your local `.env` file.

---

## 🔒 Security

Sensitive credentials should never be committed to the repository.

Your `.gitignore` should contain:

```gitignore
.env
.env.local
.env.production
.env.development
```

The repository should contain only:

```text
.env.example
```

with empty placeholder values.

Example:

```env
VITE_TMDB_API_KEY=
VITE_TMDB_BEARER=
VITE_SUPPORT_ENDPOINT=
```

---

## 🗺️ Future Improvements

StreamVibe can be expanded with features such as:

* 🔐 User authentication
* ☁️ Cloud-synced watchlists
* ⭐ User ratings
* 💬 User reviews
* 🤖 AI-powered movie recommendations
* 🎯 Personalized discovery
* 🔔 New-release notifications
* 📺 Streaming-provider availability
* 🌎 Multi-language support
* 🌓 Advanced theme customization
* 📱 Progressive Web App support
* 👤 User profiles
* 📊 Viewing statistics
* 🔥 Trending analytics

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

To contribute:

```bash
git clone https://github.com/anweshkumarpattnaik20/StreamVibe.git
cd StreamVibe

git checkout -b feature/your-feature
```

After making your changes:

```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/your-feature
```

Then open a Pull Request on GitHub.

---

## 📊 Project Status

```text
Status: Active Development
Version: 1.0
Platform: Web
Frontend: React + Vite
Styling: Tailwind CSS
Data: TMDB API + Demo Catalog
Deployment: Vercel Ready
```

---

## 🎯 Project Goals

StreamVibe was designed around four principles:

**Cinematic Experience**
Create an interface that feels closer to a premium entertainment platform than a traditional database application.

**Fast Discovery**
Help users quickly move from browsing to finding relevant movies and television shows.

**Resilience**
Ensure the application remains functional even when external credentials or artwork are unavailable.

**Accessibility**
Build navigation and interaction patterns that work for a broader range of users and devices.

---

## 🙋‍♂️ Author

### Anwesh Kumar Pattnaik

Frontend Developer passionate about creating modern, responsive, accessible, and visually engaging web applications.

**GitHub:** [@anweshkumarpattnaik20](https://github.com/anweshkumarpattnaik20)

---

## 🙏 Acknowledgements

Movie and television metadata is provided through **The Movie Database (TMDB)**.

> This product uses the TMDB API but is not endorsed or certified by TMDB.

---

<div align="center">

### ⭐ Like StreamVibe?

If you find the project useful or interesting, consider giving the repository a **star ⭐**.

<br />

**Built with ❤️ using React, Vite & Tailwind CSS**

<br />

### 🎬 StreamVibe

**Your next story starts here.**

</div>
