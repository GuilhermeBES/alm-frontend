import { describe, it, expect } from 'vitest';
import { render, screen } from '../tests/utils/test-utils';
import ErrorPage from './ErrorPage';

describe('ErrorPage', () => {
  it('exibe mensagem de recurso não encontrado', () => {
    render(<ErrorPage />);

    expect(screen.getByText('Recurso não encontrado')).toBeInTheDocument();
  });
});
