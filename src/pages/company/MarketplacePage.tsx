// src/pages/company/MarketplacePage.tsx

import React, { useState } from 'react';
import { CarbonCredit } from '../../types';

// Importando componentes do MUI
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Box,
  Paper,
  InputAdornment,
  MenuItem,
  Alert
} from '@mui/material';

// --- DADOS MOCADOS (SIMULAÇÃO) ---
const MOCK_AVAILABLE_CREDITS: CarbonCredit[] = [
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
    id: 'c4',
    producerId: 'user-003',
    origin: 'Sítio Boa Esperança - Energia Solar',
    generationDate: '2025-03-10T00:00:00Z',
    initialAmount: 500,
    availableAmount: 500,
    pricePerCredit: 85,
    status: 'APPROVED',
  },
  {
    id: 'c5',
    producerId: 'user-004',
    origin: 'Projeto Biogás Serra Azul',
    generationDate: '2025-02-01T00:00:00Z',
    initialAmount: 1000,
    availableAmount: 800,
    pricePerCredit: 78,
    status: 'APPROVED',
  },
];
// -------------------------------------

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Componente de Card para um único lote de créditos à venda.
 */
const CreditCard: React.FC<{ credit: CarbonCredit }> = ({ credit }) => {
  const [amountToBuy, setAmountToBuy] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const maxAmount = credit.availableAmount;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const value = Math.max(1, Math.min(maxAmount, Number(e.target.value)));
    setAmountToBuy(value);
  };

  const handleBuy = () => {
    setError('');
    setSuccess('');
    // Simulação de compra
    if (amountToBuy > maxAmount) {
      setError('Quantidade indisponível.');
      return;
    }
    setSuccess(`Compra simulada: ${amountToBuy} créditos por ${formatCurrency(amountToBuy * credit.pricePerCredit)}`);
  };

  return (
    <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {credit.origin}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Produtor ID: {credit.producerId}
        </Typography>
        <Typography variant="h5" color="primary.main" fontWeight={600} sx={{ my: 2 }}>
          {formatCurrency(credit.pricePerCredit)}
          <Typography component="span" variant="body2" color="text.secondary"> / tCO2e</Typography>
        </Typography>
        <Typography variant="body2">
          {credit.availableAmount} créditos disponíveis
        </Typography>
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </CardContent>
      <CardActions sx={{ p: 2, backgroundColor: 'grey.50', borderTop: '1px solid #eee' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5}>
            <TextField
              type="number"
              label="Qtd."
              size="small"
              value={amountToBuy}
              onChange={handleAmountChange}
              inputProps={{ min: 1, max: maxAmount }}
              InputProps={{
                endAdornment: <InputAdornment position="end">t</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={7}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleBuy}
            >
              Comprar
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export const MarketplacePage: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Marketplace de Créditos
      </Typography>

      {/* Barra de Filtros */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Buscar por projeto ou produtor..."
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              select
              label="Região"
              variant="outlined"
              size="small"
              defaultValue=""
            >
              <MenuItem value="sudeste">Sudeste</MenuItem>
              <MenuItem value="norte">Norte</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              select
              label="Ordenar por"
              variant="outlined"
              size="small"
              defaultValue="preco_asc"
            >
              <MenuItem value="preco_asc">Menor Preço</MenuItem>
              <MenuItem value="preco_desc">Maior Preço</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Grid de Créditos */}
      <Grid container spacing={3}>
        {MOCK_AVAILABLE_CREDITS.map(credit => (
          <Grid item key={credit.id} xs={12} sm={6} md={4}>
            <CreditCard credit={credit} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};