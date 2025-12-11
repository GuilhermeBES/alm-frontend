import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../tests/utils/test-utils';
import AdminPage from './AdminPage';

vi.mock('../../components/PieChartComponent', () => ({
  __esModule: true,
  default: ({ label }: { label?: unknown }) => (
    <div data-testid="pie-chart">{String(label ?? '')}</div>
  ),
}));

const getMock = vi.fn();
const forecastMock = vi.fn();

vi.mock('../../services/ApiService', () => ({
  apiService: {
    get: (...args: any[]) => getMock(...args),
    forecast: (...args: any[]) => forecastMock(...args),
  },
  apiUrl: 'http://localhost:8000',
}));

describe('AdminPage', () => {
  const wallet = {
    portfolio: [{ name: 'AAPL', allocation: 0.5, historicalAnnualReturn: 0, historicalAnnualVolatility: 0, forecastAnnualReturn: 0, forecastAnnualVolatility: 0 }],
    plotBase64: 'base64wallet',
  };
  const cash = { invested: 1000, inCash: 500 };

  beforeEach(() => {
    vi.clearAllMocks();
    getMock.mockImplementation((endpoint: string) => {
      if (endpoint === '/portfolio-allocation') return Promise.resolve(wallet);
      if (endpoint === '/cash-value') return Promise.resolve(cash);
      return Promise.resolve({ notebook_html: '<div>report</div>' });
    });
    forecastMock.mockResolvedValue({ plot_base64: 'imgdata', forecast_dates: [], forecast_values: [] });
  });

  it('carrega dados iniciais e renderiza seções', async () => {
    render(<AdminPage />);

    expect(await screen.findByText('Administração')).toBeInTheDocument();
    expect(await screen.findByText('Carteira')).toBeInTheDocument();
    expect(getMock).toHaveBeenCalledWith('/portfolio-allocation');
    expect(getMock).toHaveBeenCalledWith('/cash-value');
  });

  it('executa forecast ao clicar no botão', async () => {
    render(<AdminPage />);

    fireEvent.click(await screen.findByText('Gerar Previsão'));

    await waitFor(() => expect(forecastMock).toHaveBeenCalled());
    const call = forecastMock.mock.calls.at(0);
    expect(call?.[0]).toBe('sarima');
    expect(call?.[1]).toMatchObject({ ticker: 'GLD', n_steps: 7 });

    expect(await screen.findByAltText('Forecast Plot')).toBeInTheDocument();
  });

  it('exibe alerta quando forecast falha', async () => {
    forecastMock.mockRejectedValueOnce(new Error('Failed to generate forecast'));

    render(<AdminPage />);

    fireEvent.click(await screen.findByText('Gerar Previsão'));

    expect(await screen.findByText('Failed to generate forecast')).toBeInTheDocument();
  });
});
