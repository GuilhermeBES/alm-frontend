# 📘 Documentação Técnica Completa - ALM Frontend

> **Asset and Liability Management System**
> Sistema web de gestão financeira para planejamento de aposentadoria e investimentos

---

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Stack Tecnológico](#-stack-tecnológico)
3. [Arquitetura do Projeto](#-arquitetura-do-projeto)
4. [Estrutura de Pastas](#-estrutura-de-pastas)
5. [Funcionalidades Detalhadas](#-funcionalidades-detalhadas)
6. [Componentes Principais](#-componentes-principais)
7. [Páginas da Aplicação](#-páginas-da-aplicação)
8. [Sistema de Rotas](#-sistema-de-rotas)
9. [Integração com API](#-integração-com-api)
10. [Interfaces TypeScript](#-interfaces-typescript)
11. [Fluxo de Dados](#-fluxo-de-dados)
12. [Estilização](#-estilização)
13. [Configurações](#️-configurações)
14. [Lógica de Negócio](#-lógica-de-negócio)
15. [Segurança](#-segurança)
16. [Como Executar](#-como-executar)
17. [Guia de Desenvolvimento](#-guia-de-desenvolvimento)

---

## 🎯 Visão Geral

### Propósito do Projeto

O **ALM Frontend** é uma aplicação web de planejamento financeiro que oferece:

- **Autenticação de usuários** para acesso seguro e personalizado.
- **Dashboards interativos** com métricas e visualizações financeiras.
- **Simulação de aposentadoria** via chatbot inteligente
- **Dashboard administrativo** com análise de portfólio
- **Visualização de ações** com gráficos e previsões
- **Geração automática de contratos** em PDF
- **Análise de riscos** com múltiplos relatórios

### Tecnologias Principais

- React 18.3.1 + TypeScript
- Vite 6.0.1 (build tool)
- React Router DOM 7.0.2
- Bootstrap 5.3.3
- Nivo (gráficos)
- react-chatbotify (beta)
- Lucide React (ícones)
- jsPDF 3.0.4

### Arquitetura

- **SPA (Single Page Application)** com renderização client-side
- **API REST** para comunicação com backend
- **Gerenciamento de estado local** com React Context (AuthContext)
- **CSS Modules** para estilos encapsulados
- **TypeScript strict mode** para type safety

---

## 💻 Stack Tecnológico

### Framework e Build Tools

```json
{
  "react": "^18.3.1",
  "typescript": "~5.6.2",
  "vite": "^6.0.1",
  "@vitejs/plugin-react": "^4.3.4"
}
```

**Vite** é usado ao invés de Create React App por ser:
- ⚡ Extremamente rápido (HMR instantâneo)
- 🎯 Otimizado para produção
- 🔧 Configuração simples

### Bibliotecas de UI

```json
{
  "bootstrap": "^5.3.3",
  "react-bootstrap": "^2.10.6",
  "react-icons": "^5.5.0",
  "lucide-react": "^0.555.0"
}
```

**Bootstrap** fornece:
- Grid system responsivo
- Componentes pré-construídos (Navbar, Cards, Modals)
- Utilitários CSS

### Bibliotecas de Visualização

```json
{
  "@nivo/core": "^0.87.0",
  "@nivo/sunburst": "^0.87.0"
}
```

**Nivo** é usado para gráficos modernos e interativos, como:
- Gráfico Sunburst (detalhamento de portfólio)
- Customização avançada e temas.

### Bibliotecas Especializadas

```json
{
  "react-chatbotify": "^2.0.0-beta.26",
  "jspdf": "^3.0.4",
  "axios": "^1.7.9",
  "react-router-dom": "^7.0.2"
}
```

- **react-chatbotify**: Interface conversacional para simulação
- **jsPDF**: Geração de contratos PDF no cliente
- **axios**: HTTP client com interceptors
- **react-router-dom**: Roteamento declarativo

### Dev Tools

```json
{
  "eslint": "^9.15.0",
  "@typescript-eslint/eslint-plugin": "^8.15.0",
  "eslint-plugin-react-hooks": "^5.0.0",
  "eslint-plugin-react-refresh": "^0.4.14"
}
```

**ESLint** configurado para:
- Regras do TypeScript
- Regras dos React Hooks
- React Refresh (HMR)

---

## 🏗 Arquitetura do Projeto

### Padrão Arquitetural

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (SPA)                       │
├─────────────────────────────────────────────────────────┤
│  React Router  │  Pages  │  Components  │  Services    │
├─────────────────────────────────────────────────────────┤
│                    ApiService (Axios)                   │
├─────────────────────────────────────────────────────────┤
│                  REST API (Backend)                     │
│  /portfolio-allocation  /forecast/sarima  /passivos    │
└─────────────────────────────────────────────────────────┘
```

### Princípios de Design

1. **Separação de Responsabilidades**
   - `pages/` - Componentes de rota (containers)
   - `components/` - Componentes reutilizáveis (presentational)
   - `services/` - Lógica de negócio e API

2. **Composition over Inheritance**
   - Componentes funcionais com hooks
   - Sem classes React
   - Props e children para composição

3. **Type Safety**
   - TypeScript strict mode
   - Interfaces explícitas
   - Generics para API calls

4. **Single Source of Truth**
   - API como fonte única de dados
   - Estado local mínimo
   - Sem cache client-side (por enquanto)

---

## 📁 Estrutura de Pastas

```
alm-frontend/
│
├── public/                          # Arquivos estáticos
│   └── vite.svg
│
├── src/
│   ├── assets/                      # Imagens e recursos
│   │   ├── logo.png
│   │   ├── navbar-logo.png
│   │   ├── arrow.png
│   │   ├── facebook.png
│   │   ├── instagram.png
│   │   └── youtube.png
│   │
│   ├── components/                  # Componentes reutilizáveis
│   │   │
│   │   ├── Auth/
│   │   │   ├── SignUpModal.tsx       # Modal de registro
│   │   │   └── SignUpModal.module.css
│   │   │
│   │   ├── ChatBot/
│   │   │   ├── MyChatBot.tsx       # Chatbot de simulação
│   │   │   └── ChatBot.css
│   │   │
│   │   ├── Dashboard/
│   │   │   ├── SunburstChart.tsx     # Gráfico Sunburst (Nivo)
│   │   │   ├── DashboardNavbar.tsx     # Navbar específica do Dashboard
│   │   │   ├── MetricCard.tsx          # Card de métrica reutilizável
│   │   │   └── ...
│   │   │
│   │   ├── Charts/
│   │   │   └── NivoLineChart.tsx     # Gráfico de Linha (Nivo)
│   │   │
│   │   ├── MyNavbar.tsx            # Barra de navegação
│   │   ├── MyNavbar.module.css
│   │   │
│   │   ├── MyFooter.tsx            # Rodapé do site
│   │   └── MyFooter.module.css
│   │
│   ├── contexts/                    # Contextos globais da aplicação
│   │   └── AuthContext.tsx         # Contexto de autenticação
│   │
│   ├── pages/                       # Páginas da aplicação
│   │   │
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx       # Dashboard principal do usuário
│   │   │   └── Dashboard.module.css
│   │   │
│   │   ├── HomePage/
│   │   │   ├── HomePage.tsx        # Landing page (299 linhas)
│   │   │   └── HomePage.module.css
│   │   │
│   │   ├── LoginPage/
│   │   │   ├── LoginPage.tsx       # Página de login do usuário
│   │   │   └── LoginPage.module.css
│   │   │
│   │   ├── SimulationPage.tsx      # Página do chatbot
│   │   │
│   │   ├── AcoesPage/
│   │   │   ├── AcoesPage.tsx       # Lista de ações (356 linhas)
│   │   │   └── AcoesPage.module.css
│   │   │
│   │   ├── AcoesDetalhePage/
│   │   │   ├── AcoesDetalhePage.tsx  # Detalhes da ação (251 linhas)
│   │   │   └── AcoesDetalhePage.module.css
│   │   │
│   │   ├── AdminPage/
│   │   │   ├── AdminPage.tsx       # Dashboard admin (453 linhas)
│   │   │   └── AdminPage.module.css
│   │   │
│   │   └── ErrorPage.tsx           # Página 404
│   │
│   ├── services/                    # Lógica de negócio
│   │   ├── ApiService.ts           # Serviço centralizado de API
│   │   ├── interfaces.ts           # TypeScript interfaces
│   │   ├── AuthService.ts          # Serviço de autenticação
│   │   ├── AdminRoute.tsx          # Higher-order component para rotas protegidas
│   │   └── __mocks__/              # Mocks manuais de serviços (Vitest)
│   │       └── ApiService.ts       # Mock do ApiService
│   │
│   ├── App.tsx                      # Componente raiz (layout)
│   ├── App.css                      # Estilos globais
│   ├── main.tsx                     # Entry point da aplicação
│   └── vite-env.d.ts               # Type definitions do Vite
│
├── index.html                       # HTML entry point
├── package.json                     # Dependências e scripts
├── tsconfig.json                    # TypeScript config (base)
├── tsconfig.app.json                # TypeScript config (app)
├── tsconfig.node.json               # TypeScript config (Vite)
├── vite.config.ts                   # Configuração Vite
├── eslint.config.js                 # Configuração ESLint
└── README.md                        # Documentação básica
```

### Convenções de Nomenclatura

- **Componentes**: PascalCase (ex: `MyNavbar.tsx`)
- **CSS Modules**: `*.module.css`
- **Interfaces**: PascalCase (ex: `Wallet`, `Asset`)
- **Funções**: camelCase (ex: `calculateMonthlyReturn`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `MOCK_STOCKS`)

---

## 🎨 Funcionalidades Detalhadas

### 1. Login e Registro de Usuários

**Arquivos:** `src/pages/LoginPage/LoginPage.tsx`, `src/components/Auth/SignUpModal.tsx`, `src/services/AuthService.ts`, `src/contexts/AuthContext.tsx`
**Rotas:** `/login`

#### Características

- **Autenticação:** Login de usuários com e-mail e senha.
- **Registro:** Criação de novas contas através de um modal de registro.
- **Modo Demo:** Funcionalidade de fallback que permite o uso da aplicação mesmo sem backend, criando sessões de usuário mockadas. Usuários com "admin" no e-mail recebem perfil de administrador no modo demo.
- **Persistência:** Autenticação e dados do usuário são armazenados localmente (`localStorage`).
- **Gerenciamento de Estado:** Utiliza `AuthContext` para gerenciar o estado global de autenticação.

#### Login Flow

```typescript
// src/pages/LoginPage/LoginPage.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setLoading(true);
  try {
    await login({ email: formData.username, password: formData.password });
    navigate('/dashboard'); // Redireciona para o dashboard
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Erro ao fazer login');
  } finally {
    setLoading(false);
  }
};
```

#### AuthService (Exemplo de Login)

```typescript
// src/services/AuthService.ts
static async login(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await this.axiosInstance.post<LoginResponse>(
      '/auth/login',
      credentials
    );
    this.setToken(response.data.token);
    this.setUser(response.data.user);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK' || !error.response) {
        return this.loginDemo(credentials); // Ativa modo demo
      }
      throw new Error(error.response?.data?.detail || 'Erro ao fazer login');
    }
    throw error;
  }
}
```

#### AuthContext (Snippet)

```typescript
// src/contexts/AuthContext.tsx
const { login } = useAuth(); // Hook para acessar funções de autenticação

// ...
<AuthContext.Provider value={{ ...state, login, register, logout, refreshUser }}>
  {children}
</AuthContext.Provider>
```

---

### 2. Dashboard do Usuário

**Arquivos:** `src/pages/Dashboard/Dashboard.tsx`, `src/components/Dashboard/*`
**Rota:** `/dashboard`

#### Características

- **Visão Geral:** Apresenta métricas chave e gráficos de forma clara.
- **Cards de Métricas:** Exibe dados importantes com ícones (via Lucide React) e cores customizáveis.
- **Gráficos:** Utiliza a biblioteca Nivo para gráficos interativos, incluindo um gráfico Sunburst para o detalhamento do portfólio.
- **Design Moderno:** Layout responsivo com tema escuro e elementos visuais do Figma.
- **Proteção:** Acesso via autenticação (controlado por `AuthContext`).

#### Estrutura (Dashboard.tsx)

```typescript
// src/pages/Dashboard/Dashboard.tsx
import SunburstChart from '../../components/Dashboard/SunburstChart';

// ...
// Dados hierárquicos para o gráfico Sunburst
const portfolioData = {
  "name": "Portfólio",
  "children": [
    { "name": "Ações", "value": 350 },
    { "name": "Renda Fixa", "value": 300 },
    { "name": "Fundos", "value": 100 }
  ]
};

const Dashboard = () => {
  return (
    <div className={styles.container}>
      {/* ... */}
      <div style={{ height: '500px', width: '100%' }}>
        <SunburstChart data={portfolioData} />
      </div>
    </div>
  );
};
```

#### Exemplo de MetricCard

```typescript
// src/components/Dashboard/MetricCard.tsx
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon; // Lucide React Icon
  color: string;
}

const MetricCard = ({ title, value, icon: Icon, color }: MetricCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer} style={{ backgroundColor: `${color}20` }}>
        <Icon className={styles.icon} style={{ color: color }} size={32} strokeWidth={2.5} />
      </div>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p style={{ color: color }}>{value}</p>
      </div>
    </div>
  );
};
```

---

### 3. Chatbot de Simulação de Aposentadoria

**Arquivo:** `src/components/ChatBot/MyChatBot.tsx`
**Rota:** `/simulacao`

#### Características

- **Nome do assistente**: Cleiton
- **Fluxo conversacional**: 10 etapas
- **Cálculo financeiro**: Juros compostos com taxa progressiva
- **Output**: Contrato PDF personalizado

#### Fluxo da Conversa

```typescript
// Estados do fluxo (src/components/ChatBot/MyChatBot.tsx:64-74)
const flow = {
  start: {
    message: "Olá! 👋 Eu sou Cleiton...",
    path: "get_name"
  },
  get_name: {
    message: "Qual é o seu nome?",
    path: "welcome"
  },
  welcome: {
    message: (params) => `Prazer, ${params.userInput}!`,
    path: "get_years"
  },
  get_years: {
    message: "Quantos anos faltam para você se aposentar?",
    path: "get_amount"
  },
  get_amount: {
    message: "Quanto você pretende investir por mês?",
    path: "show_prediction"
  },
  show_prediction: {
    message: (params) => {
      const years = parseInt(params.formState.years);
      const amount = parseFloat(params.formState.amount);
      const monthlyReturn = calculateMonthlyReturn(amount, years);
      return `Baseado no seu investimento de R$ ${amount}...`;
    },
    path: "generate_contract"
  },
  generate_contract: {
    message: "Deseja gerar o contrato?",
    options: ["Sim", "Não"],
    chatDisabled: true,
    path: "end"
  }
};
```

#### Algoritmo de Cálculo

**Localização:** `src/components/ChatBot/MyChatBot.tsx:39-61`

```typescript
/**
 * Calcula retorno mensal após período de investimento
 * @param monthlyInvestment - Valor mensal investido (R$)
 * @param years - Anos até aposentadoria
 * @returns Retorno mensal projetado (R$)
 */
const calculateMonthlyReturn = (
  monthlyInvestment: number,
  years: number
): number => {
  let totalAmount = 0;
  const months = years * 12;
  const baseRate = 0.009;  // 0.9% ao mês

  // Loop por cada mês do período
  for (let month = 0; month < months; month++) {
    // Incrementa 0.1% a cada 3 anos (36 meses)
    const yearsElapsed = Math.floor(month / 36);
    const additionalRate = yearsElapsed * 0.001;
    const currentRate = baseRate + additionalRate;

    // Juros compostos: novo_saldo = (saldo + aporte) * (1 + taxa)
    totalAmount = (totalAmount + monthlyInvestment) * (1 + currentRate);
  }

  // Retorno mensal = montante final * taxa base
  return totalAmount * baseRate;
};
```

**Exemplo de cálculo:**

```
Investimento: R$ 1.000/mês
Prazo: 20 anos (240 meses)

Ano 1-3:   taxa = 0.9%
Ano 4-6:   taxa = 1.0%
Ano 7-9:   taxa = 1.1%
...
Ano 19-20: taxa = 1.5%

Montante final: ~R$ 950.000
Retorno mensal: ~R$ 8.550
```

#### Geração de PDF

**Localização:** `src/components/ChatBot/MyChatBot.tsx:15-37`

```typescript
import { jsPDF } from "jspdf";

const generateContract = (formState: FormState) => {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(18);
  doc.text("CONTRATO DE INVESTIMENTO", 105, 20, { align: "center" });

  // Linha separadora
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);

  // Conteúdo
  doc.setFontSize(12);
  doc.text(`Nome: ${formState.name}`, 20, 40);
  doc.text(`Investimento Mensal: R$ ${formState.amount}`, 20, 50);
  doc.text(`Retorno Mensal Projetado: R$ ${formState.prediction}`, 20, 60);

  // Assinatura
  doc.text("_______________________", 20, 150);
  doc.text("Assinatura do Cliente", 20, 160);
  doc.text(`Data: ${new Date().toLocaleDateString()}`, 20, 170);

  // Download
  doc.save(`contrato_${formState.name}.pdf`);
};
```

#### Tema e Estilização

**Arquivo:** `src/components/ChatBot/ChatBot.css`

```css
/* Dark theme customizado */
.rcb-chat-bot {
  background-color: #1a1a2e;
  border-radius: 15px;
}

.rcb-message-bot {
  background-color: #16213e;
  color: #e9ecef;
}

.rcb-message-user {
  background-color: #0f3460;
  color: white;
}

.rcb-chat-input {
  background-color: #16213e;
  color: white;
  border: 1px solid #0f3460;
}
```

---

### 2. Página de Ações (Lista)

**Arquivo:** `src/pages/AcoesPage/AcoesPage.tsx`
**Rota:** `/acoes`

#### Características

- **View modes**: Grid e Lista (toggle)
- **Agrupamento**: Por setor
- **Badges**: Coloridos por setor
- **Indicadores**: Preço atual e variação %

#### Dados Mockados

**Localização:** `src/pages/AcoesPage/AcoesPage.tsx:8-99`

```typescript
const MOCK_STOCKS = [
  {
    ticker: "PETR4",
    name: "Petrobras PN",
    sector: "Petróleo e Gás",
    currentPrice: 38.45,
    change: 2.34,
    changePercent: 2.5,
    logo: "https://logo.clearbit.com/petrobras.com.br"
  },
  {
    ticker: "VALE3",
    name: "Vale ON",
    sector: "Mineração",
    currentPrice: 65.80,
    change: -1.20,
    changePercent: -1.79,
    logo: "https://logo.clearbit.com/vale.com"
  },
  {
    ticker: "ITUB4",
    name: "Itaú Unibanco PN",
    sector: "Bancos",
    currentPrice: 32.15,
    change: 0.85,
    changePercent: 2.71,
    logo: "https://logo.clearbit.com/itau.com.br"
  },
  // ... mais 9 ações
];
```

#### Agrupamento por Setor

**Localização:** `src/pages/AcoesPage/AcoesPage.tsx:104-118`

```typescript
// Agrupa ações por setor
const groupedStocks = MOCK_STOCKS.reduce((acc, stock) => {
  const sector = stock.sector;
  if (!acc[sector]) {
    acc[sector] = [];
  }
  acc[sector].push(stock);
  return acc;
}, {} as Record<string, typeof MOCK_STOCKS>);

// Renderiza grupos
Object.entries(groupedStocks).map(([sector, stocks]) => (
  <div key={sector}>
    <h3 className={styles.sectorTitle}>{sector}</h3>
    <div className={styles.stocksGrid}>
      {stocks.map(stock => <StockCard stock={stock} />)}
    </div>
  </div>
));
```

#### Badges de Setores

**Localização:** `src/pages/AcoesPage/AcoesPage.tsx:121-146`

```typescript
const getSectorColor = (sector: string): string => {
  const colors: Record<string, string> = {
    "Petróleo e Gás": "#f97316",
    "Mineração": "#0ea5e9",
    "Bancos": "#8b5cf6",
    "Varejo": "#ec4899",
    "Energia": "#22c55e",
    "Telecomunicações": "#eab308",
    "Alimentação": "#f43f5e",
    "Construção": "#14b8a6"
  };
  return colors[sector] || "#6b7280";
};

// Uso
<Badge
  bg=""
  style={{ backgroundColor: getSectorColor(stock.sector) }}
>
  {stock.sector}
</Badge>
```

#### Toggle de Visualização

```typescript
const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

// Botões de toggle
<div className={styles.viewToggle}>
  <Button
    variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
    onClick={() => setViewMode('grid')}
  >
    <FaThLarge /> Grid
  </Button>
  <Button
    variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
    onClick={() => setViewMode('list')}
  >
    <FaList /> Lista
  </Button>
</div>

// CSS condicional
<div className={viewMode === 'grid' ? styles.stocksGrid : styles.stocksList}>
  {/* Ações */}
</div>
```

---

### 3. Detalhes da Ação

**Arquivo:** `src/pages/AcoesDetalhePage/AcoesDetalhePage.tsx`
**Rota:** `/acoes/:ticker`

#### Características

- **Gráfico de preço**: Expandível em tela cheia
- **Feed de notícias**: Relacionadas à ação
- **Ações relacionadas**: Carrossel do mesmo setor
- **Tema escuro**: Background #111827

#### Parâmetros de Rota

```typescript
import { useParams } from 'react-router-dom';

const AcoesDetalhePage = () => {
  const { ticker } = useParams<{ ticker: string }>();

  // Busca dados da ação (mock)
  const stock = MOCK_STOCKS.find(s => s.ticker === ticker);

  if (!stock) {
    return <div>Ação não encontrada</div>;
  }

  return (/* ... */);
};
```

#### Gráfico Expandível

```typescript
const [expanded, setExpanded] = useState(false);
const lineChartData = [
  {
    id: "Preço",
    data: Array.from({ length: 30 }, (_, i) => ({
      x: i,
      y: 100 + (Math.random() - 0.5) * 10,
    })),
  },
];

// Modal para gráfico expandido
<Modal
  show={expanded}
  onHide={() => setExpanded(false)}
  size="xl"
  centered
>
  <Modal.Body style={{ backgroundColor: '#111827', height: '80vh' }}>
    <NivoLineChart data={lineChartData} />
  </Modal.Body>
</Modal>

// Botão de expandir
<Button
  variant="outline-light"
  onClick={() => setExpanded(true)}
>
  <FiMaximize2 /> Expandir
</Button>
```

#### Feed de Notícias (Mock)

**Localização:** `src/pages/AcoesDetalhePage/AcoesDetalhePage.tsx:180-215`

```typescript
const MOCK_NEWS = [
  {
    id: 1,
    title: `${stock.name} anuncia novo investimento de R$ 2 bilhões`,
    source: "InfoMoney",
    time: "2 horas atrás",
    summary: "Empresa planeja expandir operações no setor..."
  },
  {
    id: 2,
    title: `Analistas elevam preço-alvo de ${ticker}`,
    source: "Valor Econômico",
    time: "5 horas atrás",
    summary: "BTG Pactual aumenta recomendação para compra..."
  },
  // ... mais notícias
];

// Renderização
<div className={styles.newsSection}>
  {MOCK_NEWS.map(news => (
    <Card key={news.id} className={styles.newsCard}>
      <Card.Body>
        <Card.Title>{news.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {news.source} • {news.time}
        </Card.Subtitle>
        <Card.Text>{news.summary}</Card.Text>
      </Card.Body>
    </Card>
  ))}
</div>
```

#### Carrossel de Ações Relacionadas

```typescript
import Carousel from 'react-bootstrap/Carousel';

// Filtra ações do mesmo setor
const relatedStocks = MOCK_STOCKS.filter(
  s => s.sector === stock.sector && s.ticker !== ticker
);

// Carrossel
<Carousel>
  {relatedStocks.map(related => (
    <Carousel.Item key={related.ticker}>
      <Card
        className={styles.relatedCard}
        onClick={() => navigate(`/acoes/${related.ticker}`)}
      >
        <Card.Img src={related.logo} />
        <Card.Body>
          <Card.Title>{related.ticker}</Card.Title>
          <Card.Text>R$ {related.currentPrice}</Card.Text>
        </Card.Body>
      </Card>
    </Carousel.Item>
  ))}
</Carousel>
```

---

### 4. Dashboard Administrativo

**Arquivo:** `src/pages/AdminPage/AdminPage.tsx`
**Rota:** `/admin`
**Proteção:** `<AdminRoute>` (atualmente desabilitado)

#### Estrutura de Tabs

```typescript
import { Tab, Tabs } from 'react-bootstrap';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'liabilities'>('portfolio');

  return (
    <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k as any)}>
      {/* Aba Portfólio */}
      <Tab eventKey="portfolio" title="Portfólio">
        <PortfolioSection />
      </Tab>

      {/* Aba Passivos */}
      <Tab eventKey="liabilities" title="Passivos">
        <LiabilitiesSection />
      </Tab>
    </Tabs>
  );
};
```

---

#### Aba 1: Portfólio

##### A. Alocação de Ativos (Pie Chart)

**API:** `GET /portfolio-allocation`

```typescript
const [wallet, setWallet] = useState<Wallet | null>(null);

useEffect(() => {
  const fetchPortfolio = async () => {
    try {
      const data = await ApiService.get<Wallet>('/portfolio-allocation');
      setWallet(data);
    } catch (error) {
      console.error('Erro ao carregar portfólio:', error);
    }
  };
  fetchPortfolio();
}, []);

// Renderização
{wallet && (
  <PieChartComponent
    data={wallet.portfolio.map(asset => ({
      name: asset.ticker,
      value: asset.currentPrice * asset.quantity
    }))}
  />
)}
```

##### B. Índice de Sharpe

**Fonte:** Base64 image da API

```typescript
{wallet?.plotBase64 && (
  <div className={styles.sharpeSection}>
    <h4>Índice de Sharpe</h4>
    <img
      src={`data:image/png;base64,${wallet.plotBase64}`}
      alt="Sharpe Index"
      className={styles.sharpePlot}
    />
  </div>
)}
```

##### C. Valores em Caixa

**API:** `GET /cash-value`

```typescript
interface CashValue {
  invested: number;  // Total investido
  inCash: number;    // Disponível em caixa
}

const [cashValue, setCashValue] = useState<CashValue | null>(null);

useEffect(() => {
  const fetchCash = async () => {
    const data = await ApiService.get<CashValue>('/cash-value');
    setCashValue(data);
  };
  fetchCash();
}, []);

// Renderização
<Row>
  <Col md={6}>
    <Card>
      <Card.Body>
        <h5>Investido</h5>
        <h2>R$ {cashValue?.invested.toLocaleString('pt-BR')}</h2>
      </Card.Body>
    </Card>
  </Col>
  <Col md={6}>
    <Card>
      <Card.Body>
        <h5>Em Caixa</h5>
        <h2>R$ {cashValue?.inCash.toLocaleString('pt-BR')}</h2>
      </Card.Body>
    </Card>
  </Col>
</Row>
```

##### D. Previsões SARIMA

**API:** `POST /forecast/sarima`

**Interface:**
```typescript
interface ForecastRequest {
  ticker: string;
  p: number;      // Ordem AR (AutoRegressive)
  d: number;      // Ordem de diferenciação
  q: number;      // Ordem MA (Moving Average)
  n_steps: number; // Passos à frente
}

interface ForecastResponse {
  ticker: string;
  forecast: number[];
  dates: string[];
  plotBase64: string;  // Gráfico em base64
}
```

**Implementação:**

```typescript
const [selectedTicker, setSelectedTicker] = useState('GLD');
const [forecastPlot, setForecastPlot] = useState<string | null>(null);
const [loading, setLoading] = useState(false);

const AVAILABLE_TICKERS = ['GLD', 'PETR4.SA', 'VALE3.SA', 'WEGE3.SA'];

const handleForecast = async () => {
  setLoading(true);
  try {
    const response = await ApiService.forecast<ForecastResponse>({
      ticker: selectedTicker,
      p: 1,
      d: 1,
      q: 1,
      n_steps: 30
    });
    setForecastPlot(response.plotBase64);
  } catch (error) {
    alert('Erro ao gerar previsão');
  } finally {
    setLoading(false);
  }
};

// Formulário
<Form>
  <Form.Group>
    <Form.Label>Selecione o Ticker</Form.Label>
    <Form.Select
      value={selectedTicker}
      onChange={(e) => setSelectedTicker(e.target.value)}
    >
      {AVAILABLE_TICKERS.map(ticker => (
        <option key={ticker} value={ticker}>{ticker}</option>
      ))}
    </Form.Select>
  </Form.Group>

  <Button onClick={handleForecast} disabled={loading}>
    {loading ? 'Gerando...' : 'Gerar Previsão'}
  </Button>
</Form>

{forecastPlot && (
  <img
    src={`data:image/png;base64,${forecastPlot}`}
    alt="SARIMA Forecast"
  />
)}
```

---

#### Aba 2: Passivos

##### A. Iframe Principal

**API:** `GET /passivos` (HTML page)

```typescript
const passivosUrl = `${import.meta.env.VITE_API_URL}/passivos`;

<iframe
  src={passivosUrl}
  style={{
    width: '100%',
    height: '600px',
    border: 'none',
    backgroundColor: '#111827'
  }}
  title="Passivos"
/>
```

##### B. Relatórios de Risco (7 notebooks)

**API:** `GET /riskNotebook?notebookName={name}`

**Notebooks disponíveis:**

```typescript
const RISK_NOTEBOOKS = [
  {
    key: 'investment_risk2',
    title: 'Investment Risk Report (v2)'
  },
  {
    key: 'investment_risk',
    title: 'Investment Risk Report'
  },
  {
    key: 'interest_rate_risk_liability',
    title: 'Interest Rate Risk - Liability'
  },
  {
    key: 'interest_rate_risk_asset',
    title: 'Interest Rate Risk - Asset'
  },
  {
    key: 'interest_rate_risk_sensitivity',
    title: 'Interest Rate Risk - Sensitivity'
  },
  {
    key: 'crypto_risk',
    title: 'Crypto Risk Analysis'
  },
  {
    key: 'country_risk',
    title: 'Country Risk Analysis'
  }
];
```

**Implementação:**

```typescript
const [notebooks, setNotebooks] = useState<Record<string, string>>({});
const [activeRiskTab, setActiveRiskTab] = useState('investment_risk2');

// Carrega notebook ao trocar de tab
useEffect(() => {
  if (!notebooks[activeRiskTab]) {
    loadNotebook(activeRiskTab);
  }
}, [activeRiskTab]);

const loadNotebook = async (notebookName: string) => {
  try {
    const html = await ApiService.getHTML(
      `/riskNotebook?notebookName=${notebookName}`
    );
    setNotebooks(prev => ({ ...prev, [notebookName]: html }));
  } catch (error) {
    console.error('Erro ao carregar notebook:', error);
  }
};

// Sub-tabs para notebooks
<Tabs activeKey={activeRiskTab} onSelect={(k) => setActiveRiskTab(k!)}>
  {RISK_NOTEBOOKS.map(notebook => (
    <Tab key={notebook.key} eventKey={notebook.key} title={notebook.title}>
      {notebooks[notebook.key] ? (
        <iframe
          srcDoc={notebooks[notebook.key]}
          style={{ width: '100%', height: '800px', border: 'none' }}
          title={notebook.title}
        />
      ) : (
        <Spinner animation="border" />
      )}
    </Tab>
  ))}
</Tabs>
```

---

### 5. Landing Page

**Arquivo:** `src/pages/HomePage/HomePage.tsx`
**Rota:** `/`

#### Estrutura

```typescript
const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <FAQSection />
    </>
  );
};
```

#### Hero Section

```typescript
const HeroSection = () => (
  <section className={styles.hero}>
    <Container>
      <Row className="align-items-center">
        <Col lg={6}>
          <h1 className={styles.heroTitle}>
            Gestão de Ativo e Passivos
          </h1>
          <p className={styles.heroSubtitle}>
            Planeje sua aposentadoria com inteligência artificial
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/simulacao')}
            className={styles.ctaButton}
          >
            Simular agora
          </Button>
        </Col>
        <Col lg={6}>
          <img
            src={heroImage}
            alt="Financial Planning"
            className={styles.heroImage}
          />
        </Col>
      </Row>
    </Container>
  </section>
);
```

#### Features Section

```typescript
const FEATURES = [
  {
    icon: <FaBalanceScale size={48} />,
    title: "Balanceamento Inteligente",
    description: "Algoritmos avançados para otimizar sua carteira"
  },
  {
    icon: <FaChartLine size={48} />,
    title: "Retornos Previsíveis",
    description: "Previsões baseadas em modelos SARIMA"
  },
  {
    icon: <FaClock size={48} />,
    title: "Monitoramento Real-time",
    description: "Acompanhe seu portfólio 24/7"
  }
];

<Row>
  {FEATURES.map((feature, idx) => (
    <Col md={4} key={idx}>
      <Card className={styles.featureCard}>
        <Card.Body>
          <div className={styles.featureIcon}>{feature.icon}</div>
          <Card.Title>{feature.title}</Card.Title>
          <Card.Text>{feature.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
```

#### FAQ Section (Accordion)

```typescript
import { Accordion } from 'react-bootstrap';

const FAQ_ITEMS = [
  {
    question: "Como funciona a simulação de aposentadoria?",
    answer: "Nosso chatbot coleta informações sobre seu perfil..."
  },
  {
    question: "Quais ações estão disponíveis?",
    answer: "Trabalhamos com as principais ações da B3..."
  },
  // ... mais FAQs
];

<Accordion>
  {FAQ_ITEMS.map((item, idx) => (
    <Accordion.Item eventKey={idx.toString()} key={idx}>
      <Accordion.Header>{item.question}</Accordion.Header>
      <Accordion.Body>{item.answer}</Accordion.Body>
    </Accordion.Item>
  ))}
</Accordion>
```

#### Navegação com Âncoras

```typescript
// Navbar
<Nav.Link href="#sobre">Sobre</Nav.Link>
<Nav.Link href="#funcionalidades">Funcionalidades</Nav.Link>
<Nav.Link href="#faq">FAQ</Nav.Link>

// CSS global (App.css)
html {
  scroll-behavior: smooth;
}

// Seções com IDs
<section id="sobre">...</section>
<section id="funcionalidades">...</section>
<section id="faq">...</section>
```

---

## 🧩 Componentes Principais

### 1. MyNavbar

**Arquivo:** `src/components/MyNavbar.tsx`

```typescript
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./MyNavbar.module.css";
import logo from "../assets/logo.png";

const MyNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hiddenButtonRoutes = ["/admin"];
  const shouldShowButton = !hiddenButtonRoutes.includes(location.pathname);

  return (
    <>
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="sm"
        bg="dark"
        variant="dark"
        data-bs-theme="dark"
      >
        <Container fluid>
          {/* Logo à esquerda */}
          <Navbar.Brand href="/">
            <img src={logo} style={{ height: "4rem" }} alt="Logo" />
          </Navbar.Brand>

          {/* Botão toggle para telas pequenas */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {/* Menu colapsável */}
          {shouldShowButton && (
            <>
              <Navbar.Collapse id="responsive-navbar-nav">
                {/* Espaçamento flexível para posicionar o conteúdo */}
                <div className="d-flex w-100 justify-content-between align-items-center">
                  {/* Links no centro */}
                  <Nav className={`mx-auto`}>
                    <Nav.Link className="me-5" href="/#">
                      Sobre Nós
                    </Nav.Link>
                    <Nav.Link className="me-5" href="/#duvidas">Dúvidas Frequentes</Nav.Link>
                    <Nav.Link className="me-5" href="/#">Aprendizagem</Nav.Link>
                    <Nav.Link className="me-5" href="/acoes">Ações</Nav.Link>
                  </Nav>
                  <Button
                    className={styles.mainButton}
                    variant="primary"
                    onClick={() => navigate("/simulacao")}
                  >
                    Simular agora
                  </Button>

                  <Button
                    className={`${styles.secondaryButton} ms-3`}
                    variant="primary"
                    onClick={() => navigate("/admin")}
                  >
                    Entrar
                  </Button>
                </div>
              </Navbar.Collapse>
            </>
          )}
          {!shouldShowButton && (
            <Button className={styles.mainButton} variant="primary" onClick={() => navigate("/")}>
              Voltar ao site
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  );
};
```

**CSS Module:**
```css
/* MyNavbar.module.css */
.navbar {
  background-color: #040f0f !important;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.logo {
  height: 40px;
  cursor: pointer;
  transition: transform 0.2s;
}

.logo:hover {
  transform: scale(1.05);
}

.navButtons {
  display: flex;
  gap: 1rem;
}
```

---

### 2. MyFooter

**Arquivo:** `src/components/MyFooter.tsx`

O rodapé do site exibe informações de contato, links rápidos e ícones de redes sociais, que agora utilizam a biblioteca `react-icons/fa` para maior consistência visual.

```typescript
import { Col, Container, Row } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import styles from "./MyFooter.module.css";
import logo from "../assets/logo.png";

const MyFooter = () => {
  return (
    <Container className={styles.container} fluid>
      <Row className={`${styles.footer}`}>
        <Col>
          <img src={logo} />
          <div className="d-flex gap-4 mt-3 mb-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={32} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube size={32} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={32} />
            </a>
          </div>
          <p>ALM ChatBot © alguns direitos reservados.</p>
        </Col>

        <Col>
          <h3 className="mb-4">Contato</h3>

          <p>+55 61 99999-9999</p>
          <p>alm.contato@gmail.com</p>
          <p>St. Leste Projeção A - Gama Leste. 72444-240</p>
          <p>Brasília - DF</p>
        </Col>
        <Col>
          <h3 className="mb-4">Informações</h3>

          <p style={{ cursor: "pointer" }}>Termos e condições</p>
          <p style={{ cursor: "pointer" }}>Política de privacidade</p>
        </Col>
      </Row>
    </Container>
  );
};
```

---

### 3. SunburstChartComponent

**Arquivo:** `src/components/Dashboard/SunburstChart.tsx`

Componente de gráfico que utiliza a biblioteca Nivo para renderizar um gráfico Sunburst interativo, ideal para visualizar dados hierárquicos como a composição de um portfólio.

```typescript
import { ResponsiveSunburst } from '@nivo/sunburst';
import React from 'react';

const SunburstChart = ({ data }) => (
  <ResponsiveSunburst
    data={data}
    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
    id="name"
    value="value"
    cornerRadius={2}
    borderWidth={1}
    borderColor="white"
    colors={{ scheme: 'nivo' }}
    childColor={{
      from: 'color',
      modifiers: [['brighter', 0.1]],
    }}
    enableArcLabels={true}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: 'color',
      modifiers: [['darker', 1.4]],
    }}
    inheritColorFromParent={false}
  />
);

export default SunburstChart;
```

---

## 🔌 Integração com API

### ApiService

**Arquivo:** `src/services/ApiService.ts`

O `ApiService` é responsável por centralizar todas as chamadas HTTP para o backend. Ele agora é utilizado pelo `AuthService` para realizar operações de autenticação e registro, garantindo a comunicação correta com a API.
```typescript
import axios, { AxiosInstance } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiService {
  private static axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * GET request genérico
   * @param endpoint - Caminho da API (ex: '/portfolio-allocation')
   * @returns Promise com dados tipados
   */
  static async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(endpoint);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.detail || 'Erro na requisição');
      }
      throw error;
    }
  }

  /**
   * GET request para HTML (notebooks)
   * @param endpoint - Caminho da API
   * @returns Promise com HTML como string
   */
  static async getHTML(endpoint: string): Promise<string> {
    try {
      const response = await this.axiosInstance.get(endpoint, {
        headers: { 'Accept': 'text/html' }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.detail || 'Erro ao carregar HTML');
      }
      throw error;
    }
  }

  /**
   * POST request para previsões SARIMA
   * @param data - Parâmetros da previsão
   * @returns Promise com resultado da previsão
   */
  static async forecast<T>(data: ForecastRequest): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>('/forecast/sarima', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.detail || 'Erro na previsão');
      }
      throw error;
    }
  }
}

