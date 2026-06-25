import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

function Demo({
  defaultValue = 'a',
  value,
  onChange,
}: {
  defaultValue?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <Tabs defaultValue={defaultValue} value={value} onChange={onChange}>
      <TabList>
        <Tab value="a">Tab A</Tab>
        <Tab value="b">Tab B</Tab>
        <Tab value="c" disabled>Tab C</Tab>
      </TabList>
      <TabPanel value="a">Panel A</TabPanel>
      <TabPanel value="b">Panel B</TabPanel>
      <TabPanel value="c">Panel C</TabPanel>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('renders all tabs', () => {
    render(<Demo />);
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('shows the default panel', () => {
    render(<Demo defaultValue="a" />);
    expect(screen.getByText('Panel A')).not.toHaveAttribute('hidden');
    expect(screen.getByText('Panel B')).toHaveAttribute('hidden');
  });

  it('switches panel on tab click', () => {
    render(<Demo defaultValue="a" />);
    fireEvent.click(screen.getByRole('tab', { name: 'Tab B' }));
    expect(screen.getByText('Panel B')).not.toHaveAttribute('hidden');
    expect(screen.getByText('Panel A')).toHaveAttribute('hidden');
  });

  it('marks active tab with aria-selected', () => {
    render(<Demo defaultValue="b" />);
    expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange when tab is clicked', () => {
    const onChange = vi.fn();
    render(<Demo onChange={onChange} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Tab B' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('controlled mode respects value prop', () => {
    render(<Demo value="b" onChange={() => {}} />);
    expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Panel B')).not.toHaveAttribute('hidden');
  });

  it('disabled tab is not clickable', () => {
    const onChange = vi.fn();
    render(<Demo onChange={onChange} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Tab C' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('keyboard ArrowRight moves to next tab', () => {
    render(<Demo defaultValue="a" />);
    const tabA = screen.getByRole('tab', { name: 'Tab A' });
    tabA.focus();
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' });
    expect(screen.getByText('Panel B')).not.toHaveAttribute('hidden');
  });

  it('keyboard ArrowLeft wraps around', () => {
    render(<Demo defaultValue="a" />);
    const tabA = screen.getByRole('tab', { name: 'Tab A' });
    tabA.focus();
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowLeft' });
    expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveAttribute('aria-selected', 'true');
  });

  it('panels have correct aria-labelledby linking to tabs', () => {
    render(<Demo />);
    const tabA = screen.getByRole('tab', { name: 'Tab A' });
    const panelA = screen.getByRole('tabpanel');
    expect(panelA).toHaveAttribute('aria-labelledby', tabA.id);
  });
});
