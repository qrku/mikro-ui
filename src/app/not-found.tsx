import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.shapes}>
        <span className={styles.squareFilled} />
        <span className={styles.square} />
        <span className={styles.squareFilled} />
      </div>
      <p className={styles.label}>page not found</p>
      <Link href="/" className={styles.link}>go home</Link>
    </main>
  );
}
