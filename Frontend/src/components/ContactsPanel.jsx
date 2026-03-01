import { RuxStatus, RuxIcon } from '@astrouxds/react'
import { contactStatusToRux, formatTime } from '../utils'

export default function ContactsPanel({ contacts }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Contact Windows</span>
        <RuxIcon icon="antenna-receive" size="extra-small" />
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Satellite</th>
            <th>Ground Station</th>
            <th>AOS (UTC)</th>
            <th>LOS (UTC)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c.id}>
              <td style={{ fontWeight: 500 }}>{c.satellite}</td>
              <td>{c.groundStation}</td>
              <td className="mono">{formatTime(c.startTime)}</td>
              <td className="mono">{formatTime(c.endTime)}</td>
              <td>
                <div className="status-cell">
                  <RuxStatus status={contactStatusToRux(c.status)} />
                  {c.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
