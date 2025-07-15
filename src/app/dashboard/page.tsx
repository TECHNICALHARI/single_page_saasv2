'use client';

import { useState } from 'react';
import Header from '@/lib/frontend/dashboard/header';
import Tabs from '@/lib/frontend/dashboard/Tabs';
import styles from '@/styles/dashboard.module.css';
import previewStyles from '@/styles/preview.module.css';
import { useAutoSave } from '@/lib/frontend/hooks/useAutoSave';
import PreviewPage from '../preview/page';

export default function Dashboard() {
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    title: '',
    bio: '',
    avatar: '',
    links: [],
    headers: [],
    gallery: [],
    youtube: '',
    instagram: '',
    calendly: '',
    posts: [],
    metaTitle: '',
    metaDescription: '',
    // theme: 'link',
    nsfwWarning: false,
    preferredLink: 'primary',
    customDomain: '',
    emojiLink: '',
    gaId: '',
    theme: "theme-default"
  });
  useAutoSave(form);
  return (
    <div className={styles.dashboardWrapper}>
      <Header />
      <main className={`${styles.dashboardMain}`}>
        <div className={styles.dashboardContent}>
          {/* 📱 Sticky Left */}
          <div className={styles.mobilePreview}>
            <div className={previewStyles.phoneFrame}>
              <PreviewPage form={form} insidePhoneFrame={true} />
            </div>
          </div>
          <div className={styles.tabsWrapper}>
            <Tabs form={form} setForm={setForm} />
          </div>
        </div>

      </main>
    </div>
  );
}
