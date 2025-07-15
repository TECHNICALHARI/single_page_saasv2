'use client';

import styles from '@/styles/dashboard.module.css';
import previewStyles from '@/styles/preview.module.css';
import themeStyles from '@/styles/theme.module.css';
import Image from 'next/image';
import CustomModal from './CustomModal';
import PlanCard from '../components/home/PlanCard';
import { useState } from 'react';

const themes = [
  { key: 'default', name: 'Default' },
  { key: 'onyx', name: 'Onyx' },
  { key: 'sunbeam', name: 'Sunbeam' },
  { key: 'lavish', name: 'Lavish' },
  { key: 'serenity', name: 'Serenity' },
  { key: 'storm', name: 'Storm' },
  { key: 'minted', name: 'Minted' },
  { key: 'coral', name: 'Coral' },
  { key: 'glacier', name: 'Glacier' },
  { key: 'halo', name: 'Halo' },
  { key: 'cloud', name: 'Cloud' },
  { key: 'aura', name: 'Aura' },
  { key: 'midnight', name: 'Midnight' },
  { key: 'brand-light', name: 'Brand Light' },
  { key: 'mist', name: 'Mist' },
  { key: 'velvet', name: 'Velvet' },
  { key: 'pine', name: 'Pine' },
  { key: 'grayscale', name: 'Grayscale' },
  { key: 'peach', name: 'Peach' },
  { key: 'ocean', name: 'Ocean' },
];









const plans = [
  {
    name: 'Free',
    price: '₹0',
    features: [
      'Full Name',
      'Username',
      'Page Title',
      'Bio (Plain Text)',
      '2 Custom Links',
      'Fixed Theme',
      'Branding Visible',
    ],
  },
  {
    name: 'Pro',
    price: '₹199/year',
    features: [
      'All Free Features',
      'About Section (Rich Text)',
      'Profile Image',
      'WhatsApp Number',
      'Portfolio Link',
      '5 Custom Links',
      'Custom Colors',
      'Remove Branding',
    ],
  },
  {
    name: 'Premium',
    price: '₹499/year',
    features: [
      'All Pro Features',
      '10 Custom Links',
      'Testimonials',
      'FAQ Section',
      'Gallery Upload',
      'Contact Form',
      'YouTube Embed',
      'Google Map',
      'Custom Sections',
      'Custom Colors',
      'Remove Branding',
    ],
  },
];

export default function DesignTab({
  form,
  setForm,
}: {
  form: any;
  setForm: (f: any) => void;
}) {
  const [showPlanModal, setShowPlanModal] = useState(false);

  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => handleChange('avatar', reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleBrandingChange = (value: boolean) => {
    if (value) setShowPlanModal(true);
    handleChange('brandingOff', value);
  };

  return (
    <div className="grid gap-8">
      {/* 👤 Profile Section */}
      <h3 className="text-xl font-bold text-brand">Profile</h3>
      <div className={styles.postCard}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left: Name + Bio */}
          <div className="flex-1">
            <label className="text-sm font-medium text-muted block mb-1">Your Name</label>
            <input
              className={styles.input}
              placeholder="Your Name"
              value={form.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />

            <label className="text-sm font-medium text-muted block mb-1 mt-4">Bio</label>
            <input
              className={styles.input}
              placeholder="Bio"
              value={form.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
            />
          </div>

          {/* Right: Avatar */}
          <div className="flex flex-col items-center gap-2">
            {form.avatar ? (
              <img
                src={form.avatar}
                className="w-20 h-20 rounded-full border object-cover"
                alt="avatar"
              />
            ) : (
              <div className="w-20 h-20 rounded-full border bg-muted" />
            )}
            <input type="file" accept="image/*" onChange={handleAvatarUpload} />
          </div>
        </div>
      </div>

      {/* 🎨 Theme Section */}
      <h3 className="text-xl font-bold text-brand mb-4">Themes</h3>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {themes.map((theme) => {
          const isActive = form.theme === theme.key;
          const themeClass = themeStyles[`theme-${theme.key}`];

          return (
            <div key={theme.key} className="flex flex-col items-center">
              <div
                onClick={() => handleChange('theme', theme.key)}
                className={`
            ${previewStyles.themePreviewBox}
            ${themeClass}
            w-full h-[200px]
            border-2
            transition-all duration-300
            transform hover:-translate-y-1
            cursor-pointer
            ${isActive ? 'border-[var(--color-brand)]' : 'border-gray-200'}
          `}
              >
                <div className={previewStyles.themePreviewButton}></div>
                <div className={previewStyles.themePreviewButton}></div>
                <div className={previewStyles.themePreviewButton}></div>
              </div>

              <p
                className={`mt-2 text-sm text-center font-medium ${isActive ? 'text-[var(--color-brand)]' : 'text-muted'
                  }`}
              >
                {theme.name}
              </p>
            </div>
          );
        })}
      </section>



      {/* 🚫 Disable Branding */}
      <div className={styles.postCard}>
        <h4 className="text-md font-semibold text-brand mb-2">Bio Link Branding</h4>
        <div className="flex items-center gap-6 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="branding"
              checked={!form.brandingOff}
              onChange={() => handleBrandingChange(false)}
            />
            <span>Show branding (Free)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="branding"
              checked={form.brandingOff}
              onChange={() => handleBrandingChange(true)}
            />
            <span>Remove branding (Pro feature)</span>
          </label>
        </div>
      </div>

      {/* 💸 Upgrade Modal */}
      {showPlanModal && (
        <CustomModal onClose={() => setShowPlanModal(false)} width="1024px">
          <h2 className="text-xl font-bold text-center text-brand mb-2">
            Upgrade to Remove Branding
          </h2>
          <p className="text-center text-muted mb-6 text-sm">
            Choose a plan to remove Bio Link branding from your page.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, idx) => (
              <PlanCard key={idx} plan={plan} />
            ))}
          </div>
        </CustomModal>
      )}
    </div>
  );
}
