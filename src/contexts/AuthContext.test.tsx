import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render, screen, fireEvent, waitFor } from '../tests/utils/test-utils';
import { AuthProvider, useAuth } from './AuthContext';

const authMocks = vi.hoisted(() => ({
  loginMock: vi.fn(),
  registerMock: vi.fn(),
  logoutMock: vi.fn(),
  getTokenMock: vi.fn(),
  getUserMock: vi.fn(),
  isAuthenticatedMock: vi.fn(),
  getCurrentUserMock: vi.fn(),
}));

vi.mock('../services/AuthService', () => ({
  default: {
    login: authMocks.loginMock,
    register: authMocks.registerMock,
    logout: authMocks.logoutMock,
    getToken: authMocks.getTokenMock,
    getUser: authMocks.getUserMock,
    isAuthenticated: authMocks.isAuthenticatedMock,
    getCurrentUser: authMocks.getCurrentUserMock,
  },
}));

const TestComponent = () => {
  const { user, isAuthenticated, isLoading, login, logout, register, refreshUser } = useAuth();

  return (
    <div>
      <div data-testid="auth-state">{isAuthenticated ? 'autenticado' : 'anonimo'}</div>
      <div data-testid="auth-loading">{isLoading ? 'loading' : 'idle'}</div>
      <div data-testid="auth-user">{user?.email ?? 'sem-user'}</div>
      <button onClick={() => login({ email: 'john@example.com', password: '123456' })}>login</button>
      <button onClick={() => register({ name: 'John', email: 'john@example.com', password: '123456' })}>register</button>
      <button onClick={() => logout()}>logout</button>
      <button onClick={() => refreshUser()}>refresh</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('inicializa autenticado quando token/usuário existem', async () => {
    const storedUser = { email: 'john@example.com', name: 'John' };
    authMocks.getTokenMock.mockReturnValue('token');
    authMocks.getUserMock.mockReturnValue(storedUser);
    authMocks.isAuthenticatedMock.mockReturnValue(true);
    authMocks.getCurrentUserMock.mockResolvedValue({ ...storedUser, id: '1', role: 'user', createdAt: '2024-01-01' });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-loading').textContent).toBe('idle');
    expect(screen.getByTestId('auth-state').textContent).toBe('autenticado');
    expect(screen.getByTestId('auth-user').textContent).toBe(storedUser.email);
  });

  it('executa login e atualiza contexto', async () => {
    authMocks.getTokenMock.mockReturnValue(null);
    authMocks.getUserMock.mockReturnValue(null);
    authMocks.isAuthenticatedMock.mockReturnValue(false);
    authMocks.loginMock.mockResolvedValue({
      user: { id: '1', name: 'John', email: 'john@example.com', role: 'user', createdAt: '2024-01-01' },
      token: 'token-123',
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText('login'));
    });

    await waitFor(() => expect(screen.getByTestId('auth-state').textContent).toBe('autenticado'));
    expect(screen.getByTestId('auth-user').textContent).toBe('john@example.com');
  });

  it('executa register e atualiza contexto', async () => {
    authMocks.getTokenMock.mockReturnValue(null);
    authMocks.getUserMock.mockReturnValue(null);
    authMocks.isAuthenticatedMock.mockReturnValue(false);
    authMocks.registerMock.mockResolvedValue({
      user: { id: '2', name: 'Jane', email: 'jane@example.com', role: 'user', createdAt: '2024-01-01' },
      token: 'token-abc',
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText('register'));
    });

    await waitFor(() => expect(screen.getByTestId('auth-user').textContent).toBe('jane@example.com'));
    expect(screen.getByTestId('auth-state').textContent).toBe('autenticado');
  });

  it('logout limpa usuário e estado', async () => {
    authMocks.getTokenMock.mockReturnValue('token');
    authMocks.getUserMock.mockReturnValue({ email: 'john@example.com' });
    authMocks.isAuthenticatedMock.mockReturnValue(true);
    authMocks.getCurrentUserMock.mockResolvedValue({ id: '1', name: 'John', email: 'john@example.com', role: 'user', createdAt: '2024-01-01' });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      fireEvent.click(screen.getByText('logout'));
    });

    expect(authMocks.logoutMock).toHaveBeenCalled();
    expect(screen.getByTestId('auth-state').textContent).toBe('anonimo');
    expect(screen.getByTestId('auth-user').textContent).toBe('sem-user');
  });

  it('refreshUser aplica novo usuário e chama logout em erro', async () => {
    authMocks.getTokenMock.mockReturnValue('token');
    authMocks.getUserMock.mockReturnValue({ email: 'john@example.com' });
    authMocks.isAuthenticatedMock.mockReturnValue(true);
    authMocks.getCurrentUserMock.mockResolvedValueOnce({ id: '1', name: 'John', email: 'john@example.com', role: 'user', createdAt: '2024-01-01' });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    authMocks.getCurrentUserMock.mockResolvedValueOnce({ id: '1', name: 'Updated', email: 'updated@example.com', role: 'user', createdAt: '2024-01-01' });
    await act(async () => {
      fireEvent.click(screen.getByText('refresh'));
    });
    await waitFor(() => expect(screen.getByTestId('auth-user').textContent).toBe('updated@example.com'));

    authMocks.getCurrentUserMock.mockRejectedValueOnce(new Error('expired'));
    await act(async () => {
      fireEvent.click(screen.getByText('refresh'));
    });

    await waitFor(() => expect(authMocks.logoutMock).toHaveBeenCalled());
    expect(screen.getByTestId('auth-state').textContent).toBe('anonimo');
  });
});
