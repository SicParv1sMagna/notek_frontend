import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://github.com/SicParv1sMagna/notek_frontend/tree/Design",
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    }
  }
})
