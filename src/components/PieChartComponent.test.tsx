import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../tests/utils/test-utils';
import PieChartComponent from './PieChartComponent';

// Mock all used recharts components to prevent context errors
// We also want to capture the props passed to Pie
let pieProps: any = {};
const MockPie = (props: any) => {
  pieProps = props;
  return <div className="pie">{props.children}</div>;
};

vi.mock('recharts', async () => {
  const actual = await vi.importActual('recharts');
  return {
    ...actual,
    ResponsiveContainer: ({ children }) => <div className="responsive-container">{children}</div>,
    PieChart: ({ children }) => <div className="pie-chart">{children}</div>,
    Pie: (props: any) => <MockPie {...props} />,
    Cell: () => <div className="cell" />,
    Tooltip: () => <div className="tooltip" />,
    Legend: () => <div className="legend" />,
  };
});

describe('PieChartComponent', () => {
  it('renders without crashing', () => {
    expect(() => render(<PieChartComponent />)).not.toThrow();
  });

  it('renders label when provided', () => {
    const label = 'Total: R$ 100.000';
    render(<PieChartComponent label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('generates random data with correct number of slices when no data is provided', () => {
    render(<PieChartComponent slices={3} />);
    
    // The MockPie component captures the props passed to the real Pie component.
    // We can inspect these props to verify the component's logic.
    expect(pieProps.data).toBeInstanceOf(Array);
    expect(pieProps.data).toHaveLength(3);
    // Check if the values are numbers and sum to ~100
    const totalValue = pieProps.data.reduce((acc, item) => acc + item.value, 0);
    expect(typeof pieProps.data[0].value).toBe('number');
    expect(totalValue).toBeGreaterThan(95); // Randomness might not be exactly 100
    expect(totalValue).toBeLessThan(105);
  });
});
