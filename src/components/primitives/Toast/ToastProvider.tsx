'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { subscribe, remove, type ToastItem, type ToastType } from './toast';
import styles from './Toast.module.css';

const indicatorClass: Record<ToastType, string> = {
  default: styles.indicatorDefault,
  success: styles.indicatorSuccess,
  error: styles.indicatorError,
} as Record<ToastType, string>;

function ToastItem({ item }: { item: ToastItem }) {
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => remove(item.id), 220);
  }, [item.id]);

  const startTimer = useCallback(() => {
    if (item.duration <= 0) return;
    timerRef.current = setTimeout(dismiss, item.duration);
  }, [item.duration, dismiss]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer, clearTimer]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={[styles.toast, exiting ? styles.toastExit : styles.toastEnter]
        .filter(Boolean)
        .join(' ')}
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
    >
      <span
        className={[styles.indicator, indicatorClass[item.type]].join(' ')}
        aria-hidden="true"
      />
      <span className={styles.message}>{item.message}</span>
      <button
        type="button"
        className={styles.close}
        onClick={dismiss}
        aria-label="Dismiss"
      />
    </div>
  );
}

export function ToastProvider() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => subscribe((items) => setToasts([...items])), []);

  if (toasts.length === 0) return null;

  return createPortal(
    <div className={styles.container} aria-label="Notifications">
      {toasts.map((item) => (
        <ToastItem key={item.id} item={item} />
      ))}
    </div>,
    document.body,
  );
}

ToastProvider.displayName = 'ToastProvider';
