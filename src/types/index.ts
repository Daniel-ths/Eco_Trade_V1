// src/types/index.ts

/**
 * Define os perfis de usuário possíveis no sistema EcoTrade.
 * - PRODUCER: Produtor Rural (vendedor de créditos)
 * - COMPANY: Empresa (compradora de créditos)
 * - ADMIN: Administrador da plataforma
 */
export type UserRole = 'PRODUCER' | 'COMPANY' | 'ADMIN';

/**
 * Interface base para um usuário logado no sistema.
 * Contém as informações compartilhadas entre todos os perfis.
 */
export interface User {
  id: string;
  name: string; // Nome (Produtor) ou Razão Social (Empresa)
  email: string;
  role: UserRole;
  createdAt: string; // Data de criação no formato ISO
}

/**
 * O status de um lote de créditos de carbono.
 * - PENDING: Aguardando validação do Administrador.
 * - APPROVED: Validado, disponível no marketplace.
 * - REJECTED: Rejeitado pelo Administrador (requer justificativa).
 * - SOLD: Totalmente vendido.
 */
export type CreditStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SOLD';

/**
 * Representa um lote de Créditos de Carbono registrado por um Produtor.
 */
export interface CarbonCredit {
  id: string;
  producerId: string; // ID do User (Produtor) que registrou
  origin: string; // Descrição da origem (ex: "Fazenda Rio Verde - Projeto de Reflorestamento")
  generationDate: string; // Data de geração dos créditos (ISO)
  
  initialAmount: number; // Quantidade total registrada (em tCO2e)
  availableAmount: number; // Quantidade ainda disponível para venda (em tCO2e)
  
  pricePerCredit: number; // Preço por tCO2e
  status: CreditStatus;
  
  // Opcional: informações de validação
  validationReportUrl?: string;
  adminRejectionReason?: string;
}

/**
 * Representa uma transação de compra e venda de créditos.
 */
export interface Transaction {
  id: string;
  creditId: string; // ID do CarbonCredit negociado
  buyerId: string;   // ID do User (Empresa) que comprou
  sellerId: string;  // ID do User (Produtor) que vendeu
  amount: number;      // Quantidade de créditos transacionada
  totalPrice: number;  // Preço total da transação (amount * pricePerCredit)
  transactionDate: string; // Data da transação (ISO)
}