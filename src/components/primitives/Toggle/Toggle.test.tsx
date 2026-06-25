import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders an unchecked switch by default', () => {
    render(<Toggle />);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('renders checked when defaultChecked', () => {
    render(<Toggle defaultChecked />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('renders label when children provided', () => {
    render(<Toggle>Dark mode</Toggle>);
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
  });

  it('toggles on click (uncontrolled)', () => {
    render(<Toggle />);
    const sw = screen.getByRole('switch');
    fireEvent.click(sw);
    expect(sw).toBeChecked();
    fireEvent.click(sw);
    expect(sw).not.toBeChecked();
  });

  it('calls onChange with boolean', () => {
    const onChange = vi.fn();
    render(<Toggle onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('is disabled when disabled prop set', () => {
    render(<Toggle disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('forwards ref to the input', () => {
    const ref = { current: null };
    render(<Toggle ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
