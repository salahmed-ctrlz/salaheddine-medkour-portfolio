import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/salaheddine-medkour-portfolio/",

  optimizeDeps: {
    exclude: ['lucide-react']
  },
});
