// src/routes/transactionRoutes.js

const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// 💡 Rota Pública (Não precisa de middleware de autenticação!)
// GET /api/transactions/public
router.get('/public', transactionController.getPublicHistory); 

// 💡 Rota Simples para testar o encadeamento do hash (apenas para simulação)
router.post('/finalize', transactionController.finalizeTransaction); 

module.exports = router;