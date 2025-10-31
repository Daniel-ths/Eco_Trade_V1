// src/models/AuditLog.js

const { v4: uuidv4 } = require('uuid');

// Simulação de Banco de Dados: Tabela de Logs de Auditoria
let auditLogs = [];

/**
 * Registra a ação de aprovação/rejeição no log de auditoria.
 */
const logAction = (creditBatchId, auditorId, action, reason = null) => {
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
};

module.exports = {
    logAction,
    // Em um ambiente real, teríamos findLogsByCredit para exibir no frontend
    findLogsByCredit: (creditBatchId) => auditLogs.filter(log => log.credit_batch_id === creditBatchId)
};