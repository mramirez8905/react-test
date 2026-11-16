import type { CreatePostPayload, Post, User } from '../types/api';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${BASE_URL}/users`);
  return handleResponse<User[]>(response);
}

export async function getPostsByUser(userId: number): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  return handleResponse<Post[]>(response);
}

export async function createPost(payload: CreatePostPayload): Promise<Post> {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<Post>(response);
}
