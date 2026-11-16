import { Container, Typography } from '@mui/material';
import { useState } from 'react';
import { UserList } from './components/UserList';
import type { User } from './types/api';

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        User Posts
      </Typography>
      <UserList onSelectUser={setSelectedUser} />
      {selectedUser && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Selected user: {selectedUser.name}
        </Typography>
      )}
    </Container>
  );
}

export default App;
