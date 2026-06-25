export type ToastType = 'default' | 'success' | 'error';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

type Listener = (toasts: readonly ToastItem[]) => void;

let items: ToastItem[] = [];
let counter = 0;
const listeners = new Set<Listener>();

function emit() {
  const snapshot = [...items] as readonly ToastItem[];
  listeners.forEach((l) => l(snapshot));
}

function add(message: string, type: ToastType, duration: number): string {
  const id = String(++counter);
  items = [...items, { id, message, type, duration }];
  emit();
  return id;
}

export function remove(id: string): void {
  items = items.filter((t) => t.id !== id);
  emit();
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const toast = Object.assign(
  (message: string, options?: { duration?: number }) =>
    add(message, 'default', options?.duration ?? 4000),
  {
    success: (message: string, options?: { duration?: number }) =>
      add(message, 'success', options?.duration ?? 4000),
    error: (message: string, options?: { duration?: number }) =>
      add(message, 'error', options?.duration ?? 4000),
    dismiss: (id: string) => remove(id),
    dismissAll: () => { items = []; emit(); },
  },
);
