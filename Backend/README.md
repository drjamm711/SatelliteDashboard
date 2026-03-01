# Space Operations Dashboard
**ASP.NET Core 8 backend + React + Astro UXDS frontend**

A space-domain operations dashboard built with:
- **Backend:** ASP.NET Core 8 Minimal API (C#) serving satellite, alert, and contact-window data
- **Frontend:** React 18 (via CDN) with Astro UXDS web components — no build step required

---

## Project Structure

```
SpaceDashboard/
├── Backend/
│   ├── SpaceDashboard.Api.csproj
│   ├── Program.cs
│   ├── Models/
│   │   └── Models.cs
│   └── Controllers/
│       ├── SatellitesController.cs   → GET /api/satellites, GET /api/satellites/stats
│       ├── AlertsController.cs       → GET /api/alerts, PATCH /api/alerts/{id}/acknowledge
│       └── ContactsController.cs     → GET /api/contacts
└── Frontend/
    └── index.html                    ← entire frontend in one file
```

---

## Running the Backend

```bash
cd Backend
dotnet run
# API will be at http://localhost:5000
```

Swagger UI available at: http://localhost:5000/swagger

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/satellites | All satellites + status |
| GET    | /api/satellites/stats | Dashboard statistics |
| GET    | /api/alerts | System alerts |
| PATCH  | /api/alerts/{id}/acknowledge | Acknowledge an alert |
| GET    | /api/contacts | Contact windows |

---

## Running the Frontend

Simply open `Frontend/index.html` in a browser — no npm, no build step needed.

The frontend will:
1. Attempt to connect to `http://localhost:5000/api` (the ASP.NET backend)
2. If the backend is unavailable, automatically fall back to built-in mock data
3. Show a yellow banner indicating demo/live mode

### To serve with a local server (optional, avoids CORS on some browsers):
```bash
cd Frontend
npx serve .
# or
python3 -m http.server 3000
```

---

## Astro UXDS Components Used

| Component | Usage |
|-----------|-------|
| `rux-global-status-bar` | Top application bar |
| `rux-clock` | Live UTC clock |
| `rux-classification-marking` | UNCLASSIFIED banner |
| `rux-monitoring-icon` | Satellite health icons |
| `rux-status` | Status dot indicators (off/standby/normal/caution/serious/critical) |
| `rux-badge` | Alert count badge |
| `rux-button` | Primary/secondary/tertiary/icon buttons |
| `rux-push-button` | Toggle lock button |
| `rux-input` | Text and number inputs |
| `rux-select` + `rux-option` | Dropdowns |
| `rux-checkbox` | Checkboxes |
| `rux-switch` | Toggle switch |
| `rux-slider` | Transmit power slider |
| `rux-progress` | Signal processing progress bar |
| `rux-tabs` + `rux-tab` + `rux-tab-panel` | Tabbed content |
| `rux-textarea` | Multi-line input |
| `rux-notification` | Toast notifications |
| `rux-tag` | Orbit type labels |
| `rux-icon` | Icon elements |

---

## Extending the App

- **Add more data:** Extend the `_satellites` list in `SatellitesController.cs` or hook up a real database via Entity Framework Core
- **Add auth:** Integrate ASP.NET Identity or JWT bearer tokens
- **Build step:** For production, swap the CDN React/Babel for a Vite or CRA build, and install `@astrouxds/react` from npm
