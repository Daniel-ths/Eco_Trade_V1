// src/pages/producer/RegisterCreditsPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importando componentes do MUI
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const RegisterCreditsPage: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [amount, setAmount] = useState('');
  const [generationDate, setGenerationDate] = useState('');
  const [pricePerCredit, setPricePerCredit] = useState('');
  const [fileName, setFileName] = useState(''); // Apenas para feedback visual
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    // 1. Validação Simples
    if (!origin || !amount || !generationDate || !pricePerCredit || !fileName) {
      setError('Todos os campos, incluindo o laudo, são obrigatórios.');
      setIsLoading(false);
      return;
    }
    
    // 2. Simulação de Envio de API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 3. Resultado
    setIsLoading(false);
    setSuccess('Créditos registrados com sucesso! Aguardando validação do administrador.');

    // Limpa o formulário e redireciona após 3 segundos
    setTimeout(() => {
      navigate('/produtor/dashboard');
    }, 3000);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={4} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Registrar Novos Créditos de Carbono
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            
            {/* Seção 1: Detalhes do Crédito */}
            <Grid item xs={12}>
              <Typography variant="h6">1. Detalhes do Lote</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="origin"
                name="origin"
                label="Origem / Projeto"
                placeholder="Ex: Fazenda Rio Verde - Projeto de Reflorestamento"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                disabled={isLoading}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                id="amount"
                name="amount"
                label="Quantidade (tCO2e)"
                type="number"
                placeholder="Ex: 150"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isLoading}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                id="price"
                name="price"
                label="Preço por Crédito (R$)"
                type="number"
                placeholder="Ex: 80.00"
                value={pricePerCredit}
                onChange={(e) => setPricePerCredit(e.target.value)}
                disabled={isLoading}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                id="generationDate"
                name="generationDate"
                label="Data de Geração"
                type="date"
                InputLabelProps={{ shrink: true }} // Garante que o label não sobreponha
                value={generationDate}
                onChange={(e) => setGenerationDate(e.target.value)}
                disabled={isLoading}
              />
            </Grid>

            {/* Seção 2: Validação */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6">2. Validação</Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label" // Faz o botão agir como um <label>
                fullWidth
                startIcon={<CloudUploadIcon />}
                disabled={isLoading}
              >
                Anexar Laudo de Verificação
                <input 
                  type="file" 
                  hidden 
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </Button>
              {fileName && (
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  Arquivo selecionado: {fileName}
                </Typography>
              )}
            </Grid>
            
            {/* Seção 3: Ações e Mensagens */}
            <Grid item xs={12}>
              {/* Mensagens de Feedback */}
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
              )}
              {success && (
                <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>
              )}
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, position: 'relative' }}>
                <Button
                  variant="text"
                  color="inherit"
                  onClick={() => navigate('/produtor/dashboard')}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  sx={{ minWidth: 180 }}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Enviar para Validação'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};