'use client';

import { useState } from 'react';
import styles from '@/styles/superadmin.module.css';

export default function SuperAdminSettingsPage() {
  const [settings, setSettings] = useState({
    appName: 'OnePage Builder',
    supportEmail: 'support@onepage.com',
    maintenanceMode: false,
    allowedDomains: '',
    rateLimit: 1000,
    logo: '',
    themeColor: '#4f46e5',
    defaultPlan: 'Free',
    gracePeriod: 7,
    smtpHost: '',
    smtpPort: '',
    smtpUser: '',
    smtpPass: '',
    fromEmail: '',
  });

  const handleChange = (field: string, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save to API or backend
    console.log('Saving settings...', settings);
    alert('Settings saved!');
  };

  return (
    <div className={styles.screenWrapper}>
      <div className={styles.screenHeader}>
        <h2 className={styles.screenTitle}>Platform Settings</h2>
      </div>

      <div className="grid gap-10 mt-8">

        {/* General */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>General Settings</h3>
          <div className="grid gap-4">
            <input
              className={styles.input}
              placeholder="App Name"
              value={settings.appName}
              onChange={(e) => handleChange('appName', e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="Support Email"
              value={settings.supportEmail}
              onChange={(e) => handleChange('supportEmail', e.target.value)}
            />
            <label className="flex items-center gap-3 text-sm mt-2">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                className="accent-brand"
              />
              Enable Maintenance Mode
            </label>
          </div>
        </div>

        {/* Security */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Security Settings</h3>
          <div className="grid gap-4">
            <input
              className={styles.input}
              placeholder="Allowed Domains (comma separated)"
              value={settings.allowedDomains}
              onChange={(e) => handleChange('allowedDomains', e.target.value)}
            />
            <input
              type="number"
              className={styles.input}
              placeholder="API Rate Limit (req/min)"
              value={settings.rateLimit}
              onChange={(e) => handleChange('rateLimit', parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* Brand */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Brand Settings</h3>
          <div className="grid gap-4">
            <label className="text-sm">Logo</label>
            <input type="file" accept="image/*" onChange={handleLogoUpload} />
            {settings.logo && (
              <img src={settings.logo} alt="Logo" className="h-16 mt-2 rounded" />
            )}
            <label className="text-sm mt-4">Primary Theme Color</label>
            <input
              type="color"
              value={settings.themeColor}
              onChange={(e) => handleChange('themeColor', e.target.value)}
              className="w-16 h-10 rounded cursor-pointer border"
            />
          </div>
        </div>

        {/* Subscription */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Subscription Settings</h3>
          <div className="grid gap-4">
            <select
              className={styles.input}
              value={settings.defaultPlan}
              onChange={(e) => handleChange('defaultPlan', e.target.value)}
            >
              <option>Free</option>
              <option>Pro</option>
              <option>Premium</option>
            </select>
            <input
              type="number"
              className={styles.input}
              placeholder="Grace Period (days)"
              value={settings.gracePeriod}
              onChange={(e) => handleChange('gracePeriod', parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* Email Settings */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Email / SMTP Settings</h3>
          <div className="grid gap-4">
            <input
              className={styles.input}
              placeholder="SMTP Host"
              value={settings.smtpHost}
              onChange={(e) => handleChange('smtpHost', e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="SMTP Port"
              value={settings.smtpPort}
              onChange={(e) => handleChange('smtpPort', e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="SMTP Username"
              value={settings.smtpUser}
              onChange={(e) => handleChange('smtpUser', e.target.value)}
            />
            <input
              type="password"
              className={styles.input}
              placeholder="SMTP Password"
              value={settings.smtpPass}
              onChange={(e) => handleChange('smtpPass', e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="From Email"
              value={settings.fromEmail}
              onChange={(e) => handleChange('fromEmail', e.target.value)}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="text-right sticky bottom-0 bg-white border-t py-4">
          <button onClick={handleSave} className={styles.btnPrimary}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
