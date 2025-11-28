import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo.png';
import styles from './DashboardNavbar.module.css';

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        {/* Logo e Título */}
        <div className={styles.logoSection}>
          <img src={logo} alt="ALM ChatBot" className={styles.logo} />
          <span className={styles.title}>ALM ChatBot</span>
        </div>

        {/* User Menu */}
        <div className={styles.userSection}>
          <div
            className={styles.userButton}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className={styles.userAvatar}>
              {user ? getInitials(user.name) : 'U'}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.name || 'Usuário'}</span>
              <span className={styles.userRole}>
                {user?.role === 'admin' ? 'Administrador' : 'Usuário'}
              </span>
            </div>
            <span className={styles.dropdownIcon}>▼</span>
          </div>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className={styles.userMenu}>
              <button
                className={styles.menuItem}
                onClick={() => {
                  navigate('/profile');
                  setShowUserMenu(false);
                }}
              >
                👤 Perfil
              </button>
              <button
                className={styles.menuItem}
                onClick={() => {
                  navigate('/settings');
                  setShowUserMenu(false);
                }}
              >
                ⚙️ Configurações
              </button>
              <div className={styles.menuDivider}></div>
              <button
                className={`${styles.menuItem} ${styles.logoutItem}`}
                onClick={handleLogout}
              >
                🚪 Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
