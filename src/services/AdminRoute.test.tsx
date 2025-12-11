import { describe, it, expect } from 'vitest';
import { render, screen } from '../tests/utils/test-utils';
import AdminRoute from './AdminRoute';

const Child = () => <div data-testid="child">conteudo</div>;

describe('AdminRoute', () => {
  it('renderiza children depois do efeito inicial', () => {
    render(
      <AdminRoute>
        <Child />
      </AdminRoute>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
