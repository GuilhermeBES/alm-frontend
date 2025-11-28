import { describe, it, expect, vi, beforeEach } from 'vitest';
import ApiService from './ApiService';
import { mockWallet, mockForecastResponse } from '../tests/mocks/apiMocks';

// This tells Vitest to replace the real ApiService with the manual mock
// located in src/services/__mocks__/ApiService.ts
vi.mock('./ApiService');

describe('ApiService Manual Mock', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('get method should be mockable', async () => {
    (ApiService.get as vi.Mock).mockResolvedValue(mockWallet);

    const result = await ApiService.get('/portfolio');
    
    expect(ApiService.get).toHaveBeenCalledWith('/portfolio');
    expect(result).toEqual(mockWallet);
  });

  it('getHTML method should be mockable', async () => {
    (ApiService.getHTML as vi.Mock).mockResolvedValue('<html></html>');
    
    const result = await ApiService.getHTML('/notebook');

    expect(ApiService.getHTML).toHaveBeenCalledWith('/notebook');
    expect(result).toBe('<html></html>');
  });

  it('forecast method should be mockable', async () => {
    (ApiService.forecast as vi.Mock).mockResolvedValue(mockForecastResponse);
    const requestData = { ticker: 'TEST', p: 1, d: 1, q: 1, n_steps: 1 };

    const result = await ApiService.forecast(requestData);

    expect(ApiService.forecast).toHaveBeenCalledWith(requestData);
    expect(result).toEqual(mockForecastResponse);
  });

  it('get method should handle rejections', async () => {
    (ApiService.get as vi.Mock).mockRejectedValue(new Error('API Error'));

    await expect(ApiService.get('/error')).rejects.toThrow('API Error');
  });
});
