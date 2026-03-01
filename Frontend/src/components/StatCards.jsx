export default function StatCards({ stats }) {
  const cards = [
    { label: 'Total Satellites', value: stats.totalSatellites, color: 'c-blue',   sub: 'Tracked in constellation' },
    { label: 'Active',           value: stats.activeSatellites,color: 'c-green',  sub: 'Nominal operations' },
    { label: 'Active Alerts',    value: stats.alertCount,      color: 'c-red',    sub: 'Require attention' },
    { label: 'Contacts Today',   value: stats.contactsToday,   color: 'c-yellow', sub: 'Ground passes completed' },
  ]

  return (
    <div className="stats-grid">
      {cards.map(c => (
        <div className="stat-card" key={c.label}>
          <div className="stat-label">{c.label}</div>
          <div className={`stat-value ${c.color}`}>{c.value}</div>
          <div className="stat-sub">{c.sub}</div>
        </div>
      ))}
    </div>
  )
}
