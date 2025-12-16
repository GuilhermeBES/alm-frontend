import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AllocationData {
  category: string;
  value: number;
  color: string;
}

interface AllocationBarChartProps {
  data?: AllocationData[];
}

// Dados mockados baseados na imagem
const generateMockData = (): AllocationData[] => {
  return [
    { category: 'Cryptocurrencies', value: 90000, color: '#5CDBD9' },
    { category: 'E-commerce', value: 75000, color: '#5CDBD9' },
    { category: 'Retail', value: 60000, color: '#5CDBD9' },
    { category: 'Energy', value: 70000, color: '#5CDBD9' },
  ];
};

const AllocationBarChart = ({ data }: AllocationBarChartProps) => {
  const chartData = data || generateMockData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  interface CustomTooltipProps {
    active?: boolean;
    payload?: {
      value: number;
      payload: AllocationData;
    }[];
    label?: string | number;
  }

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: '#32363D',
            border: '1px solid #FFFFFF',
            borderRadius: '8px',
            padding: '12px',
          }}
        >
          <p style={{ color: '#FFFFFF', margin: 0, fontSize: '14px', fontWeight: 600 }}>
            {payload[0].payload.category}
          </p>
          <p style={{ color: '#5CDBD9', margin: '4px 0 0 0', fontSize: '13px' }}>
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#3A4150" vertical={false} />
        <XAxis
          dataKey="category"
          stroke="#FFFFFF"
          tick={{ fill: '#FFFFFF', fontSize: 11 }}
          tickLine={false}
          axisLine={{ stroke: '#FFFFFF' }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis
          tickFormatter={(value) => formatCurrency(value)}
          stroke="#FFFFFF"
          tick={{ fill: '#FFFFFF', fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#FFFFFF' }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(92, 219, 217, 0.1)' }} />
        <Bar
          dataKey="value"
          radius={[8, 8, 0, 0]}
          maxBarSize={80}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AllocationBarChart;
