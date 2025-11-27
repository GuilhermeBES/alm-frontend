import { useMemo, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaThLarge, FaThList, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from './AcoesPage.module.css';
import instagram from "../../assets/instagram.png";
import youtube from "../../assets/youtube.png";
import facebook from "../../assets/facebook.png";
import logo from "../../assets/logo.png";
import MyFooter from "../../components/MyFooter";


// ----------------- Tipos -----------------
type ViewMode = "grid" | "list";

interface Stock {
  ticker: string;
  name: string;
  sector: string;
  segment: string;
  price: number;
  chgPct: number; // variação em %
  chgBRL: number; // variação em R$
}

// ----------------- Mocks -----------------
const MOCK_STOCKS: Stock[] = [
  {
    ticker: "PETR4",
    name: "Petrobras",
    sector: "Petróleo, Gás e Biocombustíveis",
    segment: "Empresas do setor petróleo, gás e biocombustíveis",
    price: 32.88,
    chgPct: -0.57,
    chgBRL: -0.19,
  },
  {
    ticker: "PRIO3",
    name: "Petro Rio S.A",
    sector: "Petróleo, Gás e Biocombustíveis",
    segment: "Empresas do setor petróleo, gás e biocombustíveis",
    price: 37.85,
    chgPct: -0.86,
    chgBRL: -0.33,
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
    ticker: "BBAS3",
    name: "Banco do Brasil",
    sector: "Financeiro",
    segment: "Financeiro",
    price: 21.41,
    chgPct: -0.79,
    chgBRL: -0.17,
  },
  {
    ticker: "BPAC11",
    name: "Banco BTG Pactual S.A.",
    sector: "Financeiro",
    segment: "Financeiro",
    price: 47.63,
    chgPct: -0.36,
    chgBRL: -0.17,
  },

  {
    ticker: "VALE3",
    name: "Vale S.A.",
    sector: "Mineração",
    segment: "Mineração",
    price: 59.59,
    chgPct: +1.71,
    chgBRL: +1.0,
  },
  {
    ticker: "USIM5",
    name: "Usiminas",
    sector: "Mineração",
    segment: "Mineração",
    price: 4.58,
    chgPct: +3.39,
    chgBRL: +0.15,
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
    ticker: "AMER3",
    name: "B2W Digital",
    sector: "Varejo",
    segment: "Varejo",
    price: 6.01,
    chgPct: +2.04,
    chgBRL: +0.12,
  },

  {
    ticker: "FESA4",
    name: "Ferbasa",
    sector: "Saúde",
    segment: "Saúde",
    price: 6.45,
    chgPct: -1.98,
    chgBRL: -0.13,
  },

  {
    ticker: "ELET3",
    name: "Eletrobras",
    sector: "Saneamento",
    segment: "Saneamento",
    price: 52.44,
    chgPct: +0.09,
    chgBRL: -0.05,
  },
  {
    ticker: "ENGI11",
    name: "Grupo Energisa",
    sector: "Saneamento",
    segment: "Saneamento",
    price: 49.63,
    chgPct: -0.74,
    chgBRL: -0.37,
  },
];

// ----------------- Helpers tipados -----------------
const brl = (v: number): string =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const pct = (v: number): string => `${v > 0 ? "+" : ""}${v.toFixed(2)}%`;

const brlDelta = (v: number): string => {
  const s = `${v > 0 ? "+" : ""}${v.toFixed(2)}`;
  return s.replace(".", ",");
};

const SECTOR_COLORS: Record<string, string> = {
  "Petróleo, Gás e Biocombustíveis": "#22c55e",
  Financeiro: "#0ea5e9",
  Mineração: "#f59e0b",
  Varejo: "#8b5cf6",
  Saúde: "#ef4444",
  Saneamento: "#14b8a6",
};

function Delta({ pctVal, brlVal }: { pctVal: number; brlVal: number }) {
  const up = pctVal > 0;
  const Icon = up ? FaArrowUp : FaArrowDown;
  const color = up ? "#16a34a" : "#ef4444";
  return (
    <div className="d-flex gap-4">
      <div className="align-items-center gap-2" style={{ color }}>
        <div>
          <Icon /> <span className="fw-semibold fs-5">{pct(pctVal)}</span>
        </div>
        <div className="text-secondary small">Variação</div>
      </div>
      <div style={{ color }}>
        <div className="fw-semibold fs-5" style={{ textAlign: "end" }}>
          {brlDelta(brlVal)}{" "}
        </div>
        <small className="text-secondary small">Variação em R$</small>
      </div>
    </div>
  );
}

function TickerBadge({ ticker, sector }: { ticker: string; sector: string }) {
  const bg = SECTOR_COLORS[sector] ?? "#94a3b8"; // fallback cinza
  return (
    <span
      className="badge border-0 fw-semibold"
      style={{ backgroundColor: bg, color: "#fff" }}
    >
      {ticker}
    </span>
  );
}

function StockCard({ s }: { s: Stock }) {
  return (
    <Card className="shadow-sm border-0 h-100" style={{ borderRadius: 12 }}>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-start justify-content-between">
          <TickerBadge ticker={s.ticker} sector={s.sector} />
        </div>

        <div className="mt-2">
          <Card.Title className="mb-0">{s.name}</Card.Title>
          <div className="text-muted small">{s.sector}</div>
        </div>

        <div className="mt-3 d-flex flex-wrap justify-content-between align-items-end gap-2">
          <div>
            <div className="fw-semibold fs-5">{brl(s.price)}</div>
            <div className="text-secondary small">Cotação</div>
          </div>
          <Delta pctVal={s.chgPct} brlVal={s.chgBRL} />
        </div>

        <div className="mt-3 d-flex justify-content-center">
          <Link to={`/acoes/${s.ticker}`} className="btn btn-outline-success btn-sm">
            Detalhes
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

// ----------------- Página -----------------
export default function AcoesPage() {
  const [view, setView] = useState<ViewMode>("grid");

  const groups = useMemo<[string, Stock[]][]>(() => {
    const bySegment = new Map<string, Stock[]>();
    for (const s of MOCK_STOCKS) {
      if (!bySegment.has(s.segment)) bySegment.set(s.segment, []);
      bySegment.get(s.segment)!.push(s);
    }
    return Array.from(bySegment.entries());
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        marginTop: "5rem",
      }}>

      {/* Header */}
      <div style={{ backgroundColor: "#0f172a", color: "white" }}>
        <Container className="py-5">
          <h2 className="m-0">Todas as ações</h2>
        </Container>
      </div>

      <Container className="py-4">
        <div className="d-flex justify-content-end gap-2 mb-2">
          <Button
            size="sm"
            variant={view === "grid" ? "success" : "outline-secondary"}
            onClick={() => setView("grid")}
            title="Visualização em grade"
          >
            <FaThLarge />
          </Button>
          <Button
            size="sm"
            variant={view === "list" ? "success" : "outline-secondary"}
            onClick={() => setView("list")}
            title="Visualização em lista"
          >
            <FaThList />
          </Button>
        </div>

        {groups.map(([segment, items], idx) => (
          <section key={segment} className={idx !== 0 ? "mt-4" : ""}>
            <h5 className="mb-3">{segment}</h5>

            {view === "grid" ? (
              <Row xs={1} sm={2} md={2} lg={3} className="g-3">
                {items.map((s) => (
                  <Col key={s.ticker}>
                    <StockCard s={s} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="d-flex flex-column gap-3">
                {items.map((s) => (
                  <div
                    key={s.ticker}
                    className="p-2 bg-white rounded shadow-sm"
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-3">
                        <TickerBadge ticker={s.ticker} sector={s.sector} />
                        <div>
                          <div className="fw-semibold">{s.name}</div>
                          <div className="small text-muted">{s.sector}</div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-4">
                        <div className="text-end">
                          <div className="fw-semibold">{brl(s.price)}</div>
                          <div className="text-secondary small">Cotação</div>
                        </div>
                        <Delta pctVal={s.chgPct} brlVal={s.chgBRL} />
                        <Link to={`/acoes/${s.ticker}`} className="btn btn-outline-success btn-sm">
                          Detalhes
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </Container>

        {/* Footer */}
        <MyFooter />
    </div>
  );
}
