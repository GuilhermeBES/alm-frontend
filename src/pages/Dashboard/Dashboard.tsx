import { useState, useEffect } from 'react';
import { BarChart3, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardNavbar from '../../components/Dashboard/DashboardNavbar';
import MetricCard from '../../components/Dashboard/MetricCard';
import ChartsSection from '../../components/Dashboard/ChartsSection';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data - substituir por dados reais da API depois
  const [metrics, setMetrics] = useState({
    totalActions: 1234,
    pendingActions: 45,
    completedActions: 1189,
    successRate: 96.4,
  });

  const [chartData, setChartData] = useState({
    lineData: [
      { month: 'Jan', actions: 65 },
      { month: 'Fev', actions: 78 },
      { month: 'Mar', actions: 90 },
      { month: 'Abr', actions: 81 },
      { month: 'Mai', actions: 95 },
      { month: 'Jun', actions: 105 },
    ],
    pieData: [
      { name: 'Concluídas', value: 1189, color: '#00FF00' },
      { name: 'Pendentes', value: 45, color: '#FFD700' },
    ],
  });

  return (
    <div className={styles.container}>
      {/* Navbar Superior */}
      <DashboardNavbar />

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Welcome Section */}
        <div className={styles.welcomeSection}>
          <h1 className={styles.welcomeTitle}>
            Bem-vindo, {user?.name || 'Usuário'}!
          </h1>
          <p className={styles.welcomeSubtitle}>
            Aqui está um resumo das suas atividades
          </p>
        </div>

        {/* Metrics Grid */}
        <div className={styles.metricsGrid}>
          <MetricCard
            title="Total de Ações"
            value={metrics.totalActions}
            icon={BarChart3}
            color="#00FF00"
          />
          <MetricCard
            title="Ações Pendentes"
            value={metrics.pendingActions}
            icon={Clock}
            color="#FFD700"
          />
          <MetricCard
            title="Ações Concluídas"
            value={metrics.completedActions}
            icon={CheckCircle2}
            color="#00FF00"
          />
          <MetricCard
            title="Taxa de Sucesso"
            value={`${metrics.successRate}%`}
            icon={TrendingUp}
            color="#00FF00"
          />
        </div>

        {/* Charts Section */}
        <ChartsSection lineData={chartData.lineData} pieData={chartData.pieData} />
      </main>
    </div>
  );
};

export default Dashboard;
