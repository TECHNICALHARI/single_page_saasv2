'use client';

import PlanCard from '@/lib/frontend/components/home/PlanCard';
import CustomModal from './CustomModal';

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

export default function PlanUpgradeModal({ onClose }: { onClose: () => void }) {
  return (
    <CustomModal onClose={onClose}>
      <div className="p-6  w-full">
        <h2 className="text-xl font-bold text-center text-brand mb-2">Remove Branding</h2>
        <p className="text-center text-muted mb-6 text-sm">
          Upgrade to Pro or Premium to unlock advanced customization features.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <PlanCard key={idx} plan={plan} />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            className="text-sm text-muted border px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </CustomModal>
  );
}
