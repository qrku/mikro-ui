'use client';

import {
  forwardRef,
  useRef,
  useEffect,
  type InputHTMLAttributes,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import styles from './Checkbox.module.css';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: CheckboxSize;
  indeterminate?: boolean;
  children?: ReactNode;
}

const boxSizeClass = {
  sm: styles.boxSm,
  md: styles.boxMd,
  lg: styles.boxLg,
} as Record<CheckboxSize, string>;

const rootSizeClass = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
} as Record<CheckboxSize, string>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ size = 'md', indeterminate = false, children, className, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const setRef = (node: HTMLInputElement | null) => {
      (innerRef as MutableRefObject<HTMLInputElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <label
        className={[styles.root, rootSizeClass[size], className ?? ''].filter(Boolean).join(' ')}
      >
        <input
          ref={setRef}
          type="checkbox"
          className={styles.input}
          {...props}
        />
        <span className={[styles.box, boxSizeClass[size]].join(' ')} aria-hidden="true" />
        {children && <span className={styles.label}>{children}</span>}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
export { Checkbox };
