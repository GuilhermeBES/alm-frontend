import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import styles from './RiskSection.module.css';

interface RiskData {
  category: string;
  value: number;
  description: string;
}

interface RiskSectionProps {
  data?: RiskData[];
}

// Dados mockados baseados na imagem
const generateMockData = (): RiskData[] => {
  return [
    {
      category: 'Investimentos',
      value: 85,
      description:
        'Risco associado à volatilidade do mercado de ações e fundos de investimento.',
    },
    {
      category: 'Países',
      value: 70,
      description:
        'Exposição a riscos geopolíticos e econômicos de diferentes regiões.',
    },
    {
      category: 'Câmbio',
      value: 60,
      description: 'Impacto das variações cambiais nos ativos internacionais.',
    },
    {
      category: 'Taxas',
      value: 50,
      description: 'Sensibilidade das carteiras às mudanças nas taxas de juros.',
    },
    {
      category: 'Criptomoedas',
      value: 75,
      description: 'Alta volatilidade e risco associado aos ativos digitais.',
    },
    {
      category: 'Concentração',
      value: 65,
      description: 'Risco de concentração excessiva em poucos ativos ou setores.',
    },
  ];
};

const RiskSection = ({ data }: RiskSectionProps) => {
  const riskData = data || generateMockData();

  return (
    <div className={styles.riskSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Riscos</h2>
      </div>

      <div className={styles.content}>
        {/* Monitoramento de riscos header */}
        <div className={styles.chartHeader}>
          <h3 className={styles.chartTitle}>Monitoramento de riscos</h3>
          <div className={styles.controls}>
            <button className={styles.controlButton}>Hoje</button>
            <button className={styles.controlButton}>1m</button>
            <button className={styles.controlButton}>3m</button>
            <button className={styles.controlButton}>1a</button>
            <button className={`${styles.controlButton} ${styles.active}`}>Total</button>
          </div>
        </div>

        {/* Chart and Details Layout */}
        <div className={styles.layout}>
          {/* Bar Chart */}
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={riskData}
                margin={{ top: 20, right: 10, left: 10, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#3A4150" vertical={false} />
                <XAxis
                  dataKey="category"
                  stroke="#FFFFFF"
                  tick={{ fill: '#FFFFFF', fontSize: 10 }}
                  tickLine={false}
                  axisLine={{ stroke: '#FFFFFF' }}
                  angle={-45}
                  textAnchor="end"
                  height={70}
                />
                <YAxis
                  stroke="#FFFFFF"
                  tick={{ fill: '#FFFFFF', fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: '#FFFFFF' }}
                  domain={[0, 100]}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {riskData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill="#5CDBD9" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Details */}
          <div className={styles.detailsContainer}>
            <div className={styles.detailsHeader}>
              <span className={styles.detailsTitle}>Categoria</span>
              <span className={styles.detailsTitle}>Nível (0-1)</span>
              <span className={styles.detailsTitle}>Descrição</span>
            </div>
            <div className={styles.detailsList}>
              {riskData.map((risk, index) => (
                <div key={index} className={styles.detailItem}>
                  <div className={styles.categoryName}>{risk.category}</div>
                  <div className={styles.riskLevel}>{(risk.value / 100).toFixed(2)}</div>
                  <div className={styles.description}>{risk.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskSection;
