import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { useUsers } from '../hooks/useUsers';

export function UserList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data: users, isLoading, isError, error } = useUsers();

  const filteredUsers =
    users?.filter((user) =>
      user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    ) ?? [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{ textAlign: 'center', fontWeight: 500, color: '#000' }}
      >
        Usuarios
      </Typography>

      <TextField
        label="Buscar por nombre"
        variant="outlined"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        fullWidth
        sx={{
          '& .MuiInputBase-input': { color: '#000' },
          '& .MuiInputLabel-root': { color: '#666' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#ccc' },
            '&:hover fieldset': { borderColor: '#999' },
            '&.Mui-focused fieldset': { borderColor: '#1976d2' },
          },
        }}
        data-testid="user-search-input"
      />

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress sx={{ color: '#1976d2' }} />
        </Box>
      )}

      {isError && (
        <Alert severity="error" data-testid="users-error">
          {error instanceof Error ? error.message : 'Error al cargar los usuarios'}
        </Alert>
      )}

      {!isLoading && !isError && (
        <TableContainer component={Paper} elevation={1}>
          <Table aria-label="tabla de usuarios">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#fff' }}>
                <TableCell sx={{ color: '#000', fontWeight: 500 }}>Nombre</TableCell>
                <TableCell sx={{ color: '#000', fontWeight: 500 }}>Correo electrónico</TableCell>
                <TableCell sx={{ color: '#000', fontWeight: 500 }}>Empresa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  onClick={() => navigate(`/users/${user.id}/posts`)}
                  sx={{ cursor: 'pointer', backgroundColor: '#fff' }}
                  data-testid={`user-row-${user.id}`}
                >
                  <TableCell sx={{ color: '#000' }}>{user.name}</TableCell>
                  <TableCell sx={{ color: '#000' }}>{user.email}</TableCell>
                  <TableCell sx={{ color: '#000' }}>{user.company.name}</TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ color: '#000' }} data-testid="no-users-message">
                    No se encontraron usuarios
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
