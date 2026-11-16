import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/jsonPlaceholder';
import type { CreatePostPayload, Post } from '../types/api';

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, CreatePostPayload>({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // Actualizamos la caché de posts del usuario para mostrar el nuevo post localmente
      queryClient.setQueryData<Post[]>(['posts', newPost.userId], (oldPosts) => {
        if (!oldPosts) return [newPost];
        return [newPost, ...oldPosts];
      });
    },
  });
}
