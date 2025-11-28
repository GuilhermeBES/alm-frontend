import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiService } from './ApiService';
import { mockWallet, mockForecastResponse } from '../tests/mocks/apiMocks';

// This tells Vitest to replace the real ApiService with the manual mock
// located in src/services/__mocks__/ApiService.ts
vi.mock('./ApiService');

describe('ApiService Manual Mock', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('get method should be mockable', async () => {
    const getSpy = vi.spyOn(apiService, 'get').mockResolvedValue(mockWallet);

    const result = await apiService.get('/portfolio');

    expect(getSpy).toHaveBeenCalledWith('/portfolio');
    expect(result).toEqual(mockWallet);
  });

  it('getHTML method should be mockable', async () => {
    const getHTMLSpy = vi.spyOn(apiService, 'getHTML').mockResolvedValue('<html></html>');

    const result = await apiService.getHTML('/notebook');

    expect(getHTMLSpy).toHaveBeenCalledWith('/notebook');
    expect(result).toBe('<html></html>');
  });

  it('forecast method should be mockable', async () => {
    const forecastSpy = vi.spyOn(apiService, 'forecast').mockResolvedValue(mockForecastResponse);
    const requestData = { ticker: 'TEST', n_steps: 1 };

    const result = await apiService.forecast('sarima', requestData);

    expect(forecastSpy).toHaveBeenCalledWith('sarima', requestData);
    expect(result).toEqual(mockForecastResponse);
  });

  it('get method should handle rejections', async () => {
    vi.spyOn(apiService, 'get').mockRejectedValue(new Error('API Error'));

    await expect(apiService.get('/error')).rejects.toThrow('API Error');
  });
});
