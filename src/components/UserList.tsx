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
import { useUsers } from '../hooks/useUsers';
import { useDebounce } from '../hooks/useDebounce';
import type { User } from '../types/api';

interface UserListProps {
  onSelectUser: (user: User) => void;
}

export function UserList({ onSelectUser }: UserListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data: users, isLoading, isError, error } = useUsers();

  const filteredUsers =
    users?.filter((user) =>
      user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    ) ?? [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" component="h2">
        Users
      </Typography>

      <TextField
        label="Search by name"
        variant="outlined"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        fullWidth
        data-testid="user-search-input"
      />

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {isError && (
        <Alert severity="error" data-testid="users-error">
          {error instanceof Error ? error.message : 'Failed to load users'}
        </Alert>
      )}

      {!isLoading && !isError && (
        <TableContainer component={Paper}>
          <Table aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Company</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  onClick={() => onSelectUser(user)}
                  sx={{ cursor: 'pointer' }}
                  data-testid={`user-row-${user.id}`}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.company.name}</TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center" data-testid="no-users-message">
                    No users found
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
