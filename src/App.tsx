import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { PostListPage } from './pages/PostListPage';
import { UserListPage } from './pages/UserListPage';

function App() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/users/:userId/posts" element={<PostListPage />} />
      </Routes>
    </Container>
  );
}

export default App;
