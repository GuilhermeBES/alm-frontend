import { vi } from 'vitest';

const ApiService = {
  get: vi.fn(),
  getHTML: vi.fn(),
  forecast: vi.fn(),
};

export default ApiService;
