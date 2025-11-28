import { Wallet, CashValue, ForecastResponse, Asset } from '../../services/interfaces';

export const mockAsset: Asset = {
  ticker: 'PETR4.SA',
  name: 'Petrobras PN',
  allocation: 38.45,
  historicalAnnualReturn: 12.5,
  historicalAnnualVolatility: 18.3,
  forecastAnnualReturn: 14.2,
  forecastAnnualVolatility: 16.8,
};

export const mockWallet: Wallet = {
  portfolio: [
    mockAsset,
    {
      ...mockAsset,
      ticker: 'VALE3.SA',
      name: 'Vale ON',
      allocation: 65.80,
    },
  ],
  plotBase64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
};

export const mockCashValue: CashValue = {
  invested: 150000.00,
  inCash: 25000.00,
};

export const mockForecastResponse: ForecastResponse = {
  ticker: 'PETR4.SA',
  forecast_dates: ['2024-02-01', '2024-02-02', '2024-02-03', '2024-02-04', '2024-02-05'],
  forecast_values: [39.0, 39.5, 40.0, 40.5, 41.0],
  plot_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
};

export const mockStocks = [
  {
    ticker: 'PETR4',
    name: 'Petrobras PN',
    sector: 'Petróleo e Gás',
    currentPrice: 38.45,
    change: 2.34,
    changePercent: 2.5,
    logo: 'https://logo.clearbit.com/petrobras.com.br',
  },
  {
    ticker: 'VALE3',
    name: 'Vale ON',
    sector: 'Mineração',
    currentPrice: 65.80,
    change: -1.20,
    changePercent: -1.79,
    logo: 'https://logo.clearbit.com/vale.com',
  },
];
