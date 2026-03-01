import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // All /api/* calls forwarded to the ASP.NET backend — no CORS needed
      '/api': {
            target: 'http://localhost:59607',
        changeOrigin: true,
      },
    },
  },
})
