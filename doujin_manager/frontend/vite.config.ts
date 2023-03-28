import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].bundle.js`,
        chunkFileNames: `[name].bundle.js`,
        assetFileNames: `[name].[ext]`,
      },
    },
    outDir: '../homepage/static/homepage'
  },
})
