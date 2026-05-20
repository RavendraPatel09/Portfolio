import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    modulePreload: false,
  },
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    port: 5501,
    open: true,
  },
})
