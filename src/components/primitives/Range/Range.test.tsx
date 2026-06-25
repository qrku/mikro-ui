import { render, screen, fireEvent } from '@testing-library/react';
import { Range } from './Range';

describe('Range', () => {
  it('renders a slider', () => {
    render(<Range />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Range label="volume" />);
    expect(screen.getByText('volume')).toBeInTheDocument();
  });

  it('uses defaultValue', () => {
    render(<Range defaultValue={40} />);
    expect(screen.getByRole('slider')).toHaveValue('40');
  });

  it('uses controlled value', () => {
    render(<Range value={75} onChange={() => {}} />);
    expect(screen.getByRole('slider')).toHaveValue('75');
  });

  it('calls onChange with numeric value', () => {
    const onChange = vi.fn();
    render(<Range onChange={onChange} />);
    fireEvent.change(screen.getByRole('slider'), { target: { value: '42' } });
    expect(onChange).toHaveBeenCalledWith(42);
  });

  it('is disabled when disabled prop set', () => {
    render(<Range disabled />);
    expect(screen.getByRole('slider')).toBeDisabled();
  });

  it('forwards ref to the input', () => {
    const ref = { current: null };
    render(<Range ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('respects min and max props', () => {
    render(<Range min={10} max={50} defaultValue={30} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('min', '10');
    expect(slider).toHaveAttribute('max', '50');
  });
});
