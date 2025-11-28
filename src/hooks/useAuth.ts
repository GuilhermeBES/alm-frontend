import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user: currentUser, isAuthenticated, isLoading, login, logout, register, refreshUser, token } = context;

  return { currentUser, isAuthenticated, isLoading, login, logout, register, refreshUser, token };
};
