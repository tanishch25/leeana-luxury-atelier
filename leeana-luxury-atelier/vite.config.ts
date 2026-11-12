import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const base = process.env.BASE_PATH || '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'rewrite-assets-base',
      transform(code, id) {
        if (id.includes('src') && (id.endsWith('.tsx') || id.endsWith('.ts'))) {
          const targetBase = base.endsWith('/') ? base : base + '/'
          return {
            code: code.replace(/(['"])\/assets\//g, `$1${targetBase}assets/`),
            map: null
          }
        }
      }
    }
  ],
  server: {
    host: true,
    allowedHosts: true,
  },
  preview: {
    host: true,
    allowedHosts: true,
  }
})
