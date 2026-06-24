import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Primitives/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    pressed: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: { children: '★' },
};

export const Pressed: Story = {
  args: { children: '★', defaultPressed: true },
};

export const WithText: Story = {
  args: { children: 'Bold' },
};

export const Disabled: Story = {
  args: { children: '★', disabled: true },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Toggle size="sm">S</Toggle>
      <Toggle size="md">M</Toggle>
      <Toggle size="lg">L</Toggle>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 4 }}>
      <Toggle defaultPressed>B</Toggle>
      <Toggle>I</Toggle>
      <Toggle>U</Toggle>
    </div>
  ),
};
