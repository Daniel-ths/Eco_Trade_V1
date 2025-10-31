// src/controllers/creditController.js (Atualização para incluir Auditoria)

const Credit = require('../models/Credit');
const AuditLog = require('../models/AuditLog'); // 💡 NOVO: Importa o módulo de Log

/**
 * Implementa: PATCH /credits/:id/status (Decisão do Auditor)
 * Atualiza o status do crédito e registra a ação no log de auditoria.
 */
exports.updateCreditStatus = (req, res) => {
    const { id } = req.params;
    const { new_status, rejection_reason } = req.body;
    
    // Obtém o ID do administrador do token JWT (simulado)
    const auditorId = req.user.id; 

    // Validação
    if (new_status !== 'APPROVED' && new_status !== 'REJECTED') {
        return res.status(400).json({ message: 'Novo status inválido. Use APPROVED ou REJECTED.' });
    }

    if (new_status === 'REJECTED' && !rejection_reason) {
        return res.status(400).json({ message: 'O motivo da rejeição é obrigatório.' });
    }

    // 1. Atualiza o status no modelo principal de créditos
    const updatedCredit = Credit.updateStatus(id, new_status, rejection_reason);

    if (!updatedCredit) {
        return res.status(404).json({ message: 'Crédito não encontrado.' });
    }

    // 2. REGISTRA A AÇÃO NO LOG DE AUDITORIA (FINALIZAÇÃO DO REQUISITO)
    AuditLog.logAction(id, auditorId, new_status, rejection_reason);

    return res.status(200).json({
        id: updatedCredit.id,
        status: updatedCredit.status,
        message: `Crédito ${new_status} com sucesso. Auditoria registrada.`
    });
};