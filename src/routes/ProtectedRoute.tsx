// src/routes/ProtectedRoute.tsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';

// Componente MUI para o Loading
import { Box, CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactElement;
  allowedRoles: UserRole[]; // Quais perfis podem acessar
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    // 1. Não está logado? Redireciona para o login.
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!allowedRoles.includes(user.role)) {
    // 2. Logado, mas sem permissão? Redireciona para o dashboard "correto" dele.
    return <Navigate to="/dashboard-redirect" replace />;
  }

  // 3. Logado e com permissão? Renderiza a página solicitada.
  return children;
};