// src/components/layout/PublicLayout.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Layout simplificado para rotas públicas (como Histórico).
 * Inclui apenas o AppBar (Header).
 */
export const PublicLayout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Barra do Topo (AppBar) - Imita o AppLayout */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        EcoTrade - Histórico
                    </Typography>
                    {/* Botão para Login, caso o usuário não esteja logado */}
                    <Button color="inherit" component={RouterLink} to="/login">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Conteúdo Principal */}
            <Box
                component="main"
                sx={{ 
                    flexGrow: 1, 
                    p: 3, 
                    bgcolor: 'grey.50',
                }}
            >
                <Outlet /> 
            </Box>
        </Box>
    );
};