import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ToastProvider } from './ToastProvider';
import { toast } from './toast';
import { Button } from '../Button';

const meta: Meta<typeof ToastProvider> = {
  title: 'Primitives/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Story />
        <ToastProvider />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

export const Default: Story = {
  render: () => (
    <Button onClick={() => toast('This is a notification')}>Show toast</Button>
  ),
};

export const Success: Story = {
  render: () => (
    <Button onClick={() => toast.success('Changes saved successfully')}>Success</Button>
  ),
};

export const Error: Story = {
  render: () => (
    <Button onClick={() => toast.error('Something went wrong')}>Error</Button>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button onClick={() => toast('Default message')}>Default</Button>
      <Button onClick={() => toast.success('Saved!')}>Success</Button>
      <Button onClick={() => toast.error('Failed!')}>Error</Button>
    </div>
  ),
};
