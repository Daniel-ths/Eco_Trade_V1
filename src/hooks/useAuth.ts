// src/hooks/useAuth.ts

import { useState } from 'react'; // <--- O React deve estar importado aqui!
import { User, UserRole } from '../types';

// ---------- SIMULAÇÃO ----------
// Altere o 'role' aqui para testar os diferentes perfis
const MOCK_USER: User = {
  id: 'user-001',
  name: 'Produtor Rural Exemplo',
  email: 'produtor@fazenda.com',
  role: 'PRODUCER', // Mude para 'COMPANY' ou 'ADMIN' para testar
  createdAt: new Date().toISOString(),
};
// -------------------------------

/**
 * Hook de simulação de autenticação.
 */
export const useAuth = () => { // <--- Deve ser uma função que retorna hooks
  // Defina como 'null' para simular um usuário deslogado
  // O erro está aqui, no useState.
  const [user] = useState<User | null>(MOCK_USER); 
  
  const loading = false; 

  return { user, loading };
};