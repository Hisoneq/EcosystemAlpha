import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/EcosystemAlpha/',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  root: '.',
  publicDir: 'public'
})