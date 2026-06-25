import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.shapes}>
        <span className={styles.diamond} />
        <span className={styles.square} />
        <span className={styles.diamond} />
      </div>
      <p className={styles.label}>page not found</p>
      <Link href="/" className={styles.link}>go home</Link>
    </main>
  );
}
