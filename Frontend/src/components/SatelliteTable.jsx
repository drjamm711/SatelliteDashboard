import { useState } from 'react'
import { RuxInput, RuxSelect, RuxOption, RuxStatus } from '@astrouxds/react'
import { relativeTime, batteryColor, statusToRux, signalToRux } from '../utils'

const COLS = [
  { key: 'name',         label: 'Satellite'      },
  { key: 'status',       label: 'Status'         },
  { key: 'orbit',        label: 'Orbit'          },
  { key: 'altitude',     label: 'Altitude (km)'  },
  { key: 'signal',       label: 'Signal'         },
  { key: 'batteryLevel', label: 'Battery'        },
  { key: 'lastContact',  label: 'Last Contact'   },
]

export default function SatelliteTable({ satellites }) {
  const [filter, setFilter]       = useState('All')
  const [search, setSearch]       = useState('')
  const [sortKey, setSortKey]     = useState('name')
  const [sortDir, setSortDir]     = useState('asc')

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const filtered = satellites
    .filter(s => (filter === 'All' || s.status === filter) &&
                 s.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey]
      const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv))
      return sortDir === 'asc' ? cmp : -cmp
    })

  const sortIndicator = (key) => sortKey === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Satellite Status</span>
        <div className="panel-actions">
          <RuxInput
            placeholder="Search…"
            size="small"
            value={search}
            onRuxinput={e => setSearch(e.target.value)}
            style={{ width: 160 }}
          />
          <RuxSelect
            size="small"
            value={filter}
            onRuxchange={e => setFilter(e.target.value)}
            style={{ width: 130 }}
          >
            {['All', 'Active', 'Degraded', 'Offline'].map(o => (
              <RuxOption key={o} value={o} label={o} />
            ))}
          </RuxSelect>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              {COLS.map(col => (
                <th key={col.key} onClick={() => handleSort(col.key)}>
                  {col.label}{sortIndicator(col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(sat => (
              <tr key={sat.id}>
                <td style={{ fontWeight: 500 }}>{sat.name}</td>
                <td>
                  <div className="status-cell">
                    <RuxStatus status={statusToRux(sat.status)} />
                    {sat.status}
                  </div>
                </td>
                <td>
                  <span style={{
                    padding: '2px 7px', borderRadius: 2, fontSize: 11, fontWeight: 500,
                    background: 'rgba(77,172,255,0.12)', color: '#4dacff',
                    border: '1px solid rgba(77,172,255,0.3)',
                  }}>
                    {sat.orbit}
                  </span>
                </td>
                <td className="mono">{sat.altitude.toLocaleString()}</td>
                <td>
                  <div className="status-cell">
                    <RuxStatus status={signalToRux(sat.signal)} />
                    {sat.signal}
                  </div>
                </td>
                <td>
                  <div className="battery-wrap">
                    <div className="battery-track">
                      <div className="battery-fill" style={{
                        width: `${sat.batteryLevel}%`,
                        background: batteryColor(sat.batteryLevel),
                      }} />
                    </div>
                    <span className="battery-pct">{sat.batteryLevel}%</span>
                  </div>
                </td>
                <td className="c-muted" style={{ fontSize: 12 }}>
                  {relativeTime(sat.lastContact)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: 32, textAlign: 'center', color: 'var(--color-text-secondary)' }}>
          No satellites match the current filters.
        </div>
      )}
    </div>
  )
}
