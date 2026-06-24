'use client';

import { forwardRef, useState, type ButtonHTMLAttributes, type MouseEvent } from 'react';
import styles from './Toggle.module.css';

export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onChange?: (pressed: boolean) => void;
  size?: ToggleSize;
}

const sizeClass = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
} as Record<ToggleSize, string>;

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      pressed: controlledPressed,
      defaultPressed = false,
      onChange,
      size = 'md',
      className,
      children,
      onClick,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledPressed !== undefined;
    const [internal, setInternal] = useState(defaultPressed);
    const pressed = isControlled ? controlledPressed! : internal;

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (!isControlled) setInternal((p) => !p);
      onChange?.(!pressed);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={pressed}
        disabled={disabled}
        className={[
          styles.root,
          sizeClass[size],
          pressed ? styles.pressed : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={handleClick}
        {...props}
      >
        <span className={styles.content}>{children}</span>
      </button>
    );
  },
);

Toggle.displayName = 'Toggle';
export { Toggle };
