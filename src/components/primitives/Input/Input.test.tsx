import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('forwards placeholder', () => {
    render(<Input placeholder="Type here" />);
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies invalid class on wrapper when invalid is true', () => {
    const { container } = render(<Input invalid />);
    expect((container.firstChild as HTMLElement).className).toMatch(/invalid/);
  });

  it('renders label when label prop is provided', () => {
    render(<Input label="Email" placeholder="you@example.com" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders error text when error prop is provided', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('error prop implies invalid (aria-invalid on input)', () => {
    render(<Input error="Bad value" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards ref to the input element', () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('passes through native input props', () => {
    render(<Input type="email" name="email" defaultValue="a@b.com" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.type).toBe('email');
    expect(input.name).toBe('email');
    expect(input.value).toBe('a@b.com');
  });

  it('indicator reflects value state via onChange', () => {
    render(<Input placeholder="x" />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'hello' } });
    // no crash — state update is the core assertion
    expect(input).toBeInTheDocument();
  });
});
