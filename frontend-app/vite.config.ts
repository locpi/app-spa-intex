// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const defaultConfig = {
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
}

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  if (isDev) {
    return {
      ...defaultConfig,
      server: {
        proxy: {
          '/api': 'http://127.0.0.1:3000'
        }
      }
    }
  } else {
    return defaultConfig
  }
})