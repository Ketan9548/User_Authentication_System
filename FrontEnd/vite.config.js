import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server:{
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://localhost:6000',
        changeOrigin: true,
      },
    },
  }
})