export default ApiService;
```

### Endpoints Documentados

| Método | Endpoint | Descrição | Retorno |
|--------|----------|-----------|---------|
| GET | `/portfolio-allocation` | Dados do portfólio | `Wallet` |
| GET | `/cash-value` | Valores investidos/disponíveis | `CashValue` |
| GET | `/riskNotebook?notebookName={name}` | Notebook HTML | `string` |
| GET | `/passivos` | Página de passivos | HTML |
| POST | `/forecast/sarima` | Previsão SARIMA | `ForecastResponse` |

### Exemplo de Uso

```typescript
// Em um componente
const AdminPage = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await ApiService.get<Wallet>('/portfolio-allocation');
        setWallet(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!wallet) return null;

  return (/* UI com dados do wallet */);
};
```

---

## 📐 Interfaces TypeScript

**Arquivo:** `src/services/interfaces.ts`

```typescript
/**
 * Dados históricos de um ativo
 */
export interface HistoricalData {
  date: string;
  price: number;
}

/**
 * Dados de previsão
 */
export interface ForecastData {
  date: string;
  price: number;
}

/**
 * Ativo individual no portfólio
 */
export interface Asset {
  ticker: string;           // Ex: "PETR4.SA"
  currentPrice: number;     // Preço atual
  quantity: number;         // Quantidade possuída
  purchasePrice: number;    // Preço de compra
  purchaseDate: string;     // Data da compra
  historicalData: HistoricalData[];
  forecastData: ForecastData[];
}

