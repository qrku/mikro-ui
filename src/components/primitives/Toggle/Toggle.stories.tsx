import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Primitives/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const WithLabel: Story = { args: { children: 'Dark mode' } };
export const CheckedWithLabel: Story = { args: { defaultChecked: true, children: 'Notifications on' } };
export const Disabled: Story = { args: { disabled: true, children: 'Unavailable' } };
export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true, children: 'Locked on' } };

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Toggle size="sm">Small</Toggle>
      <Toggle size="md">Medium</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  ),
};
