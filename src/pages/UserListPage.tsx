import { Typography } from '@mui/material';
import { UserList } from '../components/UserList';

export function UserListPage() {
  return (
    <>
      <Typography
        variant="h2"
        component="h1"
        sx={{ textAlign: 'center', fontWeight: 500, color: '#000', mb: 4 }}
      >
        Publicaciones de Usuarios
      </Typography>
      <UserList />
    </>
  );
}
