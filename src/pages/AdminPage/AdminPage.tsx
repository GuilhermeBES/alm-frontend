import { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import Sidebar from '../../components/Dashboard/Sidebar';
import SunburstChart from '../../components/Dashboard/SunburstChart';
import InferencePanel from '../../components/Inference/InferencePanel';
import { apiService, apiUrl } from '../../services/ApiService';
import {
  Asset,
  CashValue,
  ForecastRequest,
  ForecastResponse,
  RiskNotebookResponse,
  RiskReport,
  Wallet,
} from '../../services/interfaces';
import dashboardStyles from '../Dashboard/Dashboard.module.css'; // Import dashboard styles
import styles from './AdminPage.module.css';
import { useAuth } from '../../hooks/useAuth';

const AVAILABLE_TICKERS = ["GLD", "PETR4.SA", "VALE3.SA", "WEGE3.SA"];
const SARIMA_ORDER: [number, number, number] = [2, 1, 2];
const SEASONAL_ORDER: [number, number, number, number] = [1, 1, 1, 5];

const transformDataForSunburst = (wallet: Wallet | undefined) => {
  if (!wallet || !wallet.portfolio) {
    return { name: 'portfolio', children: [] };
  }
  return {
    name: 'portfolio',
    children: wallet.portfolio.map((asset: Asset) => ({
      name: asset.ticker,
      value: asset.allocation,
    })),
  };
};

const AdminPage = () => {
  const [wallet, setWallet] = useState<Wallet>();
  const [cashValue, setCashValue] = useState<CashValue>();
  const [riskReports, setRiskReports] = useState<RiskReport[]>([]);
  const [selectedTicker, setSelectedTicker] = useState<string>(AVAILABLE_TICKERS[0]);
  const [forecastResult, setForecastResult] = useState<ForecastResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth(); // Get currentUser

  const RISKS_REPORTS = [
    "investment_risk2",
    "investment_risk",
    "interest_rate_risk_liability",
    "interest_rate_risk_assets",
    "crypto_risk2",
    "country_risk",
    "country_risk",
  ];

  useEffect(() => {
    const getData = async () => {
      if (!currentUser) return; // Only fetch if user is authenticated

      apiService.get<Wallet>(`/api/v1/portfolio/${currentUser.id}`).then((res) => setWallet(res));
      apiService.get<CashValue>("/api/v1/cash-value").then((res) => setCashValue(res));
      const reports = await Promise.all(
        RISKS_REPORTS.map(async (report) => {
          const res = await apiService.get<RiskNotebookResponse>(`/api/v1/riskNotebook?notebookName=${report}`);
          return { html: res.notebook_html };
        })
      );
      setRiskReports(reports);
    };
    getData();
  }, [currentUser]);

  const handleForecast = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const request: ForecastRequest = {
        ticker: selectedTicker,
        n_steps: 7,
        order: SARIMA_ORDER,
        seasonal_order: SEASONAL_ORDER,
        days: 100,
      };
      const result = await apiService.forecast<ForecastResponse>("sarima", request);
      setForecastResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate forecast";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const sunburstData = transformDataForSunburst(wallet);

  return (
    <div className={dashboardStyles.container}>
      <Sidebar />
      <main className={dashboardStyles.mainContent}>
        <div className={dashboardStyles.breadcrumbBar}>
          <div className={dashboardStyles.breadcrumb}>
            <span className={dashboardStyles.breadcrumbItem}>Perfil</span>
            <span className={dashboardStyles.breadcrumbSeparator}>{'>'}</span>
            <span className={dashboardStyles.breadcrumbItemActive}>Admin</span>
          </div>
        </div>
        <div className={dashboardStyles.contentArea}>
          <div className={dashboardStyles.dashboardHeader}>
            <h1 className={dashboardStyles.dashboardTitle}>Administração</h1>
            <div className={dashboardStyles.headerLine}></div>
          </div>

          {/* Admin Content Starts Here */}
          <div className={styles.adminContainer}>
            <Tabs defaultActiveKey="assets" id="admin-tabs" className={styles.customTabs}>
              <Tab eventKey="assets" title="Ativos e Carteira">
                <div className={styles.tabContent}>
                  <Row>
                    <Col md={6}>
                      <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Carteira</h3>
                        <div style={{ height: '400px', width: '100%' }}>
                          <SunburstChart data={sunburstData} />
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Índice Sharpe</h3>
                        {wallet?.plotBase64 ? (
                          <img
                            className={styles.chartImage}
                            src={"data:image/png;base64," + wallet?.plotBase64}
                            alt="Índice Sharpe Plot"
                          />
                        ) : (
                          <p className={styles.noDataMessage}>
                            Gráfico do Índice Sharpe não disponível.
                            Verifique a API de alocação de portfólio.
                          </p>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                       <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Previsão SARIMA</h3>
                        <Form.Group className="mb-3">
                          <Form.Label>Selecione o Ativo</Form.Label>
                          <Form.Select
                            className={styles.customSelect}
                            value={selectedTicker}
                            onChange={(e) => setSelectedTicker(e.target.value)}
                          >
                            {AVAILABLE_TICKERS.map((ticker) => (
                              <option key={ticker} value={ticker}>{ticker}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <Button
                          onClick={handleForecast}
                          disabled={isLoading}
                          className={`${styles.customButton} mb-3`}
                        >
                          {isLoading ? "Gerando..." : "Gerar Previsão"}
                        </Button>
                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                        {forecastResult?.plot_base64 && (
                           <img
                            className={styles.chartImage}
                            src={`data:image/png;base64,${forecastResult.plot_base64}`}
                            alt="Forecast Plot"
                          />
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Valor do Fundo</h3>
                        <p className={styles.fundValue}>
                          <span>Investido:</span>
                          <span>
                            {cashValue?.invested?.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </span>
                        </p>
                        <p className={styles.fundValue}>
                          <span>Em caixa:</span>
                          <span>
                            {cashValue?.inCash?.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </span>
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Tab>

              <Tab eventKey="liabilities" title="Passivos e Relatórios">
                <div className={styles.tabContent}>
                   <div className={styles.card}>
                     <h3 className={styles.cardTitle}>Dashboard Passivos</h3>
                    <iframe
                      src={`${apiUrl}/api/v1/passivos`}
                      title="Passivos"
                      className={styles.reportFrame}
                    />
                  </div>
                  <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Relatórios de Risco</h3>
                    <Tabs defaultActiveKey="report_0" id="risk-reports-subtabs" className={styles.customSubTabs}>
                      {riskReports.map((report: RiskReport, index: number) => (
                        <Tab eventKey={`report_${index}`} title={`Relatório ${index + 1}`} key={index}>
                          <iframe
                            key={index}
                            srcDoc={report.html}
                            title={`report_${index}`}
                            className={styles.reportFrame}
                          />
                        </Tab>
                      ))}
                    </Tabs>
                  </div>
                </div>
              </Tab>

              <Tab eventKey="xlstm-inference" title="xLSTM Inference">
                <div className={styles.tabContent}>
                  <InferencePanel />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;