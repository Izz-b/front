import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    
    host: '0.0.0.0', // Listens on all network interfaces
  port: 3000, // This will make the server accessible on the network
    // You can specify a port if you want
  },
});
