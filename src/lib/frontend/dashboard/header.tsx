'use client';
import styles from '@/styles/dashboard.module.css';

export default function Header() {
  return (
<header className={styles.header}>
  <div className="container flex justify-between items-center py-4">
    <h1 className={styles.logo}>OnePage</h1>
    <div className="flex items-center gap-4">
      <a href="#" className="text-sm font-medium text-brand">yourname.bio.link</a>
      <button className="btnFull">Share</button>
    </div>
  </div>
</header>

  );
}
