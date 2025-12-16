import styles from './MonthlyDataTable.module.css';

interface MonthlyData {
  month: string;
  balance: number;
  variation: number;
}

interface MonthlyDataTableProps {
  data?: MonthlyData[];
}

// Dados mockados de exemplo
const generateMockData = (): MonthlyData[] => {
  const months = [
    'Novembro 2026',
    'Outubro 2025',
    'Setembro 2025',
    'Setembro 2025',
    'Agosto 2025',
    'Julho 2025',
  ];

  return months.map((month, index) => {
    const baseBalance = 3900000 + (months.length - index) * 50000;
    const variation = (Math.random() - 0.5) * 0.2; // -10% a +10%

    return {
      month,
      balance: baseBalance + Math.random() * 100000,
      variation,
    };
  });
};

const MonthlyDataTable = ({ data }: MonthlyDataTableProps) => {
  const tableData = data || generateMockData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${(value * 100).toFixed(2)}%`;
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Mês</th>
            <th>Saldo</th>
            <th>Variação</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className={styles.monthCell}>{row.month}</td>
              <td className={styles.balanceCell}>
                {formatCurrency(row.balance).replace('R$', 'R$ ')}
              </td>
              <td
                className={`${styles.variationCell} ${
                  row.variation >= 0 ? styles.positive : styles.negative
                }`}
              >
                {formatPercentage(row.variation)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button className={styles.pageButton}>1</button>
        <button className={styles.pageButton}>2</button>
        <button className={styles.pageButton}>3</button>
        <button className={styles.pageButton}>4</button>
        <button className={styles.pageButton}>5</button>
      </div>
    </div>
  );
};

export default MonthlyDataTable;
