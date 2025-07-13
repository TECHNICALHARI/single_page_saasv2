'use client';

import { useState } from 'react';
import Header from '@/lib/frontend/dashboard/header';
import MobilePreview from '@/lib/frontend/dashboard/MobilePreview';
import Tabs from '@/lib/frontend/dashboard/Tabs';
import styles from '@/styles/dashboard.module.css';
import { useAutoSave } from '@/lib/frontend/hooks/useAutoSave';

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
    theme: 'link',
    nsfwWarning: false,
    preferredLink: 'primary',
    customDomain: '',
    emojiLink: '',
    gaId: '',
  });
useAutoSave(form); 
  return (
    <div className={styles.dashboardWrapper}>
      <Header />
      <main className={`${styles.dashboardMain}`}>
        <div className={`${styles.dashboardContent} flex flex-col lg:flex-row gap-6`}>
          <div className="flex justify-center w-full lg:w-[375px] shrink-0">
            <MobilePreview form={form} />
          </div>
          <div className="flex-1">
            <Tabs form={form} setForm={setForm} />
          </div>
        </div>
      </main>
    </div>
  );
}
