// src/controllers/transactionController.js (Completo)

const TransactionLedger = require('../models/TransactionLedger');
const { calculateTransactionHash } = require('../utils/ledgerUtils');
const { v4: uuidv4 } = require('uuid'); 

// ----------------------------------------------------
// ➡️ NOVO HANDLER: Histórico Público (GET /transactions/public)
// ----------------------------------------------------
exports.getPublicHistory = (req, res) => {
    // Em uma implementação real, os query params (limit, offset, sort) 
    // seriam usados aqui para filtrar a busca no DB.
    
    // Usamos a função do modelo que já filtra e mascara os dados sensíveis
    const publicData = TransactionLedger.findAllPublic();

    return res.status(200).json(publicData);
};

// ----------------------------------------------------
// ➡️ HANDLER EXISTENTE: Finalizar Transação (POST /transactions/finalize)
// ----------------------------------------------------
exports.finalizeTransaction = (req, res) => {
    
    // 1. Obter dados da transação (em produção, viriam de um evento de confirmação)
    // Usamos dados mocados para simular o registro no ledger
    const transactionDetails = {
        transactionId: uuidv4(),
        batchId: 'batch-' + Math.floor(Math.random() * 100), // Simula diferentes lotes
        buyerId: 'company-abc',
        sellerId: 'producer-xyz',
        amount: Math.floor(Math.random() * 500) + 10,
        totalPrice: parseFloat((Math.random() * 50000).toFixed(2))
    };

    // 2. Buscar o hash da ÚLTIMA transação para encadeamento
    const lastTransaction = TransactionLedger.findLast(); 
    const previousHash = lastTransaction ? lastTransaction.transaction_hash : 'GENESIS';

    // 3. Cria o objeto da nova transação
    let newTransaction = {
        ...transactionDetails,
        transaction_date: new Date().toISOString(),
        previous_transaction_hash: previousHash, 
    };

    // 4. Calcula o hash Criptográfico
    const currentHash = calculateTransactionHash(newTransaction);
    newTransaction.transaction_hash = currentHash;

    // 5. Salva no livro-razão
    const savedTransaction = TransactionLedger.save(newTransaction);

    console.log(`[LEDGER] Transação ${savedTransaction.transactionId} encadeada. Hash: ${currentHash.substring(0, 10)}...`);

    // Resposta de sucesso
    return res.status(201).json({
        id: savedTransaction.transactionId,
        hash: savedTransaction.transaction_hash,
        previous_hash: savedTransaction.previous_transaction_hash,
        message: "Transação registrada no Ledger com imutabilidade garantida."
    });
};