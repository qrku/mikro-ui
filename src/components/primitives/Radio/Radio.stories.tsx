import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof Radio> = {
  title: 'Primitives/Radio',
  component: Radio,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = { args: { children: 'Option' } };
export const Checked: Story = { args: { children: 'Selected', defaultChecked: true } };
export const Disabled: Story = { args: { children: 'Disabled', disabled: true } };
export const DisabledChecked: Story = { args: { children: 'Disabled checked', disabled: true, defaultChecked: true } };

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Radio size="sm">Small</Radio>
      <Radio size="md">Medium</Radio>
      <Radio size="lg">Large</Radio>
    </div>
  ),
};

export const Group: StoryObj = {
  render: () => {
    const [value, setValue] = useState('b');
    return (
      <RadioGroup name="story" value={value} onChange={setValue}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Radio value="a">Option A</Radio>
          <Radio value="b">Option B</Radio>
          <Radio value="c">Option C</Radio>
        </div>
      </RadioGroup>
    );
  },
};
