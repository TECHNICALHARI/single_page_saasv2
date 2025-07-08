import CallToAction from '@/lib/frontend/components/home/CallToAction';
import FAQ from '@/lib/frontend/components/home/FAQ';
import Hero from '@/lib/frontend/components/home/Hero';
import PricingSection from '@/lib/frontend/components/home/PricingSection';
import TrustSection from '@/lib/frontend/components/home/TrustSection';
import UseCasesSection from '@/lib/frontend/components/home/UseCasesSection';
import UserShowcase from '@/lib/frontend/components/home/UserShowcase';
import WhySection from '@/lib/frontend/components/home/WhySection';
import Footer from '@/lib/frontend/components/layout/Footer';
import Header from '@/lib/frontend/components/layout/Header';


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

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <WhySection />
      <UseCasesSection />
      <UserShowcase />
      <PricingSection />
      <TrustSection />
      <FAQ />
      <CallToAction />
      <Footer />
    </main>
  );
}
