import { RuxStatus, RuxButton, RuxIcon } from '@astrouxds/react'
import { relativeTime } from '../utils'

export default function AlertsPanel({ alerts, acknowledgeAlert }) {
  const unacked = alerts.filter(a => !a.acknowledged)
  const acked   = alerts.filter(a =>  a.acknowledged)

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Alerts</span>
        <RuxIcon icon="warning" size="extra-small" />
      </div>
      <div>
        {[...unacked, ...acked].map(alert => (
          <div key={alert.id} className={`alert-row${alert.acknowledged ? ' acked' : ''}`}>
            <RuxStatus status={alert.severity} />
            <div className="alert-content">
              <div className="alert-message">{alert.message}</div>
              <div className="alert-meta">
                {alert.source} &nbsp;·&nbsp; {relativeTime(alert.timestamp)}
              </div>
            </div>
            {!alert.acknowledged && (
              <RuxButton size="small" secondary onClick={() => acknowledgeAlert(alert.id)}>
                Ack
              </RuxButton>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
