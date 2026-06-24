import styles from './Spinner.module.css';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const sizeClass = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
} as Record<SpinnerSize, string>;

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={[styles.root, sizeClass[size], className ?? ''].filter(Boolean).join(' ')}
    />
  );
}

Spinner.displayName = 'Spinner';
