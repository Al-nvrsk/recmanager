import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from 'path';
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_URL__: `'${process.env.SERVER_URL}'`,
    __IS_DEV__: Boolean(`'${process.env.NODE_ENV}'`),
    __S3_KEY_ID__: `'${process.env.ACCESS_KEY_ID}'`,
    __S3_SECRET_KEY__: `'${process.env.SECRET_ACCES_KEY}'`,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react(), svgr()],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  }
});
