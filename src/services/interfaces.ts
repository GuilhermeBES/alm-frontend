export interface Wallet {
  portfolio: Asset[];
  plotBase64: string;
}

export interface CashValue {
  invested: number;
  inCash: number;
}

export interface Asset {
  ticker: string;
  name: string;
  allocation: number;
  historicalAnnualReturn: number;
  historicalAnnualVolatility: number;
  forecastAnnualReturn: number;
  forecastAnnualVolatility: number;
}

export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4567"];

export interface TimeSeriesData {
  dates: string[];
  values: number[];
}

export interface ForecastRequest {
  ticker: string;
  n_steps: number;
  order?: [number, number, number];
  seasonal_order?: [number, number, number, number];
  days?: number;
}

export interface ForecastResponse {
  ticker: string;
  forecast_dates: string[];
  forecast_values: number[];
  plot_base64?: string;
  metrics?: {
    [key: string]: number;
  };
}

export interface RiskNotebookResponse {
  notebook_html: string;
}

export interface RiskReport {
  html: string;
}

// Authentication interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
