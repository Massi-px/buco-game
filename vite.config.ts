import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Map React Native imports to react-native-web when running in the browser
      'react-native': 'react-native-web',
      // Optional: keep absolute-like imports if you use them elsewhere
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
