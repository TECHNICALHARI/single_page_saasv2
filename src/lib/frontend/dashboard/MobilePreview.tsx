'use client';
import styles from '@/styles/dashboard.module.css';

export default function MobilePreview() {
  return (
    <div className={styles.mobilePreview}>
      <div className={styles.phoneFrame}>
        <img src="/your-placeholder-preview.png" alt="Mobile Preview" />
      </div>
    </div>
  );
}
