// src/components/layout/AppLayout.tsx

import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// Importando componentes do MUI
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Avatar,
  CssBaseline
} from '@mui/material';

const drawerWidth = 240;

export const AppLayout = () => {
  const { user } = useAuth();

  // Links do menu lateral (INCLUINDO O NOVO LINK PÚBLICO)
  const navItems = [
    { text: 'Dashboard', path: '/dashboard-redirect' },
    { text: 'Histórico Público', path: '/public/history' }, // NOVO LINK ADICIONADO
    // Adicione mais links aqui com base no perfil (se for o caso)
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Barra do Topo (AppBar) */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            EcoTrade
          </Typography>
          <Typography sx={{ mr: 2 }}>
            Olá, {user?.name.split(' ')[0]}
          </Typography>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            {user?.name[0]}
          </Avatar>
        </Toolbar>
      </AppBar>

      {/* Menu Lateral (Drawer) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                  component={NavLink} 
                  to={item.path}
                  style={({ isActive }) => {
                    return {
                      backgroundColor: isActive ? 'rgba(0, 0, 0, 0.08)' : ''
                    };
                  }}
                >
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Conteúdo Principal da Página */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          bgcolor: 'grey.50',
          minHeight: '100vh' 
        }}
      >
        <Toolbar />
        <Outlet /> 
      </Box>
    </Box>
  );
};