import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Define Vite configuration using defineConfig function
export default defineConfig({
  // Use the Vite plugin for React
  plugins: [react()],
  // Configure the development server
  server: {
    // Set the port to 3000
    port: 3000,
    // Open the browser automatically when the server starts
    open: true,
    // Proxy requests to /graphql to the specified target
    proxy: {
      '/graphql': {
        // Target URL for the proxy
        target: 'http://localhost:3001',
        // Disable certificate validation for HTTPS targets
        secure: false,
        // Change the origin of the request to the proxy's origin
        changeOrigin: true
      }
    }
  },
  // Configure testing settings
  test: {
    // Enable global variables in tests
    globals: true,
    // Use the 'happy-dom' environment for testing
    environment: 'happy-dom'
  }
})
