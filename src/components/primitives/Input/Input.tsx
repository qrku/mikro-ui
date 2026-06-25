'use client';

import {
  forwardRef,
  useState,
  useId,
  type ChangeEvent,
  type InputHTMLAttributes,
} from 'react';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  invalid?: boolean;
  error?: string;
  label?: string;
  indicator?: boolean;
}

const inputSizeClass = {
  sm: styles.inputSm,
  md: styles.inputMd,
  lg: styles.inputLg,
} as Record<InputSize, string>;

const indicatorSizeClass = {
  sm: styles.indicatorSm,
  md: styles.indicatorMd,
  lg: styles.indicatorLg,
} as Record<InputSize, string>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      invalid = false,
      error,
      label,
      indicator = true,
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
    const isControlled = value !== undefined;

    const [internalHasValue, setInternalHasValue] = useState(
      () => Boolean(defaultValue && String(defaultValue).length > 0),
    );

    const hasValue = isControlled
      ? String(value).length > 0
      : internalHasValue;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalHasValue(e.target.value.length > 0);
      onChange?.(e);
    };

    const indicatorClass = [
      styles.indicator,
      indicatorSizeClass[size],
      disabled
        ? styles.indicatorDisabled
        : hasValue
          ? isInvalid
            ? styles.indicatorErrorFilled
            : styles.indicatorFilled
          : isInvalid
            ? styles.indicatorError
            : '',
    ]
      .filter(Boolean)
      .join(' ');

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
            onChange={handleChange}
            disabled={disabled}
            aria-invalid={isInvalid || undefined}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />
          {indicator && <span className={indicatorClass} aria-hidden="true" />}
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';
export { Input };
