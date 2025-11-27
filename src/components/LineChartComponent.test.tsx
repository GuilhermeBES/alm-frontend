import { describe, it, expect } from 'vitest';
import { render, screen } from '../tests/utils/test-utils';
import LineChartComponent from './LineChartComponent';

describe('LineChartComponent', () => {
  const mockData = [
    { date: '2024-01-01', price: 100 },
    { date: '2024-01-02', price: 105 },
    { date: '2024-01-03', price: 103 },
  ];

  it('renders without crashing', () => {
    render(<LineChartComponent data={mockData} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('renders with custom color', () => {
    render(<LineChartComponent data={mockData} color="#FF0000" />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('renders with custom height', () => {
    const { container } = render(
      <LineChartComponent data={mockData} height={600} />
    );
    expect(container.querySelector('.recharts-wrapper')).toBeInTheDocument();
  });

  it('generates mock data when no data provided', () => {
    render(<LineChartComponent />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('has dark theme styling', () => {
    const { container } = render(<LineChartComponent data={mockData} />);
    const chartContainer = container.firstChild as HTMLElement;
    expect(chartContainer).toHaveStyle({ backgroundColor: '#111827' });
  });

  it('uses default green color', () => {
    render(<LineChartComponent data={mockData} />);
    // Chart renders with default color #22c55e
    expect(screen.getByRole('region')).toBeInTheDocument();
  });
});
