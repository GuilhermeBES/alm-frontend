import { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';

import PieChartComponent from '../../components/PieChartComponent';
import { apiService, apiUrl } from '../../services/ApiService';
import {
  CashValue,
  ForecastRequest,
  ForecastResponse,
  RiskNotebookResponse,
  RiskReport,
  Wallet,
} from '../../services/interfaces';
import styles from './AdminPage.module.css';

const AVAILABLE_TICKERS = ["GLD", "PETR4.SA", "VALE3.SA", "WEGE3.SA"];

// Define the SARIMA parameters as constants to ensure correct typing
const SARIMA_ORDER: [number, number, number] = [2, 1, 2];
const SEASONAL_ORDER: [number, number, number, number] = [1, 1, 1, 5];

const AdminPage = () => {
  const [wallet, setWallet] = useState<Wallet>();
  const [cashValue, setCashValue] = useState<CashValue>();
  const [riskReports, setRiskReports] = useState<RiskReport[]>([]);
  const [selectedTicker, setSelectedTicker] = useState<string>(
    AVAILABLE_TICKERS[0]
  );
  const [forecastResult, setForecastResult] = useState<ForecastResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      apiService.get<Wallet>("/portfolio-allocation").then((res) => {
        setWallet(res);
      });

      apiService.get<CashValue>("/cash-value").then((res) => {
        setCashValue(res);
      });

      const reports = await Promise.all(
        RISKS_REPORTS.map(async (report) => {
          const res = await apiService.get<RiskNotebookResponse>(
            `/riskNotebook?notebookName=${report}`
          );
          return { html: res.notebook_html };
        })
      );

      setRiskReports(reports);
    };

    getData();
  }, []);

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

      const result = await apiService.forecast<ForecastResponse>(
        "sarima",
        request
      );
      setForecastResult(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to generate forecast";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid style={{ marginTop: "5rem" }} className={styles.container}>
      <h2>Administração</h2>

      {/* Tabs para dividir os conteúdos */}
      <Tabs defaultActiveKey="assets" id="admin-tabs">
        {/* Aba Ativos e Carteira */}
        <Tab eventKey="assets" title="Ativos e Carteira">
          <Row className="mt-3">
            <h3>Carteira</h3>
            <PieChartComponent label={wallet?.portfolio} />
          </Row>
          <Row className="mt-5">
            <h3>Previsão SARIMA</h3>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Selecione o Ativo</Form.Label>
                <Form.Select
                  value={selectedTicker}
                  onChange={(e) => setSelectedTicker(e.target.value)}
                >
                  {AVAILABLE_TICKERS.map((ticker) => (
                    <option key={ticker} value={ticker}>
                      {ticker}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button
                onClick={handleForecast}
                disabled={isLoading}
                className="mb-3"
              >
                {isLoading ? "Gerando previsão..." : "Gerar Previsão"}
              </Button>

              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
            </Col>
          </Row>

          {forecastResult?.plot_base64 && (
            <>
              <Row className="mt-3">
                <Col>
                  <img
                    style={{ width: "100%", maxWidth: "800px" }}
                    src={`data:image/png;base64,${forecastResult.plot_base64}`}
                    alt="Forecast Plot"
                  />
                </Col>
              </Row>
            </>
          )}

          <Row className="mt-5">
            <h3>Índice Sharpe</h3>
            {wallet?.plotBase64 && (
              <img
                style={{ width: "60%" }}
                src={"data:image/png;base64," + wallet?.plotBase64}
              />
            )}
          </Row>
          <Row className="mt-5">
            <h3>Valor do Fundo</h3>
            <p>
              Investido:{" "}
              {cashValue?.invested?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p>
              Em caixa:{" "}
              {cashValue?.inCash?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </Row>
        </Tab>

        {/* Aba Passivos */}
        <Tab eventKey="liabilities" title="Passivos">
          <Row className="mt-3">
            <div style={{ backgroundColor: "#FFFFFF" }}>
              <iframe
                src={`${apiUrl}/passivos`}
                title="Passivos"
                style={{ width: "100%", height: "90vh", border: "none" }}
              />
            </div>
          </Row>

          {/* Sub-aba para os relatórios de passivos */}
          <h3 className="mt-5">Relatórios de Passivos</h3>
          <Tabs defaultActiveKey="report_0" id="risk-reports">
            {riskReports.map((report: RiskReport, index: number) => (
              <Tab
                eventKey={`report_${index}`}
                title={`Relatório ${index + 1}`}
                key={index}
              >
                <Row className="mt-3">
                  <div style={{ backgroundColor: "#FFFFFF" }}>
                    <iframe
                      key={index}
                      srcDoc={report.html}
                      title={`report_${index}`}
                      style={{ width: "100%", height: "80vh", border: "none" }}
                    />
                  </div>
                </Row>
              </Tab>
            ))}
          </Tabs>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminPage;
