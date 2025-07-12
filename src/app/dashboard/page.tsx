'use client';

import Header from '@/lib/frontend/dashboard/header';
import MobilePreview from '@/lib/frontend/dashboard/MobilePreview';
import Tabs from '@/lib/frontend/dashboard/Tabs';
import styles from '@/styles/dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.dashboardWrapper}>
      <Header />
      <main className={`${styles.dashboardMain}`}>
        <div className={styles.dashboardContent}>
          <MobilePreview />
          <Tabs />
        </div>
      </main>
    </div>
  );
}
