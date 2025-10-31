// src/pages/producer/ProducerDashboard.tsx

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Transaction, CarbonCredit, CreditStatus } from '../../types';

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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// --- DADOS MOCADOS (SIMULAÇÃO) ---
const MOCK_CREDITS: CarbonCredit[] = [
  {
    id: 'c1',
    producerId: 'user-001',
    origin: 'Fazenda Rio Verde - Reflorestamento',
    generationDate: '2025-01-15T00:00:00Z',
    initialAmount: 200,
    availableAmount: 150,
    pricePerCredit: 80,
    status: 'APPROVED',
  },
  {
    id: 'c2',
    producerId: 'user-001',
    origin: 'Projeto Eólico Vento Bom',
    generationDate: '2025-05-20T00:00:00Z',
    initialAmount: 300,
    availableAmount: 300,
    pricePerCredit: 75,
    status: 'PENDING',
  },
  {
    id: 'c3',
    producerId: 'user-001',
    origin: 'Sítio Água Limpa',
    generationDate: '2024-11-10T00:00:00Z',
    initialAmount: 50,
    availableAmount: 0,
    pricePerCredit: 90,
    status: 'SOLD',
  },
];

const MOCK_TRANSACTIONS: Transaction[] = [
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
    buyerId: 'company-xyz',
    sellerId: 'user-001',
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

export const ProducerDashboard: React.FC = () => {
  const { user } = useAuth();

  // Processando os dados mocados
  const saldoDisponivel = MOCK_CREDITS
    .filter(c => c.status === 'APPROVED')
    .reduce((sum, c) => sum + c.availableAmount, 0);
    
  const emValidacao = MOCK_CREDITS
    .filter(c => c.status === 'PENDING')
    .reduce((sum, c) => sum + c.initialAmount, 0);
  
  const totalVendido = MOCK_TRANSACTIONS
    .reduce((sum, t) => sum + t.totalPrice, 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        
        {/* 1. Título */}
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Bem-vindo, {user?.name.split(' ')[0]}!
          </Typography>
        </Grid>

        {/* 2. Cards de Métricas (Requisito 4 - Saldo) */}
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard 
            title="Saldo Disponível (tCO2e)" 
            value={saldoDisponivel} 
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard 
            title="Créditos em Validação" 
            value={emValidacao} 
            color="warning.main" // Cor de aviso
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard 
            title="Total Vendido (R$)" 
            value={formatCurrency(totalVendido)} 
          />
        </Grid>

        {/* 3. Ações Rápidas (Requisito 2 - Registro) */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleOutlineIcon />}
              component={RouterLink}
              to="/produtor/registrar-creditos" // (Esta rota ainda precisa ser criada)
              sx={{ py: 1.5 }}
            >
              Registrar Novos Créditos
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/produtor/meus-creditos" // (Esta rota ainda precisa ser criada)
            >
              Ver Meus Créditos
            </Button>
          </Paper>
        </Grid>
        
        {/* 4. Tabela de Transações Recentes (Requisito 4 - Transações) */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid #eee' }}>
              Transações Recentes
            </Typography>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="transações recentes">
                <TableHead>
                  <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell>Comprador (ID)</TableCell>
                    <TableCell align="right">Qtd. (tCO2e)</TableCell>
                    <TableCell align="right">Valor Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MOCK_TRANSACTIONS.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        Nenhuma transação registrada ainda.
                      </TableCell>
                    </TableRow>
                  ) : (
                    MOCK_TRANSACTIONS.map((tx) => (
                      <TableRow hover key={tx.id}>
                        <TableCell>{formatDate(tx.transactionDate)}</TableCell>
                        <TableCell>{tx.buyerId}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 500 }}>
                          {tx.amount}
                        </TableCell>
                        <TableCell align="right" sx={{ color: 'primary.main', fontWeight: 600 }}>
                          {formatCurrency(tx.totalPrice)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};