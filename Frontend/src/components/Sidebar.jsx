import { NavLink } from 'react-router-dom'
import { RuxIcon } from '@astrouxds/react'

const NAV_ITEMS = [
  { to: '/',           icon: 'apps',               label: 'Dashboard'  },
  { to: '/satellites', icon: 'satellite-transmit', label: 'Satellites' },
  { to: '/contacts',   icon: 'antenna-receive',    label: 'Contacts'   },
  { to: '/alerts',     icon: 'warning',            label: 'Alerts'     },
  { to: '/settings',   icon: 'settings',           label: 'Settings'   },
]

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-section-label">Navigation</div>
      {NAV_ITEMS.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
        >
          <RuxIcon icon={icon} size="small" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
