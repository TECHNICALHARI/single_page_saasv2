import PlanCard from "@/lib/frontend/components/home/PlanCard";

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

export default function PricingSection() {
  return (
    <section id="plans" className="section">
      <div className="container text-center">
        <h2 className="section-title">Choose Your Plan</h2>
        <p className="section-subtitle">
          Start for free, upgrade anytime to unlock advanced tools.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {plans.map((plan, i) => (
            <PlanCard key={i} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
