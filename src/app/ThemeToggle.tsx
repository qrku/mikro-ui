'use client';

import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

type Theme = 'light' | 'dark';

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  window.localStorage.setItem('mikro-ui-theme', theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Reads a browser-only API (localStorage/matchMedia), so the real theme
    // can only be known after mount — this keeps SSR and the first client
    // render in sync (both render the placeholder below).
    const stored = window.localStorage.getItem('mikro-ui-theme');
    const initial: Theme =
      stored === 'light' || stored === 'dark'
        ? stored
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initial);
  }, []);

  if (theme === null) {
    return <button className={styles.toggle} aria-hidden="true" tabIndex={-1} />;
  }

  const next: Theme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => {
        applyTheme(next);
        setTheme(next);
      }}
      aria-label={`Switch to ${next} theme`}
    >
      {theme === 'dark' ? 'dark' : 'light'}
    </button>
  );
}
