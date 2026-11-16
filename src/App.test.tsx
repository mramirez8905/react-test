import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /user posts app/i })).toBeInTheDocument();
  });

  it('increments the counter on click', async () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /count is 0/i });
    await userEvent.click(button);
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument();
  });
});
