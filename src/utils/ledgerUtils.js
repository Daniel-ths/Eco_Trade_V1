// src/utils/ledgerUtils.js

const crypto = require('crypto');

/**
 * Normaliza os dados da transação em uma string consistente e calcula seu hash SHA-256.
 *
 * @param {object} transactionData - Dados da transação (incluindo previous_transaction_hash).
 * @returns {string} O hash SHA-256 da transação.
 */
function calculateTransactionHash(transactionData) {
    // 1. Seleciona e ordena as chaves para garantir consistência no hash
    const normalizedData = {
        id: transactionData.id,
        batchId: transactionData.batch_id,
        buyerId: transactionData.buyer_id,
        sellerId: transactionData.seller_id,
        amount: transactionData.amount,
        totalPrice: transactionData.total_price,
        // Este é o campo que garante o encadeamento
        previousHash: transactionData.previous_transaction_hash 
    };

    // 2. Converte o objeto em uma string JSON consistente
    const dataString = JSON.stringify(normalizedData);

    // 3. Calcula o hash SHA-256
    return crypto.createHash('sha256')
        .update(dataString)
        .digest('hex');
}

module.exports = {
    calculateTransactionHash
};