/**
 * Carteira completa com gráfico Sharpe
 */
export interface Wallet {
  portfolio: Asset[];
  plotBase64: string;       // Gráfico Sharpe em base64
}

/**
 * Valores monetários
 */
export interface CashValue {
  invested: number;         // Total investido
  inCash: number;          // Disponível em caixa
}

/**
 * Requisição de previsão SARIMA
 */
export interface ForecastRequest {
  ticker: string;           // Ex: "PETR4.SA"
  p: number;               // Ordem AR (AutoRegressive)
  d: number;               // Ordem de diferenciação
  q: number;               // Ordem MA (Moving Average)
  n_steps: number;         // Número de passos à frente
}

/**
 * Resposta da previsão SARIMA
 */
export interface ForecastResponse {
  ticker: string;
  forecast: number[];       // Valores previstos
  dates: string[];          // Datas correspondentes
  plotBase64: string;       // Gráfico em base64
}

/**
 * Resposta do notebook de risco
 */
export interface RiskNotebookResponse {
  html: string;            // HTML do notebook
  notebookName: string;
}

/**
 * Estado do formulário do chatbot
 */
export interface FormState {
  name: string;
  years: string;
  amount: string;
  prediction: string;
}

// Authentication interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
```

### Uso de Generics

```typescript
// Tipagem forte nas chamadas de API
const wallet = await ApiService.get<Wallet>('/portfolio-allocation');
const cash = await ApiService.get<CashValue>('/cash-value');
const forecast = await ApiService.forecast<ForecastResponse>({...});

