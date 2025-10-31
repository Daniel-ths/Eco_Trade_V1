// src/pages/auth/LoginPage.tsx

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
  CircularProgress
} from '@mui/material';

// Importando ícones
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// URL DO MICROSSERVIÇO DE IDENTIDADE (Assumindo que rodará na porta 3000)
const IdentityServiceUrl = 'http://localhost:3000'; 

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      setIsLoading(false);
      return;
    }
    
    // --- LÓGICA ATUALIZADA: SIMULAÇÃO DE CHAMADA REAL AO MICROSSERVIÇO ---
    try {
        // Envio dos dados para o endpoint POST /users/login
        const response = await fetch(`${IdentityServiceUrl}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        setIsLoading(false);

        if (!response.ok) {
            // Se o status for 401 (Unauthorized) ou 400 (Bad Request)
            setError(data.message || 'Falha na autenticação. Verifique suas credenciais.');
            return;
        }

        // Sucesso: Salvar o token e o usuário (Em produção, isso seria armazenado globalmente)
        console.log("Login bem-sucedido! Token:", data.token);

        // Redireciona para o dashboard (o ProtectedRoute cuidará da rota exata)
        navigate('/');

    } catch (fetchError) {
        setIsLoading(false);
        // Erro de rede, servidor offline, ou CORS
        setError('Não foi possível conectar ao servidor de autenticação (Identity Service).');
    }
    // FIM DA LÓGICA ATUALIZADA
  };

  return (
    <Container component="main" maxWidth="xs">
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
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Acesse sua conta EcoTrade
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
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
          </Button>

          <Grid container justifyContent="space-between">
            <Grid item>
              <Link href="#" variant="body2">
                Esqueceu sua senha?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/cadastro" variant="body2">
                {"Não tem uma conta? Cadastre-se"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};