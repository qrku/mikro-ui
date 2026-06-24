import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C', disabled: true },
];

describe('Select', () => {
  it('renders trigger with placeholder', () => {
    render(<Select options={options} placeholder="Pick one" />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });

  it('opens dropdown on click and shows options', () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option A' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option B' })).toBeInTheDocument();
  });

  it('closes dropdown when trigger is clicked again', () => {
    render(<Select options={options} />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('calls onChange and shows selected label on option click', () => {
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.mouseDown(screen.getByRole('option', { name: 'Option A' }));
    expect(onChange).toHaveBeenCalledWith('a');
    expect(screen.getByRole('combobox')).toHaveTextContent('Option A');
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('does not call onChange for disabled option', () => {
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.mouseDown(screen.getByRole('option', { name: 'Option C' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Select options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('forwards ref to trigger button', () => {
    const ref = { current: null };
    render(<Select ref={ref} options={options} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('renders hidden input when name is provided', () => {
    render(<Select options={options} name="fruit" defaultValue="a" />);
    const input = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.name).toBe('fruit');
    expect(input.value).toBe('a');
  });
});
