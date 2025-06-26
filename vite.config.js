import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [react(),tailwindcss()],
  server: {
    host: true, // or use '0.0.0.0'
    port: 5173, // you can change this if needed
  },
});
