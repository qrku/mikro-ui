import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('forwards placeholder', () => {
    render(<Textarea placeholder="Write here" />);
    expect(screen.getByPlaceholderText('Write here')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies invalid class when invalid is true', () => {
    const { container } = render(<Textarea invalid />);
    expect((container.firstChild as HTMLElement).className).toMatch(/invalid/);
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('calls onInput when typing', () => {
    const onInput = vi.fn();
    render(<Textarea onInput={onInput} />);
    fireEvent.input(screen.getByRole('textbox'), { target: { value: 'hello' } });
    expect(onInput).toHaveBeenCalled();
  });
});
