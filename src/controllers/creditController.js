// src/controllers/creditController.js (Carbon Credits Service - Atualizado)

const Credit = require('../models/Credit');
const AuditLog = require('../models/AuditLog'); // Importação do nosso novo módulo de logs

// Implementa: PATCH /credits/:id/status (Decisão do Auditor)
exports.updateCreditStatus = (req, res) => {
    const { id } = req.params;
    const { new_status, rejection_reason } = req.body;
    
    // O ID do administrador vem do token JWT (simulado)
    const auditorId = req.user.id; 

    if (new_status !== 'APPROVED' && new_status !== 'REJECTED') {
        return res.status(400).json({ message: 'Novo status inválido.' });
    }

    if (new_status === 'REJECTED' && !rejection_reason) {
        return res.status(400).json({ message: 'O motivo da rejeição é obrigatório.' });
    }

    const updatedCredit = Credit.updateStatus(id, new_status, rejection_reason);

    if (!updatedCredit) {
        return res.status(404).json({ message: 'Crédito não encontrado.' });
    }

    // 💡 REGISTRAR AÇÃO NO LOG DE AUDITORIA 💡
    AuditLog.logAction(id, auditorId, new_status, rejection_reason);

    return res.status(200).json({
        id: updatedCredit.id,
        status: updatedCredit.status,
        message: `Crédito ${new_status} com sucesso. Auditoria registrada.`
    });
};