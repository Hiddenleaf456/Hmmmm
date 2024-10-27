// pages/welcome.js
import Link from 'next/link';
import styles from '../styles/welcome.module.css'; // Updated import path

export default function Welcome() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the File Upload App</h1>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/upload">Upload File</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/files">View Uploaded Files</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
