import { useState, useEffect, useCallback } from 'react'
import { api } from '../api'
import { mockSatellites, mockAlerts, mockContacts, mockStats } from '../api/mockData'

export function useSpaceData() {
  const [satellites, setSatellites] = useState(mockSatellites)
  const [alerts, setAlerts]         = useState(mockAlerts)
  const [contacts, setContacts]     = useState(mockContacts)
  const [stats, setStats]           = useState(mockStats)
  const [loading, setLoading]       = useState(true)
  const [apiMode, setApiMode]       = useState(false)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [sats, alts, cons, sts] = await Promise.all([
          api.satellites.list(),
          api.alerts.list(),
          api.contacts.list(),
          api.satellites.stats(),
        ])
        setSatellites(sats)
        setAlerts(alts)
        setContacts(cons)
        setStats(sts)
        setApiMode(true)
      } catch {
        // Backend not running — mock data already set above, that's fine
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const acknowledgeAlert = useCallback(async (id) => {
    if (apiMode) {
      try { await api.alerts.acknowledge(id) } catch {}
    }
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a))
  }, [apiMode])

  return { satellites, alerts, contacts, stats, loading, apiMode, acknowledgeAlert }
}
