import { useState, useEffect } from 'react'
import {
  RuxButton, RuxInput, RuxSelect, RuxOption, RuxTextarea,
  RuxCheckbox, RuxSwitch, RuxSlider, RuxProgress,
  RuxTabs, RuxTab, RuxTabPanels, RuxTabPanel,
  RuxStatus, RuxMonitoringIcon, RuxPushButton,
  RuxNotification, RuxTag,
} from '@astrouxds/react'

export default function ControlsDemo() {
  const [sliderVal, setSliderVal] = useState(65)
  const [switchOn,  setSwitchOn]  = useState(true)
  const [pushBtn,   setPushBtn]   = useState(false)
  const [selectVal, setSelectVal] = useState('auto')
  const [checkA,    setCheckA]    = useState(true)
  const [checkB,    setCheckB]    = useState(false)
  const [progress,  setProgress]  = useState(72)
  const [toast,     setToast]     = useState(false)

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(false), 3000)
    return () => clearTimeout(id)
  }, [toast])

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Controls &amp; Component Showcase</span>
      </div>

      <div className="panel-body controls-section">

        {/* ── Buttons ── */}
        <div>
          <div className="controls-label">Buttons</div>
          <div className="controls-row">
            <RuxButton>Primary</RuxButton>
            <RuxButton secondary>Secondary</RuxButton>
            <RuxButton tertiary>Tertiary</RuxButton>
            <RuxButton icon="satellite-transmit">With Icon</RuxButton>
            <RuxButton disabled>Disabled</RuxButton>
            <RuxButton size="small">Small</RuxButton>
            <RuxButton size="large">Large</RuxButton>
            <RuxPushButton
              checked={pushBtn}
              icon={pushBtn ? 'lock-open' : 'lock'}
              onRuxchange={e => setPushBtn(e.target.checked)}
            >
              {pushBtn ? 'Unlocked' : 'Locked'}
            </RuxPushButton>
          </div>
        </div>

        {/* ── Form Controls ── */}
        <div>
          <div className="controls-label">Form Controls</div>
          <div className="controls-grid controls-grid-3">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <RuxInput label="Satellite ID" placeholder="e.g. AEHF-1" />
              <RuxInput label="Frequency (MHz)" type="number" placeholder="437.5" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <RuxSelect
                label="Operating Mode"
                value={selectVal}
                onRuxchange={e => setSelectVal(e.target.value)}
              >
                <RuxOption value="auto"   label="Automatic" />
                <RuxOption value="manual" label="Manual"    />
                <RuxOption value="safe"   label="Safe Mode" />
              </RuxSelect>
              <RuxTextarea label="Operator Notes" placeholder="Enter notes…" rows={2} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <RuxCheckbox checked={checkA} onRuxchange={e => setCheckA(e.target.checked)}>
                Telemetry enabled
              </RuxCheckbox>
              <RuxCheckbox checked={checkB} onRuxchange={e => setCheckB(e.target.checked)}>
                Record to archive
              </RuxCheckbox>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <RuxSwitch checked={switchOn} onRuxchange={e => setSwitchOn(e.target.checked)} />
                <span style={{ fontSize: 13 }}>
                  Antenna: <strong>{switchOn ? 'ACTIVE' : 'STANDBY'}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Sliders & Progress ── */}
        <div>
          <div className="controls-label">Sliders &amp; Progress</div>
          <div className="controls-grid controls-grid-2">
            <RuxSlider
              label={`Transmit Power: ${sliderVal}%`}
              min={0} max={100}
              value={sliderVal}
              onRuxinput={e => setSliderVal(e.target.value)}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span>Signal Processing</span>
                <span className="mono">{progress}%</span>
              </div>
              <RuxProgress value={progress} max={100} />
              <div style={{ display: 'flex', gap: 8 }}>
                <RuxButton size="small" secondary onClick={() => setProgress(p => Math.max(0,   p - 10))}>−10%</RuxButton>
                <RuxButton size="small" secondary onClick={() => setProgress(p => Math.min(100, p + 10))}>+10%</RuxButton>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tags ── */}
        <div>
          <div className="controls-label">Tags</div>
          <div className="controls-row">
            {['GEO', 'MEO', 'LEO', 'HEO', 'SSO'].map(tag => (
              <RuxTag key={tag}>{tag}</RuxTag>
            ))}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div>
          <div className="controls-label">Tabs</div>
          <RuxTabs id="demo-tabs">
            <RuxTab id="tab-telem">Telemetry</RuxTab>
            <RuxTab id="tab-cmd">Commands</RuxTab>
            <RuxTab id="tab-log">System Log</RuxTab>
          </RuxTabs>
          <RuxTabPanels aria-labelledby="demo-tabs">
            <RuxTabPanel aria-labelledby="tab-telem">
              <div className="panel-body c-muted" style={{ fontSize: 13 }}>
                Telemetry feed active — receiving 128 kbps downlink from AEHF-1.
                Next downlink window opens in 14 minutes. All subsystems nominal.
              </div>
            </RuxTabPanel>
            <RuxTabPanel aria-labelledby="tab-cmd">
              <div className="panel-body c-muted" style={{ fontSize: 13 }}>
                Command queue: 3 pending · 12 executed today. Uplink lock confirmed on S-band.
              </div>
            </RuxTabPanel>
            <RuxTabPanel aria-labelledby="tab-log">
              <div className="panel-body c-muted" style={{ fontSize: 13 }}>
                System log initialized. No anomalies detected in last 24 hours.
                Housekeeping data received on schedule.
              </div>
            </RuxTabPanel>
          </RuxTabPanels>
        </div>

        {/* ── Status indicators ── */}
        <div>
          <div className="controls-label">Status Indicators</div>
          <div className="controls-row">
            {['off', 'standby', 'normal', 'caution', 'serious', 'critical'].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                <RuxStatus status={s} />
                <span style={{ textTransform: 'capitalize' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Monitoring icons ── */}
        <div>
          <div className="controls-label">Monitoring Icons</div>
          <div className="monitoring-grid">
            <RuxMonitoringIcon icon="satellite-transmit" label="AEHF-1"     status="normal"   />
            <RuxMonitoringIcon icon="satellite-transmit" label="MUOS-5"     status="caution"  />
            <RuxMonitoringIcon icon="satellite-transmit" label="NROL-44"    status="critical" />
            <RuxMonitoringIcon icon="antenna-receive"    label="Schriever"  status="normal"   />
            <RuxMonitoringIcon icon="antenna-receive"    label="Vandenberg" status="standby"  />
          </div>
        </div>

        {/* ── Notification ── */}
        <div>
          <div className="controls-label">Notification</div>
          <RuxButton onClick={() => setToast(true)} secondary icon="notification-important">
            Trigger Toast
          </RuxButton>
        </div>

      </div>

      {toast && (
        <div className="toast-wrap">
          <RuxNotification
            open
            message="Command transmitted successfully to AEHF-1."
            status="normal"
            closeAfter={3000}
            onRuxclosed={() => setToast(false)}
          />
        </div>
      )}
    </div>
  )
}
