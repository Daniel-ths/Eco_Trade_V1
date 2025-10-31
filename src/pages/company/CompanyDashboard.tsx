// src/pages/company/CompanyDashboard.tsx

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Transaction } from '../../types';

// Importando componentes do MUI
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// --- DADOS MOCADOS (SIMULAÇÃO) ---
const MOCK_COMPANY_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    creditId: 'c3',
    buyerId: 'company-abc',
    sellerId: 'user-001',
    amount: 50,
    totalPrice: 4500,
    transactionDate: '2025-10-30T10:00:00Z',
  },
  {
    id: 't2',
    creditId: 'c1',
    buyerId: 'company-abc',
    sellerId: 'user-002',
    amount: 50,
    totalPrice: 4000,
    transactionDate: '2025-10-28T14:30:00Z',
  },
];
// -------------------------------------

// Funções utilitárias
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

// Componente de Card de Métrica reutilizável
const MetricCard: React.FC<{ title: string; value: string | number; color?: string }> = ({ title, value, color = 'text.primary' }) => (
  <Paper 
    elevation={3} 
    sx={{ 
      p: 3,
      borderLeft: 5, 
      borderColor: color === 'text.primary' ? 'primary.main' : color
    }}
  >
    <Typography variant="overline" color="text.secondary">
      {title}
    </Typography>
    <Typography variant="h4" component="p" fontWeight={600} color={color}>
      {value}
    </Typography>
  </Paper>
);

export const CompanyDashboard: React.FC = () => {
  const { user } = useAuth();

  // Processando os dados mocados
  const totalCreditsCompensated = MOCK_COMPANY_TRANSACTIONS.reduce((sum, tx) => sum + tx.amount, 0);
  const totalInvested = MOCK_COMPANY_TRANSACTIONS.reduce((sum, tx) => sum + tx.totalPrice, 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        
        {/* 1. Título */}
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Painel da Empresa: {user?.name}
          </Typography>
        </Grid>

        {/* 2. Cards de Métricas */}
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard 
            title="Total Compensado (tCO2e)" 
            value={totalCreditsCompensated} 
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard 
            title="Total Investido (R$)" 
            value={formatCurrency(totalInvested)} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard 
            title="Certificados Emitidos" 
            value={MOCK_COMPANY_TRANSACTIONS.length}
            color="secondary.main"
          />
        </Grid>

        {/* 3. Ação Rápida (Requisito 3 - Compra) */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              component={RouterLink}
              to="/empresa/marketplace"
              sx={{ py: 1.5, px: 4 }}
            >
              Acessar Marketplace
            </Button>
          </Paper>
        </Grid>
        
        {/* 4. Tabela de Histórico de Compras (Requisito 4) */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid #eee' }}>
              Histórico de Compras Recentes
            </Typography>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="histórico de compras">
                <TableHead>
                  <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell>Produtor (ID)</TableCell>
                    <TableCell align="right">Qtd. (tCO2e)</TableCell>
                    <TableCell align="right">Valor Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MOCK_COMPANY_TRANSACTIONS.map((tx) => (
                    <TableRow hover key={tx.id}>
                      <TableCell>{formatDate(tx.transactionDate)}</TableCell>
                      <TableCell>{tx.sellerId}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 500 }}>
                        {tx.amount}
                      </TableCell>
                      <TableCell align="right" sx={{ color: 'primary.main', fontWeight: 600 }}>
                        {formatCurrency(tx.totalPrice)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};