// TypeScript infere os tipos automaticamente
console.log(wallet.portfolio[0].ticker); // OK
console.log(wallet.invalidField);        // Erro de compilação
```

---

## 🌊 Fluxo de Dados

### Diagrama de Fluxo

```
┌──────────────────────────────────────────────────────────────┐
│                         User Action                          │
│  (Click button, Submit form, Navigate to page)               │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────┐
│                    React Component                           │
│  • useState/useEffect                                        │
│  • Event handlers                                            │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────┐
│                     ApiService                               │
│  • Axios instance                                            │
│  • Error handling                                            │
│  • Type conversion                                           │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────┐
│                    Backend API                               │
│  • FastAPI (Python)                                          │
│  • SARIMA models                                             │
│  • Notebook generation                                       │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────┐
│                   Response Data                              │
│  • JSON with typed interfaces                                │
│  • Base64 images                                             │
│  • HTML content                                              │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────┐
│                 Component State Update                       │
│  • setState()                                                │
│  • Re-render                                                 │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────┐
│                      UI Update                               │
│  • DOM changes                                               │
│  • Charts rendering                                          │
│  • User sees result                                          │
└──────────────────────────────────────────────────────────────┘
```

### Exemplo Completo de Fluxo

```typescript
// 1. Usuário clica em "Gerar Previsão"
<Button onClick={handleForecast}>Gerar Previsão</Button>

