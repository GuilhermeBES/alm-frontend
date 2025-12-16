import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import SignUpModal from '../../components/Auth/SignUpModal';
import logo from '../../assets/logo.png';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Usar email como username por enquanto
      const loggedInUser = await login({
        email: formData.username,
        password: formData.password,
      });

      // Redirecionar após login com base no role do usuário retornado
      if (loggedInUser?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img src={logo} alt="ALM ChatBot" className={styles.logo} />
          <h2 className={styles.logoText}>ALM ChatBot</h2>
        </div>

        {/* Erro */}
        {error && (
          <Alert variant="danger" className={styles.alert}>
            {error}
          </Alert>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Username */}
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Digite seu username"
              className={styles.input}
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={styles.input}
              required
              disabled={loading}
            />
          </div>

          {/* Botão Login */}
          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className={styles.spinner}
                />
                Entrando...
              </>
            ) : (
              'Login'
            )}
          </button>

          {/* Link Sign Up */}
          <div className={styles.signUpContainer}>
            <span className={styles.signUpText}>Não tem uma conta?</span>
            <button
              type="button"
              className={styles.signUpButton}
              onClick={() => setShowSignUp(true)}
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>

      {/* Modal Sign Up */}
      <SignUpModal show={showSignUp} onClose={() => setShowSignUp(false)} />
    </div>
  );
};

export default LoginPage;
