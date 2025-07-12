'use client';

import { useState } from 'react';
import styles from '@/styles/dashboard.module.css';
import LinksTab from './LinksTab';
import PostsTab from './PostsTab';
import DesignTab from './DesignTab';
import SubscribersTab from './SubscribersTab';
import StatsTab from './StatsTab';
import SettingsTab from './SettingsTab';


const tabs = ['Links', 'Posts', 'Design', 'Subscribers', 'Stats', 'Settings'];

export default function Tabs({ form, setForm }: { form: any; setForm: (f: any) => void }) {
  const [activeTab, setActiveTab] = useState('Links');

  return (
    <div className={styles.tabsWrapper}>
      <nav className={styles.tabNav}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tabItem} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className={styles.tabContent}>
        {activeTab === 'Links' && <LinksTab form={form} setForm={setForm} />}
        {activeTab === 'Posts' && <PostsTab form={form} setForm={setForm} />}
        {activeTab === 'Design' && <DesignTab form={form} setForm={setForm} />}
        {activeTab === 'Subscribers' && <SubscribersTab form={form} setForm={setForm} />}
        {activeTab === 'Stats' && <StatsTab form={form} setForm={setForm} />}
        {activeTab === 'Settings' && <SettingsTab form={form} setForm={setForm} />}
      </div>
    </div>
  );
}