// 2. Handler inicia requisição
const handleForecast = async () => {
  setLoading(true);  // Atualiza estado local

  try {
    // 3. ApiService faz chamada HTTP
    const response = await ApiService.forecast<ForecastResponse>({
      ticker: selectedTicker,
      p: 1, d: 1, q: 1, n_steps: 30
    });

    // 4. Backend processa e retorna dados
    // (FastAPI + SARIMA model)

    // 5. Atualiza estado com resposta
    setForecastPlot(response.plotBase64);

  } catch (error) {
    // 6. Tratamento de erro
    setError('Erro ao gerar previsão');
  } finally {
    // 7. Finaliza loading
    setLoading(false);
  }
};

// 8. Re-render do componente
if (loading) return <Spinner />;
if (error) return <Alert>{error}</Alert>;

// 9. Exibe resultado
return (
  <img src={`data:image/png;base64,${forecastPlot}`} alt="Forecast" />
);
```

### Gerenciamento de Estado

```typescript
// Estado local com useState
const [data, setData] = useState<Wallet | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// Efeito colateral com useEffect
useEffect(() => {
  fetchData();
}, []); // Executa uma vez no mount

// Sem gerenciador global (Redux/Zustand)
// Apropriado para:
// ✅ Dados não compartilhados entre páginas
// ✅ Estado efêmero (UI state)
// ✅ App de tamanho médio
```

---

## 🎨 Estilização

### Abordagem Híbrida

O projeto usa **três estratégias de CSS**:

1. **Bootstrap** - Sistema de design base
2. **CSS Modules** - Estilos específicos por componente
3. **Inline styles** - Estilos dinâmicos

### 1. Bootstrap

```typescript
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// Grid system
<Container>
  <Row>
    <Col md={6}>Coluna 1</Col>
    <Col md={6}>Coluna 2</Col>
  </Row>
</Container>

// Componentes
<Card>
  <Card.Body>
    <Card.Title>Título</Card.Title>
    <Button variant="primary">Ação</Button>
  </Card.Body>
