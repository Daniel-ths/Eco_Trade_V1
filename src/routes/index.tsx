// src/routes/index.tsx

import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../hooks/useAuth';
import { PublicLayout } from '../components/layout/PublicLayout'; 
import { MyCreditsPage } from '../pages/MyCreditsPage';

import { LoginPage } from '../pages/auth/LoginPage';
import { CadastroPage } from '../pages/auth/CadastroPage';
import { PublicHistoryPage } from '../pages/PublicHistoryPage';

import { ProducerDashboard } from '../pages/producer/ProducerDashboard';
import { RegisterCreditsPage } from '../pages/producer/RegisterCreditsPage';

import { CompanyDashboard } from '../pages/company/CompanyDashboard';
import { MarketplacePage } from '../pages/company/MarketplacePage';

import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { ValidationQueuePage } from '../pages/admin/ValidationQueuePage';

const NotFoundPage = () => <div style={{ padding: 16 }}><h1>404 - Página Não Encontrada</h1></div>;

const DashboardRedirect = () => {
  const { user } = useAuth();
  if (user?.role === 'PRODUCER') return <Navigate to="/produtor/dashboard" replace />;
  if (user?.role === 'COMPANY') return <Navigate to="/empresa/dashboard" replace />;
  if (user?.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/login" replace />;
};


export const router = createBrowserRouter([
  
  // Rotas Públicas (Sem Layout/Header)
  { path: '/login', element: <LoginPage /> },
  { path: '/cadastro', element: <CadastroPage /> }, // ⬅️ LINHA CORRIGIDA

  // Rota Pública com Header (PublicLayout)
  { 
      path: '/public', 
      element: <PublicLayout />,
      children: [
          { path: 'history', element: <PublicHistoryPage /> }
      ]
  }, 

  // Rotas Protegidas (Usam o AppLayout e requerem Login)
  {
    path: '/',
    element: (
      <ProtectedRoute allowedRoles={['PRODUCER', 'COMPANY', 'ADMIN']}>
        <AppLayout /> 
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardRedirect /> }, 
      { path: 'dashboard-redirect', element: <DashboardRedirect /> },

      {
        path: 'produtor',
        element: <ProtectedRoute allowedRoles={['PRODUCER']}><Outlet /></ProtectedRoute>,
        children: [
          { path: 'dashboard', element: <ProducerDashboard /> },
          { path: 'registrar-creditos', element: <RegisterCreditsPage /> },
          { path: 'meus-creditos', element: <MyCreditsPage /> }, 
        ],
      },
      
      {
        path: 'empresa',
        element: <ProtectedRoute allowedRoles={['COMPANY']}><Outlet /></ProtectedRoute>,
        children: [
          { path: 'dashboard', element: <CompanyDashboard /> },
          { path: 'marketplace', element: <MarketplacePage /> },
          { path: 'meus-creditos', element: <MyCreditsPage /> }, 
        ],
      },
      
      {
        path: 'admin',
        element: <ProtectedRoute allowedRoles={['ADMIN']}><Outlet /></ProtectedRoute>,
        children: [
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'validacao', element: <ValidationQueuePage /> },
        ],
      },
    ],
  },
  
  { path: '*', element: <NotFoundPage /> },
]);