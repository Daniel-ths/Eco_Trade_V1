// src/pages/MyCreditsPage.tsx

import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
} from '@mui/material';

// --- SIMULAÇÃO DO INVENTÁRIO DO USUÁRIO ---
// Em um cenário real, esta lista seria diferente para PRODUCER (seus lotes) e COMPANY (créditos comprados)
const MOCK_INVENTORY = [
  { batchId: 'B-2025-001', amount: 500, type: 'Reflorestamento', status: 'DISPONÍVEL', acquiredDate: '2025-09-15', source: 'Fazenda Verde' },
  { batchId: 'B-2025-007', amount: 1200, type: 'Energia Eólica', status: 'DISPONÍVEL', acquiredDate: '2025-10-01', source: 'Ventos do Sul S.A.' },
  { batchId: 'B-2025-010', amount: 75, type: 'Captura de Metano', status: 'PENDENTE', acquiredDate: '2025-10-25', source: 'BioGás Ltda' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'DISPONÍVEL':
      return 'success';
    case 'PENDENTE':
      return 'warning';
    case 'UTILIZADO':
      return 'info';
    default:
      return 'default';
  }
};

export const MyCreditsPage: React.FC = () => {
  const inventory = MOCK_INVENTORY;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Meu Inventário de Créditos
      </Typography>
      
      <Alert severity="success" sx={{ mb: 3 }}>
        Você possui um total de {inventory.reduce((sum, item) => sum + item.amount, 0)} tCO2e em créditos disponíveis.
      </Alert>

      <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="inventário de créditos">
            <TableHead>
              <TableRow>
                <TableCell>ID do Lote</TableCell>
                <TableCell>Tipo de Crédito</TableCell>
                <TableCell align="right">Quantidade (tCO2e)</TableCell>
                <TableCell>Fonte/Origem</TableCell>
                <TableCell>Data de Aquisição</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Seu inventário de créditos está vazio.
                  </TableCell>
                </TableRow>
              ) : (
                inventory.map((item, index) => (
                  <TableRow hover key={index}>
                    <TableCell>{item.batchId}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>{item.amount}</TableCell>
                    <TableCell>{item.source}</TableCell>
                    <TableCell>{item.acquiredDate}</TableCell>
                    <TableCell>
                      <Chip 
                        label={item.status} 
                        size="small" 
                        color={getStatusColor(item.status)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};