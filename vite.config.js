import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // keeps your relative asset paths
  build: {
    chunkSizeWarningLimit: 2000 // size in kB, so this is 2 MB
  }
})
