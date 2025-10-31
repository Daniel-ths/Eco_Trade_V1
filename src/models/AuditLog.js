// src/models/AuditLog.js (Carbon Credits Service)

const { v4: uuidv4 } = require('uuid');

// Simulação de Banco de Dados: Tabela de Logs de Auditoria
let auditLogs = [];

/**
 * Registra uma ação administrativa sobre um lote de crédito.
 * Esta função é chamada quando um Admin aprova ou rejeita um crédito.
 */
module.exports = {
    logAction: (creditBatchId, auditorId, action, reason = null) => {
        const newLog = {
            id: uuidv4(),
            credit_batch_id: creditBatchId,
            auditor_user_id: auditorId,
            action: action, // 'APPROVED' ou 'REJECTED'
            reason: reason,
            timestamp: new Date().toISOString()
        };
        auditLogs.push(newLog);
        
        console.log(`[AUDIT LOG] Ação '${action}' registrada por ${auditorId} no lote ${creditBatchId}`);
        return newLog;
    },
    // Para fins de teste/transparência:
    findLogsByCredit: (creditBatchId) => auditLogs.filter(log => log.credit_batch_id === creditBatchId)
};