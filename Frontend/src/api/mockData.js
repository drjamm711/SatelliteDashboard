const t = (offsetMs) => new Date(Date.now() + offsetMs).toISOString()

export const mockSatellites = [
  { id: 1,  name: 'AEHF-1',      status: 'Active',   orbit: 'GEO', latitude: 0.0,  longitude: -130.0, altitude: 35786, signal: 'Strong',   batteryLevel: 92, lastContact: t(-3*60000) },
  { id: 2,  name: 'AEHF-2',      status: 'Active',   orbit: 'GEO', latitude: 0.0,  longitude: -105.0, altitude: 35786, signal: 'Strong',   batteryLevel: 88, lastContact: t(-60000) },
  { id: 3,  name: 'WGS-11',      status: 'Active',   orbit: 'GEO', latitude: 0.0,  longitude:  172.0, altitude: 35786, signal: 'Moderate', batteryLevel: 76, lastContact: t(-7*60000) },
  { id: 4,  name: 'GPS-IIF-3',   status: 'Active',   orbit: 'MEO', latitude: 32.1, longitude:  -67.4, altitude: 20200, signal: 'Strong',   batteryLevel: 95, lastContact: t(-2*60000) },
  { id: 5,  name: 'GPS-IIF-7',   status: 'Active',   orbit: 'MEO', latitude:-15.3, longitude:  120.8, altitude: 20200, signal: 'Strong',   batteryLevel: 91, lastContact: t(-4*60000) },
  { id: 6,  name: 'MUOS-5',      status: 'Degraded', orbit: 'GEO', latitude: 0.0,  longitude:   75.0, altitude: 35786, signal: 'Weak',     batteryLevel: 43, lastContact: t(-22*60000) },
  { id: 7,  name: 'WGS-9',       status: 'Active',   orbit: 'GEO', latitude: 0.0,  longitude:  -11.5, altitude: 35786, signal: 'Strong',   batteryLevel: 82, lastContact: t(-6*60000) },
  { id: 8,  name: 'SBIRS-GEO-1', status: 'Active',   orbit: 'GEO', latitude: 0.0,  longitude: -135.0, altitude: 35786, signal: 'Strong',   batteryLevel: 89, lastContact: t(-5*60000) },
  { id: 9,  name: 'NROL-44',     status: 'Offline',  orbit: 'LEO', latitude: 51.6, longitude:   22.3, altitude:   550, signal: 'None',     batteryLevel: 12, lastContact: t(-3*3600000) },
  { id: 10, name: 'CERES-1',     status: 'Active',   orbit: 'LEO', latitude:-45.2, longitude:   88.7, altitude:   620, signal: 'Moderate', batteryLevel: 68, lastContact: t(-9*60000) },
]

export const mockAlerts = [
  { id: 1, severity: 'critical', message: 'MUOS-5 battery below 50% threshold',           source: 'MUOS-5',    timestamp: t(-22*60000),    acknowledged: false },
  { id: 2, severity: 'serious',  message: 'NROL-44 telemetry link lost',                   source: 'NROL-44',   timestamp: t(-3*3600000),   acknowledged: false },
  { id: 3, severity: 'caution',  message: 'WGS-11 signal degraded — atmospheric scatter',  source: 'WGS-11',    timestamp: t(-45*60000),    acknowledged: false },
  { id: 4, severity: 'normal',   message: 'GPS-IIF-3 orbit adjustment complete',            source: 'GPS-IIF-3', timestamp: t(-3600000),     acknowledged: true  },
  { id: 5, severity: 'caution',  message: 'Scheduled maintenance window in 2 hours',        source: 'AEHF-1',    timestamp: t(-10*60000),    acknowledged: true  },
]

export const mockContacts = [
  { id: 1, satellite: 'AEHF-1',     groundStation: 'Schriever AFB',  startTime: t(-15*60000),  endTime: t(45*60000),   status: 'Active'   },
  { id: 2, satellite: 'GPS-IIF-7',  groundStation: 'Vandenberg SFB', startTime: t(10*60000),   endTime: t(60*60000),   status: 'Upcoming' },
  { id: 3, satellite: 'WGS-9',      groundStation: 'Kapaun AS',      startTime: t(30*60000),   endTime: t(90*60000),   status: 'Upcoming' },
  { id: 4, satellite: 'AEHF-2',     groundStation: 'Schriever AFB',  startTime: t(-2*3600000), endTime: t(-3600000),   status: 'Complete' },
  { id: 5, satellite: 'SBIRS-GEO-1',groundStation: 'Buckley SFB',    startTime: t(2*3600000),  endTime: t(3*3600000),  status: 'Upcoming' },
]

export const mockStats = {
  totalSatellites: 10,
  activeSatellites: 8,
  alertCount: 2,
  contactsToday: 14,
}
