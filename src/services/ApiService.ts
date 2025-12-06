import axios, { AxiosResponse } from 'axios';

import { ForecastRequest } from './interfaces';

export const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Realiza uma requisição GET para a URL fornecida.
   * @param endpoint O endpoint relativo (exemplo: `/dados`).
   * @param params Parâmetros de consulta (opcional).
   */
  async get<T>(
    endpoint: string,
    params?: Record<string, string | number>
  ): Promise<T> {
    try {
      const url = new URL(`${this.baseUrl}${endpoint}`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, String(value));
        });
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw { status: response.status, message: response.statusText };
      }

      return (await response.json()) as T;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getHTML(endpoint: string): Promise<string> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw { status: response.status, message: response.statusText };
      }
      return await response.text(); // Obtém o HTML como texto
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async forecast<T>(type: string, data: ForecastRequest): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.post(
        `${this.baseUrl}/forecast/${type}`,
        data
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.detail || error.message);
      }
      throw error;
    }
  }
}

export const apiService = new ApiService(apiUrl);
