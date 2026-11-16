import { fireEvent, render, screen } from '@testing-library/react';
import { PostFormDialog } from './PostFormDialog';

describe('PostFormDialog', () => {
  it('shows validation errors when submitting empty fields', () => {
    const onSubmit = jest.fn();
    render(
      <PostFormDialog open onClose={jest.fn()} onSubmit={onSubmit} isPending={false} />,
    );

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(screen.getByText('El título es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('El texto es obligatorio')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with title and body when fields are filled', () => {
    const onSubmit = jest.fn();
    render(
      <PostFormDialog open onClose={jest.fn()} onSubmit={onSubmit} isPending={false} />,
    );

    fireEvent.change(screen.getByTestId('post-title-input').querySelector('input')!, {
      target: { value: 'New post title' },
    });
    fireEvent.change(screen.getByTestId('post-body-input').querySelector('textarea')!, {
      target: { value: 'New post body' },
    });

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalledWith('New post title', 'New post body');
  });
});
