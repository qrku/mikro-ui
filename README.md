# mikro-ui

Minimal React component library. CSS Modules, no runtime dependencies beyond React.

## Install

```bash
npm install mikro-ui
```

## Setup

Import the stylesheet once at the root of your app:

```tsx
// layout.tsx or _app.tsx
import 'mikro-ui/dist/index.css';
import 'mikro-ui/tokens';
```

## Components

| Component | Description |
|---|---|
| `Button` | Solid, outline, ghost variants |
| `Input` | Text input with label and error state |
| `Textarea` | Multiline input |
| `Select` | Dropdown select |
| `AutoComplete` | Input with filtered suggestions |
| `Checkbox` | Single checkbox |
| `Radio` / `RadioGroup` | Radio buttons with group context |
| `Toggle` | On/off switch |
| `Range` | Slider input |
| `Tabs` / `TabList` / `Tab` / `TabPanel` | Tab navigation |
| `Modal` | Dialog overlay |
| `Spinner` | Loading indicator |
| `toast` / `ToastProvider` | Toast notifications |

## Usage

```tsx
import { Button, Input, Select } from 'mikro-ui';

function Form() {
  return (
    <>
      <Input label="email" type="email" />
      <Select
        label="country"
        options={[
          { value: 'us', label: 'United States' },
          { value: 'gb', label: 'United Kingdom' },
        ]}
      />
      <Button variant="solid">Submit</Button>
    </>
  );
}
```

### Toast

Add `ToastProvider` to your layout, then call `toast` anywhere:

```tsx
// layout.tsx
import { ToastProvider } from 'mikro-ui';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <ToastProvider />
    </>
  );
}
```

```tsx
import { toast } from 'mikro-ui';

toast('Saved');
toast.success('Changes applied');
toast.error('Something went wrong');
```

### Tabs

```tsx
import { Tabs, TabList, Tab, TabPanel } from 'mikro-ui';

<Tabs defaultValue="account">
  <TabList>
    <Tab value="account">Account</Tab>
    <Tab value="security">Security</Tab>
  </TabList>
  <TabPanel value="account">Account content</TabPanel>
  <TabPanel value="security">Security content</TabPanel>
</Tabs>
```

### RadioGroup

```tsx
import { RadioGroup, Radio } from 'mikro-ui';

<RadioGroup name="plan" value={plan} onChange={setPlan}>
  <Radio value="free">Free</Radio>
  <Radio value="pro">Pro</Radio>
</RadioGroup>
```

## Customization

Components use CSS custom properties for sizing. Override them in your global CSS:

```css
:root {
  --dot-sm: 10px;
  --dot-md: 12px;
  --dot-lg: 14px;
  --color-primary: #0070f3;
}
```

Or import the provided defaults via `mikro-ui/tokens`.

## Peer dependencies

React 18 or later.
