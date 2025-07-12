'use client';

import { useState } from 'react';
import styles from '@/styles/dashboard.module.css';
import Image from 'next/image';
import PlanUpgradeModal from './PlanUpgradeModal';
import CustomModal from './CustomModal';
import PlanCard from '../components/home/PlanCard';

const themes = [
  { key: 'link', name: 'Link in bio', preview: '/themes/link.png' },
  { key: 'blog', name: 'Blog', preview: '/themes/blog.png' },
  { key: 'shop', name: 'Shop', preview: '/themes/shop.png' },
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


export default function DesignTab() {
  const [profile, setProfile] = useState({
    name: 'Your Name',
    bio: 'This is your bio',
    avatar: '',
    theme: 'link',
  });

  const [brandingOff, setBrandingOff] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    // 🔄 Persist or update preview
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
    if (value) {
      setShowPlanModal(true);
    }
    setBrandingOff(value);
  };

  return (
    <div className="grid gap-8">
      {/* Profile Section */}
      <h3 className="text-xl font-bold text-brand">Profile</h3>
      <div className={styles.postCard}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left: Name + Bio */}
          <div className="flex-1">
            <label className="text-sm font-medium text-muted block mb-1">Your Name</label>
            <input
              className={styles.input}
              placeholder="Your Name"
              value={profile.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />

            <label className="text-sm font-medium text-muted block mb-1 mt-4">Bio</label>
            <input
              className={styles.input}
              placeholder="Bio"
              value={profile.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
            />
          </div>

          {/* Right: Avatar */}
          <div className="flex flex-col items-center gap-2">
            {profile.avatar ? (
              <img
                src={profile.avatar}
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

      {/* Theme Section */}
      <h3 className="text-xl font-bold text-brand">Themes</h3>
      <div className="flex gap-4 flex-wrap">
        {themes.map((theme) => (
          <div
            key={theme.key}
            onClick={() => handleChange('theme', theme.key)}
            className={`cursor-pointer rounded-xl border-2 p-2 transition-all ${
              profile.theme === theme.key
                ? 'border-[var(--color-brand)]'
                : 'border-transparent'
            }`}
          >
            <Image
              src={theme.preview}
              alt={theme.name}
              width={130}
              height={130}
              className="rounded-lg object-cover"
            />
            <p
              className={`text-sm mt-2 text-center font-medium ${
                profile.theme === theme.key
                  ? 'text-[var(--color-brand)]'
                  : 'text-muted'
              }`}
            >
              {theme.name}
            </p>
          </div>
        ))}
      </div>

      {/* Disable Branding */}
      <div className={styles.postCard}>
        <h4 className="text-md font-semibold text-brand mb-2">Bio Link Branding</h4>
        <div className="flex items-center gap-6 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="branding"
              checked={!brandingOff}
              onChange={() => handleBrandingChange(false)}
            />
            <span>Show branding (Free)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="branding"
              checked={brandingOff}
              onChange={() => handleBrandingChange(true)}
            />
            <span>Remove branding (Pro feature)</span>
          </label>
        </div>
      </div>

      {/* Modal */}
  {showPlanModal && (
  <CustomModal onClose={() => setShowPlanModal(false)} width="1024px">
    <h2 className="text-xl font-bold text-center text-brand mb-2">Upgrade to Remove Branding</h2>
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
