# 🧪 Guia de Testes - ALM Frontend

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Configuração](#configuração)
3. [Executando Testes](#executando-testes)
4. [Estrutura de Testes](#estrutura-de-testes)
5. [Coverage](#coverage)
6. [Escrevendo Novos Testes](#escrevendo-novos-testes)

---

## 🎯 Visão Geral

Este projeto usa **Vitest** e **React Testing Library** para testes automatizados. A suíte de testes foi recentemente refatorada e aprimorada para garantir maior robustez e utilidade, focando em testar o comportamento do usuário e a lógica de negócio, com estratégias de mocking adequadas para dependências externas.

### **Stack de Testes:**
- **Vitest** - Framework de testes (mais rápido que Jest)
- **React Testing Library** - Testes de componentes React
- **@testing-library/user-event** - Simulação de interações
- **jsdom** - Ambiente DOM simulado
- **@vitest/ui** - Interface visual para testes

### **Cobertura Atual:**
- ✅ **Todos os testes estão passando!**
- ✅ Componentes (Navbar, Footer, Charts com mocking aprimorado)
- ✅ Páginas (HomePage, AcoesPage, com asserções corrigidas)
- ✅ Serviços (ApiService, com mocking robusto de módulos)
- ✅ Chatbot

---

## ⚙️ Configuração

### **Instalação**

As dependências já foram instaladas. Se precisar reinstalar:

```bash
npm install
```

### **Arquivos de Configuração**

**vitest.config.ts** - Configuração principal do Vitest
```typescript
{
  environment: 'jsdom',
  setupFiles: './src/tests/setup.ts',
  coverage: {
    provider: 'v8',
    lines: 70,
    functions: 70,
    branches: 70,
    statements: 70,
  }
}
```

**src/tests/setup.ts** - Setup global dos testes
- Importa `@testing-library/jest-dom`
- Configura cleanup automático
- Mocks globais (matchMedia, IntersectionObserver, ResizeObserver)

---

## 🚀 Executando Testes

### **Comandos Disponíveis**

```bash
# Modo watch (reexecuta ao salvar arquivos)
npm test

# Executar uma vez (CI/CD)
npm run test:run

# Interface visual interativa
npm run test:ui

# Gerar relatório de coverage
npm run test:coverage
```

### **Executar Testes Específicos**

```bash
# Por arquivo
npm run test:run MyNavbar.test.tsx

# Por padrão
npm run test:run -- --grep="renders navbar"

# Por pasta
npm run test:run src/components
```

---

## 📁 Estrutura de Testes

```
src/
├── components/
│   ├── MyNavbar.tsx
│   ├── MyNavbar.test.tsx          # ✅ Componente atualizado com testes de interação.
│   ├── MyFooter.tsx
│   ├── MyFooter.test.tsx          # ✅ Asserções corrigidas.
│   ├── PieChartComponent.tsx
│   ├── PieChartComponent.test.tsx # ✅ Mock local de 'recharts' e teste de lógica de dados.
│   ├── LineChartComponent.tsx
│   └── LineChartComponent.test.tsx # ✅ Mock local de 'recharts'.
│
├── pages/
│   ├── HomePage/
│   │   ├── HomePage.tsx
│   │   └── HomePage.test.tsx       # ✅ Asserções corrigidas.
│   └── AcoesPage/
│       ├── AcoesPage.tsx
│       └── AcoesPage.test.tsx      # ✅ Asserções e seletores corrigidos.
│
├── services/
│   ├── ApiService.ts
│   └── ApiService.test.ts          # ✅ Utiliza mock manual robusto do módulo.
│   └── __mocks__/                  # Diretório para mocks manuais (ex: ApiService.ts)
│       └── ApiService.ts
│
└── tests/
    ├── setup.ts                    # Setup global com mocks de ambiente (ResizeObserver).
    ├── mocks/
    │   └── apiMocks.ts             # Dados mockados
    └── utils/
        └── test-utils.tsx          # Helpers customizados
```

---

## 📊 Coverage

### **Visualizar Coverage**

```bash
# Gerar relatório
npm run test:coverage

# Relatório HTML (mais detalhado)
# Abre: coverage/index.html
```

### **Metas de Coverage**

| Métrica | Meta | Status |
|---------|------|--------|
| Lines | 70% | 🎯 |
| Functions | 70% | 🎯 |
| Branches | 70% | 🎯 |
| Statements | 70% | 🎯 |

### **Arquivos Excluídos do Coverage**

- `node_modules/`
- `src/tests/`
- `*.config.ts`
- `main.tsx`
- `*.d.ts`

---

## ✍️ Escrevendo Novos Testes

### **Template Básico**

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '../tests/utils/test-utils';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders without crashing', () => {
    render(<MyComponent />);
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(screen.getByText(/Clicked/i)).toBeInTheDocument();
  });
});
```

### **Boas Práticas**

#### **1. Use queries semânticas**

```typescript
// ✅ Bom
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText(/email/i)
screen.getByText(/welcome/i)

// ❌ Evitar (a menos que seja absolutamente necessário)
screen.getByTestId('submit-button')
container.querySelector('.submit-btn')
```

#### **2. Teste comportamento, não implementação**

```typescript
// ✅ Bom - testa o que o usuário vê e como o sistema reage
it('shows error message on invalid input', async () => {
  render(<LoginForm />);
  await userEvent.type(screen.getByLabelText(/email/i), 'invalid-email');
  await userEvent.click(screen.getByRole('button', { name: /entrar/i }));

  expect(screen.getByText(/Email ou senha inválidos/i)).toBeInTheDocument();
});

// ❌ Ruim - testa detalhes de implementação interna que podem mudar
it('sets error state directly', () => {
  // Isso não testa a interação do usuário ou o fluxo real da aplicação.
  // Focar em como o erro é apresentado na UI é mais útil.
});
```

#### **3. Mock apenas o necessário com estratégia correta**

```typescript
// Exemplo de mock manual para o ApiService (para módulos complexos ou estáticos)
// (localizado em src/services/__mocks__/ApiService.ts)
//
// import { vi } from 'vitest';
// const ApiService = {
//   get: vi.fn(),
//   getHTML: vi.fn(),
//   forecast: vi.fn(),
// };
// export default ApiService;

// Como usar no teste:
// import ApiService from './ApiService'; // Importa o mock automaticamente
// vi.mock('./ApiService'); // Ativa o mock manual

it('calls API service to fetch data', async () => {
  (ApiService.get as vi.Mock).mockResolvedValue({ data: { items: [] } }); // Configura o mock
  render(<MyComponent />);
  // ... simular interação que chama ApiService.get
  expect(ApiService.get).toHaveBeenCalledWith('/some-endpoint');
});


// Exemplo de mock para bibliotecas externas problemáticas (ex: Recharts)
// Direto no arquivo de teste do componente que usa a lib:
vi.mock('recharts', async () => {
  const actual = await vi.importActual('recharts');
  return {
    ...actual,
    ResponsiveContainer: ({ children }) => <div className="mock-responsive-container">{children}</div>,
    LineChart: ({ children }) => <div className="mock-line-chart">{children}</div>,
    // Mockar todos os outros componentes que causam problemas (XAxis, YAxis, etc.)
  };
});
```

#### **4. Use screen.debug() para debugar**

```typescript
it('debugging test', () => {
  render(<MyComponent />);

  // Mostra o HTML atual no console
  screen.debug();

  // Mostra um elemento específico
  screen.debug(screen.getByRole('button'));
});
```

---

## 🔧 Testes de Componentes Específicos

### **Navbar (`MyNavbar.test.tsx`)**

- **Testes de Renderização:** Verifica a renderização do logo e dos links de navegação.
- **Testes de Interação:** Simula cliques nos botões "Simular agora" e "Entrar" e verifica se a navegação (`useNavigate`) é chamada com os paths corretos.
- **Testes Condicionais:** Assegura que o comportamento da Navbar muda corretamente na rota `/admin` (mostrando "Voltar ao site" e ocultando outros botões/links).

### **Gráficos (`LineChartComponent.test.tsx`, `PieChartComponent.test.tsx`)**

- **Mock de 'recharts':** Devido a problemas de ambiente (JSDOM não calcula layout e `recharts` requer contexto específico), a biblioteca 'recharts' é mockada localmente em cada arquivo de teste de gráfico. Os mocks substituem componentes de `recharts` por `div`s simples, permitindo que o componente seja renderizado sem erros de contexto.
- **Testes de Renderização:** Verificam que o componente renderiza sem lançar erros, mesmo com os mocks.
- **Testes de Lógica:** No `PieChartComponent`, verifica-se a lógica de geração de dados aleatórios e de passagem de props para o `Pie` mockado, assegurando que a transformação de dados interna funcione como esperado.

### **API Service (`ApiService.test.ts`)**

- **Mock Manual:** Utiliza um mock manual completo do módulo `ApiService` (em `src/services/__mocks__/ApiService.ts`). Isso garante que, ao importar `ApiService` nos testes, uma versão mockada seja usada, controlando totalmente o comportamento de seus métodos estáticos.
- **Testes de Comportamento:** Verifica que os métodos mockados do `ApiService` (ex: `get`, `post`, `getHTML`, `forecast`) são chamados com os argumentos corretos e que o serviço retorna os valores esperados ou lança exceções, simulando cenários de sucesso e falha de API.

---

## 🐛 Troubleshooting

### **Problema: "ReferenceError: fetch is not defined"**

```typescript
// Adicionar ao setup.ts
import { fetch } from 'cross-fetch';
global.fetch = fetch;
```

---

## 📚 Recursos Adicionais

### **Documentação Oficial**

- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [User Event](https://testing-library.com/docs/user-event/intro)

### **Cheat Sheets**

**Queries:**
```typescript
// Buscar por texto
screen.getByText(/hello/i)

// Buscar por role
screen.getByRole('button', { name: /submit/i })

// Buscar por label
screen.getByLabelText(/email/i)

// Buscar por placeholder
screen.getByPlaceholderText(/search/i)

// Buscar por test id (último recurso)
screen.getByTestId('custom-element')
```

**Assertions:**
```typescript
expect(element).toBeInTheDocument()
expect(element).toBeVisible()
expect(element).toHaveTextContent('Hello')
expect(element).toHaveClass('active')
expect(element).toHaveStyle({ color: 'red' })
expect(button).toBeDisabled()
```

**User Events:**
```typescript
import userEvent from '@testing-library/user-event';

await userEvent.click(button)
await userEvent.type(input, 'Hello')
await userEvent.clear(input)
await userEvent.selectOptions(select, 'option1')
await userEvent.upload(input, file)
```

---

## ✅ Checklist para PR

Antes de criar um Pull Request, verifique:

- [ ] Todos os testes passam (`npm run test:run`)
- [ ] Coverage está acima de 70% (`npm run test:coverage`)
- [ ] Novos componentes têm testes
- [ ] Testes são legíveis e bem nomeados
- [ ] Não há `console.log` ou `screen.debug()` esquecidos
- [ ] Mocks são limpos após cada teste
- [ ] Testes não dependem de ordem de execução

---

**Última atualização:** 2025
**Versão:** 1.0.0