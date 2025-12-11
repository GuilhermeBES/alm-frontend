import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../tests/utils/test-utils';
import SignUpModal from './SignUpModal';

const registerMock = vi.fn();

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({ register: registerMock }),
}));

describe('SignUpModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('não renderiza quando show é false', () => {
    const { container } = render(<SignUpModal show={false} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('valida senhas diferentes e exibe erro', async () => {
    render(<SignUpModal show={true} onClose={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'john' } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/Repeat Password/i), { target: { value: '999999' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText('As senhas não coincidem')).toBeInTheDocument();
    expect(registerMock).not.toHaveBeenCalled();
  });

  it('envia dados válidos e chama onClose', async () => {
    const onClose = vi.fn();
    registerMock.mockResolvedValueOnce({});

    render(<SignUpModal show={true} onClose={onClose} />);

    fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'john' } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/Repeat Password/i), { target: { value: '123456' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => expect(registerMock).toHaveBeenCalled());
    expect(registerMock).toHaveBeenCalledWith({ name: 'John Doe', email: 'john@example.com', password: '123456' });
    expect(onClose).toHaveBeenCalled();
  });
});
