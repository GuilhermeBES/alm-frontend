import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../tests/utils/test-utils';
import SimulationPage from './SimulationPage';

vi.mock('../components/ChatBot/MyChatBot', () => ({
  default: () => <div data-testid="chatbot" />,
}));

describe('SimulationPage', () => {
  it('renderiza chatbot dentro do container', () => {
    render(<SimulationPage />);

    expect(screen.getByTestId('chatbot')).toBeInTheDocument();
  });
});
