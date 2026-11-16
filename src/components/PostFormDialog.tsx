import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';

interface PostFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, body: string) => void;
  isPending: boolean;
}

export function PostFormDialog({ open, onClose, onSubmit, isPending }: PostFormDialogProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

  const validate = (): boolean => {
    const newErrors: { title?: string; body?: string } = {};
    if (!title.trim()) newErrors.title = 'El título es obligatorio';
    if (!body.trim()) newErrors.body = 'El texto es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit(title.trim(), body.trim());
    setTitle('');
    setBody('');
    setErrors({});
  };

  const handleClose = () => {
    setTitle('');
    setBody('');
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: '#000' }}>Nueva publicación</DialogTitle>
      <form onSubmit={handleSubmit} role="form">
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Título"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            required
            sx={{ '& .MuiInputBase-input': { color: '#000' } }}
            data-testid="post-title-input"
          />
          <TextField
            label="Texto"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            error={!!errors.body}
            helperText={errors.body}
            fullWidth
            required
            multiline
            rows={4}
            sx={{ '& .MuiInputBase-input': { color: '#000' } }}
            data-testid="post-body-input"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#000' }}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            sx={{ backgroundColor: '#1976d2' }}
            data-testid="post-submit-button"
          >
            {isPending ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
