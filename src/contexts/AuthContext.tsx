import { createContext, useState, useEffect, ReactNode } from 'react';
import AuthService from '../services/AuthService';
import { LoginRequest, RegisterRequest, AuthState, User } from '../services/interfaces';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<User>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Inicializa autenticação ao carregar app
  useEffect(() => {
    const initAuth = async () => {
      const token = AuthService.getToken();
      const user = AuthService.getUser();

      if (token && user && AuthService.isAuthenticated()) {
        setState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });

        // Opcional: Atualizar dados do usuário da API
        try {
          const updatedUser = await AuthService.getCurrentUser();
          setState(prev => ({
            ...prev,
            user: updatedUser,
          }));
        } catch (error) {
          console.error('Erro ao atualizar usuário:', error);
          // Mantém dados do localStorage se API falhar
        }
      } else {
        // Token inválido ou expirado
        AuthService.logout();
        setState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      const response = await AuthService.login(credentials);

      // Use the user object from the response
      const user = response.user;

      setState({
        user: user, // Use the potentially modified user object
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
      return user; // Return the user object
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      const response = await AuthService.register(data);

      setState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
    window.location.href = '/';
  };

  const refreshUser = async () => {
    try {
      const user = await AuthService.getCurrentUser();
      setState(prev => ({
        ...prev,
        user,
      }));
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
