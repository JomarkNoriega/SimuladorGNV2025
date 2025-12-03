import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ajusta 'base' si lo vas a publicar en GitHub Pages: '/NOMBRE_DEL_REPO/'
export default defineConfig({
  plugins: [react()],
  // base: '/SimuladorGNV20251/',
})
