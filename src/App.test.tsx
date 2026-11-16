import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import App from './App';

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
      {children}
    </QueryClientProvider>
  );
}

describe('App', () => {
  it('renders the app title', () => {
    render(<App />, { wrapper: Wrapper });
    expect(screen.getByRole('heading', { name: /publicaciones de usuarios/i })).toBeInTheDocument();
  });
});
