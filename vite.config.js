// ========================================
// Vite Configuration
// ========================================
// Production-ready setup for Rails + Vite integration

import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  // Base path for asset serving (aligns with vite_rails gem)
  base: '/vite',

  // Root directory containing frontend entrypoints
  root: path.resolve(__dirname, 'app/frontend'),

  // Custom app type (no index.html, Rails handles views)
  appType: 'custom',

  // Development server configuration
  server: {
    host: 'localhost',
    port: 3036,
    strictPort: false, // safer on Windows — avoids "connection lost" when port is busy

    // Hot Module Replacement (HMR) settings
    hmr: {
      host: 'localhost',
      port: 3036,
      protocol: 'ws',
      path: '/vite'
    },

    // Ensures reliable file watching on Windows / WSL
    watch: {
      usePolling: true,
      interval: 300
    }
  },

  // CSS processing configuration
  css: {
    postcss: true,
    preprocessorOptions: {
      scss: {
        // Modern Dart Sass API (avoids legacy warnings)
        api: 'modern-compiler',
        // Suppress known deprecation warnings
        silenceDeprecations: ['import', 'color-functions', 'global-builtin'],
      },
    },
  },

  // Dependency optimization for faster dev server startup
  optimizeDeps: {
    // You can safely remove '@hotwired/turbo' if Turbo is handled via Importmap
    include: ['bootstrap']
  },

  // Path aliases for cleaner imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app/frontend')
    }
  }
})
