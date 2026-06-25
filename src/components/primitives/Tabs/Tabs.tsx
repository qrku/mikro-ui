'use client';

import {
  createContext,
  useContext,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import styles from './Tabs.module.css';

// ── Context ───────────────────────────────────────────────────────────────

export type TabsSize = 'sm' | 'md' | 'lg';

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  uid: string;
  size: TabsSize;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tab/TabPanel must be used within <Tabs>');
  return ctx;
}

const sizeClass = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
} as Record<TabsSize, string>;

// ── Tabs ──────────────────────────────────────────────────────────────────

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: TabsSize;
  children: ReactNode;
  className?: string;
}

export function Tabs({
  value: controlledValue,
  defaultValue = '',
  onChange,
  size = 'md',
  children,
  className,
}: TabsProps) {
  const isControlled = controlledValue !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const uid = useId();

  const value = isControlled ? controlledValue : internal;

  const handleChange = (next: string) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <TabsContext.Provider value={{ value, onChange: handleChange, uid, size }}>
      <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

Tabs.displayName = 'Tabs';

// ── TabList ───────────────────────────────────────────────────────────────

export interface TabListProps {
  children: ReactNode;
  className?: string;
}

export function TabList({ children, className }: TabListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])') ?? [],
    );
    const idx = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (idx === -1) return;

    let next = -1;
    if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;

    if (next !== -1) {
      e.preventDefault();
      tabs[next]?.focus();
      tabs[next]?.click();
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      className={[styles.list, className ?? ''].filter(Boolean).join(' ')}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

TabList.displayName = 'TabList';

// ── Tab ───────────────────────────────────────────────────────────────────

export interface TabProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export function Tab({ value, children, disabled, className }: TabProps) {
  const { value: activeValue, onChange, uid, size } = useTabsContext();
  const isActive = value === activeValue;

  return (
    <button
      type="button"
      role="tab"
      id={`${uid}-tab-${value}`}
      aria-selected={isActive}
      aria-controls={`${uid}-panel-${value}`}
      disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      onClick={() => onChange(value)}
      className={[
        styles.tab,
        sizeClass[size],
        isActive ? styles.tabActive : '',
        disabled ? styles.tabDisabled : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  );
}

Tab.displayName = 'Tab';

// ── TabPanel ──────────────────────────────────────────────────────────────

export interface TabPanelProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabPanel({ value, children, className }: TabPanelProps) {
  const { value: activeValue, uid } = useTabsContext();
  const isActive = value === activeValue;

  return (
    <div
      role="tabpanel"
      id={`${uid}-panel-${value}`}
      aria-labelledby={`${uid}-tab-${value}`}
      hidden={!isActive}
      className={[styles.panel, className ?? ''].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
}

TabPanel.displayName = 'TabPanel';
