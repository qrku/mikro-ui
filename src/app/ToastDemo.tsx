'use client';

import { Button } from '@/components/primitives';
import { toast } from '@/components/primitives/Toast';

export function ToastDemo() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button size="sm" onClick={() => toast('This is a notification')}>Default</Button>
      <Button size="sm" onClick={() => toast.success('Changes saved!')}>Success</Button>
      <Button size="sm" onClick={() => toast.error('Something went wrong')}>Error</Button>
    </div>
  );
}
