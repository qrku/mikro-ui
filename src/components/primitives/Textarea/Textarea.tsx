'use client';

import { forwardRef, useRef, useEffect, type TextareaHTMLAttributes, type ChangeEvent } from 'react';
import styles from './Textarea.module.css';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: TextareaSize;
  invalid?: boolean;
  autoResize?: boolean;
}

const sizeClass = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
} as Record<TextareaSize, string>;

function syncHeight(el: HTMLTextAreaElement) {
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ size = 'md', invalid = false, autoResize = false, className, onChange, ...props }, ref) => {
    const innerRef = useRef<HTMLTextAreaElement>(null);

    const setRef = (node: HTMLTextAreaElement | null) => {
      (innerRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    useEffect(() => {
      if (autoResize && innerRef.current) syncHeight(innerRef.current);
    }, [autoResize, props.value, props.defaultValue]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) syncHeight(e.currentTarget);
      onChange?.(e);
    };

    return (
      <textarea
        ref={setRef}
        className={[
          styles.root,
          sizeClass[size],
          invalid ? styles.invalid : '',
          autoResize ? styles.noResize : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
        onChange={handleChange}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
export { Textarea };
