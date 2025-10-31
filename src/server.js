// src/index.js (Simulação do Servidor do Transactions Service)

const express = require('express');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
app.use(express.json()); // Middleware para ler JSON no body

// 💡 Montando as Rotas (inclui a pública e a de finalização)
app.use('/api/transactions', transactionRoutes); 

const PORT = 3001; // Porta padrão para o Transactions Service

app.listen(PORT, () => {
    console.log(`Transactions Service rodando na porta ${PORT}`);
});