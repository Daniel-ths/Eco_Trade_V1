// src/models/TransactionLedger.js

const { v4: uuidv4 } = require('uuid');

// Simulação de Banco de Dados: Livro-Razão (Ledger)
let ledger = [];

// Adiciona uma transação ao nosso livro-razão simulado
const save = (transactionData) => {
    ledger.push(transactionData);
    return transactionData;
};

// Encontra a última transação registrada (usado para obter o previous_transaction_hash)
const findLast = () => {
    if (ledger.length === 0) {
        return null; // Retorna null se o ledger estiver vazio (início da cadeia)
    }
    // Retorna a última transação registrada
    return ledger[ledger.length - 1]; 
};

// Função de verificação para o Histórico Público (simples)
const findAllPublic = () => {
    // Retorna os dados, filtrando campos sensíveis
    return ledger.map(tx => ({
        transaction_date: tx.transaction_date,
        amount_tco2e: tx.amount,
        total_price: tx.total_price,
        // Simulação de dados públicos enriquecidos:
        credit_type: 'Reflorestamento', 
        origin_region: 'Região Norte',
        transaction_hash_prefix: tx.transaction_hash ? tx.transaction_hash.substring(0, 8) + '...' : ''
    }));
}

module.exports = {
    save,
    findLast,
    findAllPublic
};