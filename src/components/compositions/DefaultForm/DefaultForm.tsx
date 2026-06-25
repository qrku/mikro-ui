"use client";

import { useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Select,
  Textarea,
  Toggle,
  Radio,
  RadioGroup,
} from "@/components/primitives";
import { toast } from "@/components/primitives/Toast";
import styles from "./DefaultForm.module.css";

const countryOptions = [
  { value: "ru", label: "Russia" },
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
];

export function DefaultForm() {
  const [firstName, setFirstName] = useState("Artem");
  const [lastName, setLastName] = useState("Dubinkin");
  const [email, setEmail] = useState("artem@gmail.com");
  const [country, setCountry] = useState("ru");
  const [plan, setPlan] = useState("pro");
  const [bio, setBio] = useState(
    "Building design systems and UI component libraries. Focused on minimalism and precision.",
  );
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const handleSave = () => {
    toast.success("Settings saved");
  };

  const handleCancel = () => {
    setFirstName("Artem");
    setLastName("Dubinkin");
    setEmail("artem@gmail.com");
    setCountry("ru");
    setPlan("pro");
    setBio(
      "Building design systems and UI component libraries. Focused on minimalism and precision.",
    );
    setNotifications(true);
    setMarketing(false);
    toast("Changes discarded");
  };

  return (
    <div className={styles.form}>
      <div className={styles.formHeader}>
        <h1 className={styles.title}>Account</h1>
        <p className={styles.description}>
          Manage your profile and preferences
        </p>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.row}>
          <Input
            label="first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            label="last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <Input
          label="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Select
          label="country"
          value={country}
          onChange={setCountry}
          options={countryOptions}
        />
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>plan</span>
          <RadioGroup name="plan" value={plan} onChange={setPlan}>
            <div className={styles.radioList}>
              <Radio size="sm" value="free">
                Free — personal projects
              </Radio>
              <Radio size="sm" value="pro">
                Pro — professional use
              </Radio>
              <Radio size="sm" value="team">
                Team — collaborate with others
              </Radio>
            </div>
          </RadioGroup>
        </div>

        <Textarea
          label="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.toggleRow}>
          <div>
            <div className={styles.toggleLabel}>email notifications</div>
            <div className={styles.toggleDesc}>
              Receive updates, alerts and news via email
            </div>
          </div>
          <Toggle checked={notifications} onChange={setNotifications} />
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <Checkbox
          checked={marketing}
          onChange={(e) => setMarketing(e.target.checked)}
        >
          subscribe to marketing emails
        </Checkbox>
      </div>

      <div className={styles.divider} />

      <div className={styles.footer}>
        <Button variant="solid" size="md" onClick={handleSave}>
          Save changes
        </Button>
        <Button variant="ghost" size="md" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
