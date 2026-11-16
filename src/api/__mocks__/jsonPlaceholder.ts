import { mockPosts, mockUsers } from './data';

export const getUsers = jest.fn().mockResolvedValue(mockUsers);
export const getPostsByUser = jest.fn().mockResolvedValue(mockPosts);
export const createPost = jest.fn().mockImplementation((payload) =>
  Promise.resolve({ ...payload, id: 101 }),
);
export const createUser = jest.fn();
export const updateUser = jest.fn();
