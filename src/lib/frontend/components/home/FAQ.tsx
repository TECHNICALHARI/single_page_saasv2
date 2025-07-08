'use client';
import { useState } from 'react';

const faqs = [
  {
    q: 'Is OnePage really free to use?',
    a: 'Yes! Our Free plan gives you all the basics you need to launch your profile page — no credit card required.',
  },
  {
    q: 'How is this different from Linktree or Carrd?',
    a: 'OnePage gives you richer sections like About, Gallery, Testimonials, Forms — not just links. Plus, you get your own subdomain and cleaner branding.',
  },
  {
    q: 'Can I use my own domain?',
    a: 'Custom domain support is coming soon for Pro users. Currently, you’ll get a free subdomain like raj.onepage.site.',
  },
  {
    q: 'Is OnePage mobile friendly?',
    a: 'Absolutely. All pages and layouts are fully responsive and optimized for mobile, tablet, and desktop.',
  },
  {
    q: 'Can I use it without any tech knowledge?',
    a: 'Yes! No coding, designing, or hosting knowledge needed. Just fill out a form, hit publish, and you’re live.',
  },
  {
    q: 'What payment options are supported?',
    a: 'We use Razorpay for payments — supporting UPI, Cards, Netbanking and Wallets (India only for now).',
  },
  {
    q: 'Can I cancel my plan anytime?',
    a: 'Yes. There are no lock-ins or hidden fees. You can downgrade or delete your account at any time.',
  },
  {
    q: 'What’s included in Premium that’s not in Pro?',
    a: 'Premium includes advanced blocks like Gallery, Testimonials, Contact Form, YouTube embed, Google Maps, and full customization with more links.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="section min-h-screen bg-muted text-left">
      <div className="container">
        <h1 className="section-title text-center">Frequently Asked Questions</h1>
        <p className="section-subtitle text-center max-w-xl mx-auto">
          Everything you need to know before creating or upgrading your OnePage site.
        </p>

        <div className="faq-wrapper mt-12">
          {faqs.map((item, idx) => (
            <div key={idx} className={`faq-item ${openIndex === idx ? 'open' : ''}`}>
              <div
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {item.q}
                <span>{openIndex === idx ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
