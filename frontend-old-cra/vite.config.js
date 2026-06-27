import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [react()],
  build: {
    outDir: '../dist', // build into /dist at project root
    emptyOutDir: true
  } 
})
