import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with role="status"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has accessible label', () => {
    render(<Spinner />);
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('applies size class', () => {
    const { container } = render(<Spinner size="lg" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/lg/);
  });

  it('forwards className', () => {
    const { container } = render(<Spinner className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });
});
