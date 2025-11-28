import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Prevent "process is not defined" error in browser
      'process.env': {},
      // Explicitly define the API key so it's statically replaced at build time
      // This serves as a robust fallback if import.meta.env fails at runtime
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY)
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});