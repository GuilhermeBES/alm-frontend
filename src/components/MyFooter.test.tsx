import { describe, it, expect } from 'vitest';
import { render, screen } from '../tests/utils/test-utils';
import MyFooter from './MyFooter';

describe('MyFooter', () => {
  it('renders contact section', () => {
    render(<MyFooter />);
    expect(screen.getByRole('heading', { name: /Contato/i })).toBeInTheDocument();
  });

  it('renders information section', () => {
    render(<MyFooter />);
    expect(screen.getByText(/Informações/i)).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    render(<MyFooter />);
    expect(screen.getByText(/ALM ChatBot © alguns direitos reservados./i)).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<MyFooter />);
    const links = screen.getAllByRole('link');
    const socialLinks = links.filter(
      link => link.getAttribute('href')?.includes('facebook') ||
              link.getAttribute('href')?.includes('instagram') ||
              link.getAttribute('href')?.includes('youtube')
    );
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it('social media links open in new tab', () => {
    render(<MyFooter />);
    const links = screen.getAllByRole('link');
    const externalLinks = links.filter(
      link => link.getAttribute('target') === '_blank'
    );
    expect(externalLinks.length).toBeGreaterThan(0);
  });
});
