// src/routes/creditRoutes.js

const express = require('express');
const router = express.Router();
const creditController = require('../controllers/creditController');

// --- SIMULAÇÃO DE MIDDLEWARE ---
// Em um ambiente real, você faria uma requisição JWT para o Identity Service.
// Aqui, usaremos o nosso middleware simulado (que deve ser copiado do Identity Service).

// Função de simulação: em produção, ela verificaria o token e a role
const authMiddleware = (req, res, next) => {
    // Apenas simula que o token é válido e anexa os dados
    req.user = { id: 'prod-123', role: 'PRODUCER' }; // Mude para testar
    next();
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Acesso negado. Requer perfil de Administrador.' });
    }
    next();
};
// ------------------------------

// Rota 1: Registro (Acesso: PRODUCER)
router.post('/', authMiddleware, (req, res) => {
    // Lógica para verificar se req.user.role é PRODUCER antes de registrar.
    if (req.user.role !== 'PRODUCER') {
        return res.status(403).json({ message: 'Apenas produtores podem registrar créditos.' });
    }
    creditController.registerCredit(req, res);
});

// Rota 2: Fila de Validação (Acesso: ADMIN)
router.get('/pending', authMiddleware, isAdmin, creditController.getPendingCredits);

// Rota 3: Decisão do Auditor (Acesso: ADMIN)
router.patch('/:id/status', authMiddleware, isAdmin, creditController.updateCreditStatus);

// Rota 4: Marketplace (Acesso: COMPANY) - Não exige autenticação aqui, mas será filtrada no Controller
router.get('/available', creditController.getAvailableCredits);

module.exports = router;