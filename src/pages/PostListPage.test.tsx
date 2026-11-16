import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PostListPage } from '../pages/PostListPage';

jest.mock('../api/jsonPlaceholder');

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={createTestQueryClient()}>
      <MemoryRouter initialEntries={['/users/1/posts']}>
        <Routes>
          <Route path="/users/:userId/posts" element={children} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('PostListPage', () => {
  it('renders user posts in cards', async () => {
    render(<PostListPage />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText('sunt aut facere repellat provident')).toBeInTheDocument();
    });

    expect(screen.getByText('est rerum tempore vitae')).toBeInTheDocument();
  });

  it('opens the create post dialog when clicking add post button', async () => {
    render(<PostListPage />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText('sunt aut facere repellat provident')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId('add-post-button'));

    expect(screen.getByText('Nueva publicación')).toBeInTheDocument();
    expect(screen.getByTestId('post-title-input')).toBeInTheDocument();
    expect(screen.getByTestId('post-body-input')).toBeInTheDocument();
  });
});
