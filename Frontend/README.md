# Frontend – Space Ops Dashboard (Vite + React)

The frontend is a standard Vite-powered React application that communicates with the ASP.NET backend at `/api`. If the backend is not accessible, it automatically displays example data and shows a banner indicating **Demo Mode**.

## Stack 
- **Vite 5** – dev server, HMR, build tool
- **React 18** – UI framework
- **React Router 6** – client-side routing
- **@astrouxds/react** – official React wrappers for Astro UXDS web components

## Quick Start 

```bash
cd Frontend
npm install
npm run dev        # → http://localhost:3000
```

While running the dev server, requests to `/api/*` are proxied to `http://localhost:5000` (see `vite.config.js`).

The app uses `src/hooks/useSpaceData.js` to fetch satellites, alerts, contacts, and stats. If the HTTP requests fail (backend down), it keeps the built‑in `mockData` and sets `apiMode=false` which triggers the yellow demo banner.

## Project Layout 

```
src/
├── api/
│   ├── index.js          ← centralized fetch logic
│   └── mockData.js       ← fallback data when backend is offline
├── hooks/
│   ├── useSpaceData.js   ← data loader with API/demo mode logic
│   └── useClock.js       ← live UTC clock
├── components/           ← reusable UI pieces
│   ├── GlobalStatusBar.jsx
│   ├── Sidebar.jsx
│   ├── StatCards.jsx
│   ├── SatelliteTable.jsx
│   ├── AlertsPanel.jsx
│   ├── ContactsPanel.jsx
│   └── ControlsDemo.jsx
├── pages/                ← top‑level route components
│   ├── Dashboard.jsx
│   ├── Satellites.jsx
│   ├── Contacts.jsx
│   ├── Alerts.jsx
│   └── Settings.jsx
├── App.jsx               ← router & layout shell
├── main.jsx              ← entry point, registers Astro UXDS tokens
├── index.css             ← global styles + token imports
└── utils.js              ← helpers (relativeTime, batteryColor, etc.)
```

## Configuring the API Base URL

The Vite proxy is set in `vite.config.js`:
```js
proxy: {
  '/api': {
    target: 'http://localhost:5000',  // change when backend moves
  }
}
```

For production builds you can instead configure `BASE_URL` at runtime or adjust the proxy to point to your deployed API; the code always prefixes fetches with `/api`.

## Building for Production 

```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build locally
```

Serve the contents of `dist/` as static files from `wwwroot` (ASP.NET) or any static file server.

## Docker

A production container is built in two stages: first produce the static bundle, then serve it with nginx. A `Dockerfile` is provided at the project root.

```bash
# from repo root
docker build -t satellite-frontend:latest -f Frontend/Dockerfile Frontend
```

Run the resulting image to expose the app on port 80:

```bash
docker run --rm -p 3000:80 satellite-frontend:latest
```

To start both services together, use the repository‑level `docker-compose.yml`:

```bash
docker compose up --build
```

The frontend container will be reachable at `http://localhost:3000` and proxies `/api` to the backend service on the compose network.

## Adding a New Page 
1. Add a new component in `src/pages/MyPage.jsx`.
2. Register the route inside `src/App.jsx`.
3. Add a navigation link in `src/components/Sidebar.jsx`.

---