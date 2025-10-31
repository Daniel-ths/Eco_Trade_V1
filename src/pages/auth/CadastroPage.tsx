// src/pages/auth/CadastroPage.tsx

import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Importando componentes do MUI
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Alert,
  Paper,
  MenuItem,
  CircularProgress
} from '@mui/material';

// Importando um ícone do MUI
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { UserRole } from '../../types';

export const CadastroPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole | ''>(''); // Estado para o seletor
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // --- LÓGICA DE CADASTRO (SIMULAÇÃO) ---
    if (!email || !password || !name || !role) {
      setError('Por favor, preencha todos os campos.');
      setIsLoading(false);
      return;
    }
    
    console.log('Simulando cadastro:', { name, email, role });
    
    // Simulação de tempo de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    
    // Simulação de sucesso: redireciona para o login
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper 
        elevation={6}
        sx={{
          marginTop: 8,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <PersonAddIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Criar sua conta EcoTrade
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          <Grid container spacing={2}>
            
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Nome Completo ou Razão Social"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                select // Transforma o campo em um seletor
                name="role"
                label="Eu sou..."
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                disabled={isLoading}
              >
                <MenuItem value="PRODUCER">Produtor Rural (Quero Vender)</MenuItem>
                <MenuItem value="COMPANY">Empresa (Quero Comprar)</MenuItem>
              </TextField>
            </Grid>

          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Cadastrar'}
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Já tem uma conta? Entre
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};