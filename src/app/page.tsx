import { Button, Input, Select, Toggle, Textarea, Spinner, AutoComplete } from "@/components/primitives";
import styles from "./page.module.css";

const selectOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span className={styles.logo}>mikro-ui</span>
        <span className={styles.tagline}>primitives</span>
      </header>

      <div className={styles.grid}>

        {/* Button */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Button</p>
          <div className={styles.col}>
            <div className={styles.row}>
              <Button variant="solid">Solid</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className={styles.row}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
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
            <Input size="sm" placeholder="Small" />
            <Input size="md" placeholder="Medium" />
            <Input size="lg" placeholder="Large" />
            <Input placeholder="Disabled" disabled />
            <Input placeholder="Invalid" invalid />
          </div>
        </div>

        {/* Select */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Select</p>
          <div className={styles.col}>
            <Select size="sm" options={selectOptions} />
            <Select size="md" options={selectOptions} />
            <Select size="lg" options={selectOptions} />
            <Select disabled options={[{ value: "1", label: "Disabled" }]} />
          </div>
        </div>

        {/* AutoComplete */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>AutoComplete</p>
          <div className={styles.col}>
            <AutoComplete
              options={['Apple','Apricot','Banana','Cherry','Date','Fig','Grape','Kiwi','Lemon','Mango','Orange','Peach','Pear','Plum','Strawberry','Watermelon']}
              placeholder="Search fruit…"
            />
            <AutoComplete
              options={[
                { value: 'us', label: 'United States' },
                { value: 'gb', label: 'United Kingdom' },
                { value: 'de', label: 'Germany' },
                { value: 'fr', label: 'France' },
              ]}
              placeholder="Search country…"
              size="sm"
            />
          </div>
        </div>

        {/* Textarea */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Textarea</p>
          <div className={styles.col}>
            <Textarea placeholder="Default" />
            <Textarea placeholder="Invalid" invalid />
            <Textarea placeholder="Auto-resize…" autoResize />
            <Textarea placeholder="Disabled" disabled />
          </div>
        </div>

        {/* Toggle */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Toggle</p>
          <div className={styles.col}>
            <div className={styles.row}>
              <Toggle size="sm">S</Toggle>
              <Toggle size="md">M</Toggle>
              <Toggle size="lg">L</Toggle>
            </div>
            <div className={styles.row}>
              <Toggle defaultPressed>Bold</Toggle>
              <Toggle>Italic</Toggle>
              <Toggle>Under</Toggle>
            </div>
            <div className={styles.row}>
              <Toggle defaultPressed>★</Toggle>
              <Toggle disabled>Off</Toggle>
            </div>
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
