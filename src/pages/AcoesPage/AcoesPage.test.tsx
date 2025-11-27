import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '../../tests/utils/test-utils';
import AcoesPage from './AcoesPage';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('AcoesPage', () => {
  it('renders page title', () => {
    render(<AcoesPage />);
    expect(screen.getByText(/Ações Disponíveis/i)).toBeInTheDocument();
  });

  it('renders view toggle buttons', () => {
    render(<AcoesPage />);
    expect(screen.getByText(/Grid/i)).toBeInTheDocument();
    expect(screen.getByText(/Lista/i)).toBeInTheDocument();
  });

  it('switches between grid and list view', () => {
    render(<AcoesPage />);
    const listButton = screen.getByText(/Lista/i);

    fireEvent.click(listButton);

    // After clicking, list button should be active
    expect(listButton.closest('button')).toHaveClass('btn-primary');
  });

  it('renders stock cards', () => {
    render(<AcoesPage />);
    // Should render at least one stock (PETR4)
    expect(screen.getByText(/PETR4/i)).toBeInTheDocument();
  });

  it('groups stocks by sector', () => {
    render(<AcoesPage />);
    expect(screen.getByText(/Petróleo e Gás/i)).toBeInTheDocument();
    expect(screen.getByText(/Mineração/i)).toBeInTheDocument();
  });

  it('displays stock prices', () => {
    render(<AcoesPage />);
    // Should display prices (R$ format)
    const prices = screen.getAllByText(/R\$/);
    expect(prices.length).toBeGreaterThan(0);
  });

  it('displays sector badges with colors', () => {
    render(<AcoesPage />);
    const badges = screen.getAllByText(/Petróleo e Gás|Mineração|Bancos/i);
    expect(badges.length).toBeGreaterThan(0);
  });

  it('shows positive and negative changes', () => {
    render(<AcoesPage />);
    // Mock data has both positive and negative changes
    const changes = screen.getAllByText(/%/);
    expect(changes.length).toBeGreaterThan(0);
  });
});
