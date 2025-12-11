import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AcoesDetalhePage from './AcoesDetalhePage';

vi.mock('../../components/LineChartComponent', () => ({
  __esModule: true,
  default: () => <div data-testid="line-chart" />,
}));

const renderPage = (initialEntry = '/acoes/PETR4') => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/acoes/:ticker" element={<AcoesDetalhePage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('AcoesDetalhePage', () => {
  it('renderiza dados da ação da rota', () => {
    renderPage('/acoes/PETR4');

    expect(screen.getAllByText('Petrobras')[0]).toBeInTheDocument();
    expect(screen.getByText('PETR4')).toBeInTheDocument();
    expect(screen.getByText('Outras ações da nossa carteira')).toBeInTheDocument();
  });

  it('usa fallback quando ticker não encontrado', () => {
    renderPage('/acoes/XYZ');

    expect(screen.getAllByText('Bitcoin')[0]).toBeInTheDocument();
  });

  it('alterna expansão do gráfico', () => {
    renderPage();

    const toggle = screen.getByTitle('Expandir');
    fireEvent.click(toggle);

    expect(screen.getByTitle('Recolher')).toBeInTheDocument();
  });

  it('lista cartões de outras ações e notícias', () => {
    renderPage();

    const detailButtons = screen.getAllByText('Detalhes');
    expect(detailButtons.length).toBeGreaterThan(1);

    expect(screen.getByText('Notícias')).toBeInTheDocument();
  });
});
