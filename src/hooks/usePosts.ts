import { useQuery } from '@tanstack/react-query';
import { getPostsByUser } from '../api/jsonPlaceholder';

export function usePosts(userId: number | null) {
  return useQuery({
    queryKey: ['posts', userId],
    queryFn: () => getPostsByUser(userId as number),
    enabled: userId !== null,
  });
}
