import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    autoResize: { control: 'boolean' },
  },
  args: { placeholder: 'Write something…' },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };

export const Disabled: Story = { args: { disabled: true, defaultValue: 'Cannot edit this.' } };

export const Invalid: Story = { args: { invalid: true, defaultValue: 'This value is wrong.' } };

export const AutoResize: Story = {
  args: { autoResize: true, placeholder: 'Grows as you type…' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 280 }}>
      <Textarea size="sm" placeholder="Small" />
      <Textarea size="md" placeholder="Medium" />
      <Textarea size="lg" placeholder="Large" />
    </div>
  ),
};
