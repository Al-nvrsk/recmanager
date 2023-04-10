import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from 'path';

export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_URL__: `'${process.env.SERVER_URL}'`,
    __IS_DEV__: Boolean(`'${process.env.NODE_ENV}'`),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
});
