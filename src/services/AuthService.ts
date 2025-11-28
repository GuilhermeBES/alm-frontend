import axios from 'axios';
import { User, LoginRequest, LoginResponse, RegisterRequest } from './interfaces';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const TOKEN_KEY = 'alm_auth_token';
const USER_KEY = 'alm_user';

class AuthService {
  private static axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * Login do usuário
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.axiosInstance.post<LoginResponse>(
        '/auth/login',
        credentials
      );

      // Armazena token e usuário
      this.setToken(response.data.token);
      this.setUser(response.data.user);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Se backend não disponível, fazer login em modo demo
        if (error.code === 'ERR_NETWORK' || !error.response) {
          return this.loginDemo(credentials);
        }

        throw new Error(
          error.response?.data?.detail || 'Erro ao fazer login'
        );
      }
      throw error;
    }
  }

  /**
   * Login em modo demo (sem backend)
   */
  private static loginDemo(credentials: LoginRequest): LoginResponse {
    const mockUser: User = {
      id: 'demo123',
      name: credentials.email.split('@')[0],
      email: credentials.email,
      role: credentials.email.includes('admin') ? 'admin' : 'user',
      createdAt: new Date().toISOString(),
    };

    const mockToken = 'demo_' + btoa(JSON.stringify(mockUser));

    // Armazena token e usuário
    this.setToken(mockToken);
    this.setUser(mockUser);

    console.warn('🚧 Modo DEMO ativado - Backend não disponível');

    return {
      user: mockUser,
      token: mockToken,
    };
  }

  /**
   * Registro de novo usuário
   */
  static async register(data: RegisterRequest): Promise<LoginResponse> {
    try {
      const response = await this.axiosInstance.post<LoginResponse>(
        '/auth/register',
        data
      );

      // Armazena token e usuário
      this.setToken(response.data.token);
      this.setUser(response.data.user);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Se backend não disponível, criar conta em modo demo
        if (error.code === 'ERR_NETWORK' || !error.response) {
          return this.registerDemo(data);
        }

        throw new Error(
          error.response?.data?.detail || 'Erro ao criar conta'
        );
      }
      throw error;
    }
  }

  /**
   * Registro em modo demo (sem backend)
   */
  private static registerDemo(data: RegisterRequest): LoginResponse {
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    const mockToken = 'demo_' + btoa(JSON.stringify(mockUser));

    // Armazena token e usuário
    this.setToken(mockToken);
    this.setUser(mockUser);

    return {
      user: mockUser,
      token: mockToken,
    };
  }

  /**
   * Logout do usuário
   */
  static logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  /**
   * Obtém token armazenado
   */
  static getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Armazena token
   */
  static setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Obtém usuário armazenado
   */
  static getUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Armazena usuário
   */
  static setUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Verifica se usuário está autenticado
   */
  static isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Tokens demo sempre são válidos
    if (token.startsWith('demo_')) return true;

    // Verifica se token JWT expirou
    try {
      const payload = this.decodeToken(token);
      const now = Date.now() / 1000;

      return payload.exp > now;
    } catch {
      return false;
    }
  }

  /**
   * Verifica se usuário é admin
   */
  static isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin';
  }

  /**
   * Decodifica JWT token
   */
  private static decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  /**
   * Atualiza token de acesso
   */
  static async refreshToken(): Promise<string> {
    try {
      const response = await this.axiosInstance.post<{ token: string }>(
        '/auth/refresh'
      );

      this.setToken(response.data.token);
      return response.data.token;
    } catch (error) {
      this.logout();
      throw new Error('Sessão expirada');
    }
  }

  /**
   * Obtém perfil do usuário atual
   */
  static async getCurrentUser(): Promise<User> {
    try {
      const response = await this.axiosInstance.get<User>('/auth/me');
      this.setUser(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.detail || 'Erro ao buscar perfil'
        );
      }
      throw error;
    }
  }
}

export default AuthService;
