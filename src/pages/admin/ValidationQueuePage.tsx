// src/pages/admin/ValidationQueuePage.tsx
import React, { useState } from 'react';
import { CarbonCredit } from '../../types';
// Importando componentes do MUI
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Link as MuiLink
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
// --- DADOS MOCADOS (SIMULAÇÃO) ---
const MOCK_PENDING_CREDITS_LIST: CarbonCredit[] = [
  {
    id: 'c2',
    producerId: 'user-001',
    origin: 'Projeto Eólico Vento Bom',
    generationDate: '2025-05-20T00:00:00Z',
    initialAmount: 300,
    availableAmount: 300,
    pricePerCredit: 75,
    status: 'PENDING',
    validationReportUrl: 'simulado/laudo-vento-bom.pdf',
  },
  {
    id: 'c6',
    producerId: 'user-005',
    origin: 'Recuperação Mata Ciliar Rio Claro',
    generationDate: '2025-06-01T00:00:00Z',
    initialAmount: 100,
    availableAmount: 100,
    pricePerCredit: 90,
    status: 'PENDING',
    validationReportUrl: 'simulado/relatorio-rio-claro.pdf',
  },
  {
    id: 'c7',
    producerId: 'user-001',
    origin: 'Projeto Biogás Fazenda Velha',
    generationDate: '2025-06-05T00:00:00Z',
    initialAmount: 50,
    availableAmount: 50,
    pricePerCredit: 82,
    status: 'PENDING',
    validationReportUrl: 'simulado/biogas-fv.pdf',
  },
];
// -------------------------------------

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const ValidationQueuePage: React.FC = () => {
  const [credits, setCredits] = useState(MOCK_PENDING_CREDITS_LIST);
  const [open, setOpen] = useState(false);
  const [selectedCreditId, setSelectedCreditId] = useState<string | null>(null);

  // Remove o crédito da lista (simulação)
  const handleDecision = (id: string, decision: 'approve' | 'reject') => {
    if (decision === 'reject') {
      setSelectedCreditId(id);
      setOpen(true); // Abre o modal de rejeição
    } else {
      // Se for 'aprovar', apenas remove da fila
      setCredits(prevCredits => prevCredits.filter(c => c.id !== id));
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedCreditId(null);
  };

  const handleConfirmRejection = () => {
    // Lógica para enviar a rejeição com o motivo
    if (selectedCreditId) {
      setCredits(prevCredits => prevCredits.filter(c => c.id !== selectedCreditId));
    }
    handleCloseDialog();
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Fila de Validação de Créditos
      </Typography>

      <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="fila de validação">
            <TableHead>
              <TableRow>
                <TableCell>Data Registro</TableCell>
                <TableCell>Produtor (ID)</TableCell>
                <TableCell>Origem</TableCell>
                <TableCell align="right">Qtd. (tCO2e)</TableCell>
                <TableCell>Laudo</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {credits.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Nenhum crédito aguardando validação.
                  </TableCell>
                </TableRow>
              ) : (
                credits.map((c) => (
                  <TableRow hover key={c.id}>
                    <TableCell>{formatDate(new Date().toISOString())}</TableCell>
                    <TableCell>{c.producerId}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{c.origin}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 500 }}>{c.initialAmount}</TableCell>
                    <TableCell>
                      <MuiLink 
                        href={`/${c.validationReportUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        underline="always"
                      >
                        Abrir Laudo
                      </MuiLink>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => handleDecision(c.id, 'approve')}
                        >
                          Aprovar
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          startIcon={<CancelIcon />}
                          onClick={() => handleDecision(c.id, 'reject')}
                        >
                          Rejeitar
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Modal (Dialog) para Rejeição */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Rejeitar Crédito</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, insira o motivo da rejeição. Esta informação será enviada
            ao produtor.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="reason"
            label="Motivo da Rejeição"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleConfirmRejection} color="error">Confirmar Rejeição</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};