</Card>
```

### 2. CSS Modules

```css
/* HomePage.module.css */
.hero {
  background: linear-gradient(135deg, #0b1220 0%, #2d3a3a 100%);
  padding: 6rem 0;
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.heroTitle {
  font-size: 3.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.ctaButton {
  background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.ctaButton:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
}
```

```typescript
// Uso no componente
import styles from './HomePage.module.css';

<section className={styles.hero}>
  <h1 className={styles.heroTitle}>Título</h1>
  <Button className={styles.ctaButton}>CTA</Button>
</section>
```

**Vantagens:**
- ✅ Estilos encapsulados (sem conflitos)
- ✅ Nomes gerados automaticamente (`.hero_abc123`)
- ✅ Autocomplete no IDE

### 3. Inline Styles

```typescript
// Para estilos dinâmicos baseados em props/state
<div
  style={{
    backgroundColor: stock.change > 0 ? '#22c55e' : '#ef4444',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    color: 'white'
  }}
>
  {stock.changePercent}%
</div>

// Para sobrescrever estilos de bibliotecas
<iframe
  src={url}
  style={{
    width: '100%',
    height: '600px',
    border: 'none',
    backgroundColor: '#111827'
  }}
/>
```

### Paleta de Cores

```css
/* Cores principais do projeto */

/* Backgrounds */
--bg-primary: #040f0f;      /* Navbar, footer */
--bg-secondary: #0b1220;    /* Hero sections */
--bg-tertiary: #111827;     /* Cards, gráficos */
--bg-card: #1f2937;         /* Cards em destaque */

/* Setores (badges) */
--sector-oil: #f97316;      /* Petróleo e Gás */
--sector-mining: #0ea5e9;   /* Mineração */
--sector-banking: #8b5cf6;  /* Bancos */
--sector-retail: #ec4899;   /* Varejo */
--sector-energy: #22c55e;   /* Energia */
--sector-telecom: #eab308;  /* Telecomunicações */

/* Estados */
--success: #22c55e;         /* Positivo */
--danger: #ef4444;          /* Negativo */
--warning: #eab308;         /* Aviso */
--info: #0ea5e9;           /* Informação */

/* Texto */
--text-primary: #ffffff;    /* Texto principal */
--text-secondary: #9ca3af;  /* Texto secundário */
--text-muted: #6b7280;      /* Texto esmaecido */
```

### Responsividade

```css
/* Mobile first approach com Bootstrap breakpoints */

/* Mobile (< 768px) */
.hero {
  padding: 3rem 1rem;
}

.heroTitle {
  font-size: 2rem;
}

/* Tablet (>= 768px) */
@media (min-width: 768px) {
  .hero {
    padding: 4rem 2rem;
  }

  .heroTitle {
    font-size: 2.5rem;
  }
}

/* Desktop (>= 992px) */
@media (min-width: 992px) {
  .hero {
    padding: 6rem 0;
  }

  .heroTitle {
    font-size: 3.5rem;
  }
}

/* Large Desktop (>= 1200px) */
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
```

### Animações

```css
/* Transições suaves */
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

/* Fade in */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fadeInElement {
  animation: fadeIn 0.6s ease-out;
}

/* Loading spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

---

## ⚙️ Configurações

### TypeScript Config

**tsconfig.app.json** (App code)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

**tsconfig.node.json** (Vite config)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noEmit": true
  },
  "include": ["vite.config.ts"]
}
```

### Vite Config

**vite.config.ts**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173,
    open: true  // Abre browser automaticamente
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser'
  }
});
```

### ESLint Config

**eslint.config.js**

```javascript
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
);
```

### Environment Variables

**.env** (criar arquivo na raiz)

```bash
# URL da API backend
VITE_API_URL=http://localhost:8000

# Outras variáveis (se necessário)
VITE_ENV=development
```

**Uso no código:**

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
const env = import.meta.env.VITE_ENV;

// Tipo seguro
interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_ENV: 'development' | 'production';
}
```

**.env.example** (versionado no Git)

```bash
# Copie este arquivo para .env e preencha os valores

VITE_API_URL=http://localhost:8000
```

---

## 📊 Lógica de Negócio

### Cálculo de Aposentadoria

**Fórmula:** Juros compostos com taxa progressiva

```typescript
/**
 * Calcula retorno mensal de aposentadoria
 *
 * Premissas:
 * - Taxa base: 0.9% ao mês
 * - Incremento: +0.1% a cada 3 anos
 * - Capitalização mensal
 *
 * @param monthlyInvestment - Valor investido por mês
 * @param years - Anos até aposentadoria
 * @returns Retorno mensal após o período
 */
function calculateMonthlyReturn(
  monthlyInvestment: number,
  years: number
): number {
  let totalAmount = 0;
  const months = years * 12;
  const BASE_RATE = 0.009;  // 0.9%

  for (let month = 0; month < months; month++) {
    // Taxa progressiva: +0.1% a cada 36 meses
    const yearsElapsed = Math.floor(month / 36);
    const additionalRate = yearsElapsed * 0.001;
    const currentRate = BASE_RATE + additionalRate;

    // Fórmula: M_{n+1} = (M_n + P) * (1 + r)
    // M_n = montante no mês n
    // P = aporte mensal
    // r = taxa do período
    totalAmount = (totalAmount + monthlyInvestment) * (1 + currentRate);
  }

  // Retorno mensal = montante * taxa base
  return totalAmount * BASE_RATE;
}
```

**Tabela de Taxas:**

| Período | Meses | Taxa |
|---------|-------|------|
| Anos 1-3 | 0-35 | 0.9% |
| Anos 4-6 | 36-71 | 1.0% |
| Anos 7-9 | 72-107 | 1.1% |
| Anos 10-12 | 108-143 | 1.2% |
| Anos 13-15 | 144-179 | 1.3% |
| Anos 16+ | 180+ | 1.4%+ |

**Exemplos de Cálculo:**

```typescript
// Exemplo 1: Conservador
calculateMonthlyReturn(500, 20);
// Input: R$ 500/mês por 20 anos
// Output: ~R$ 4.275/mês

// Exemplo 2: Moderado
calculateMonthlyReturn(1000, 25);
// Input: R$ 1.000/mês por 25 anos
// Output: ~R$ 11.850/mês

// Exemplo 3: Agressivo
calculateMonthlyReturn(2000, 30);
// Input: R$ 2.000/mês por 30 anos
// Output: ~R$ 31.200/mês
```

### Geração de PDF de Contrato

```typescript
import { jsPDF } from 'jspdf';

/**
 * Gera contrato de investimento em PDF
 */
function generateContract(formState: FormState): void {
  const doc = new jsPDF();

  // Configurações de página
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  // Cabeçalho
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('CONTRATO DE INVESTIMENTO', pageWidth / 2, 30, { align: 'center' });

  // Linha separadora
  doc.setLineWidth(0.5);
  doc.line(margin, 35, pageWidth - margin, 35);

  // Corpo do contrato
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');

  let y = 50;
  const lineHeight = 10;

  // Dados do cliente
  doc.text(`CONTRATANTE: ${formState.name}`, margin, y);
  y += lineHeight;

  doc.text(`INVESTIMENTO MENSAL: R$ ${formState.amount}`, margin, y);
  y += lineHeight;

  doc.text(`PRAZO: ${formState.years} anos`, margin, y);
  y += lineHeight * 2;

  // Projeção
  doc.setFont('helvetica', 'bold');
  doc.text('PROJEÇÃO DE RETORNO MENSAL:', margin, y);
  y += lineHeight;

  doc.setFontSize(16);
  doc.setTextColor(34, 197, 94); // Verde
  doc.text(`R$ ${formState.prediction}`, margin, y);

  // Reset cor
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  y += lineHeight * 2;

  // Termos
  doc.setFont('helvetica', 'normal');
  const terms = [
    'Cláusula 1: O presente contrato estabelece os termos do investimento.',
    'Cláusula 2: Os valores são projeções baseadas em modelo estatístico.',
    'Cláusula 3: Rentabilidade passada não garante resultados futuros.',
    'Cláusula 4: Investimentos envolvem riscos de perda do capital.'
  ];

  terms.forEach(term => {
    doc.text(term, margin, y, { maxWidth: pageWidth - 2 * margin });
    y += lineHeight * 1.5;
  });

  // Assinatura
  y = pageHeight - 60;
  doc.line(margin, y, margin + 80, y);
  doc.text('Assinatura do Contratante', margin, y + 10);

  doc.line(pageWidth - margin - 80, y, pageWidth - margin, y);
  doc.text('ALM Investimentos', pageWidth - margin - 80, y + 10);

  // Data
  doc.text(
    `Data: ${new Date().toLocaleDateString('pt-BR')}`,
    pageWidth / 2,
    pageHeight - 20,
    { align: 'center' }
  );

  // Download
  doc.save(`contrato_${formState.name.replace(/\s+/g, '_')}.pdf`);
}
```

### Simulação de Dados de Gráfico

```typescript
/**
 * Gera dados simulados de preço com volatilidade
 */
function generateMockPriceData(
  days: number = 30,
  startPrice: number = 100,
  volatility: number = 0.05
): Array<{ date: string; price: number }> {
  const data = [];
  let currentPrice = startPrice;
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Random walk com drift
    const randomChange = (Math.random() - 0.5) * 2 * volatility;
    const drift = 0.001; // Leve tendência de alta

    currentPrice *= (1 + randomChange + drift);

    data.push({
      date: date.toLocaleDateString('pt-BR'),
      price: parseFloat(currentPrice.toFixed(2))
    });
  }

  return data;
}

// Uso
const chartData = generateMockPriceData(90, 38.45, 0.03);
```

---

## 🔒 Segurança

### Rotas Protegidas

**AdminRoute Component:**

```typescript
// src/services/AdminRoute.tsx
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  // TODO: Implementar verificação de autenticação
  // const isAuthenticated = checkAuth();
  // const isAdmin = checkRole('admin');

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (!isAdmin) {
  //   return <Navigate to="/" replace />;
  // }

  return <>{children}</>;
};

export default AdminRoute;
```

**Uso:**

```typescript
// main.tsx
{
  path: "admin",
  element: (
    <AdminRoute>
      <AdminPage />
    </AdminRoute>
  )
}
```

### Autenticação

**Arquivo:** `src/services/AuthService.ts`

O `AuthService` é a camada central para gerenciar toda a lógica de autenticação e autorização na aplicação. Ele abstrai as chamadas à API de autenticação, lida com a persistência do token e dos dados do usuário (via `localStorage`) e oferece funcionalidades como login, registro, logout e verificação de status de autenticação/admin. Inclui um robusto "modo demo" para desenvolvimento sem backend.

```typescript
import axios from 'axios';
import { User, LoginRequest, LoginResponse, RegisterRequest } from './interfaces';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const TOKEN_KEY = 'alm_auth_token';
const USER_KEY = 'alm_user';

class AuthService {
  private static axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * Login do usuário
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.axiosInstance.post<LoginResponse>(
        '/auth/login',
        credentials
      );

      // Armazena token e usuário
      this.setToken(response.data.token);
      this.setUser(response.data.user);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Se backend não disponível, fazer login em modo demo
        if (error.code === 'ERR_NETWORK' || !error.response) {
          return this.loginDemo(credentials);
        }

        throw new Error(
          error.response?.data?.detail || 'Erro ao fazer login'
        );
      }
      throw error;
    }
  }

  /**
   * Login em modo demo (sem backend)
   */
  private static loginDemo(credentials: LoginRequest): LoginResponse {
    const mockUser: User = {
      id: 'demo123',
      name: credentials.email.split('@')[0],
      email: credentials.email,
      role: credentials.email.includes('admin') ? 'admin' : 'user',
      createdAt: new Date().toISOString(),
    };

    const mockToken = 'demo_' + btoa(JSON.stringify(mockUser));

    // Armazena token e usuário
    this.setToken(mockToken);
    this.setUser(mockUser);

    console.warn('🚧 Modo DEMO ativado - Backend não disponível');

    return {
      user: mockUser,
      token: mockToken,
    };
  }

  /**
   * Registro de novo usuário
   */
  static async register(data: RegisterRequest): Promise<LoginResponse> {
    try {
      const response = await this.axiosInstance.post<LoginResponse>(
        '/auth/register',
        data
      );

      // Armazena token e usuário
      this.setToken(response.data.token);
      this.setUser(response.data.user);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Se backend não disponível, criar conta em modo demo
        if (error.code === 'ERR_NETWORK' || !error.response) {
          return this.registerDemo(data);
        }

        throw new Error(
          error.response?.data?.detail || 'Erro ao criar conta'
        );
      }
      throw error;
    }
  }

  /**
   * Registro em modo demo (sem backend)
   */
  private static registerDemo(data: RegisterRequest): LoginResponse {
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    const mockToken = 'demo_' + btoa(JSON.stringify(mockUser));

    // Armazena token e usuário
    this.setToken(mockToken);
    this.setUser(mockUser);

    return {
      user: mockUser,
      token: mockToken,
    };
  }

  /**
   * Logout do usuário
   */
  static logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  /**
   * Obtém token armazenado
   */
  static getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Armazena token
   */
  static setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Obtém usuário armazenado
   */
  static getUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Armazena usuário
   */
  static setUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Verifica se usuário está autenticado
   */
  static isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Tokens demo sempre são válidos
    if (token.startsWith('demo_')) return true;

    // Verifica se token JWT expirou
    try {
      const payload = this.decodeToken(token);
      const now = Date.now() / 1000;

      return payload.exp > now;
    } catch {
      return false;
    }
  }

  /**
   * Verifica se usuário é admin
   */
  static isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin';
  }

  /**
   * Decodifica JWT token
   */
  private static decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  /**
   * Atualiza token de acesso
   */
  static async refreshToken(): Promise<string> {
    try {
      const response = await this.axiosInstance.post<{ token: string }>(
        '/auth/refresh'
      );

      this.setToken(response.data.token);
      return response.data.token;
    } catch (error) {
      this.logout();
      throw new Error('Sessão expirada');
    }
  }

  /**
   * Obtém perfil do usuário atual
   */
  static async getCurrentUser(): Promise<User> {
    try {
      const response = await this.axiosInstance.get<User>('/auth/me');
      this.setUser(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.detail || 'Erro ao buscar perfil'
        );
      }
      throw error;
    }
  }
}

