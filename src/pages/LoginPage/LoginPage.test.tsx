import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../tests/utils/test-utils';
import LoginPage from './LoginPage';

const loginMock = vi.fn();
const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({ login: loginMock }),
}));

vi.mock('../../components/Auth/SignUpModal', () => ({
  default: ({ show }: { show: boolean }) => (
    <div data-testid="signup-modal" data-show={show}></div>
  ),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('faz login e redireciona para dashboard', async () => {
    loginMock.mockResolvedValueOnce({});

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: '123456' } });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => expect(loginMock).toHaveBeenCalledWith({ email: 'john@example.com', password: '123456' }));
    expect(navigateMock).toHaveBeenCalledWith('/dashboard');
  });

  it('mostra erro quando login falha', async () => {
    loginMock.mockRejectedValueOnce(new Error('Erro ao fazer login'));

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: '123' } });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => expect(screen.getByText('Erro ao fazer login')).toBeInTheDocument());
  });

  it('abre modal de cadastro ao clicar em Sign Up', () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByText('Sign Up'));

    expect(screen.getByTestId('signup-modal').getAttribute('data-show')).toBe('true');
  });
});
