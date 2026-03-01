# Backend - Space Operations Dashboard

This folder contains the ASP.NET Core 8 backend for the Space Operations Dashboard. It exposes a minimal API with three controllers that return in‑memory data. The frontend (under `../Frontend`) consumes the same endpoints.

## What’s here

```
Backend/
├── SpaceDashboard.Api.csproj      # .NET project file targeting net8.0
├── Program.cs                    # Minimal API startup
├── Models/                       # Simple DTOs used by the controllers
│   └── Models.cs
└── Controllers/                  # HTTP endpoints
    ├── SatellitesController.cs   → GET /api/satellites, GET /api/satellites/stats
    ├── AlertsController.cs       → GET /api/alerts, PATCH /api/alerts/{id}/acknowledge
    └── ContactsController.cs     → GET /api/contacts
```

All data is defined in static lists within the controllers. You can replace those with a database or other service as needed.

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download) installed on your machine
- (Optional) Visual Studio 2022/2023 or `dotnet` CLI for development

## Running the backend

Open a terminal at `Backend` and run:

```bash
dotnet run
```

By default the app listens on `http://localhost:5000` and `https://localhost:5001`. Swagger/OpenAPI is available at `http://localhost:5000/swagger`.

### API endpoints

| Method | Path                          | Description                         |
|--------|-------------------------------|-------------------------------------|
| GET    | `/api/satellites`            | All satellites with health/status   |
| GET    | `/api/satellites/stats`      | Summary statistics for dashboard    |
| GET    | `/api/alerts`                | Current system alerts               |
| PATCH  | `/api/alerts/{id}/acknowledge` | Acknowledge an alert               |
| GET    | `/api/contacts`              | Upcoming contact windows            |

Use `curl` or a browser to hit these endpoints while the server is running.

## Developing & Extending

- **Add data sources**: replace the in‑memory lists or wire up Entity Framework Core.
- **Authentication**: plug in ASP.NET Identity, JWT bearer, or another scheme.
- **Logging/Telemetry**: configure ESL or Application Insights in `Program.cs`.

The frontend is configured to call `http://localhost:5000/api` by default; adjust the base URL in `../Frontend/api/index.js` if you change the backend port.

## Docker

A containerized backend can be built using the included `Dockerfile`:

```bash
# from repo root
docker build -t satellite-backend:latest -f Backend/Dockerfile Backend
```

Once built it listens on port 80 inside the image. Run with:

```bash
docker run --rm -p 5000:80 satellite-backend:latest
```

Or start both services together via `docker-compose`:

```bash
docker compose up --build
```

The compose file maps `backend` to host port 5000 and `frontend` to port 3000.

---