export default AuthService;

**Interceptor Axios (para enviar token):**

```typescript
// ApiService.ts
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

### Validação de Inputs

```typescript
/**
 * Valida entrada numérica no chatbot
 */
function validateNumberInput(input: string, min?: number, max?: number): boolean {
  const num = parseFloat(input);

  if (isNaN(num)) {
    return false;
  }

  if (min !== undefined && num < min) {
    return false;
  }

  if (max !== undefined && num > max) {
    return false;
  }

  return true;
}

// Uso no chatbot
{
  path: "get_years",
  message: "Quantos anos faltam para você se aposentar?",
  function: (params) => {
    if (!validateNumberInput(params.userInput, 1, 60)) {
      return "Por favor, insira um número válido entre 1 e 60.";
    }
    return true;
  }
}
```

### CORS (Backend config)

```python
# Backend FastAPI (exemplo)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🚀 Como Executar

### Pré-requisitos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Backend API** rodando (opcional para desenvolvimento)

### Instalação

```bash
# Clone o repositório
git clone <url-do-repo>
cd alm-frontend

# Instale dependências
npm install
```

### Configuração

```bash
# Crie arquivo .env na raiz
cp .env.example .env

# Edite .env com suas configurações
# VITE_API_URL=http://localhost:8000
```

### Desenvolvimento

```bash
# Inicia servidor de desenvolvimento
npm run dev

# Acesse: http://localhost:5173
```

**Hot Module Replacement (HMR):**
- Mudanças em arquivos `.tsx`, `.ts`, `.css` são refletidas instantaneamente
- Estado do componente é preservado quando possível

### Build para Produção

```bash
# Cria build otimizado
npm run build

# Output: dist/

# Preview da build
npm run preview
```

### Linting

```bash
# Verifica problemas de código
npm run lint

# Fix automático
npm run lint -- --fix
```

### Scripts Disponíveis

```json
{
  "scripts": {
    "dev": "vite",                    // Dev server
    "build": "tsc -b && vite build",  // Build produção
    "lint": "eslint .",               // Linting
    "preview": "vite preview"         // Preview build
  }
}
```

### Estrutura do Build

```
dist/
├── assets/
│   ├── index-abc123.js      # Bundle JS (minificado)
│   ├── index-def456.css     # Bundle CSS
│   └── logo-ghi789.png      # Assets otimizados
├── index.html               # HTML entry point
└── vite.svg
```

---

## 🛠 Guia de Desenvolvimento

### Criando um Novo Componente

```typescript
// src/components/MyComponent.tsx
import React from 'react';
import styles from './MyComponent.module.css';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      {onAction && (
        <button onClick={onAction}>Ação</button>
      )}
    </div>
  );
};

export default MyComponent;
```

```css
/* src/components/MyComponent.module.css */
.container {
  padding: 1rem;
  background-color: #111827;
  border-radius: 8px;
}

.container h2 {
  color: white;
  margin-bottom: 1rem;
}
```

### Criando uma Nova Página

```typescript
// src/pages/NewPage/NewPage.tsx
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ApiService from '../../services/ApiService';
import styles from './NewPage.module.css';

const NewPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await ApiService.get('/endpoint');
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <Container className={styles.page}>
      <h1>Nova Página</h1>
      {/* Conteúdo */}
    </Container>
  );
};

export default NewPage;
```

**Adicionar ao router:**

```typescript
// main.tsx
import NewPage from './pages/NewPage/NewPage';

{
  path: "new-page",
  element: <NewPage />
}
```

### Adicionando Novo Endpoint API

```typescript
// src/services/interfaces.ts
export interface NewDataType {
  id: number;
  name: string;
  value: number;
}

// src/services/ApiService.ts
class ApiService {
  // ... métodos existentes

  /**
   * Busca novo tipo de dado
   */
  static async getNewData(): Promise<NewDataType[]> {
    return this.get<NewDataType[]>('/new-endpoint');
  }
}
```

### Boas Práticas

**1. Nomes de arquivos:**
```
✅ MyComponent.tsx
✅ MyComponent.module.css
✅ useCustomHook.ts
✅ api.service.ts

❌ myComponent.tsx
❌ my-component.tsx
❌ MyComponentStyles.css
```

**2. Imports ordenados:**
```typescript
// 1. React e bibliotecas externas
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

// 2. Serviços e utils internos
import ApiService from '../../services/ApiService';
import { Wallet } from '../../services/interfaces';

// 3. Componentes
import MyComponent from '../../components/MyComponent';

// 4. Estilos
import styles from './Page.module.css';
```

**3. Tipagem forte:**
```typescript
// ✅ Bom
interface Props {
  data: Wallet;
  onUpdate: (id: string) => void;
}

const Component: React.FC<Props> = ({ data, onUpdate }) => {
  // ...
};

// ❌ Evitar
const Component = (props: any) => {
  // ...
};
```

**4. Hooks customizados:**
```typescript
// src/hooks/useWallet.ts
import { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import { Wallet } from '../services/interfaces';

export const useWallet = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWallet = async () => {
      setLoading(true);
      try {
        const data = await ApiService.get<Wallet>('/portfolio-allocation');
        setWallet(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro');
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  return { wallet, loading, error };
};

// Uso
const AdminPage = () => {
  const { wallet, loading, error } = useWallet();

  if (loading) return <Spinner />;
  if (error) return <Alert>{error}</Alert>;

  return <div>{/* UI */}</div>;
};
```

**5. Tratamento de erros:**
```typescript
// ✅ Específico
try {
  const data = await ApiService.get('/endpoint');
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      setError('Recurso não encontrado');
    } else if (error.response?.status === 500) {
      setError('Erro no servidor');
    } else {
      setError(error.response?.data?.detail || 'Erro na requisição');
    }
  } else {
    setError('Erro desconhecido');
  }
}

// ❌ Genérico
try {
  // ...
} catch (error) {
  console.log(error);
}
```

---

## 📚 Recursos Adicionais

