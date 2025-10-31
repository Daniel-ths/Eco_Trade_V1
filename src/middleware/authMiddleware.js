// src/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const JWT_SECRET = 'seu_segredo_super_secreto'; // **Deve** ser o mesmo do authController.js

module.exports = (req, res, next) => {
    // 1. Tenta pegar o token do cabeçalho Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido ou formato inválido.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // 2. Verifica e decodifica o token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // 3. Anexa os dados do usuário (ID e Role) ao objeto de requisição (req)
        req.user = { 
            id: decoded.userId,
            role: decoded.role 
        };
        
        // 4. Continua para a próxima função da rota (o endpoint GET /me)
        next();

    } catch (ex) {
        // Token inválido, expirado ou com erro
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};