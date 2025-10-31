// src/theme.ts

import { createTheme } from '@mui/material/styles';
import { green, blue } from '@mui/material/colors';

/**
 * Cria o tema base para a aplicação EcoTrade.
 * Usamos verde como a cor primária para combinar com o tema "Eco".
 */
export const theme = createTheme({
  palette: {
    primary: {
      main: green[600], // Cor primária (botões, links)
    },
    secondary: {
      main: blue[800], // Cor secundária
    },
  },
});