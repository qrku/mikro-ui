'use client';

import {
  forwardRef,
  useState,
  useRef,
  useId,
  useEffect,
  useCallback,
  type ChangeEvent,
  type KeyboardEvent,
  type MutableRefObject,
} from 'react';
import { Input, type InputSize } from '../Input';
import styles from './AutoComplete.module.css';

export interface AutoCompleteOption {
  value: string;
  label?: string;
  disabled?: boolean;
}

export interface AutoCompleteProps {
  options: (string | AutoCompleteOption)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  size?: InputSize;
  disabled?: boolean;
  invalid?: boolean;
  filterOptions?: boolean;
  noResultsText?: string;
  name?: string;
  id?: string;
  className?: string;
}

function toOption(raw: string | AutoCompleteOption): AutoCompleteOption {
  return typeof raw === 'string' ? { value: raw } : raw;
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className={styles.mark}>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

const optionIndicatorSizeClass = {
  sm: styles.optionIndicatorSm,
  md: styles.optionIndicatorMd,
  lg: styles.optionIndicatorLg,
} as Record<InputSize, string>;

const optionSizeClass = {
  sm: styles.optionSm,
  md: styles.optionMd,
  lg: styles.optionLg,
} as Record<InputSize, string>;

const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
  (
    {
      options: rawOptions,
      value: controlledValue,
      defaultValue = '',
      onChange,
      onSelect,
      placeholder,
      label,
      error,
      size = 'md',
      disabled = false,
      invalid = false,
      filterOptions = true,
      noResultsText = 'No results',
      name,
      id,
      className,
    },
    ref,
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internal, setInternal] = useState(defaultValue);
    const inputValue = isControlled ? controlledValue : internal;

    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const uid = useId();

    const all = rawOptions.map(toOption);
    const query = filterOptions ? inputValue.trim() : '';
    const filtered = query
      ? all.filter((o) =>
          (o.label ?? o.value).toLowerCase().includes(query.toLowerCase()),
        )
      : all;
    const showNoResults = query.length > 0 && filtered.length === 0;

    const close = useCallback(() => {
      setOpen(false);
      setActiveIndex(-1);
    }, []);

    const select = useCallback(
      (opt: AutoCompleteOption) => {
        if (opt.disabled) return;
        const display = opt.label ?? opt.value;
        if (!isControlled) setInternal(display);
        onChange?.(display);
        onSelect?.(opt.value);
        close();
        inputRef.current?.focus();
      },
      [isControlled, onChange, onSelect, close],
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
      item?.scrollIntoView?.({ block: 'nearest' });
    }, [activeIndex, open]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (!isControlled) setInternal(val);
      onChange?.(val);
      setActiveIndex(-1);
      setOpen(true);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!open) {
            setOpen(true);
            setActiveIndex(0);
          } else {
            setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!open) {
            setOpen(true);
            setActiveIndex(filtered.length - 1);
          } else {
            setActiveIndex((i) => Math.max(i - 1, 0));
          }
          break;
        case 'Enter':
          if (open && activeIndex >= 0) {
            e.preventDefault();
            const opt = filtered[activeIndex];
            if (opt) select(opt);
          }
          break;
        case 'Escape':
          if (open) {
            e.preventDefault();
            close();
          }
          break;
        case 'Tab':
          close();
          break;
      }
    };

    const listboxId = `${uid}-listbox`;
    const activeId = open && activeIndex >= 0 ? `${uid}-opt-${activeIndex}` : undefined;
    const isOpen = open && (filtered.length > 0 || showNoResults);

    return (
      <div
        ref={wrapperRef}
        className={[styles.wrapper, className ?? ''].filter(Boolean).join(' ')}
      >
        {name && <input type="hidden" name={name} value={inputValue} />}

        <Input
          ref={(node) => {
            (inputRef as MutableRefObject<HTMLInputElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={activeId}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          {...(label !== undefined ? { label } : {})}
          {...(error !== undefined ? { error } : {})}
          size={size}
          disabled={disabled}
          invalid={invalid}
          id={id}
          autoComplete="off"
          spellCheck={false}
        />

        <div
          className={[styles.dropdown, isOpen ? styles.dropdownOpen : '']
            .filter(Boolean)
            .join(' ')}
        >
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label="Suggestions"
            className={styles.list}
          >
            {showNoResults ? (
              <li className={[styles.noResults, optionSizeClass[size]].join(' ')}>
                {noResultsText}
              </li>
            ) : (
              filtered.map((opt, i) => {
                const optLabel = opt.label ?? opt.value;
                return (
                  <li
                    key={opt.value}
                    id={`${uid}-opt-${i}`}
                    role="option"
                    aria-selected={i === activeIndex}
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
                    <HighlightMatch text={optLabel} query={inputValue} />
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
                );
              })
            )}
          </ul>
        </div>
      </div>
    );
  },
);

AutoComplete.displayName = 'AutoComplete';
export { AutoComplete };
