import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import ApiService from './ApiService';
import { mockWallet, mockCashValue, mockForecastResponse } from '../tests/mocks/apiMocks';

vi.mock('axios');

describe('ApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('get', () => {
    it('makes GET request and returns data', async () => {
      const mockAxios = axios as any;
      mockAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: mockWallet }),
      });

      const result = await ApiService.get('/portfolio-allocation');
      expect(result).toEqual(mockWallet);
    });

    it('throws error on failed request', async () => {
      const mockAxios = axios as any;
      mockAxios.create.mockReturnValue({
        get: vi.fn().mockRejectedValue(new Error('Network error')),
      });
      mockAxios.isAxiosError = vi.fn().mockReturnValue(false);

      await expect(ApiService.get('/portfolio-allocation')).rejects.toThrow();
    });

    it('handles axios error with detail message', async () => {
      const mockAxios = axios as any;
      const axiosError = {
        response: {
          data: {
            detail: 'Not found',
          },
        },
      };

      mockAxios.create.mockReturnValue({
        get: vi.fn().mockRejectedValue(axiosError),
      });
      mockAxios.isAxiosError = vi.fn().mockReturnValue(true);

      await expect(ApiService.get('/portfolio-allocation')).rejects.toThrow(
        'Not found'
      );
    });
  });

  describe('getHTML', () => {
    it('makes GET request for HTML content', async () => {
      const mockAxios = axios as any;
      const htmlContent = '<html><body>Test</body></html>';

      mockAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: htmlContent }),
      });

      const result = await ApiService.getHTML('/riskNotebook?notebookName=test');
      expect(result).toBe(htmlContent);
    });

    it('uses correct headers for HTML request', async () => {
      const mockAxios = axios as any;
      const getMock = vi.fn().mockResolvedValue({ data: '<html></html>' });

      mockAxios.create.mockReturnValue({
        get: getMock,
      });

      await ApiService.getHTML('/test');

      expect(getMock).toHaveBeenCalledWith(
        '/test',
        expect.objectContaining({
          headers: { Accept: 'text/html' },
        })
      );
    });
  });

  describe('forecast', () => {
    it('makes POST request with forecast data', async () => {
      const mockAxios = axios as any;
      const postMock = vi.fn().mockResolvedValue({ data: mockForecastResponse });

      mockAxios.create.mockReturnValue({
        post: postMock,
      });

      const requestData = {
        ticker: 'PETR4.SA',
        p: 1,
        d: 1,
        q: 1,
        n_steps: 30,
      };

      const result = await ApiService.forecast(requestData);

      expect(postMock).toHaveBeenCalledWith('/forecast/sarima', requestData);
      expect(result).toEqual(mockForecastResponse);
    });

    it('throws error on failed forecast', async () => {
      const mockAxios = axios as any;
      mockAxios.create.mockReturnValue({
        post: vi.fn().mockRejectedValue(new Error('Forecast failed')),
      });
      mockAxios.isAxiosError = vi.fn().mockReturnValue(false);

      const requestData = {
        ticker: 'INVALID',
        p: 1,
        d: 1,
        q: 1,
        n_steps: 30,
      };

      await expect(ApiService.forecast(requestData)).rejects.toThrow();
    });
  });
});
