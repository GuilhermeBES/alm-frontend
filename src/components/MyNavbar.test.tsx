import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../tests/utils/test-utils';
import MyNavbar from './MyNavbar';
import { useLocation, useNavigate } from 'react-router-dom';

// Create a persistent mock for the navigate function
const navigateMock = vi.fn();

// Mock the react-router-dom module
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock, // Return the persistent mock
    useLocation: vi.fn(),
  };
});

const useLocationMock = useLocation as vi.Mock;

describe('MyNavbar', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    useLocationMock.mockReturnValue({ pathname: '/' });
  });

  it('renders navbar logo', () => {
    render(<MyNavbar />);
    const logo = screen.getByAltText(/Logo/i);
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<MyNavbar />);
    expect(screen.getByText(/Sobre Nós/i)).toBeInTheDocument();
    expect(screen.getByText(/Dúvidas Frequentes/i)).toBeInTheDocument();
  });

  it('renders action buttons on non-admin pages', () => {
    render(<MyNavbar />);
    expect(screen.getByText(/Simular agora/i)).toBeInTheDocument();
    expect(screen.getByText(/Entrar/i)).toBeInTheDocument();
  });

  it('navigates to /admin when "Entrar" is clicked', () => {
    render(<MyNavbar />);
    const entrarButton = screen.getByText(/Entrar/i);
    fireEvent.click(entrarButton);
    expect(navigateMock).toHaveBeenCalledWith('/admin');
  });

  it('navigates to /simulacao when "Simular agora" is clicked', () => {
    render(<MyNavbar />);
    const simularButton = screen.getByText(/Simular agora/i);
    fireEvent.click(simularButton);
    expect(navigateMock).toHaveBeenCalledWith('/simulacao');
  });

  it('shows only "Voltar ao site" button on admin page and navigates to / on click', () => {
    useLocationMock.mockReturnValue({ pathname: '/admin' });
    render(<MyNavbar />);

    const voltarButton = screen.getByText(/Voltar ao site/i);
    expect(voltarButton).toBeInTheDocument();

    // Verify other buttons are not present
    expect(screen.queryByText(/Simular agora/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Entrar/i)).not.toBeInTheDocument();

    // Test navigation
    fireEvent.click(voltarButton);
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
