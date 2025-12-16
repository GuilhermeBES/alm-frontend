import { useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo.png';
import styles from './SignUpModal.module.css';

interface SignUpModalProps {
  show: boolean;
  onClose: () => void;
}

const SignUpModal = ({ show, onClose }: SignUpModalProps) => {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    birthday: '',
    something: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const validateForm = (): boolean => {
    // Validar campos obrigatórios
    if (!formData.fullName || !formData.username || !formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email inválido');
      return false;
    }

    // Validar senha
    if (formData.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return false;
    }

    // Validar confirmação de senha
    if (formData.password !== formData.repeatPassword) {
      setError('As senhas não coincidem');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setError(null);
    setLoading(true);

    try {
      await register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      // Fechar modal após sucesso
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      birthday: '',
      something: '',
    });
    setError(null);
    onClose();
  };

  if (!show) return null;

  return (
    <div className={styles.overlay} onClick={handleCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <img src={logo} alt="ALM ChatBot" className={styles.logo} />
          <h2 className={styles.title}>Sign Up</h2>
        </div>

        {/* Error */}
        {error && (
          <Alert variant="danger" className={styles.alert}>
            {error}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            {/* Full Name */}
            <div className={styles.inputGroup}>
              <label htmlFor="fullName" className={styles.label}>
                Full name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full name"
                className={styles.input}
                required
                disabled={loading}
              />
            </div>

            {/* Username */}
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.label}>
                username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username"
                className={styles.input}
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                e-mail *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className={styles.input}
                required
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password *
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

            {/* Repeat Password */}
            <div className={styles.inputGroup}>
              <label htmlFor="repeatPassword" className={styles.label}>
                Repeat Password *
              </label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={styles.input}
                required
                disabled={loading}
              />
            </div>

            {/* Birthday */}
            <div className={styles.inputGroup}>
              <label htmlFor="birthday" className={styles.label}>
                Birthday
              </label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className={styles.input}
                disabled={loading}
              />
            </div>

            {/* Something (dropdown) */}
            <div className={styles.inputGroup}>
              <label htmlFor="something" className={styles.label}>
                Something
              </label>
              <select
                id="something"
                name="something"
                value={formData.something}
                onChange={handleChange}
                className={styles.input}
                disabled={loading}
              >
                <option value="">Selecione...</option>
                <option value="option1">Opção 1</option>
                <option value="option2">Opção 2</option>
                <option value="option3">Opção 3</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.signUpButton}
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
                  Criando conta...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
