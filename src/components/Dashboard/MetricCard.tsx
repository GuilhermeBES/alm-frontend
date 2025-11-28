import { LucideIcon } from 'lucide-react';
import styles from './MetricCard.module.css';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

const MetricCard = ({ title, value, icon: Icon, color }: MetricCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer} style={{ backgroundColor: `${color}20` }}>
        <Icon className={styles.icon} style={{ color: color }} size={32} strokeWidth={2.5} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.value} style={{ color: color }}>
          {value}
        </p>
      </div>
    </div>
  );
};

export default MetricCard;
