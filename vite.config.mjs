import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Vite is used by Vitest, Ladle, and Preview.js.

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
})
