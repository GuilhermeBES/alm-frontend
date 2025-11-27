import { Wallet, CashValue, ForecastResponse, Asset } from '../../services/interfaces';

export const mockAsset: Asset = {
  ticker: 'PETR4.SA',
  currentPrice: 38.45,
  quantity: 100,
  purchasePrice: 35.00,
  purchaseDate: '2024-01-15',
  historicalData: [
    { date: '2024-01-01', price: 35.00 },
    { date: '2024-01-02', price: 35.50 },
    { date: '2024-01-03', price: 36.00 },
  ],
  forecastData: [
    { date: '2024-02-01', price: 39.00 },
    { date: '2024-02-02', price: 39.50 },
  ],
};

export const mockWallet: Wallet = {
  portfolio: [
    mockAsset,
    {
      ...mockAsset,
      ticker: 'VALE3.SA',
      currentPrice: 65.80,
      quantity: 50,
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
  forecast: [39.0, 39.5, 40.0, 40.5, 41.0],
  dates: ['2024-02-01', '2024-02-02', '2024-02-03', '2024-02-04', '2024-02-05'],
  plotBase64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
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
