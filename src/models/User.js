// src/models/User.js

const { v4: uuidv4 } = require('uuid');

// Simulação de Banco de Dados de Usuários
let users = [
    {
        id: 'a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6p',
        name: 'Admin Principal',
        email: 'admin@ecotrade.com',
        password: 'hashedpassword', // Em produção, isto seria um hash (ex: bcrypt)
        role: 'ADMIN',
        createdAt: new Date().toISOString()
    }
];

// Funções de Simulação do DB
module.exports = {
    findByEmail: (email) => users.find(u => u.email === email),
    findById: (id) => users.find(u => u.id === id),
    save: (userData) => {
        const newUser = {
            id: uuidv4(),
            ...userData,
            password: 'hashedpassword', // Simula o hashing da senha
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        return newUser;
    }
};