# SpaceDashboard

A simple space‑operations dashboard demonstrating a full‑stack ASP.NET Core 8 backend with a React/Vite frontend using Astro UXDS components. The repo contains two independent projects that communicate over HTTP and can be run locally for development or deployed separately.

---

## Repository layout

```
SpaceDashboard.Api.sln           ← solution file (opens both projects)

Backend/                         ← ASP.NET Core minimal API
Frontend/                        ← Vite + React application
```

Both projects are intentionally kept minimal to serve as a learning/demo starting point.

---

## Getting started

### 1. Backend

```powershell
cd Backend
dotnet run
```

The API listens on `http://localhost:5000` (and https on 5001). Swagger documentation is available at `http://localhost:5000/swagger`.

Endpoints:

- `GET /api/satellites`
- `GET /api/satellites/stats`
- `GET /api/alerts`
- `PATCH /api/alerts/{id}/acknowledge`
- `GET /api/contacts`

See `Backend/README.md` for more details on development and extension.

### 2. Frontend

```bash
cd Frontend
npm install
npm run dev
```

The app runs at `http://localhost:3000`. The Vite dev server proxies `/api` to the backend, so the dashboard works out of the box. If the backend is not running the UI switches to demo mode using mock data.

Refer to `Frontend/README.md` for configuration, building, and adding new pages.

---
