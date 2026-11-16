import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { UserList } from './components/UserList';
import type { User } from './types/api';

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 500, color: '#000' }}>
          Publicaciones de Usuarios
        </Typography>
      </Box>

      <UserList onSelectUser={setSelectedUser} />

      {selectedUser && (
        <Typography variant="body1" sx={{ mt: 3, color: '#000' }}>
          Usuario seleccionado: {selectedUser.name}
        </Typography>
      )}
    </Container>
  );
}

export default App;
