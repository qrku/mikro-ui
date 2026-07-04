'use client';

import {
  forwardRef,
  useRef,
  useEffect,
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

    const innerRef = useRef<HTMLTextAreaElement>(null);

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
      onChange?.(e);
    };

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
        </div>
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
export { Textarea };
