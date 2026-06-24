import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Select } from './Select';

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
  args: { options: fruits },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: { placeholder: 'Pick a fruit…' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Select size="sm" options={fruits} />
      <Select size="md" options={fruits} />
      <Select size="lg" options={fruits} />
    </div>
  ),
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana (unavailable)', disabled: true },
      { value: 'cherry', label: 'Cherry' },
    ],
  },
};
