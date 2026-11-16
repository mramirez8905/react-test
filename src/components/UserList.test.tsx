import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { UserList } from './UserList';

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
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}

describe('UserList', () => {
  it('filters users by name when typing in the search field', async () => {
    render(<UserList />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    });

    expect(screen.getByText('Ervin Howell')).toBeInTheDocument();

    const searchInput = screen.getByTestId('user-search-input').querySelector('input')!;
    fireEvent.change(searchInput, { target: { value: 'Leanne' } });

    await waitFor(
      () => {
        expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
        expect(screen.queryByText('Ervin Howell')).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it('navigates to user posts when clicking a row', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/:userId/posts" element={<div data-testid="posts-page">Posts page</div>} />
        </Routes>
      </MemoryRouter>,
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={createTestQueryClient()}>{children}</QueryClientProvider>
        ),
      },
    );

    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId('user-row-1'));

    await waitFor(() => {
      expect(screen.getByTestId('posts-page')).toBeInTheDocument();
    });
  });
});
