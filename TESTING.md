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

Este projeto usa **Vitest** e **React Testing Library** para testes automatizados.

### **Stack de Testes:**
- **Vitest** - Framework de testes (mais rápido que Jest)
- **React Testing Library** - Testes de componentes React
- **@testing-library/user-event** - Simulação de interações
- **jsdom** - Ambiente DOM simulado
- **@vitest/ui** - Interface visual para testes

### **Cobertura Atual:**
- ✅ Componentes (Navbar, Footer, Charts)
- ✅ Páginas (HomePage, AcoesPage)
- ✅ Serviços (ApiService)
- ✅ Chatbot (básico)

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
- Mocks globais (matchMedia, IntersectionObserver)

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
npm test MyNavbar.test.tsx

# Por padrão
npm test -- --grep="renders navbar"

# Por pasta
npm test src/components
```

---

## 📁 Estrutura de Testes

```
src/
├── components/
│   ├── MyNavbar.tsx
│   ├── MyNavbar.test.tsx          # ✅ Teste do component
│   ├── MyFooter.tsx
│   ├── MyFooter.test.tsx          # ✅
│   ├── PieChartComponent.tsx
│   ├── PieChartComponent.test.tsx # ✅
│   ├── LineChartComponent.tsx
│   └── LineChartComponent.test.tsx # ✅
│
├── pages/
│   ├── HomePage/
│   │   ├── HomePage.tsx
│   │   └── HomePage.test.tsx       # ✅
│   └── AcoesPage/
│       ├── AcoesPage.tsx
│       └── AcoesPage.test.tsx      # ✅
│
├── services/
│   ├── ApiService.ts
│   └── ApiService.test.ts          # ✅
│
└── tests/
    ├── setup.ts                    # Setup global
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

// ❌ Evitar
screen.getByTestId('submit-button')
container.querySelector('.submit-btn')
```

#### **2. Teste comportamento, não implementação**

```typescript
// ✅ Bom - testa o que o usuário vê
it('shows error message on invalid input', () => {
  render(<LoginForm />);
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'invalid' }
  });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
});

// ❌ Ruim - testa detalhes de implementação
it('sets error state', () => {
  const { result } = renderHook(() => useForm());
  act(() => {
    result.current.setError('email', 'Invalid');
  });

  expect(result.current.errors.email).toBe('Invalid');
});
```

#### **3. Mock apenas o necessário**

```typescript
// Mock de API
vi.mock('./ApiService', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [] }),
  },
}));

// Mock de bibliotecas externas problemáticas
vi.mock('recharts', () => ({
  PieChart: ({ children }: any) => <div>{children}</div>,
  Pie: () => null,
}));
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

### **Navbar**

```typescript
it('hides buttons on admin page', () => {
  vi.mocked(useLocation).mockReturnValue({ pathname: '/admin' });
  render(<MyNavbar />);

  expect(screen.queryByText(/Simular agora/i)).not.toBeInTheDocument();
});
```

### **Gráficos (Recharts)**

```typescript
it('renders pie chart with data', () => {
  const data = [
    { name: 'Ações', value: 50 },
    { name: 'Renda Fixa', value: 30 },
  ];

  render(<PieChartComponent data={data} />);

  // Recharts renderiza em SVG
  expect(screen.getByRole('region')).toBeInTheDocument();
});
```

### **API Service**

```typescript
import { vi, describe, it, expect, beforeEach } from 'vitest';
import axios from 'axios';

vi.mock('axios');

beforeEach(() => {
  vi.clearAllMocks();
});

it('makes GET request', async () => {
  const mockData = { portfolio: [] };
  vi.mocked(axios.create).mockReturnValue({
    get: vi.fn().mockResolvedValue({ data: mockData }),
  } as any);

  const result = await ApiService.get('/portfolio');

  expect(result).toEqual(mockData);
});
```

---

## 🐛 Troubleshooting

### **Problema: "Cannot find module"**

```bash
# Limpar cache e reinstalar
rm -rf node_modules
npm install
```

### **Problema: "ReferenceError: fetch is not defined"**

```typescript
// Adicionar ao setup.ts
import { fetch } from 'cross-fetch';
global.fetch = fetch;
```

### **Problema: "matchMedia is not a function"**

Já está configurado no `setup.ts`. Se ainda ocorrer:

```typescript
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
});
```

### **Problema: Testes muito lentos**

```bash
# Usar apenas 1 worker
npm test -- --pool=forks --poolOptions.forks.singleFork

# Desabilitar coverage
npm test -- --coverage=false
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

**Última atualização:** 2024
**Versão:** 1.0.0
