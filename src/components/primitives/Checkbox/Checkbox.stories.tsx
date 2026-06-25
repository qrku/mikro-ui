import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = { args: { children: 'Accept terms' } };
export const Checked: Story = { args: { children: 'Checked', defaultChecked: true } };
export const Indeterminate: Story = { args: { children: 'Indeterminate', indeterminate: true } };
export const Disabled: Story = { args: { children: 'Disabled', disabled: true } };
export const DisabledChecked: Story = { args: { children: 'Disabled checked', disabled: true, defaultChecked: true } };
export const NoLabel: Story = { args: {} };

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox size="sm">Small</Checkbox>
      <Checkbox size="md">Medium</Checkbox>
      <Checkbox size="lg">Large</Checkbox>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Checkbox defaultChecked>Apples</Checkbox>
      <Checkbox>Bananas</Checkbox>
      <Checkbox indeterminate>Citrus (partial)</Checkbox>
      <Checkbox disabled>Durian (unavailable)</Checkbox>
    </div>
  ),
};
