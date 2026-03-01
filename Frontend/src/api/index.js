// All API calls go through here. Vite proxies /api → http://localhost:5000
// so no CORS config needed during development.

const BASE = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options)
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`)
  return res.json()
}

export const api = {
  satellites: {
    list:  ()  => request('/satellites'),
    stats: ()  => request('/satellites/stats'),
  },
  alerts: {
    list:        ()  => request('/alerts'),
    acknowledge: (id) => request(`/alerts/${id}/acknowledge`, { method: 'PATCH' }),
  },
  contacts: {
    list: () => request('/contacts'),
  },
}
