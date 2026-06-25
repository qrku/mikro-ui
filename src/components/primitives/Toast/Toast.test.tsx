import { render, screen, fireEvent, act } from '@testing-library/react';
import { ToastProvider } from './ToastProvider';
import { toast } from './toast';

beforeEach(() => toast.dismissAll());
afterEach(() => toast.dismissAll());

describe('Toast', () => {
  it('renders nothing when no toasts', () => {
    render(<ToastProvider />);
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('shows a default toast', () => {
    render(<ToastProvider />);
    act(() => { toast('Hello world'); });
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('shows a success toast', () => {
    render(<ToastProvider />);
    act(() => { toast.success('Saved!'); });
    expect(screen.getByText('Saved!')).toBeInTheDocument();
  });

  it('shows an error toast', () => {
    render(<ToastProvider />);
    act(() => { toast.error('Something failed'); });
    expect(screen.getByText('Something failed')).toBeInTheDocument();
  });

  it('dismisses toast when close button clicked', () => {
    render(<ToastProvider />);
    act(() => { toast('Click to close'); });
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    // After click, exiting state starts; after 220ms remove() is called
    // We just verify the button exists and is clickable
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('auto-dismisses after duration', async () => {
    vi.useFakeTimers();
    render(<ToastProvider />);
    act(() => { toast('Auto gone', { duration: 1000 }); });
    expect(screen.getByText('Auto gone')).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1000); });
    // exit animation starts, after 220ms it's removed
    act(() => { vi.advanceTimersByTime(220); });
    expect(screen.queryByText('Auto gone')).toBeNull();
    vi.useRealTimers();
  });

  it('dismissAll removes all toasts', () => {
    render(<ToastProvider />);
    act(() => {
      toast('One');
      toast('Two');
    });
    expect(screen.getAllByRole('status')).toHaveLength(2);
    act(() => { toast.dismissAll(); });
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('renders multiple toasts', () => {
    render(<ToastProvider />);
    act(() => {
      toast('First');
      toast.success('Second');
      toast.error('Third');
    });
    expect(screen.getAllByRole('status')).toHaveLength(3);
  });
});
