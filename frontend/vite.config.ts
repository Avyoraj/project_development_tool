import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Fallback environment variable definition
    'import.meta.env.VITE_API_URL': JSON.stringify('/api'),
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['lucide-react', '@dnd-kit/core', '@dnd-kit/sortable']
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://project-development-tool-zqt3.onrender.com',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
