// src/routes/index.tsx

import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../hooks/useAuth';

// -----------------------------------------------------------------
// ⬇️ IMPORTAÇÕES DOS COMPONENTES REAIS (Substituem os Placeholders) ⬇️
// -----------------------------------------------------------------

// Rotas Públicas
import { LoginPage } from '../pages/auth/LoginPage';
import { CadastroPage } from '../pages/auth/CadastroPage';
import { PublicHistoryPage } from '../pages/PublicHistoryPage'; // NOVO COMPONENTE PÚBLICO

// Rotas de Produtor
import { ProducerDashboard } from '../pages/producer/ProducerDashboard';
import { RegisterCreditsPage } from '../pages/producer/RegisterCreditsPage'; // Adicionei a página de registro

// Rotas de Empresa
import { CompanyDashboard } from '../pages/company/CompanyDashboard';
import { MarketplacePage } from '../pages/company/MarketplacePage';

// Rotas de Admin
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { ValidationQueuePage } from '../pages/admin/ValidationQueuePage';

// Componente 404 (simples, pode ser melhorado depois)
const NotFoundPage = () => <div style={{ padding: 16 }}><h1>404 - Página Não Encontrada</h1></div>;


// -----------------------------------------------------------------
// ➡️ LÓGICA DE REDIRECIONAMENTO (Permanece Inalterada) ⬅️
// -----------------------------------------------------------------
const DashboardRedirect = () => {
  const { user } = useAuth();
  if (user?.role === 'PRODUCER') return <Navigate to="/produtor/dashboard" replace />;
  if (user?.role === 'COMPANY') return <Navigate to="/empresa/dashboard" replace />;
  if (user?.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/login" replace />; // Fallback
};


// -----------------------------------------------------------------
// 🗺️ CONFIGURAÇÃO FINAL DO ROUTER 🗺️
// -----------------------------------------------------------------
export const router = createBrowserRouter([
  // Rotas Públicas
  { path: '/login', element: <LoginPage /> },
  { path: '/cadastro', element: <CadastroPage /> },
  
  // NOVO REQUISITO: Histórico Público (Acessível por qualquer um)
  { path: '/public/history', element: <PublicHistoryPage /> }, 

  // Rotas Protegidas (Usam o AppLayout)
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

      // Rotas do Produtor
      {
        path: 'produtor',
        element: <ProtectedRoute allowedRoles={['PRODUCER']}><Outlet /></ProtectedRoute>,
        children: [
          { path: 'dashboard', element: <ProducerDashboard /> },
          { path: 'registrar-creditos', element: <RegisterCreditsPage /> }, // Rota de registro
        ],
      },
      // Rotas da Empresa
      {
        path: 'empresa',
        element: <ProtectedRoute allowedRoles={['COMPANY']}><Outlet /></ProtectedRoute>,
        children: [
          { path: 'dashboard', element: <CompanyDashboard /> },
          { path: 'marketplace', element: <MarketplacePage /> },
        ],
      },
      // Rotas do Admin
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
  
  // Rota 404
  { path: '*', element: <NotFoundPage /> },
]);