'use client';

import {
  forwardRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type InputHTMLAttributes,
} from 'react';
import styles from './Range.module.css';

export type RangeSize = 'sm' | 'md' | 'lg';

export interface RangeProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'onChange' | 'value' | 'defaultValue'
> {
  size?: RangeSize;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const sizeClass = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
} as Record<RangeSize, string>;

const Range = forwardRef<HTMLInputElement, RangeProps>(
  (
    {
      size = 'md',
      min = 0,
      max = 100,
      step = 1,
      value: controlledValue,
      defaultValue,
      onChange,
      label,
      disabled = false,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internal, setInternal] = useState(defaultValue ?? min);
    const currentValue = isControlled ? controlledValue : internal;

    const range = max - min;
    const pct = range === 0 ? '0%' : `${((currentValue - min) / range) * 100}%`;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      if (!isControlled) setInternal(val);
      onChange?.(val);
    };

    return (
      <div
        className={[
          styles.wrapper,
          sizeClass[size],
          disabled ? styles.wrapperDisabled : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ '--pct': pct } as CSSProperties}
      >
        {label && <span className={styles.label}>{label}</span>}
        <input
          ref={ref}
          type="range"
          className={styles.input}
          min={min}
          max={max}
          step={step}
          {...(isControlled
            ? { value: controlledValue, onChange: handleChange }
            : { defaultValue: defaultValue ?? min, onChange: handleChange })}
          disabled={disabled}
          id={id}
          {...props}
        />
      </div>
    );
  },
);

Range.displayName = 'Range';
export { Range };
