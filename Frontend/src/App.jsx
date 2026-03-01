import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSpaceData }  from './hooks/useSpaceData'
import GlobalStatusBar   from './components/GlobalStatusBar'
import Sidebar           from './components/Sidebar'
import Dashboard         from './pages/Dashboard'
import Satellites        from './pages/Satellites'
import Contacts          from './pages/Contacts'
import Alerts            from './pages/Alerts'
import Settings          from './pages/Settings'
import { RuxClassificationMarking } from '@astrouxds/react'

export default function App() {
  const { satellites, alerts, contacts, stats, loading, apiMode, acknowledgeAlert } = useSpaceData()
  const unackedCount = alerts.filter(a => !a.acknowledged).length

  const [classification, setClassification] = useState(() => localStorage.getItem('classification') || 'Unclassified')
  const [addendum, setAddendum] = useState(() => localStorage.getItem('addendum') || '')

  useEffect(() => {
    localStorage.setItem('classification', classification)
  }, [classification])

  useEffect(() => {
    localStorage.setItem('addendum', addendum)
  }, [addendum])

  return (
    <div className="app-shell">
      {/* top classification marking */}
      <div>
        <RuxClassificationMarking classification={classification} label={` ${addendum}`} />
      </div>

      <GlobalStatusBar alertCount={unackedCount} apiMode={apiMode} />

      {!apiMode && !loading && (
        <div className="demo-banner">
          <code style={{ fontFamily: 'Roboto Mono, monospace', marginLeft: 4 }}>
            http://localhost:3000
          </code>
          &nbsp;
        </div>
      )}

      <div className="app-body">
        <Sidebar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={
              <Dashboard
                stats={stats}
                satellites={satellites}
                alerts={alerts}
                contacts={contacts}
                acknowledgeAlert={acknowledgeAlert}
              />
            } />
            <Route path="/satellites" element={<Satellites satellites={satellites} />} />
            <Route path="/contacts"   element={<Contacts   contacts={contacts} />} />
            <Route path="/alerts"     element={<Alerts     alerts={alerts} acknowledgeAlert={acknowledgeAlert} />} />
            <Route
              path="/settings"
              element={
                <Settings
                  classification={classification}
                  addendum={addendum}
                  setClassification={setClassification}
                  setAddendum={setAddendum}
                />
              }
            />
          </Routes>
        </main>
      </div>

      {/* bottom classification marking */}
      <div>
        <RuxClassificationMarking classification={classification} label={` ${addendum}`} />
      </div>
    </div>
  )
}
