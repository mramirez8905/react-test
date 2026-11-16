import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/jsonPlaceholder';

export const USERS_QUERY_KEY = 'users';

export function useUsers() {
  return useQuery({
    queryKey: [USERS_QUERY_KEY],
    queryFn: getUsers,
  });
}
