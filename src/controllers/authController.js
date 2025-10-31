// src/controllers/authController.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Nosso DB simulado

const JWT_SECRET = 'seu_segredo_super_secreto'; // **MUITO** importante

// Implementa: POST /users/register
exports.register = (req, res) => {
    const { name, email, password, role } = req.body;

    if (User.findByEmail(email)) {
        return res.status(400).json({ message: 'Email já registrado.' });
    }
    
    // Validação de role (apenas Produtor e Empresa podem se registrar)
    if (role !== 'PRODUCER' && role !== 'COMPANY') {
        return res.status(400).json({ message: 'Perfil (role) inválido.' });
    }

    const newUser = User.save({ name, email, password, role });

    // Remove a senha antes de responder
    const { password: _, ...userData } = newUser; 

    // Status 201: Created
    return res.status(201).json({
        ...userData,
        message: 'Usuário registrado com sucesso.'
    });
};

// Implementa: POST /users/login
exports.login = (req, res) => {
    const { email, password } = req.body;

    const user = User.findByEmail(email);

    // Em produção: Usaria bcrypt.compare(password, user.passwordHash)
    if (!user || user.password !== 'hashedpassword') { 
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Cria o Token JWT
    const token = jwt.sign(
        { userId: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' } // Expira em 1 dia
    );

    const { password: _, ...userData } = user;
    
    return res.status(200).json({
        user: userData,
        token: token
    });
};