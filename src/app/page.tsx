import { Button, Input, Select, Toggle, Textarea, Spinner, AutoComplete, Checkbox, Radio, RadioGroup, Range, Tabs, TabList, Tab, TabPanel } from "@/components/primitives";
import { ModalDemo } from "./ModalDemo";
import { ToastDemo } from "./ToastDemo";
import styles from "./page.module.css";

const fruits = ['Apple', 'Apricot', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango', 'Orange', 'Peach'];

const countries = [
  { value: 'ru', label: 'Russia' },
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.grid}>

        {/* Button */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Button</p>
          <div className={styles.col}>
            <div className={styles.row}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className={styles.row}>
              <Button variant="solid">Solid</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className={styles.row}>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Input</p>
          <div className={styles.col}>
            <Input size="sm" label="email" placeholder="Small" />
            <Input size="md" label="email" placeholder="Medium" />
            <Input size="lg" label="email" placeholder="Large" />
            <Input size="md" label="email" defaultValue="artem@gmail.com" error="Invalid address" />
            <Input size="md" label="email" placeholder="Disabled" disabled />
          </div>
        </div>

        {/* Select */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Select</p>
          <div className={styles.col}>
            <Select size="sm" label="country" options={countries} />
            <Select size="md" label="country" options={countries} />
            <Select size="lg" label="country" options={countries} defaultValue="ru" />
            <Select size="md" label="country" disabled options={countries} />
          </div>
        </div>

        {/* AutoComplete */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>AutoComplete</p>
          <div className={styles.col}>
            <AutoComplete size="sm" label="fruit" options={fruits} placeholder="Search…" />
            <AutoComplete size="md" label="fruit" options={fruits} placeholder="Search…" />
            <AutoComplete size="lg" label="fruit" options={fruits} placeholder="Search…" />
          </div>
        </div>

        {/* Textarea */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Textarea</p>
          <div className={styles.col}>
            <Textarea size="sm" label="message" placeholder="Small…" />
            <Textarea size="md" label="message" placeholder="Medium…" />
            <Textarea size="lg" label="message" placeholder="Large…" />
            <Textarea size="md" label="message" defaultValue="Bad input" error="Too short" />
            <Textarea size="md" label="message" placeholder="Disabled" disabled />
          </div>
        </div>

        {/* Toggle */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Toggle</p>
          <div className={styles.col}>
            <Toggle size="sm">Small</Toggle>
            <Toggle size="md">Medium</Toggle>
            <Toggle size="lg" defaultChecked>Large (on)</Toggle>
            <Toggle disabled>Disabled</Toggle>
            <Toggle disabled defaultChecked>Disabled (on)</Toggle>
          </div>
        </div>

        {/* Checkbox */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Checkbox</p>
          <div className={styles.col}>
            <Checkbox size="sm">Small</Checkbox>
            <Checkbox size="md">Medium</Checkbox>
            <Checkbox size="lg" defaultChecked>Large (checked)</Checkbox>
            <Checkbox indeterminate>Indeterminate</Checkbox>
            <Checkbox disabled>Disabled</Checkbox>
          </div>
        </div>

        {/* Radio */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Radio</p>
          <div className={styles.col}>
            <RadioGroup name="size-demo">
              <div className={styles.col}>
                <Radio size="sm" value="sm">Small</Radio>
                <Radio size="md" value="md" defaultChecked>Medium (selected)</Radio>
                <Radio size="lg" value="lg">Large</Radio>
              </div>
            </RadioGroup>
            <Radio name="standalone" disabled>Disabled</Radio>
            <Radio name="standalone" disabled defaultChecked>Disabled (selected)</Radio>
          </div>
        </div>

        {/* Modal */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Modal</p>
          <ModalDemo />
        </div>

        {/* Toast */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Toast</p>
          <ToastDemo />
        </div>

        {/* Tabs */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Tabs</p>
          <Tabs defaultValue="account">
            <TabList>
              <Tab value="account">account</Tab>
              <Tab value="security">security</Tab>
              <Tab value="billing">billing</Tab>
            </TabList>
            <TabPanel value="account">Manage your account details and preferences.</TabPanel>
            <TabPanel value="security">Update your password and two-factor authentication.</TabPanel>
            <TabPanel value="billing">View invoices and manage your subscription plan.</TabPanel>
          </Tabs>
        </div>

        {/* Range */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Range</p>
          <div className={styles.col}>
            <Range size="sm" label="small" defaultValue={25} />
            <Range size="md" label="medium" defaultValue={50} />
            <Range size="lg" label="large" defaultValue={75} />
            <Range size="md" label="disabled" defaultValue={40} disabled />
          </div>
        </div>

        {/* Spinner */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Spinner</p>
          <div className={styles.row}>
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        </div>

      </div>
    </main>
  );
}
