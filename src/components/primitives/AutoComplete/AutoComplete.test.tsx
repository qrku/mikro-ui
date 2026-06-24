import { render, screen, fireEvent } from '@testing-library/react';
import { AutoComplete } from './AutoComplete';

const options = ['Apple', 'Apricot', 'Banana', 'Cherry'];

describe('AutoComplete', () => {
  it('renders an input', () => {
    render(<AutoComplete options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('opens dropdown on focus and shows all options', () => {
    render(<AutoComplete options={options} />);
    fireEvent.focus(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(4);
  });

  it('filters options as user types', () => {
    render(<AutoComplete options={options} />);
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'ap' } });
    const opts = screen.getAllByRole('option');
    expect(opts).toHaveLength(2); // Apple, Apricot
    expect(opts[0]).toHaveTextContent('Apple');
    expect(opts[1]).toHaveTextContent('Apricot');
  });

  it('shows no-results when nothing matches', () => {
    render(<AutoComplete options={options} noResultsText="Nothing found" />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'xyz' } });
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('selects option on mousedown and sets input value', () => {
    const onSelect = vi.fn();
    render(<AutoComplete options={options} onSelect={onSelect} />);
    fireEvent.focus(screen.getByRole('combobox'));
    fireEvent.mouseDown(screen.getByRole('option', { name: /banana/i }));
    expect(onSelect).toHaveBeenCalledWith('Banana');
    expect(screen.getByRole('combobox')).toHaveValue('Banana');
  });

  it('navigates options with arrow keys and selects with Enter', () => {
    const onSelect = vi.fn();
    render(<AutoComplete options={options} onSelect={onSelect} />);
    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith('Apricot');
  });

  it('closes on Escape', () => {
    render(<AutoComplete options={options} />);
    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    expect(input).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('is disabled when disabled prop set', () => {
    render(<AutoComplete options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('forwards ref to input', () => {
    const ref = { current: null };
    render(<AutoComplete ref={ref} options={options} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('calls onChange on every keystroke', () => {
    const onChange = vi.fn();
    render(<AutoComplete options={options} onChange={onChange} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'a' } });
    expect(onChange).toHaveBeenCalledWith('a');
  });
});
