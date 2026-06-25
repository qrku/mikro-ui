'use client';

import { useState } from 'react';
import { Button, Modal } from '@/components/primitives';

export function ModalDemo() {
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | null>(null);

  return (
    <>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button size="sm" onClick={() => setSize('sm')}>Small</Button>
        <Button size="md" onClick={() => setSize('md')}>Medium</Button>
        <Button size="lg" onClick={() => setSize('lg')}>Large</Button>
      </div>

      <Modal
        open={size !== null}
        onClose={() => setSize(null)}
        title="Modal title"
        size={size ?? 'md'}
      >
        <p>This is the modal body. You can put any content here.</p>
        <p style={{ marginTop: 8, color: '#999', fontSize: 12 }}>
          Press Escape or click outside to close.
        </p>
      </Modal>
    </>
  );
}
