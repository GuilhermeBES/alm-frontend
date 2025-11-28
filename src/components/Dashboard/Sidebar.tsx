import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  LineChart,
  History,
  User,
  Edit2,
  LogOut,
} from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Wallet, label: 'Carteira', path: '/carteira' },
    { icon: TrendingUp, label: 'Investimentos', path: '/investimentos' },
    { icon: LineChart, label: 'Insights', path: '/insights' },
    { icon: History, label: 'Histórico', path: '/historico' },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={styles.sidebar}>
      {/* Profile Section */}
      <div className={styles.profileSection}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}>
            {user ? getInitials(user.name) : <User size={24} />}
          </div>
          <button
            className={styles.editButton}
            onClick={() => setIsEditing(!isEditing)}
            title="Editar perfil"
          >
            <Edit2 size={14} />
          </button>
        </div>
        <div className={styles.profileInfo}>
          <span className={styles.profileLabel}>Nome completo</span>
          <span className={styles.profileName}>{user?.name || 'Usuário'}</span>
        </div>
      </div>

      {/* Wrapper for nav and logout */}
      <div className={styles.navWrapper}>
        {/* Menu Items */}
        <nav className={styles.menuNav}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                className={`${styles.menuItem} ${active ? styles.menuItemActive : ''}`}
                onClick={() => navigate(item.path)}
              >
                <Icon size={20} className={styles.menuIcon} />
                <span className={styles.menuLabel}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <button className={styles.logoutButton} onClick={logout}>
          <LogOut size={20} className={styles.menuIcon} />
          <span className={styles.menuLabel}>Sair</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

