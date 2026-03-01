import React from 'react'
import ReactDOM from 'react-dom/client'
import HashRouter from 'react-router-dom'
import { applyPolyfills, defineCustomElements } from '@astrouxds/astro-web-components/loader'
import App from './App'
import './index.css'

// Register Astro UXDS web components
applyPolyfills().then(() => defineCustomElements())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
