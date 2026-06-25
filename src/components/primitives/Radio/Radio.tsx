'use client';

import {
  forwardRef,
  useRef,
  type InputHTMLAttributes,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import styles from './Radio.module.css';
import { useRadioGroup } from './RadioGroup';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: RadioSize;
  value?: string;
  children?: ReactNode;
}

const dotSizeClass = {
  sm: styles.dotSm,
  md: styles.dotMd,
  lg: styles.dotLg,
} as Record<RadioSize, string>;

const rootSizeClass = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
} as Record<RadioSize, string>;

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ size = 'md', value, children, className, disabled, onChange, checked, defaultChecked, ...props }, ref) => {
    const group = useRadioGroup();
    const innerRef = useRef<HTMLInputElement>(null);

    const setRef = (node: HTMLInputElement | null) => {
      (innerRef as MutableRefObject<HTMLInputElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    const isDisabled = disabled ?? group?.disabled;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (group && value !== undefined) group.onChange?.(value);
      onChange?.(e);
    };

    // Controlled by group only when group explicitly has a value prop
    const isGroupControlled = group !== null && group.value !== undefined;

    const groupProps = group
      ? {
          name: group.name,
          ...(isGroupControlled
            ? { checked: group.value === value }
            : { defaultChecked }),
        }
      : { checked, defaultChecked };

    return (
      <label
        className={[styles.root, rootSizeClass[size], className ?? ''].filter(Boolean).join(' ')}
      >
        <input
          ref={setRef}
          type="radio"
          className={styles.input}
          value={value}
          disabled={isDisabled}
          onChange={handleChange}
          {...groupProps}
          {...props}
        />
        <span className={[styles.dot, dotSizeClass[size]].join(' ')} aria-hidden="true" />
        {children && <span className={styles.label}>{children}</span>}
      </label>
    );
  },
);

Radio.displayName = 'Radio';
export { Radio };
