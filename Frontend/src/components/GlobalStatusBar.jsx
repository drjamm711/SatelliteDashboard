import { RuxGlobalStatusBar, RuxClock, RuxIcon } from '@astrouxds/react'
import { useClock } from '../hooks/useClock'

export default function GlobalStatusBar({ alertCount, apiMode }) {
  const { time, date } = useClock()

  return (
    <RuxGlobalStatusBar appName="Space Operations Center" version="4.2.1">
      <div slot="right-side" style={{ display: 'flex', alignItems: 'center', gap: 20, paddingRight: 12 }}>
        <div style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 13, color: 'var(--color-text-secondary)' }}>
          <span style={{ marginRight: 12 }}>{date}</span>
          <span>{time}</span>
        </div>
        {alertCount > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#ff3838' }}>
            <RuxIcon icon="notification-important" size="extra-small" />
            {alertCount} alert{alertCount !== 1 ? 's' : ''}
          </div>
        )}
        <div style={{ fontSize: 11, color: apiMode ? '#56f000' : '#fce83a' }}>
          {apiMode ? '● LIVE' : '● DEMO'}
        </div>
      </div>
    </RuxGlobalStatusBar>
  )
}
