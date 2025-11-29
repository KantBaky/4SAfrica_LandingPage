import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import runtimeErrorModal from '@replit/vite-plugin-runtime-error-modal';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(async () => {
  const plugins = [
    react(),
    runtimeErrorModal(),
  ];

  // Only load cartographer in non-production repl environment
  if (process.env.NODE_ENV !== 'production' && process.env.REPL_ID) {
    const { cartographer } = await import('@replit/vite-plugin-cartographer');
    plugins.push(cartographer());
  }

  return {
    plugins,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'client', 'src'),
        '@shared': resolve(__dirname, 'shared'),
        '@assets': resolve(__dirname, 'attached_assets'),
      },
    },
    root: resolve(__dirname, 'client'),
    build: {
      outDir: resolve(__dirname, 'dist/public'),
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ['**/.*'],
      },
    },
    publicDir: 'public',
  };
});
