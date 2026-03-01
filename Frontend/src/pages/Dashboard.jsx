import StatCards    from '../components/StatCards'
import SatelliteTable from '../components/SatelliteTable'
import AlertsPanel  from '../components/AlertsPanel'
import ContactsPanel from '../components/ContactsPanel'
import ControlsDemo from '../components/ControlsDemo'

export default function Dashboard({ stats, satellites, alerts, contacts, acknowledgeAlert }) {
  return (
    <>
      <StatCards stats={stats} />
      <SatelliteTable satellites={satellites} />
      <div className="two-col">
        <AlertsPanel alerts={alerts} acknowledgeAlert={acknowledgeAlert} />
        <ContactsPanel contacts={contacts} />
      </div>
      <ControlsDemo />
    </>
  )
}
