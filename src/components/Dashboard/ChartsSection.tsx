import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styles from './ChartsSection.module.css';

interface LineDataPoint {
  month: string;
  actions: number;
}

interface PieDataPoint {
  name: string;
  value: number;
  color: string;
}

interface ChartsSectionProps {
  lineData: LineDataPoint[];
  pieData: PieDataPoint[];
}

const ChartsSection = ({ lineData, pieData }: ChartsSectionProps) => {
  return (
    <div className={styles.chartsSection}>
      {/* Line Chart */}
      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Ações por Mês</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="month"
                stroke="#FCFFFC"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="#FCFFFC" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#2D3A3A',
                  border: '1px solid #00FF00',
                  borderRadius: '8px',
                  color: '#FCFFFC',
                }}
              />
              <Legend
                wrapperStyle={{ color: '#FCFFFC', fontSize: '14px' }}
              />
              <Line
                type="monotone"
                dataKey="actions"
                stroke="#00FF00"
                strokeWidth={3}
                dot={{ fill: '#00FF00', r: 5 }}
                activeDot={{ r: 7 }}
                name="Ações"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Distribuição de Ações</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#2D3A3A',
                  border: '1px solid #00FF00',
                  borderRadius: '8px',
                  color: '#FCFFFC',
                }}
              />
              <Legend
                wrapperStyle={{ color: '#FCFFFC', fontSize: '14px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
