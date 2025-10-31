// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuração de segurança para ambientes em nuvem
  server: {
    // Permite que o host do CodeSandbox acesse o servidor
    allowedHosts: ['jh93d3-5173.csb.app'], 
  }
});