import { Maximize2 } from 'lucide-react';
import Sidebar from '../../components/Dashboard/Sidebar';
import MetricCard from '../../components/Dashboard/MetricCard';
import SunburstChart from '../../components/Dashboard/SunburstChart';
import styles from './Dashboard.module.css';

// Mock data for portfolio
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
                  <SunburstChart data={portfolioData} />
                </div>
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

              {/* Heatmap Section */}
              <div className={styles.tableSection}>
                <div className={styles.heatmapCard}>
                  <h3 className={styles.heatmapTitle}>Heatmap</h3>
                  <div className={styles.heatmapLine}></div>

                  <div className={styles.heatmapGrid}>
                    {/* PETR4 - Large Green */}
                    <div className={`${styles.heatmapItem} ${styles.heatmapGreen}`}>
                      <div className={styles.heatmapLabel}>PETR4</div>
                      <div className={styles.heatmapValue}>R$ 32,88</div>
                      <div className={styles.heatmapPercentage}>40%</div>
                      <div className={styles.heatmapTotal}>R$ 2.130.195,20</div>
                    </div>

                    {/* BTC - Small Dark */}
                    <div className={`${styles.heatmapItem} ${styles.heatmapDark}`}>
                      <div className={styles.heatmapLabel}>BTC</div>
                      <div className={styles.heatmapValue}>R$ 540.657,00</div>
                      <div className={styles.heatmapPercentage}>20%</div>
                      <div className={styles.heatmapTotal}>R$ 989.019,20</div>
                    </div>

                    {/* ITUB4 - Small Dark */}
                    <div className={`${styles.heatmapItem} ${styles.heatmapDark}`}>
                      <div className={styles.heatmapLabel}>ITUB4</div>
                      <div className={styles.heatmapValue}>R$ 37,77</div>
                      <div className={styles.heatmapPercentage}>10%</div>
                      <div className={styles.heatmapTotal}>R$ 456.470,40</div>
                    </div>

                    {/* VALE3 - Medium Dark */}
                    <div className={`${styles.heatmapItem} ${styles.heatmapDark}`}>
                      <div className={styles.heatmapLabel}>VALE3</div>
                      <div className={styles.heatmapValue}>R$ 59,59</div>
                      <div className={styles.heatmapPercentage}>10%</div>
                      <div className={styles.heatmapTotal}>R$ 494.509,60</div>
                    </div>

                    {/* FESA4 - Tiny Dark */}
                    <div className={`${styles.heatmapItem} ${styles.heatmapDark}`}>
                      <div className={styles.heatmapLabel}>FESA4</div>
                      <div className={styles.heatmapPercentage}>1,2%</div>
                    </div>

                    {/* MGLU3 - Medium Dark */}
                    <div className={`${styles.heatmapItem} ${styles.heatmapDark}`}>
                      <div className={styles.heatmapLabel}>MGLU3</div>
                      <div className={styles.heatmapValue}>R$ 8,96</div>
                      <div className={styles.heatmapPercentage}>05%</div>
                      <div className={styles.heatmapTotal}>R$ 247.254,80</div>
                    </div>

                    {/* ELET3 - Tiny Dark */}
                    <div className={`${styles.heatmapItem} ${styles.heatmapDark}`}>
                      <div className={styles.heatmapLabel}>ELET3</div>
                      <div className={styles.heatmapPercentage}>0,3%</div>
                    </div>

                    {/* AMER3 - Tiny Dark */}
                    <div className={`${styles.heatmapItem} ${styles.heatmapDark}`}>
                      <div className={styles.heatmapLabel}>AMER3</div>
                      <div className={styles.heatmapPercentage}>0,2%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
