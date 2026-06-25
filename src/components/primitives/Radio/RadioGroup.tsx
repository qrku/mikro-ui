'use client';

import { createContext, useContext, type ReactNode } from 'react';

export interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroup() {
  return useContext(RadioGroupContext);
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export function RadioGroup({
  name,
  value,
  onChange,
  disabled,
  children,
  className,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{
      name,
      ...(value !== undefined ? { value } : {}),
      ...(onChange !== undefined ? { onChange } : {}),
      ...(disabled !== undefined ? { disabled } : {}),
    }}>
      <div role="radiogroup" className={className}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

RadioGroup.displayName = 'RadioGroup';