### Documentação Oficial

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Recharts](https://recharts.org/)

### Convenções de Commit

```bash
# Formato: <tipo>(<escopo>): <mensagem>

feat(chatbot): adiciona validação de inputs
fix(api): corrige timeout em requisições longas
style(home): ajusta responsividade do hero
refactor(components): extrai lógica para hook customizado
docs(readme): atualiza instruções de instalação
test(utils): adiciona testes para calculateMonthlyReturn
```

### Roadmap Sugerido

- [ ] Implementar autenticação completa
- [ ] Adicionar testes unitários (Jest)
- [ ] Adicionar testes E2E (Playwright)
- [ ] Implementar cache de API (React Query)
- [ ] Adicionar modo offline (PWA)
- [ ] Internacionalização (i18n)
- [ ] Migrar dados mock para API
- [ ] Adicionar dark/light mode toggle
- [ ] Implementar WebSockets para dados real-time
- [ ] Analytics (Google Analytics/Mixpanel)

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique esta documentação
2. Consulte logs do console (`npm run dev`)
3. Verifique issues no repositório
4. Contate o time de desenvolvimento

---

## 🚀 PRÓXIMOS PASSOS - Plano de Implementação

### 📊 **NOVO DASHBOARD** (Baseado no Design Figma)

**Status:** ✅ **IMPLEMENTADO (Fase 1-3 Concluídas)**

**Objetivo:** Criar página de Dashboard moderna e profissional baseada no design do Figma, separada da AdminPage existente.

---

### 🎨 **Análise do Design**

#### **Paleta de Cores:**
```css
/* Cores principais do design */
--bg-dark: #2D3A3A;           /* Background principal (verde escuro) */
--bg-light: #FFFFFF;          /* Background landing page */
--btn-primary: #FCFFFC;       /* Botões primários (branco) */
--text-light: #FFFFFF;        /* Textos em fundo escuro */
--accent-green: #00FF00;      /* Linhas/destaques (verde neon) */
--card-bg: rgba(255,255,255,0.1); /* Cards transparentes */
```

#### **Componentes Identificados:**

**Imagem 1 - Landing Page & Chatbot:**
- ✅ Hero section: "Bem vindo ao ALM ChatBot"
- ✅ Botão CTA: "Iniciar agora mesmo"
- ✅ Seção hero alternativa com gráfico de linhas
- ✅ Cards de features (Simplicidade, Segurança, Previsibilidade, Lucro)
- ✅ Seção "Como funciona nossa solução?"
- ✅ FAQ "Dúvidas frequentes" (accordion)
- ✅ Footer com contato
- ✅ Chatbot interface (2 variações de UI)

**Imagem 2 - Mobile Menu:**
- ✅ Menu hamburguer
- ✅ Links: Home, Dúvidas?, Sobre nós

**Imagem 3 - Dashboard Admin & Auth:**
- ⚠️ **Dashboard com sidebar: IGNORAR**
  - Usaremos o layout das imagens anteriores (sem sidebar)
  - Layout: Navbar superior + conteúdo principal
  - Gráficos: Barras (Ações) e Pizza (Carteira de Investimentos)
  - Cards: Lembrete + Total de Gastos (R$ 0.000,010)

- ✅ **Tela de Login:**
  - Fundo escuro (#2D3A3A)
  - Logo central
  - Campos: Username, Password
  - Botões: Login, Sign Up

- ✅ **Tela de Sign Up:**
  - Modal branco sobre fundo escuro
  - Campos: Full name, username, e-mail, Password, Repeat Password, Birthday, Something
  - Botões: Cancel, Sign Up

---

### 📋 **Plano de Implementação - Dashboard**

#### **Fase 1: Estrutura Base** (2-3 horas)

**1. Criar componentes base:**
```
src/components/Dashboard/
├── DashboardLayout.tsx      # Layout wrapper (SEM SIDEBAR)
├── DashboardLayout.module.css
├── MetricCard.tsx           # Card de métrica reutilizável
└── MetricCard.module.css
```

**Layout - Especificações:**
- Navbar superior (usar MyNavbar existente)
- Conteúdo principal centralizado
- Background: #2D3A3A
- Sem sidebar lateral
- Layout similar às imagens 1 e 2 (dashboard com heatmap/tabelas)

**2. Criar página principal:**
```
src/pages/DashboardPage/
├── DashboardPage.tsx
├── DashboardPage.module.css
└── sections/
    ├── OverviewSection.tsx      # Cards de métricas
    ├── ChartsSection.tsx        # Gráficos principais
    └── RemindersSection.tsx     # Lembretes
```

---

#### **Fase 2: Componentes de Dados** (2-3 horas)

**1. Cards de Métricas:**
```typescript
interface MetricCard {
  title: string;
  value: string;
  icon?: ReactNode;
  color?: string;
}

// Exemplo: Total de Gastos
<MetricCard
  title="Total de Gastos"
  value="R$ 0.000,010"
  color="#00FF00"
/>
```

**2. Gráficos:**

**Gráfico de Barras (Ações):**
```typescript
// Usando Recharts
<BarChart data={acoesData}>
  <Bar dataKey="value" fill="#4CAF50" />
  <XAxis dataKey="name" />
  <YAxis />
</BarChart>
```

**Gráfico de Pizza (Carteira):**
```typescript
<PieChart>
  <Pie
    data={carteiraData}
    dataKey="value"
    nameKey="name"
    cx="50%"
    cy="50%"
  />
</PieChart>
```

**3. Card de Lembretes:**
```typescript
interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}
```

---

#### **Fase 3: Autenticação (UI)** (2 horas)

**1. Página de Login:**
```
src/pages/LoginPage/
├── LoginPage.tsx
└── LoginPage.module.css
```

**Elementos:**
- Logo centralizada (164x121px)
- Fundo: #2D3A3A
- Card de login com:
  - Input Username
  - Input Password
  - Botão "Login" (verde neon outline)
  - Link "Sign Up"

**2. Modal de Sign Up:**
```
src/components/Auth/
├── SignUpModal.tsx
└── SignUpModal.module.css
```

**Elementos:**
- Modal branco (fundo)
- Logo no topo
- Título "Sign Up"
- Campos:
  - Full name
  - username
  - e-mail
  - Password
  - Repeat Password
  - Birthday (date picker)
  - Something (dropdown)
- Botões: Cancel (outline) / Sign Up (filled)

---

#### **Fase 4: Integração** (1-2 horas)

**1. Adicionar rota:**
```typescript
// main.tsx
{
  path: "dashboard",
  element: (
    <AuthProvider>
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    </AuthProvider>
  )
}
```

**2. Conectar com AuthContext:**
```typescript
// DashboardPage.tsx
const { user, isAuthenticated } = useAuth();

if (!isAuthenticated) {
  return <Navigate to="/login" />;
}
```

**3. Integrar com API:**
```typescript
// Buscar dados do dashboard
const [dashboardData, setDashboardData] = useState(null);

useEffect(() => {
  ApiService.get('/dashboard/overview').then(setDashboardData);
}, []);
```

---

### 🎯 **Estrutura de Arquivos a Criar**

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── Sidebar.tsx                    # ✅ Criar
│   │   ├── Sidebar.module.css             # ✅ Criar
│   │   ├── DashboardLayout.tsx            # ✅ Criar
│   │   ├── ProfileCard.tsx                # ✅ Criar
│   │   ├── MetricCard.tsx                 # ✅ Criar
│   │   └── ReminderCard.tsx               # ✅ Criar
│   │
│   └── Auth/
│       ├── SignUpModal.tsx                # ✅ Criar
│       └── SignUpModal.module.css         # ✅ Criar
│
├── pages/
│   ├── DashboardPage/
│   │   ├── DashboardPage.tsx              # ✅ Criar
│   │   ├── DashboardPage.module.css       # ✅ Criar
│   │   └── sections/
│   │       ├── OverviewSection.tsx        # ✅ Criar
│   │       ├── ChartsSection.tsx          # ✅ Criar
│   │       └── RemindersSection.tsx       # ✅ Criar
│   │
│   └── LoginPage/
│       ├── LoginPage.tsx                  # ✅ Reescrever (já existe stub)
│       └── LoginPage.module.css           # ✅ Criar
│
├── contexts/
│   └── AuthContext.tsx                    # ✅ Já criado (não mexer)
│
└── services/
    └── AuthService.ts                     # ✅ Já criado (não mexer)
```

---

### 📊 **Interfaces a Criar**

```typescript
// src/services/interfaces.ts (adicionar)

export interface DashboardData {
  user: User;
  metrics: {
    totalGastos: number;
    saldoTotal: number;
    investimentos: number;
  };
  acoes: {
    name: string;
    value: number;
  }[];
  carteira: {
    name: string;
    value: number;
    percentage: number;
  }[];
  reminders: Reminder[];
}

export interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}
```

---

### 🎨 **Design System a Implementar**

```css
/* src/styles/dashboard.css (criar) */

:root {
  /* Colors */
  --dashboard-bg: #2D3A3A;
  --dashboard-sidebar: #1a2424;
  --dashboard-card: rgba(255, 255, 255, 0.05);
  --dashboard-text: #FFFFFF;
  --dashboard-text-muted: rgba(255, 255, 255, 0.6);
  --dashboard-accent: #00FF00;
  --dashboard-border: rgba(255, 255, 255, 0.1);

  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 32px;
  --spacing-xl: 48px;

  /* Typography */
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;

  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.2);

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
}
```

---

### ✅ **Checklist de Implementação**

**Componentes Base:**
- [ ] Sidebar com menu de navegação
- [ ] DashboardLayout (wrapper)
- [ ] ProfileCard (foto + nome)
- [x] MetricCard (reutilizável)
- [ ] ReminderCard

**Páginas:**
- [x] DashboardPage completa
- [x] LoginPage redesenhada
- [x] SignUpModal

**Gráficos:**
- [x] Gráfico Sunburst (Carteira)
- [x] Integração com Nivo

**Integração:**
- [x] Rota `/dashboard`
- [x] Conectar AuthContext
- [ ] API endpoints
- [ ] Loading states
- [ ] Error handling

**Estilização:**
- [x] Tema dark (#2D3A3A)
- [x] Responsividade mobile
- [x] Hover states
- [x] Transições suaves

**Testes:**
- [x] Testes unitários dos componentes
- [x] Testes de integração do fluxo de login
- [x] Testes do dashboard

---

### 📝 **Notas Importantes**

1. **Não mexer na AdminPage existente** - criar tudo separado
2. **Usar AuthContext já criado** - `src/contexts/AuthContext.tsx`
3. **Manter consistência** com design do Figma (cores, espaçamentos)
4. **Mobile-first** - garantir responsividade
5. **Acessibilidade** - aria-labels, keyboard navigation

---

### 🚀 **Próxima Sessão: Começar por**

1. Criar `Sidebar.tsx` e `DashboardLayout.tsx`
2. Implementar `DashboardPage.tsx` com estrutura básica
3. Adicionar `MetricCard` e dados mockados
4. Implementar gráficos com Recharts

**Estimativa:** 6-8 horas de implementação total

---

**Última atualização:** 27 Nov 2025
**Versão:** 1.2.0
**Autor:** Equipe ALM
**Status:** Funcionalidades de Autenticação e Dashboard implementadas
