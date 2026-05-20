import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative asset URLs so the built site works from Live Server (serves /dist) and static hosts
  base: './',
})
