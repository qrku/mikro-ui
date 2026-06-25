'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AppNav.module.css';

export function AppNav() {
  const pathname = usePathname();
  const isCompositions = pathname.startsWith('/compositions');

  return (
    <header className={styles.header}>
      <span className={styles.logo}>mikro-ui</span>
      <nav className={styles.nav}>
        <Link href="/" className={[styles.tab, !isCompositions ? styles.tabActive : ''].filter(Boolean).join(' ')}>
          primitives
        </Link>
        <Link href="/compositions" className={[styles.tab, isCompositions ? styles.tabActive : ''].filter(Boolean).join(' ')}>
          compositions
        </Link>
      </nav>
    </header>
  );
}
