import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import AuthService from './AuthService';

const axiosMocks = vi.hoisted(() => {
  const postMock = vi.fn();
  const getMock = vi.fn();
  const instance = { post: postMock, get: getMock } as any;
  return { postMock, getMock, instance };
});

vi.mock('axios', () => {
  const create = vi.fn(() => axiosMocks.instance);
  const isAxiosError = (error: any) => Boolean(error?.isAxiosError);
  return {
    default: { create, isAxiosError },
    create,
    isAxiosError,
  };
});

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockUser = {
    id: '1',
    name: 'John',
    email: 'john@example.com',
    role: 'user',
    createdAt: '2024-01-01',
  } as const;

  it('faz login e persiste token/usuário', async () => {
    axiosMocks.postMock.mockResolvedValueOnce({ data: { user: mockUser, token: 'jwt_token' } });

    const response = await AuthService.login({ email: mockUser.email, password: '123456' });

    expect(response.token).toBe('jwt_token');
    expect(localStorage.getItem('alm_auth_token')).toBe('jwt_token');
    expect(JSON.parse(localStorage.getItem('alm_user') || '{}')).toMatchObject(mockUser);
  });

  it('fallback para modo demo quando backend indisponível no login', async () => {
    axiosMocks.postMock.mockRejectedValueOnce({ isAxiosError: true, code: 'ERR_NETWORK' });

    const response = await AuthService.login({ email: 'demo@admin.com', password: '123456' });

    expect(response.token.startsWith('demo_')).toBe(true);
    expect(AuthService.isAuthenticated()).toBe(true);
  });

  it('register usa fallback demo quando backend falha', async () => {
    axiosMocks.postMock.mockRejectedValueOnce({ isAxiosError: true, code: 'ERR_NETWORK' });

    const response = await AuthService.register({ name: 'Jane', email: 'jane@example.com', password: 'abcdef' });

    expect(response.token.startsWith('demo_')).toBe(true);
    expect(localStorage.getItem('alm_user')).toBeTruthy();
  });

  it('isAuthenticated retorna true para token demo e JWT válido', () => {
    localStorage.setItem('alm_auth_token', 'demo_token');
    expect(AuthService.isAuthenticated()).toBe(true);

    const futureExp = Math.floor(Date.now() / 1000) + 60;
    const jwt = `a.${btoa(JSON.stringify({ exp: futureExp }))}.c`;
    localStorage.setItem('alm_auth_token', jwt);
    expect(AuthService.isAuthenticated()).toBe(true);

    const pastExp = Math.floor(Date.now() / 1000) - 60;
    const expiredJwt = `a.${btoa(JSON.stringify({ exp: pastExp }))}.c`;
    localStorage.setItem('alm_auth_token', expiredJwt);
    expect(AuthService.isAuthenticated()).toBe(false);
  });

  it('refreshToken atualiza token e limpa sessão se falhar', async () => {
    axiosMocks.postMock.mockResolvedValueOnce({ data: { token: 'new_token' } });
    const success = await AuthService.refreshToken();
    expect(success).toBe('new_token');
    expect(localStorage.getItem('alm_auth_token')).toBe('new_token');

    axiosMocks.postMock.mockRejectedValueOnce({ isAxiosError: true });
    await expect(AuthService.refreshToken()).rejects.toThrow('Sessão expirada');
    expect(localStorage.getItem('alm_auth_token')).toBeNull();
  });

  it('getCurrentUser persiste usuário e lança erro quando falha', async () => {
    axiosMocks.getMock.mockResolvedValueOnce({ data: mockUser });
    const user = await AuthService.getCurrentUser();
    expect(user).toMatchObject(mockUser);
    expect(localStorage.getItem('alm_user')).toContain(mockUser.email);

    axiosMocks.getMock.mockRejectedValueOnce({ isAxiosError: true, response: { data: { detail: 'Erro ao buscar perfil' } } });
    await expect(AuthService.getCurrentUser()).rejects.toThrow('Erro ao buscar perfil');
  });
});
