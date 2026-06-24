import { forwardRef, type InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';

// Omit native `size` (number) so our string-based size can coexist
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  invalid?: boolean;
}

const sizeClass = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
} as Record<InputSize, string>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', invalid = false, className, ...props }, ref) => (
    <input
      ref={ref}
      className={[
        styles.root,
        sizeClass[size],
        invalid ? styles.invalid : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  ),
);

Input.displayName = 'Input';
export { Input };
