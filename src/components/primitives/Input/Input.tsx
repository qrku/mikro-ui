'use client';

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
} from 'react';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  invalid?: boolean;
  error?: string;
  label?: string;
}

const inputSizeClass = {
  sm: styles.inputSm,
  md: styles.inputMd,
  lg: styles.inputLg,
} as Record<InputSize, string>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      invalid = false,
      error,
      label,
      className,
      id,
      value,
      defaultValue,
      onChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const errorId = `${autoId}-err`;

    const isInvalid = invalid || Boolean(error);

    return (
      <div
        className={[
          styles.wrapper,
          isInvalid ? styles.invalid : '',
          disabled ? styles.wrapperDisabled : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {(label || error) && (
          <div className={styles.labelRow}>
            {label && (
              <label htmlFor={inputId} className={styles.labelText}>
                {label}
              </label>
            )}
            {error && (
              <span id={errorId} className={styles.errorText}>
                {error}
              </span>
            )}
          </div>
        )}

        <div className={styles.inputWrap}>
          <input
            ref={ref}
            id={inputId}
            className={[styles.input, inputSizeClass[size]].join(' ')}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
            aria-invalid={isInvalid || undefined}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';
export { Input };
