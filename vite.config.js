// vite.config.js
// -----------------------------------------------------------------------------
// Vite configuration for Rails + Vite integration
// Handles dev server, alias paths, and HMR (Hot Module Replacement) setup.
// -----------------------------------------------------------------------------

import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  // Serve all assets under /vite to align with Rails' vite_rails integration
  base: '/vite',

  // Define the root directory for Vite entrypoints
  root: path.resolve(__dirname, 'app/frontend'),

  server: {
    host: 'localhost',
    port: 3036,
    strictPort: true,

    // Enable reliable WebSocket HMR connection
    hmr: { host: 'localhost', port: 3036, protocol: 'ws', path: '/vite' }
  },

  // Simplify imports using @ as an alias for app/frontend
  resolve: {
    alias: { '@': path.resolve(__dirname, 'app/frontend') }
  }
})
