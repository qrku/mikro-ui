'use client';

import {
  forwardRef,
  useState,
  useRef,
  useId,
  useEffect,
  useCallback,
  type KeyboardEvent,
  type MutableRefObject,
} from 'react';
import styles from './Select.module.css';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  size?: SelectSize;
  className?: string;
}

const triggerSizeClass = {
  sm: styles.triggerSm,
  md: styles.triggerMd,
  lg: styles.triggerLg,
} as Record<SelectSize, string>;

const optionSizeClass = {
  sm: styles.optionSm,
  md: styles.optionMd,
  lg: styles.optionLg,
} as Record<SelectSize, string>;

const indicatorSizeClass = {
  sm: styles.indicatorSm,
  md: styles.indicatorMd,
  lg: styles.indicatorLg,
} as Record<SelectSize, string>;

const optionIndicatorSizeClass = {
  sm: styles.optionIndicatorSm,
  md: styles.optionIndicatorMd,
  lg: styles.optionIndicatorLg,
} as Record<SelectSize, string>;

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options = [],
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = 'Select',
      label,
      disabled = false,
      name,
      id,
      size = 'md',
      className,
    },
    ref,
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const value = isControlled ? controlledValue : internalValue;

    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const uid = useId();

    const selectedOption = options.find((o) => o.value === value);
    const enabledIndices = options.reduce<number[]>(
      (acc, o, i) => (o.disabled ? acc : [...acc, i]),
      [],
    );

    const close = useCallback(() => {
      setOpen(false);
      setActiveIndex(-1);
    }, []);

    const select = useCallback(
      (opt: SelectOption) => {
        if (opt.disabled) return;
        if (!isControlled) setInternalValue(opt.value);
        onChange?.(opt.value);
        close();
        triggerRef.current?.focus();
      },
      [isControlled, onChange, close],
    );

    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (!wrapperRef.current?.contains(e.target as Node)) close();
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open, close]);

    useEffect(() => {
      if (!open || activeIndex < 0 || !listRef.current) return;
      const item = listRef.current.children[activeIndex] as HTMLElement | undefined;
      item?.scrollIntoView({ block: 'nearest' });
    }, [activeIndex, open]);

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          if (open && activeIndex >= 0) {
            const opt = options[activeIndex];
            if (opt) select(opt);
          } else if (open) {
            close();
          } else {
            const start = selectedOption ? options.indexOf(selectedOption) : -1;
            setActiveIndex(start);
            setOpen(true);
          }
          break;
        case 'ArrowDown': {
          e.preventDefault();
          if (!open) {
            setOpen(true);
            setActiveIndex(enabledIndices[0] ?? 0);
          } else {
            const cur = enabledIndices.indexOf(activeIndex);
            setActiveIndex(enabledIndices[Math.min(cur + 1, enabledIndices.length - 1)] ?? activeIndex);
          }
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          if (!open) {
            setOpen(true);
            setActiveIndex(enabledIndices[enabledIndices.length - 1] ?? 0);
          } else {
            const cur = enabledIndices.indexOf(activeIndex);
            setActiveIndex(enabledIndices[Math.max(cur - 1, 0)] ?? activeIndex);
          }
          break;
        }
        case 'Home':
          if (open) { e.preventDefault(); setActiveIndex(enabledIndices[0] ?? 0); }
          break;
        case 'End':
          if (open) { e.preventDefault(); setActiveIndex(enabledIndices[enabledIndices.length - 1] ?? activeIndex); }
          break;
        case 'Escape':
        case 'Tab':
          close();
          break;
      }
    };

    const listboxId = `${uid}-listbox`;
    const triggerId = id ?? `${uid}-trigger`;
    const activeId = activeIndex >= 0 ? `${uid}-opt-${activeIndex}` : undefined;

    // Trigger indicator: outline diamond (closed+empty) / solid diamond (closed+value) / outline square (open+empty) / solid square (open+value)
    const indicatorClass = [
      styles.indicator,
      indicatorSizeClass[size],
      open ? styles.indicatorOpen : '',
      !selectedOption ? styles.indicatorOutline : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={wrapperRef}
        className={[styles.wrapper, className ?? ''].filter(Boolean).join(' ')}
      >
        {label && (
          <label htmlFor={triggerId} className={styles.labelText}>
            {label}
          </label>
        )}

        {name && <input type="hidden" name={name} value={value} />}

        <button
          ref={(node) => {
            (triggerRef as MutableRefObject<HTMLButtonElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={activeId}
          disabled={disabled}
          id={triggerId}
          className={[styles.trigger, triggerSizeClass[size]].join(' ')}
          onClick={() => {
            if (open) {
              close();
            } else {
              setActiveIndex(selectedOption ? options.indexOf(selectedOption) : -1);
              setOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
        >
          <span className={selectedOption ? styles.value : styles.placeholder}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className={indicatorClass} aria-hidden="true" />
        </button>

        <div
          className={[styles.dropdown, open ? styles.dropdownOpen : '']
            .filter(Boolean)
            .join(' ')}
        >
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label="Options"
            className={styles.list}
          >
            {options.map((opt, i) => (
              <li
                key={opt.value}
                id={`${uid}-opt-${i}`}
                role="option"
                aria-selected={opt.value === value}
                aria-disabled={opt.disabled}
                className={[
                  styles.option,
                  optionSizeClass[size],
                  i === activeIndex ? styles.optionActive : '',
                  opt.disabled ? styles.optionDisabled : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onMouseEnter={() => !opt.disabled && setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(-1)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  select(opt);
                }}
              >
                <span>{opt.label}</span>
                <span
                  className={[
                    styles.optionIndicator,
                    optionIndicatorSizeClass[size],
                    i === activeIndex ? styles.optionIndicatorActive : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
);

Select.displayName = 'Select';
export { Select };
