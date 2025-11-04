import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Usa variable de entorno para el backend
const backendUrl = process.env.VITE_API_URL || 'http://localhost:8000';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    cors: true,
    proxy: {
      '/api': backendUrl,
    }
  },
  preview: {
    host: '0.0.0.0',
    cors: true,
    proxy: {
      '/api': backendUrl,
    }
  }
})
