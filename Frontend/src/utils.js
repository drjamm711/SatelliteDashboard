export function relativeTime(isoString) {
  const diff = (Date.now() - new Date(isoString)) / 1000
  if (diff < 60)   return `${Math.round(diff)}s ago`
  if (diff < 3600) return `${Math.round(diff / 60)}m ago`
  return `${Math.round(diff / 3600)}h ago`
}

export function batteryColor(pct) {
  if (pct >= 70) return '#56f000'
  if (pct >= 40) return '#fce83a'
  return '#ff3838'
}

export function statusToRux(status) {
  // Maps satellite status string → Astro UXDS rux-status status prop
  const map = { Active: 'normal', Degraded: 'caution', Offline: 'critical' }
  return map[status] ?? 'off'
}

export function signalToRux(signal) {
  const map = { Strong: 'normal', Moderate: 'caution', Weak: 'serious', None: 'critical' }
  return map[signal] ?? 'off'
}

export function contactStatusToRux(status) {
  const map = { Active: 'normal', Upcoming: 'standby', Complete: 'off' }
  return map[status] ?? 'off'
}

export function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })
}
