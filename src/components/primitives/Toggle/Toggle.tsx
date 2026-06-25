"use client";

import {
  forwardRef,
  useRef,
  type InputHTMLAttributes,
  type MutableRefObject,
  type ReactNode,
} from "react";
import styles from "./Toggle.module.css";

export type ToggleSize = "sm" | "md" | "lg";

export interface ToggleProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "onChange"
> {
  size?: ToggleSize;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  children?: ReactNode;
}

const rootSizeClass = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
} as Record<ToggleSize, string>;

const trackSizeClass = {
  sm: styles.trackSm,
  md: styles.trackMd,
  lg: styles.trackLg,
} as Record<ToggleSize, string>;

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      size = "md",
      checked,
      defaultChecked,
      onChange,
      children,
      disabled,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const setRef = (node: HTMLInputElement | null) => {
      (innerRef as MutableRefObject<HTMLInputElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    return (
      <label
        className={[styles.root, rootSizeClass[size], className ?? ""]
          .filter(Boolean)
          .join(" ")}
      >
        <input
          ref={setRef}
          type="checkbox"
          role="switch"
          className={styles.input}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          id={id}
          {...props}
        />
        <span className={[styles.track, trackSizeClass[size]].join(" ")}>
          <span className={styles.thumb} />
        </span>
        {children && <span className={styles.label}>{children}</span>}
      </label>
    );
  },
);

Toggle.displayName = "Toggle";
export { Toggle };
