import { defineConfig } from 'vite';
import path from 'node:path'; // Corrected import for path

export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/Components'), // Corrected alias path
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.razorpay.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
