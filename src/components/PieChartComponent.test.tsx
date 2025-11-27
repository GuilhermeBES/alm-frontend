import { describe, it, expect } from 'vitest';
import { render, screen } from '../tests/utils/test-utils';
import PieChartComponent from './PieChartComponent';

describe('PieChartComponent', () => {
  const mockData = [
    { name: 'Ações', value: 50 },
    { name: 'Renda Fixa', value: 30 },
    { name: 'Fundos', value: 20 },
  ];

  it('renders without crashing', () => {
    render(<PieChartComponent data={mockData} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('renders with custom colors', () => {
    const customColors = ['#FF0000', '#00FF00', '#0000FF'];
    render(<PieChartComponent data={mockData} colors={customColors} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('renders center label when provided', () => {
    const centerLabel = 'Total: R$ 100.000';
    render(<PieChartComponent data={mockData} centerLabel={centerLabel} />);
    expect(screen.getByText(centerLabel)).toBeInTheDocument();
  });

  it('generates random data when no data provided', () => {
    render(<PieChartComponent />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('has dark theme background', () => {
    const { container } = render(<PieChartComponent data={mockData} />);
    const chartContainer = container.firstChild as HTMLElement;
    expect(chartContainer).toHaveStyle({ backgroundColor: '#111827' });
  });
});
