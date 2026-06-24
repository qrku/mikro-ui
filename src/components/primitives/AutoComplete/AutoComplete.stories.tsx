import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AutoComplete } from './AutoComplete';

const fruits = [
  'Apple', 'Apricot', 'Avocado',
  'Banana', 'Blackberry', 'Blueberry',
  'Cherry', 'Coconut', 'Cranberry',
  'Date', 'Dragon fruit', 'Durian',
  'Fig', 'Grape', 'Guava',
  'Kiwi', 'Lemon', 'Lime',
  'Mango', 'Melon', 'Nectarine',
  'Orange', 'Papaya', 'Peach',
  'Pear', 'Pineapple', 'Plum',
  'Pomegranate', 'Raspberry', 'Strawberry',
  'Watermelon',
];

const meta: Meta<typeof AutoComplete> = {
  title: 'Primitives/AutoComplete',
  component: AutoComplete,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    filterOptions: { control: 'boolean' },
  },
  args: {
    options: fruits,
    placeholder: 'Search fruit…',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280, paddingBottom: 240 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AutoComplete>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };

export const WithObjectOptions: Story = {
  args: {
    options: [
      { value: 'us', label: 'United States' },
      { value: 'gb', label: 'United Kingdom' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
      { value: 'jp', label: 'Japan' },
    ],
    placeholder: 'Search country…',
  },
};

export const Disabled: Story = { args: { disabled: true } };
export const Invalid: Story = { args: { invalid: true } };

export const NoFilter: Story = {
  args: {
    filterOptions: false,
    options: fruits.slice(0, 6),
    placeholder: 'Shows all options…',
  },
};
