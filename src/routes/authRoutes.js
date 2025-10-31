// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Rota 1: Cadastro - POST /users/register
router.post('/register', authController.register);

// Rota 2: Login - POST /users/login
router.post('/login', authController.login);

// Rota 3: Perfil (Protegida) - GET /users/me
// Usa o middleware para verificar o token JWT antes de acessar a rota
router.get('/me', authMiddleware, (req, res) => {
    // Se chegou aqui, o token é válido. req.user contém os dados do token.
    const user = req.user; 
    return res.json(user);
});

module.exports = router;