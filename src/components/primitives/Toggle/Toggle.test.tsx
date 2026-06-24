import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders with correct aria-pressed default', () => {
    render(<Toggle>★</Toggle>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('toggles pressed state on click (uncontrolled)', () => {
    render(<Toggle>★</Toggle>);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-pressed', 'false');
  });

  it('respects defaultPressed', () => {
    render(<Toggle defaultPressed>★</Toggle>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onChange with next value', () => {
    const onChange = vi.fn();
    render(<Toggle onChange={onChange}>★</Toggle>);
    fireEvent.click(screen.getByRole('button'));
    expect(onChange).toHaveBeenCalledWith(true);
    fireEvent.click(screen.getByRole('button'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('works as controlled component', () => {
    render(<Toggle pressed={true}>★</Toggle>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('is disabled when disabled prop is set', () => {
    render(<Toggle disabled>★</Toggle>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Toggle ref={ref}>★</Toggle>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
