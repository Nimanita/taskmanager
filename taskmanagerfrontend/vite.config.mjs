// https://github.com/vitejs/vite/discussions/3448
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log("viete", env.VITE_APP_API_URL)
  return {
    plugins: [react(), jsconfigPaths()],
    base: '/',
    define: {
      global: 'window'
    },
    resolve: {
      alias: [
        {
          find: /^~(.+)/,
          replacement: path.join(process.cwd(), 'node_modules/$1')
        },
        {
          find: /^src(.+)/,
          replacement: path.join(process.cwd(), 'src/$1')
        }
      ]
    },
    server: {
      open: true,
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_APP_API_URL || 'https://taskmanager-abcd7.onrender.com',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    preview: {
      open: true,
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_APP_API_URL || 'https://taskmanager-abcd7.onrender.com',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      },
      sourcemap: env.GENERATE_SOURCEMAP === 'true',
    }
  }
});