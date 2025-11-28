import { useEffect, useState } from 'react';
import { Maximize2, TrendingUp, TrendingDown } from 'lucide-react';
import Sidebar from '../../components/Dashboard/Sidebar';
import MetricCard from '../../components/Dashboard/MetricCard';
import AccumulationChart from '../../components/Dashboard/AccumulationChart';
import MonthlyDataTable from '../../components/Dashboard/MonthlyDataTable';
import AllocationBarChart from '../../components/Dashboard/AllocationBarChart';
import RiskSection from '../../components/Dashboard/RiskSection';
import { apiService } from '../../services/ApiService';
import { Asset } from '../../services/interfaces';
import { useAuth } from '../../hooks/useAuth';
import styles from './Dashboard.module.css';

// Mock data for portfolio (não usado no momento, mas mantido para referência futura)
/*
const portfolioData = {
  "name": "Portfolio",
  "color": "hsl(120, 70%, 50%)",
  "children": [
    {
      "name": "Ações",
      "color": "hsl(150, 70%, 50%)",
      "children": [
        {
          "name": "PETR4",
          "value": 15000,
          "color": "hsl(150, 80%, 45%)",
        },
        {
          "name": "VALE3",
          "value": 12000,
          "color": "hsl(150, 75%, 50%)",
        },
        {
          "name": "ITUB4",
          "value": 8000,
          "color": "hsl(150, 70%, 55%)",
        }
      ]
    },
    {
      "name": "Renda Fixa",
      "color": "hsl(200, 70%, 50%)",
      "children": [
        {
          "name": "Tesouro Selic",
          "value": 25000,
          "color": "hsl(200, 75%, 50%)",
        },
        {
          "name": "CDB",
          "value": 10000,
          "color": "hsl(200, 70%, 55%)",
        }
      ]
    },
    {
      "name": "Fundos",
      "color": "hsl(250, 70%, 50%)",
      "children": [
        {
          "name": "Fundo Multimercado",
          "value": 15000,
          "color": "hsl(250, 75%, 50%)",
        },
        {
          "name": "Fundo Imobiliário",
          "value": 5000,
          "color": "hsl(250, 70%, 55%)",
        }
      ]
    }
  ]
};
*/

// Mock data for investments table
const investmentsData = [
  { ticker: 'PETR4', percentage: '40%', value: '1.521.568,00', total: '2.130.195,20' },
  { ticker: 'BTC', percentage: '20%', value: '760.784,00', total: '989.019,20' },
  { ticker: 'ITUB4', percentage: '10%', value: '380.392,00', total: '456.470,40' },
  { ticker: 'VALE3', percentage: '10%', value: '380.392,00', total: '494.509,60' },
  { ticker: 'MGLU3', percentage: '05%', value: '190.196,00', total: '247.254,80' },
  { ticker: 'FESA4', percentage: '05%', value: '190.196,00', total: '228.235,20' },
];

