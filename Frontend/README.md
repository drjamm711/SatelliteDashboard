# Space Ops Dashboard — Vite + React Frontend

## Stack
- **Vite 5** — dev server + build tool
- **React 18** — UI framework  
- **React Router 6** — client-side routing
- **@astrouxds/react** — official React wrappers for Astro UXDS web components

## Getting Started

```bash
npm install
npm run dev        # → http://localhost:3000
```

The Vite dev server automatically proxies `/api/*` → `http://localhost:5000` (the ASP.NET backend).  
If the backend isn't running, the app falls back to built-in mock data automatically.

## Project Structure

```
src/
├── api/
│   ├── index.js          ← All fetch calls in one place
│   └── mockData.js       ← Fallback data when backend is offline
├── hooks/
│   ├── useSpaceData.js   ← Fetches satellites, alerts, contacts, stats
│   └── useClock.js       ← Live UTC clock
├── components/
│   ├── GlobalStatusBar.jsx  ← Top bar (rux-global-status-bar)
│   ├── Sidebar.jsx          ← Nav with React Router NavLink
│   ├── StatCards.jsx        ← 4-up summary cards
│   ├── SatelliteTable.jsx   ← Sortable/filterable data table
│   ├── AlertsPanel.jsx      ← Alert list with acknowledge action
│   ├── ContactsPanel.jsx    ← Ground contact windows
│   └── ControlsDemo.jsx     ← Astro UXDS component showcase
├── pages/
│   ├── Dashboard.jsx     ← Composes all panels
│   ├── Satellites.jsx    ← Full-page satellite table
│   ├── Contacts.jsx      ← Full-page contact list
│   ├── Alerts.jsx        ← Full-page alerts
│   └── Settings.jsx      ← App settings form
├── App.jsx               ← Router + layout shell
├── main.jsx              ← Entry point, registers Astro UXDS
├── index.css             ← Global styles + Astro UXDS token imports
└── utils.js              ← relativeTime, batteryColor, status helpers
```

## Changing the API URL

Edit `vite.config.js`:
```js
proxy: {
  '/api': {
    target: 'http://localhost:5000',  // ← change this
  }
}
```

## Build for Production

```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build locally
```

The `dist/` folder can be served as static files from ASP.NET's `wwwroot` or any CDN.

## Adding a New Page

1. Create `src/pages/MyPage.jsx`
2. Add a route in `src/App.jsx`
3. Add a nav entry in `src/components/Sidebar.jsx`
