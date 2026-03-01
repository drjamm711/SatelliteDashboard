import { useState } from 'react'
import { RuxInput, RuxSelect, RuxOption, RuxCheckbox, RuxButton, RuxTextarea } from '@astrouxds/react'

export default function Settings({ classification, setClassification, addendum, setAddendum }) {
  const [apiUrl,     setApiUrl]     = useState('http://localhost:5000')
  const [callsign,   setCallsign]   = useState('')
  const [autoRefresh,setAutoRefresh]= useState(true)
  const [audio,      setAudio]      = useState(false)
  const [saved,      setSaved]      = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Settings</span>
      </div>
      <div className="panel-body">
        <div className="settings-form">
          <RuxInput
            label="API Endpoint"
            value={apiUrl}
            helpText="ASP.NET backend base URL — restart dev server after changing"
            onRuxinput={e => setApiUrl(e.target.value)}
          />
          <RuxInput
            label="Operator Callsign"
            placeholder="e.g. ALPHA-1"
            value={callsign}
            onRuxinput={e => setCallsign(e.target.value)}
          />
          <RuxSelect label="Theme">
            <RuxOption value="dark"  label="Dark (Default)" />
            <RuxOption value="light" label="Light"          />
          </RuxSelect>
          <RuxSelect label="Refresh Interval">
            <RuxOption value="30"  label="30 seconds" />
            <RuxOption value="60"  label="1 minute"   />
            <RuxOption value="300" label="5 minutes"  />
          </RuxSelect>
          <RuxSelect
            label="Classification Marking"
            value={classification}
            onRuxchange={e => setClassification(e.target.value)}
          >
            <RuxOption value="unclassified"   label="Unclassified" />
            <RuxOption value="controlled"     label="Controlled" />
            <RuxOption value="cui"            label="CUI" />
            <RuxOption value="confidential"   label="Confidential" />
            <RuxOption value="secret"         label="Secret" />
            <RuxOption value="top-secret"     label="Top Secret" />
            <RuxOption value="top-secret-sci" label="Top Secret//SCI" />
          </RuxSelect>
          <RuxInput
            label="Classification Addendum"
            placeholder="e.g. NOFORN // REL TO USA // etc."
            value={addendum}
            onRuxinput={e => setAddendum(e.target.value)}
          >
          </RuxInput>
          <RuxCheckbox checked={autoRefresh} onRuxchange={e => setAutoRefresh(e.target.checked)}>
            Auto-refresh satellite data
          </RuxCheckbox>
          <RuxCheckbox checked={audio} onRuxchange={e => setAudio(e.target.checked)}>
            Enable audio alerts
          </RuxCheckbox>
          <div>
            <RuxButton onClick={handleSave} icon={saved ? 'check' : undefined}>
              {saved ? 'Saved!' : 'Save Settings'}
            </RuxButton>
          </div>
        </div>
      </div>
    </div>
  )
}
