// src/pages/PublicHistoryPage.tsx

import React from 'react';

// Importando componentes do MUI
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
  Alert
} from '@mui/material';

// --- SIMULAÇÃO DE DADOS PÚBLICOS ---
const MOCK_PUBLIC_TRANSACTIONS = [
  { date: '2025-10-30', amount: 50, price: 80.00, type: 'Reflorestamento', region: 'Sudeste' },
  { date: '2025-10-29', amount: 200, price: 75.50, type: 'Energia Eólica', region: 'Nordeste' },
  { date: '2025-10-28', amount: 15, price: 92.50, type: 'Captura de Metano', region: 'Centro-Oeste' },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const PublicHistoryPage: React.FC = () => {
    // Em produção, aqui faríamos uma chamada: 
    // const [transactions, setTransactions] = useQuery('publicTransactions', () => fetch('/transactions/public'));

    const transactions = MOCK_PUBLIC_TRANSACTIONS;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Histórico Público de Transações
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
                Este histórico exibe todas as negociações registradas no Ledger. Dados sensíveis (usuários) são omitidos para garantir a privacidade.
            </Alert>

            <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="histórico público">
                        <TableHead>
                            <TableRow>
                                <TableCell>Data</TableCell>
                                <TableCell>Tipo de Crédito</TableCell>
                                <TableCell align="right">Qtd. (tCO2e)</TableCell>
                                <TableCell align="right">Preço Unitário</TableCell>
                                <TableCell>Região de Origem</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((tx, index) => (
                                <TableRow hover key={index}>
                                    <TableCell>{tx.date}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={tx.type} 
                                            size="small" 
                                            color={tx.type.includes('Reflorestamento') ? 'success' : 'primary'}
                                        />
                                    </TableCell>
                                    <TableCell align="right">{tx.amount}</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                                        {formatCurrency(tx.price)}
                                    </TableCell>
                                    <TableCell>{tx.region}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};