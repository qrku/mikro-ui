'use client';

import {
  forwardRef,
  useRef,
  useEffect,
  useState,
  useId,
  type TextareaHTMLAttributes,
  type ChangeEvent,
} from 'react';
import styles from './Textarea.module.css';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: TextareaSize;
  invalid?: boolean;
  error?: string;
  label?: string;
  autoResize?: boolean;
}

const textareaSizeClass = {
  sm: styles.textareaSm,
  md: styles.textareaMd,
  lg: styles.textareaLg,
} as Record<TextareaSize, string>;

const cornerSizeClass = {
  sm: styles.cornerSm,
  md: styles.cornerMd,
  lg: styles.cornerLg,
} as Record<TextareaSize, string>;

function syncHeight(el: HTMLTextAreaElement) {
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = 'md',
      invalid = false,
      error,
      label,
      autoResize = false,
      className,
      onChange,
      value,
      defaultValue,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const errorId = `${autoId}-err`;
    const isInvalid = invalid || Boolean(error);
    const isControlled = value !== undefined;

    const innerRef = useRef<HTMLTextAreaElement>(null);

    const [internalHasValue, setInternalHasValue] = useState(
      () => Boolean(defaultValue && String(defaultValue).length > 0),
    );
    const hasValue = isControlled ? String(value).length > 0 : internalHasValue;

    const setRef = (node: HTMLTextAreaElement | null) => {
      (innerRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    useEffect(() => {
      if (autoResize && innerRef.current) syncHeight(innerRef.current);
    }, [autoResize, value, defaultValue]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) syncHeight(e.currentTarget);
      if (!isControlled) setInternalHasValue(e.target.value.length > 0);
      onChange?.(e);
    };

    const cornerClass = [
      styles.corner,
      cornerSizeClass[size],
      disabled
        ? styles.cornerDisabled
        : hasValue
          ? isInvalid ? styles.cornerErrorFilled : styles.cornerFilled
          : isInvalid ? styles.cornerError : '',
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

        <div className={styles.textareaWrap}>
          <textarea
            ref={setRef}
            id={inputId}
            className={[
              styles.textarea,
              textareaSizeClass[size],
              autoResize ? styles.noResize : '',
            ]
              .filter(Boolean)
              .join(' ')}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={handleChange}
            aria-invalid={isInvalid || undefined}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />
          <span className={cornerClass} aria-hidden="true" />
        </div>
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
export { Textarea };
