import { describe, it, expect, vi } from 'vitest';
import { render } from '../tests/utils/test-utils';
import LineChartComponent from './LineChartComponent';

// Mock all used recharts components to prevent context errors
vi.mock('recharts', async () => {
  const actual = await vi.importActual('recharts');
  return {
    ...actual,
    ResponsiveContainer: ({ children }) => <div className="responsive-container">{children}</div>,
    LineChart: ({ children }) => <div className="line-chart">{children}</div>,
    XAxis: () => <div className="x-axis" />,
    YAxis: () => <div className="y-axis" />,
    CartesianGrid: () => <div className="cartesian-grid" />,
    Tooltip: () => <div className="tooltip" />,
    Line: () => <div className="line" />,
  };
});

describe('LineChartComponent', () => {
  const mockData = [
    { date: '2024-01-01', price: 100 },
    { date: '2024-01-02', price: 105 },
    { date: '2024-01-03', price: 103 },
  ];

  it('renders without crashing', () => {
    expect(() => render(<LineChartComponent data={mockData} />)).not.toThrow();
  });
});
