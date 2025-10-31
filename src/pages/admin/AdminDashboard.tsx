// src/pages/admin/AdminDashboard.tsx

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { CarbonCredit, User } from '../../types';

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
  Chip,
  Link
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// --- DADOS MOCADOS (SIMULAÇÃO) ---
const MOCK_PENDING_CREDITS: CarbonCredit[] = [
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
    id: 'c6',
    producerId: 'user-005',
    origin: 'Recuperação Mata Ciliar Rio Claro',
    generationDate: '2025-06-01T00:00:00Z',
    initialAmount: 100,
    availableAmount: 100,
    pricePerCredit: 90,
    status: 'PENDING',
  },
];

const MOCK_RECENT_USERS: User[] = [
    { id: 'user-005', name: 'Fazenda Nova Esperança', email: 'contato@fne.com', role: 'PRODUCER', createdAt: '2025-10-30T10:00:00Z' },
    { id: 'company-b', name: 'Varejo Tech S/A', email: 'compras@varejotech.com', role: 'COMPANY', createdAt: '2025-10-29T15:00:00Z' },
];
// -------------------------------------

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

// Componente de Card de Métrica reutilizável
const MetricCard: React.FC<{ title: string; value: string | number; color?: string; children?: React.ReactNode }> = ({ title, value, color = 'text.primary', children }) => (
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
    {children}
  </Paper>
);

export const AdminDashboard: React.FC = () => {
  
  const totalPendingCredits = MOCK_PENDING_CREDITS.reduce((sum, c) => sum + c.initialAmount, 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        
        {/* 1. Título */}
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Painel do Administrador
          </Typography>
        </Grid>

        {/* 2. Cards de Métricas */}
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard 
            title="Créditos Pendentes (tCO2e)" 
            value={totalPendingCredits} 
            color="warning.main"
          >
            <Link component={RouterLink} to="/admin/validacao" sx={{ mt: 1, display: 'block' }}>
              Revisar agora &rarr;
            </Link>
          </MetricCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard 
            title="Novos Usuários (Últ. 7d)" 
            value={MOCK_RECENT_USERS.length} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MetricCard 
            title="Transações na Plataforma" 
            value={12}
            color="secondary.main"
          />
        </Grid>

        {/* 3. Tabela de Novos Usuários */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid #eee' }}>
              Novos Usuários Pendentes de Aprovação
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Data Cadastro</TableCell>
                    <TableCell>Nome / Razão Social</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Perfil</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MOCK_RECENT_USERS.map((u) => (
                    <TableRow hover key={u.id}>
                      <TableCell>{formatDate(u.createdAt)}</TableCell>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={u.role === 'PRODUCER' ? 'Produtor' : 'Empresa'}
                          color={u.role === 'PRODUCER' ? 'info' : 'success'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          startIcon={<CheckCircleOutlineIcon />}
                        >
                          Revisar
                        </Button>
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