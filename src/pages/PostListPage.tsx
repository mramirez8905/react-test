import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostFormDialog } from '../components/PostFormDialog';
import { useCreatePost } from '../hooks/useCreatePost';
import { usePosts } from '../hooks/usePosts';
import { useUsers } from '../hooks/useUsers';

export function PostListPage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const userIdNumber = Number(userId);
  const { data: users } = useUsers();
  const { data: posts, isLoading, isError, error } = usePosts(userIdNumber);
  const createPostMutation = useCreatePost();

  const user = users?.find((u) => u.id === userIdNumber);

  const handleCreatePost = (title: string, body: string) => {
    createPostMutation.mutate(
      { userId: userIdNumber, title, body },
      {
        onSuccess: () => setDialogOpen(false),
      },
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ color: '#000', alignSelf: 'flex-start' }}
        data-testid="back-button"
      >
        Volver
      </Button>

      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: 'center', fontWeight: 500, color: '#000' }}
      >
        {user ? `Publicaciones de ${user.name}` : 'Publicaciones'}
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setDialogOpen(true)}
        sx={{ backgroundColor: '#1976d2', alignSelf: 'flex-start' }}
        data-testid="add-post-button"
      >
        Agregar publicación
      </Button>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress sx={{ color: '#1976d2' }} />
        </Box>
      )}

      {isError && (
        <Alert severity="error" data-testid="posts-error">
          {error instanceof Error ? error.message : 'Error al cargar las publicaciones'}
        </Alert>
      )}

      {!isLoading && !isError && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {posts?.map((post) => (
            <Card key={post.id} elevation={1} sx={{ backgroundColor: '#fff' }} data-testid={`post-card-${post.id}`}>
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ color: '#000', mb: 1 }}>
                  {post.title}
                </Typography>
                <Typography variant="body1" sx={{ color: '#333' }}>
                  {post.body}
                </Typography>
              </CardContent>
            </Card>
          ))}
          {posts?.length === 0 && (
            <Typography sx={{ textAlign: 'center', color: '#000' }} data-testid="no-posts-message">
              No hay publicaciones
            </Typography>
          )}
        </Box>
      )}

      <PostFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleCreatePost}
        isPending={createPostMutation.isPending}
      />
    </Box>
  );
}
