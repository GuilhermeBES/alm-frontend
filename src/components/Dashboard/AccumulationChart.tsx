import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AccumulationChartProps {
  data?: Array<{
    year: number;
    value: number;
  }>;
}

// Dados mockados de exemplo (2020-2050)
const generateMockData = () => {
  const baseValue = 100000;
  const monthlyContribution = 3000;
  const annualReturn = 0.10; // 10% ao ano

  const data = [];
  for (let year = 2020; year <= 2050; year++) {
    const yearsFromStart = year - 2020;
    // Fórmula de juros compostos com aportes mensais
    const contributions = monthlyContribution * 12 * yearsFromStart;
    const compoundGrowth = baseValue * Math.pow(1 + annualReturn, yearsFromStart);
    const totalValue = compoundGrowth + contributions;

    data.push({
      year,
      value: Math.round(totalValue),
    });
  }
  return data;
};

const AccumulationChart = ({ data }: AccumulationChartProps) => {
  const chartData = data || generateMockData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatYear = (year: number) => {
    return year.toString();
  };

  interface CustomTooltipProps {
    active?: boolean;
    payload?: {
      value: number;
      payload: { year: number; value: number; };
    }[];
    label?: string;
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
            {payload[0].payload.year}
          </p>
          <p style={{ color: '#FF6B2C', margin: '4px 0 0 0', fontSize: '13px' }}>
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#3A4150" />
        <XAxis
          dataKey="year"
          tickFormatter={formatYear}
          stroke="#FFFFFF"
          tick={{ fill: '#FFFFFF', fontSize: 12 }}
          tickLine={{ stroke: '#FFFFFF' }}
          axisLine={{ stroke: '#FFFFFF' }}
        />
        <YAxis
          tickFormatter={(value) => formatCurrency(value)}
          stroke="#FFFFFF"
          tick={{ fill: '#FFFFFF', fontSize: 12 }}
          tickLine={{ stroke: '#FFFFFF' }}
          axisLine={{ stroke: '#FFFFFF' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{
            paddingTop: '20px',
            color: '#FFFFFF',
          }}
          iconType="line"
          formatter={() => 'Aportes + Investimentos (2020-2050)'}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#FF6B2C"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6, fill: '#FF6B2C' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AccumulationChart;
