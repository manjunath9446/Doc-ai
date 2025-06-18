// vite.config.js
import { defineConfig, loadEnv } from 'vite'; // 1. Import loadEnv
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This is the new, manual way to load environment variables
export default defineConfig(({ mode }) => {
  // 2. Load env file based on the current mode (e.g., 'development')
  //    It looks for .env.local in the specified directory (process.cwd())
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // 3. This 'define' block is the key.
    //    It finds all occurrences of the key in your code (import.meta.env.VITE_...)
    //    and replaces it with the value we loaded from the file.
    define: {
      'import.meta.env.VITE_CLERK_PUBLISHABLE_KEY': JSON.stringify(env.VITE_CLERK_PUBLISHABLE_KEY),
    },
  };
});