'use client';

import { useState } from 'react';
import styles from '@/styles/dashboard.module.css';
import { User, Settings } from 'lucide-react';
import PlanCard from '@/lib/frontend/components/home/PlanCard';
import dynamic from 'next/dynamic';
import CustomModal from './CustomModal';

const RichTextEditor = dynamic(
  () => import('@/lib/frontend/components/createform/RichTextEditor'),
  { ssr: false }
);

type Subscriber = {
  email: string;
  date: string;
  status: 'active' | 'unsubscribed';
};

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

export default function SubscribersTab() {
  const [subscribers] = useState<Subscriber[]>([
    { email: 'jane@example.com', date: '2025-07-10', status: 'active' },
    { email: 'john@example.com', date: '2025-07-09', status: 'active' },
    { email: 'doe@example.com', date: '2025-07-06', status: 'unsubscribed' },
  ]);

  const total = subscribers.length;
  const active = subscribers.filter((s) => s.status === 'active').length;
  const unsubscribed = subscribers.filter((s) => s.status === 'unsubscribed').length;

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);

  const [thankYouSubject, setThankYouSubject] = useState('Thank you for joining!');
  const [thankYouMessage, setThankYouMessage] = useState(
    '<p>Hey there, thank you for joining my email list. Stay tuned for more updates!</p>'
  );
  const [disableSubscribers, setDisableSubscribers] = useState(false);

  const userPlan = 'Free'; // Replace this with real plan from DB or session

  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-brand">Your Subscribers</h3>
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (userPlan === 'Free') setShowPlanModal(true);
              else alert('Send email logic goes here ✉️');
            }}
            className="text-sm px-4 py-2 rounded-md bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-dark)]"
          >
            Send Email
          </button>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="flex items-center gap-2 text-sm text-muted hover:text-brand"
          >
            <Settings size={16} />
            Settings
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={styles.statCard}>
          <h4>Total</h4>
          <p>{total}</p>
        </div>
        <div className={styles.statCard}>
          <h4>Active</h4>
          <p>{active}</p>
        </div>
        <div className={styles.statCard}>
          <h4>Unsubscribed</h4>
          <p>{unsubscribed}</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto border rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-muted text-left">
            <tr>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Subscribed On</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y text-sm">
            {subscribers.map((sub, i) => (
              <tr key={i}>
                <td className="px-4 py-2">{sub.email}</td>
                <td className="px-4 py-2">{sub.date}</td>
                <td className="px-4 py-2">
                  <span
                    className={
                      sub.status === 'active'
                        ? 'text-green-600 font-medium'
                        : 'text-red-500 font-medium'
                    }
                  >
                    {sub.status}
                  </span>
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td className="px-4 py-4 text-muted text-center" colSpan={3}>
                  <User size={18} className="inline-block mr-2" />
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <CustomModal onClose={() => setShowSettingsModal(false)} width="600px">
          <h2 className="text-lg font-bold text-brand mb-4">Manage Thank You Message</h2>

          <label className="block text-sm font-medium text-muted mb-1">Subject</label>
          <input
            className={styles.input}
            value={thankYouSubject}
            onChange={(e) => setThankYouSubject(e.target.value)}
          />

          <label className="block text-sm font-medium text-muted mb-1 mt-4">Description</label>
          <RichTextEditor
            value={thankYouMessage}
            onChange={setThankYouMessage}
            placeholder="Write your thank you message..."
          />

          <label className="flex items-center gap-2 mt-6 text-sm">
            <input
              type="checkbox"
              checked={disableSubscribers}
              onChange={(e) => setDisableSubscribers(e.target.checked)}
            />
            <span className="text-muted">Hide the subscribe button from your page.</span>
          </label>

          <div className="mt-6 flex justify-end gap-3">
            <button
              className="text-sm text-muted border px-4 py-2 rounded-md"
              onClick={() => setShowSettingsModal(false)}
            >
              Cancel
            </button>
            <button className={styles.btnPrimary} onClick={() => setShowSettingsModal(false)}>
              Save
            </button>
          </div>
        </CustomModal>
      )}

      {/* Plan Upgrade Modal */}
      {showPlanModal && (
        <CustomModal onClose={() => setShowPlanModal(false)} width="800px">
          <h2 className="text-xl font-bold text-center text-brand mb-2">Upgrade to Send Emails</h2>
          <p className="text-center text-muted mb-6 text-sm">
            Email sending is available only on Pro or Premium plans.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <PlanCard key={i} plan={plan} />
            ))}
          </div>
        </CustomModal>
      )}
    </div>
  );
}
