import axios, { AxiosResponse } from 'axios';

import {
  ForecastRequest,
  ModelsListResponse,
  InferenceUploadResponse,
  InferenceResultResponse
} from './interfaces';

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
        `${this.baseUrl}/api/v1/forecast/${type}`,
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

  // xLSTM Inference methods
  async listModels(): Promise<ModelsListResponse> {
    return this.get<ModelsListResponse>('/api/v1/models');
  }

  async submitInference(modelName: string, file: File): Promise<InferenceUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response: AxiosResponse<InferenceUploadResponse> = await axios.post(
        `${this.baseUrl}/api/v1/inference/${modelName}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.detail || error.message);
      }
      throw error;
    }
  }

  async getInferenceResult(jobId: string): Promise<InferenceResultResponse> {
    return this.get<InferenceResultResponse>(`/api/v1/result/${jobId}`);
  }

  async pollInferenceResult(
    jobId: string,
    maxAttempts: number = 60,
    intervalMs: number = 2000
  ): Promise<InferenceResultResponse> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const result = await this.getInferenceResult(jobId);

      if (result.status === 'completed' || result.status === 'failed') {
        return result;
      }

      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }

    throw new Error('Polling timeout: inference job did not complete');
  }
}

export const apiService = new ApiService(apiUrl);
