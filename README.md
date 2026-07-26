# 🎬 YouTube Video Search App

A full-stack application that allows users to search for YouTube videos and view detailed statistics for any selected video — all powered by the official **YouTube Data API v3**.

---

## ✨ Features

- 🔍 **Video Search** — Search YouTube by keyword and browse results with thumbnails, channel names, and descriptions.
- 📊 **Video Detail Page** — Click any result to view a detailed summary including:
  - Title & Channel
  - Full description
  - View count, like count, and duration
- 🔀 **Client-side Routing** — Seamless navigation between the search page and individual video detail pages via React Router.
- 🌐 **Secure API Proxy** — The YouTube API key is never exposed to the browser; all calls are proxied through the NestJS backend.

---

## 🏗️ Architecture

```
┌───────────────────────────────────┐
│           React Frontend           │
│  (Vite + TypeScript + CSS Modules) │
│                                   │
│  /           → Search Page        │
│  /video/:id  → Video Summary Page │
└──────────────┬────────────────────┘
               │ HTTP (Axios) → localhost:3000
               ▼
┌───────────────────────────────────┐
│          NestJS Backend            │
│      (TypeScript + Express)        │
│                                   │
│  GET /youtube/search-videos?term= │
│  GET /youtube/:id/summary         │
└──────────────┬────────────────────┘
               │ HTTPS
               ▼
       YouTube Data API v3
```

---

## 🛠️ Tech Stack

### Backend

| Technology | Role |
|---|---|
| [NestJS v11](https://nestjs.com/) | REST API framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe language |
| [@nestjs/axios](https://docs.nestjs.com/techniques/http-module) | HTTP client (RxJS-based) |
| [@nestjs/config](https://docs.nestjs.com/techniques/configuration) | Environment variable management |
| [class-validator](https://github.com/typestack/class-validator) | DTO input validation |
| [class-transformer](https://github.com/typestack/class-transformer) | DTO serialization |
| [Jest](https://jestjs.io/) | Unit & E2E testing |
| [Prettier / ESLint](https://prettier.io/) | Code formatting & linting |

### Frontend

| Technology | Role |
|---|---|
| [React 19](https://react.dev/) | UI library |
| [Vite 7](https://vitejs.dev/) | Build tool & dev server |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe language |
| [React Router v7](https://reactrouter.com/) | Client-side routing |
| [Axios](https://axios-http.com/) | HTTP client |
| [CSS Modules](https://github.com/css-modules/css-modules) | Scoped component styling |

---

## 📁 Project Structure

```
Youtube-Api/
├── backend/                  # NestJS API server
│   └── src/
│       ├── config/
│       │   └── youtube.config.ts     # Loads env vars for YouTube API
│       ├── dto/
│       │   ├── search-query.dto.ts   # Validates incoming search query
│       │   ├── search-video.dto.ts   # Shape of a search result item
│       │   └── video-summary.dto.ts  # Shape of a video detail response
│       ├── youtube/
│       │   ├── youtube.controller.ts # Defines API routes
│       │   ├── youtube.module.ts     # NestJS module wiring
│       │   └── youtube.service.ts    # Business logic & YouTube API calls
│       ├── app.module.ts             # Root NestJS module
│       └── main.ts                   # Entry point (port 3000, CORS enabled)
│
└── frontend/                 # React + Vite client
    └── src/
        ├── api/
        │   └── youtube.api.ts        # Axios calls to the backend
        ├── components/
        │   ├── search.bar.tsx        # Search input component
        │   ├── video.list.tsx        # Grid of search result cards
        │   └── video.summary.tsx     # Individual video detail page
        ├── hooks/
        │   └── use.youtube.api.ts    # Custom hook for API state management
        ├── styles/                   # CSS Module files per component
        └── App.tsx                   # Root component with routing
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- A **YouTube Data API v3** key ([Get one here](https://console.cloud.google.com/))

---

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/Youtube-Api.git
cd Youtube-Api
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
YOUTUBE_BASE_URL=https://www.googleapis.com/youtube/v3/search?part=snippet&q=
YOUTUBE_VIDEO_URL=https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=
YOUTUBE_KEY=your_youtube_api_key_here
```

Start the backend dev server:

```bash
npm run start:dev
```

The API will be available at **http://localhost:3000**.

---

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/youtube/search-videos?term={query}` | Search YouTube videos by keyword |
| `GET` | `/youtube/:id/summary` | Get statistics and details for a video by ID |

### Example Response — Search

```json
[
  {
    "id": "dQw4w9WgXcQ",
    "name": "Rick Astley - Never Gonna Give You Up",
    "fullName": "Rick Astley",
    "description": "The official video for ...",
    "thumbnail": "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg"
  }
]
```

### Example Response — Video Summary

```json
{
  "id": "dQw4w9WgXcQ",
  "title": "Rick Astley - Never Gonna Give You Up",
  "channelTitle": "Rick Astley",
  "description": "The official video...",
  "viewCount": 1400000000,
  "likeCount": 16000000,
  "duration": "PT3M33S"
}
```

---

## 🧪 Running Tests

```bash
# Unit tests
cd backend
npm run test

# Test coverage
npm run test:cov

# End-to-end tests
npm run test:e2e
```

---

## 📝 License

This project is **UNLICENSED** and intended for personal/educational use.
