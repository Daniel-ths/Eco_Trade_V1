// src/models/Credit.js

const { v4: uuidv4 } = require('uuid');

// Simulação de Banco de Dados de Créditos
let creditBatches = [
    // Crédito Aprovado (Marketplace)
    { id: uuidv4(), producer_id: 'prod-123', origin_description: 'Fazenda Rio Verde', initial_amount: 200, available_amount: 150, price_per_credit: 80.00, status: 'APPROVED', validation_report_url: '/docs/laudoA.pdf', created_at: new Date('2025-01-15').toISOString() },
    // Crédito Pendente (Fila de Validação)
    { id: uuidv4(), producer_id: 'prod-456', origin_description: 'Projeto Eólico Ventos', initial_amount: 300, available_amount: 300, price_per_credit: 75.00, status: 'PENDING', validation_report_url: '/docs/laudoB.pdf', created_at: new Date('2025-05-20').toISOString() },
    // Crédito Vendido
    { id: uuidv4(), producer_id: 'prod-123', origin_description: 'Sitio Água Limpa', initial_amount: 50, available_amount: 0, price_per_credit: 90.00, status: 'SOLD', validation_report_url: '/docs/laudoC.pdf', created_at: new Date('2024-11-10').toISOString() },
];

module.exports = {
    findAll: () => creditBatches,
    findById: (id) => creditBatches.find(c => c.id === id),
    findByStatus: (status) => creditBatches.filter(c => c.status === status),
    save: (creditData, producerId) => {
        const newCredit = {
            id: uuidv4(),
            producer_id: producerId,
            ...creditData,
            available_amount: creditData.initial_amount, // Inicialmente, tudo está disponível
            status: 'PENDING', // Sempre começa pendente
            created_at: new Date().toISOString()
        };
        creditBatches.push(newCredit);
        return newCredit;
    },
    updateStatus: (id, newStatus, reason = null) => {
        const credit = creditBatches.find(c => c.id === id);
        if (credit) {
            credit.status = newStatus;
            credit.rejection_reason = reason;
            return credit;
        }
        return null;
    }
    // Em produção, haveria updateAmount, delete, etc.
};