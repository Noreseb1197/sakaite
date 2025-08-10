import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
            tailwindcss()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    build: {
      rollupOptions:{
          input: {
              main: resolve(__dirname, 'index.html'),
              admin: resolve(__dirname, 'admin/index.html')
          },
          output: {
              // Ensures assets are placed in the correct subdirectory
              entryFileNames: (chunkInfo) => {
                  return chunkInfo.name === 'admin' ? `admin/[name]-[hash].js` : '[name]-[hash].js';
              }
          }

      }
    }
})