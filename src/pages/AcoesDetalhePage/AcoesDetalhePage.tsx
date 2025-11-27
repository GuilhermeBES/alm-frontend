import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import PieChartComponent from "../../components/LineChartComponent";
import MyFooter from "../../components/MyFooter";

// ---- Tipos e mocks (traga do seu arquivo compartilhado se preferir) ----
interface Stock {
  ticker: string;
  name: string;
  sector: string;
  segment: string;
  price: number;
  chgPct: number;
  chgBRL: number;
}

const MOCK_STOCKS: Stock[] = [
  {
    ticker: "BTC",
    name: "Bitcoin",
    sector: "Cripto",
    segment: "Cripto",
    price: 110814,
    chgPct: -2.0,
    chgBRL: -2264,
  },
  {
    ticker: "PETR4",
    name: "Petrobras",
    sector: "Petróleo",
    segment: "Petróleo",
    price: 32.88,
    chgPct: -0.57,
    chgBRL: -0.19,
  },
  {
    ticker: "VALE3",
    name: "Vale S.A.",
    sector: "Mineração",
    segment: "Mineração",
    price: 59.59,
    chgPct: 1.71,
    chgBRL: 1.0,
  },
  {
    ticker: "ITUB4",
    name: "Itaú Unibanco",
    sector: "Financeiro",
    segment: "Financeiro",
    price: 37.77,
    chgPct: -1.15,
    chgBRL: -0.44,
  },
  {
    ticker: "MGLU3",
    name: "Magazine Luiza",
    sector: "Varejo",
    segment: "Varejo",
    price: 8.96,
    chgPct: -2.08,
    chgBRL: -0.19,
  },
  {
    ticker: "ELET3",
    name: "Eletrobras",
    sector: "Saneamento",
    segment: "Saneamento",
    price: 52.44,
    chgPct: 0.09,
    chgBRL: -0.05,
  },
];

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const pct = (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(2)}%`;

// ---- Página ----
export default function AcaoDetalhePage() {
  const [expanded, setExpanded] = useState(false);
  const { ticker } = useParams<{ ticker: string }>();
  const stock = MOCK_STOCKS.find(
    (s) => s.ticker.toUpperCase() === (ticker ?? "").toUpperCase()
  );

  // fallback: se não achar, usa a primeira
  const s = stock ?? MOCK_STOCKS[0];

  // escolhe “outras ações” (exclui a atual)
  const outras = MOCK_STOCKS.filter((x) => x.ticker !== s.ticker).slice(0, 6);

  // notícias mockadas
  const noticias = Array.from({ length: 5 }).map((_, i) => ({
    title: `Nome do site — há ${i + 2} horas`,
    lead: "Lead da notícia, lead da notícia, lead da notícia.",
    thumb: `https://placehold.co/84x84/png?text=${ticker}`,
  }));

  return (
    <div
      style={{ background: "#0b1220", minHeight: "100vh", paddingTop: "4rem" }}
    >
      {/* Header / trilha */}
      <div
        style={{
          background: "#0f172a",
          color: "#e5e7eb",
          borderBottom: "1px solid #1f2937",
        }}
      >
        <Container className="py-5">
          <div className="small">
            <Link to="/acoes" className="text-decoration-none text-secondary">
              Todas as ações
            </Link>
            <span className="mx-2">›</span>
            <span className="text-white">{s.name}</span>
          </div>
          <h2 className="m-0 mt-4 text-white">{s.name}</h2>
        </Container>
      </div>

      <Container className="py-4">
        <Row className="g-3">
          {/* Gráfico (mock) */}
          <Col md={expanded ? 12 : 8}>
            <Card
              style={{
                background: "#111827",
                color: "#e5e7eb",
                borderColor: "#1f2937",
              }}
            >
              <Card.Header
                className="d-flex justify-content-between align-items-center"
                style={{
                  background: "#111827",
                  color: "#e5e7eb",
                  borderBottomColor: "#1f2937",
                }}
              >
                <Card.Title className="mt-3">
                  <h2>{s.ticker}</h2>
                </Card.Title>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => setExpanded((v) => !v)}
                  title={expanded ? "Recolher" : "Expandir"}
                >
                  {expanded ? <FiMinimize2 /> : <FiMaximize2 />}
                </Button>
              </Card.Header>
              <Card.Body>
                <div
                  style={{
                    height: expanded ? "70vh" : "100%",
                    transition: "height .25s ease",
                  }}
                >
                  <PieChartComponent
                    label={s.ticker}
                    points={180}
                    start={s.price}
                    vol={0.02}
                    height={expanded ? "70vh" : 340}
                  />
                </div>
                <div className="mt-3 d-flex gap-4 flex-wrap">
                  <div>
                    <span className="text-secondary">Cotação</span>{" "}
                    <strong>{brl(s.price)}</strong>
                  </div>
                  <div>
                    <span className="text-secondary">Variação</span>{" "}
                    <strong>{pct(s.chgPct)}</strong>
                  </div>
                  <div>
                    <span className="text-secondary">Δ em R$</span>{" "}
                    <strong>{s.chgBRL.toFixed(2)}</strong>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Notícias */}
          <Col md={expanded ? 12 : 4}>
            <Card
              style={{
                background: "#111827",
                color: "#e5e7eb",
                borderColor: "#1f2937",
              }}
            >
              <Card.Body>
                <Card.Title>Notícias</Card.Title>
                <hr />
                <div className="d-flex flex-column gap-3">
                  {noticias.map((n, i) => (
                    <div
                      key={i}
                      className="d-flex gap-3 align-items-start py-2"
                      style={{ borderTop: i ? "1px solid #1f2937" : "none" }}
                    >
                      <img
                        src={n.thumb}
                        alt=""
                        width={48}
                        height={48}
                        style={{ borderRadius: 8 }}
                      />
                      <div className="small">
                        <div className="fw-semibold text-white">{n.title}</div>
                        <div className="text-secondary">{n.lead}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Outras ações */}
        <Row className="g-3 mt-3">
          <Col>
            <Card
              style={{
                background: "#111827",
                color: "#e5e7eb",
                borderColor: "#1f2937",
              }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Card.Title className="m-0">
                    <h2>Outras ações da nossa carteira</h2>
                  </Card.Title>
                </div>
                <hr />

                <div className="d-flex gap-3 overflow-auto pb-2">
                  {outras.map((o) => (
                    <Card
                      key={o.ticker}
                      style={{
                        minWidth: 220,
                        background: "#0f172a",
                        color: "#e5e7eb",
                        borderColor: "#1f2937",
                      }}
                    >
                      <Card.Body className="py-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="badge bg-success">{o.ticker}</span>
                          <small className="text-secondary">{o.sector}</small>
                        </div>
                        <div className="fw-semibold mt-2">{o.name}</div>
                        <div className="small text-secondary mt-1">Preço</div>
                        <div className="fw-semibold">{brl(o.price)}</div>
                        <div
                          className="small"
                          style={{
                            color: o.chgPct >= 0 ? "#22c55e" : "#ef4444",
                          }}
                        >
                          {pct(o.chgPct)}
                        </div>
                        <Link
                          to={`/acoes/${o.ticker}`}
                          className="mt-2 btn btn-outline-success btn-sm"
                        >
                          Detalhes
                        </Link>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <MyFooter />
    </div>
  );
}
