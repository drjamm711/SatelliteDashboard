import AlertsPanel from '../components/AlertsPanel'

export default function Alerts({ alerts, acknowledgeAlert }) {
  return <AlertsPanel alerts={alerts} acknowledgeAlert={acknowledgeAlert} />
}