const Dashboard = () => {
  const [portfolioAssets, setPortfolioAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const response = await apiService.get<{ portfolio: Asset[] }>(`/api/v1/portfolio/${currentUser.id}`);
        setPortfolioAssets(response.portfolio);
      } catch (error) {
        console.error('Erro ao buscar dados do portfólio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [currentUser]);

  // Formata valor em reais
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Formata porcentagem
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  // Determina cor baseada no retorno
  const getHeatmapColor = (annualReturn: number) => {
    if (annualReturn > 0.15) return '#2BA84A'; // Verde forte (>15%)
    if (annualReturn > 0.05) return '#4CAF50'; // Verde médio (5-15%)
    if (annualReturn > 0) return '#66BB6A'; // Verde claro (0-5%)
    if (annualReturn > -0.05) return '#FFA726'; // Laranja (-5% a 0%)
    return '#EF5350'; // Vermelho (<-5%)
  };

  // Calcula valor total investido por ação (baseado na alocação)
  const calculateInvestmentValue = (asset: Asset) => {
    const portfolioTotal = 100000; // Valor total mockado do portfólio
    return (asset.allocation / 100) * portfolioTotal;
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Breadcrumb Bar */}
        <div className={styles.breadcrumbBar}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbItem}>Perfil</span>
            <span className={styles.breadcrumbSeparator}>{'>'}</span>
            <span className={styles.breadcrumbItemActive}>Dashboard</span>
          </div>
        </div>

        {/* Content Area */}
        <div className={styles.contentArea}>
          {/* Dashboard Header */}
          <div className={styles.dashboardHeader}>
            <h1 className={styles.dashboardTitle}>Dashboard</h1>
            <div className={styles.headerLine}></div>
          </div>

          {/* Metrics Grid */}
          <div className={styles.metricsGrid}>
            <MetricCard
              title="Montante"
              value="3.803.920 ,00"
            />
            <MetricCard
              title="Aporte"
              value="373.000 ,00"
            />
            <MetricCard
              title="Capitalização média"
              value="1,2 %"
              currency="a.m."
            />
            <MetricCard
              title="Fundos"
              value="3.920 ,00"
            />
          </div>

          {/* Two Column Layout */}
          <div className={styles.twoColumnLayout}>
            {/* Left Column - Chart */}
            <div className={styles.leftColumn}>
              <div className={styles.chartSection}>
                <div className={styles.chartHeader}>
                  <h3 className={styles.sectionTitle}>Fase de acumulação</h3>
                  <button className={styles.expandButton}>
                    <Maximize2 size={24} />
                  </button>
                </div>
                <div className={styles.chartLine}></div>

                {/* Chart Filters */}
                <div className={styles.chartFilters}>
                  <div className={styles.filterGroup}>
                    <button className={styles.filterButton}>Hoje</button>
                    <button className={styles.filterButton}>1m</button>
                    <button className={styles.filterButton}>3m</button>
                    <button className={styles.filterButton}>1a</button>
                    <button className={`${styles.filterButton} ${styles.filterButtonActive}`}>Total</button>
                  </div>
                </div>

                <div className={styles.chartContainer}>
                  <AccumulationChart />
                </div>

                {/* Monthly Data Table */}
                <MonthlyDataTable />
              </div>
            </div>

            {/* Right Column - Tables */}
            <div className={styles.rightColumn}>
              {/* Investimentos Table */}
              <div className={styles.tableSection}>
                <div className={styles.tableCard}>
                  <h3 className={styles.tableSectionTitle}>Investimentos</h3>
                  <div className={styles.tableLine}></div>

                  {/* Header Tags */}
                  <div className={styles.tableHeaderTags}>
                    <span className={styles.headerTag}>Ação</span>
                    <span className={styles.headerTag}>% da carteira</span>
                    <span className={styles.headerTag}>investido</span>
                    <span className={styles.headerTag}>retorno</span>
                  </div>

                  <table className={styles.investmentsTable}>
                    <thead>
                      <tr>
                        <th>Ticker</th>
                        <th>%</th>
                        <th>Valor</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {investmentsData.map((item) => (
                        <tr key={item.ticker}>
                          <td className={styles.tickerCell}>{item.ticker}</td>
                          <td>{item.percentage}</td>
                          <td>{item.value}</td>
                          <td>{item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Heatmap Section - COM DADOS REAIS */}
              <div className={styles.tableSection}>
                <div className={styles.heatmapCard}>
                  <h3 className={styles.heatmapTitle}>Heatmap - Desempenho</h3>
                  <div className={styles.heatmapLine}></div>

                  {loading ? (
                    <div style={{ color: '#FFFFFF', padding: '20px', textAlign: 'center' }}>
                      Carregando dados reais...
                    </div>
                  ) : (
                    <div className={styles.heatmapGrid}>
                      {portfolioAssets
                        .sort((a, b) => b.allocation - a.allocation) // Ordena por alocação
                        .map((asset, index) => {
                          const totalValue = calculateInvestmentValue(asset);
                          const isPositive = asset.historicalAnnualReturn > 0;

                          return (
                            <div
                              key={asset.ticker}
                              className={styles.heatmapItem}
                              style={{
                                backgroundColor: getHeatmapColor(asset.historicalAnnualReturn),
                                gridColumn: index === 0 ? '1' : 'auto',
                                gridRow: index === 0 ? '1 / 3' : 'auto',
                              }}
                            >
                              <div>
                                <div className={styles.heatmapLabel}>
                                  {asset.ticker.replace('.SA', '')}
                                  {isPositive ? (
                                    <TrendingUp size={14} style={{ marginLeft: '4px', display: 'inline' }} />
                                  ) : (
                                    <TrendingDown size={14} style={{ marginLeft: '4px', display: 'inline' }} />
                                  )}
                                </div>
                                <div className={styles.heatmapValue}>
                                  {formatCurrency(totalValue)}
                                </div>
                              </div>
                              <div>
                                <div className={styles.heatmapPercentage}>
                                  {formatPercentage(asset.allocation)}
                                </div>
                                <div className={styles.heatmapTotal}>
                                  {formatCurrency(totalValue)}
                                </div>
                                <div className={styles.heatmapReturn}>
                                  {isPositive ? '+' : ''}{formatPercentage(asset.historicalAnnualReturn)} a.a.
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Investment Allocation Section */}
          <div className={styles.allocationSection}>
            <div className={styles.chartSection}>
              <div className={styles.chartHeader}>
                <h3 className={styles.sectionTitle}>Investment Allocation</h3>
                <button className={styles.expandButton}>
                  <Maximize2 size={24} />
                </button>
              </div>
              <div className={styles.chartLine}></div>

              <div className={styles.allocationChartContainer}>
                <AllocationBarChart />
              </div>
            </div>
          </div>

          {/* Risk Section */}
          <RiskSection />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
