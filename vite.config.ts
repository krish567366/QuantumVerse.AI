import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/QuantumVerse.AI/',
  plugins: [react(), glsl()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});