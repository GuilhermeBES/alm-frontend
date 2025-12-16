import styles from './MetricCard.module.css';

interface MetricCardProps {
  title: string;
  value: string;
  currency?: string;
}

const MetricCard = ({ title, value, currency = 'R$' }: MetricCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.valueContainer}>
          {currency && <span className={styles.currency}>{currency}</span>}
          <p className={styles.value}>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
