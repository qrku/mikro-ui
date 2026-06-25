import { render, screen, fireEvent } from '@testing-library/react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

describe('Radio', () => {
  it('renders a radio input', () => {
    render(<Radio />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders label when children provided', () => {
    render(<Radio>Option A</Radio>);
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('is unchecked by default', () => {
    render(<Radio />);
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  it('renders checked when defaultChecked', () => {
    render(<Radio defaultChecked />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('is disabled when disabled prop set', () => {
    render(<Radio disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('calls onChange when clicked', () => {
    const onChange = vi.fn();
    render(<Radio onChange={onChange} />);
    fireEvent.click(screen.getByRole('radio'));
    expect(onChange).toHaveBeenCalled();
  });

  it('forwards ref to the input', () => {
    const ref = { current: null };
    render(<Radio ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});

describe('RadioGroup', () => {
  const options = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ];

  it('renders all radios', () => {
    render(
      <RadioGroup name="test">
        {options.map((o) => <Radio key={o.value} value={o.value}>{o.label}</Radio>)}
      </RadioGroup>,
    );
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('reflects controlled value', () => {
    render(
      <RadioGroup name="test" value="b">
        {options.map((o) => <Radio key={o.value} value={o.value}>{o.label}</Radio>)}
      </RadioGroup>,
    );
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(radios[1]).toBeChecked();
    expect(radios[0]).not.toBeChecked();
  });

  it('calls onChange with selected value', () => {
    const onChange = vi.fn();
    render(
      <RadioGroup name="test" onChange={onChange}>
        {options.map((o) => <Radio key={o.value} value={o.value}>{o.label}</Radio>)}
      </RadioGroup>,
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Option C' }));
    expect(onChange).toHaveBeenCalledWith('c');
  });

  it('disables all radios when group disabled', () => {
    render(
      <RadioGroup name="test" disabled>
        {options.map((o) => <Radio key={o.value} value={o.value}>{o.label}</Radio>)}
      </RadioGroup>,
    );
    screen.getAllByRole('radio').forEach((r) => expect(r).toBeDisabled());
  });
});
