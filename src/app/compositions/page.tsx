import { DefaultForm } from '@/components/compositions/DefaultForm/DefaultForm';
import styles from './page.module.css';

export default function CompositionsPage() {
  return (
    <main className={styles.page}>
      <DefaultForm />
    </main>
  );
}
