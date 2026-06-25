import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders an unchecked checkbox by default', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('renders a checked checkbox when defaultChecked', () => {
    render(<Checkbox defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('renders label when children provided', () => {
    render(<Checkbox>Accept</Checkbox>);
    expect(screen.getByText('Accept')).toBeInTheDocument();
  });

  it('toggles on click (uncontrolled)', () => {
    render(<Checkbox>Toggle me</Checkbox>);
    const cb = screen.getByRole('checkbox');
    fireEvent.click(cb);
    expect(cb).toBeChecked();
    fireEvent.click(cb);
    expect(cb).not.toBeChecked();
  });

  it('calls onChange with event when clicked', () => {
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('sets indeterminate on the input element', () => {
    const { rerender } = render(<Checkbox />);
    const cb = screen.getByRole('checkbox') as HTMLInputElement;
    expect(cb.indeterminate).toBe(false);
    rerender(<Checkbox indeterminate />);
    expect(cb.indeterminate).toBe(true);
  });

  it('forwards ref to the input', () => {
    const ref = { current: null };
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
