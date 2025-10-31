// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { router } from './routes'; // (Ainda vamos criar este arquivo)
import { theme } from './theme';    // O tema que acabamos de criar

// Pega o elemento 'root' do index.html
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = ReactDOM.createRoot(rootElement);

// Renderiza a aplicação
root.render(
  <React.StrictMode>
    {/* Provedor de Tema do MUI */}
    <ThemeProvider theme={theme}>
      {/* Reseta o CSS padrão do navegador */}
      <CssBaseline />
      
      {/* Provedor de Rotas do React Router */}
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);