'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/preview.module.css';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function PreviewPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openEmbed, setOpenEmbed] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const current = saved || (prefersDark ? 'dark' : 'light');
    setTheme(current);
    document.documentElement.setAttribute('data-theme', current);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const [data] = useState({
    name: 'Raj Verma',
    username: 'rajtech',
    title: 'Full Stack Developer',
    avatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    bio: 'I build beautiful, fast websites and SaaS tools using React & Tailwind.',
    links: [
      { label: '🌐 Portfolio', href: 'https://rajtech.dev' },
      { label: '🐙 GitHub', href: 'https://github.com/rajtech' },
      { label: '📞 WhatsApp', href: 'https://wa.me/919876543210' },
      { label: '📸 Instagram', href: 'https://instagram.com/rajtech' },
      { label: '📺 YouTube', href: 'https://youtube.com/@rajtech' },
    ],
    about: 'Experienced web developer helping founders launch ideas fast.',
    gallery: Array.from({ length: 6 }).map(
      () => 'https://projectsly.com/images/blog/best-project-design.png'
    ),
    testimonials: [
      ['Raj helped us launch our product in record time!', '— Anjali, StartGrow'],
      ['Fast, responsive, and extremely professional.', '— Karan, BoldTech'],
    ],
    faq: [
      ['Do you offer custom design?', 'Yes, all pages are customizable.'],
      ['Can I embed YouTube/Instagram?', 'Yes. Just paste your link in your dashboard.'],
    ],
    embeds: [
      {
        title: '🎬 YouTube: My Portfolio Intro',
        description: 'How I built 3 SaaS in a month.',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
    ],
    locationEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160980071!2d72.74109866629247!3d19.082197839370954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63c96dfb0c9%3A0x6c3f0a00b0e4f0b7!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1611111111111!5m2!1sen!2sin',
  });

  return (
    <main className={styles.preview}>
      <div className="text-right px-6 pt-4">
        <button onClick={toggleTheme} className="text-sm text-muted hover:text-[var(--color-brand)]">
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      {/* Header */}
      <section className="py-10 px-6 text-center">
        <div className={styles.container}>
          <img src={data.avatar} alt="avatar" className={`${styles.avatar} mx-auto mb-4`} />
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-muted-text mt-1">@{data.username} · {data.title}</p>
          <p className="max-w-xl mx-auto mt-4 text-muted-text">{data.bio}</p>
          <div className={`flex justify-center flex-wrap gap-3 mt-6 ${styles.linkWrap}`}>
            {data.links.map((link, i) => (
              <a key={i} href={link.href} className={styles.btnPrimary} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-muted py-12">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>About</h2>
          <p className="text-center text-muted-text">{data.about}</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Gallery</h2>
          <div className={styles.gallerySlider}>
            {data.gallery.map((src, i) => (
              <img key={i} src={src} alt={`Gallery ${i + 1}`} className={styles.gallerySlide} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted py-12">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {data.testimonials.map(([quote, by], i) => (
              <div key={i} className={styles.testimonial}>
                <p className="text-base">{quote}</p>
                <footer className="mt-3 text-sm text-muted-text">{by}</footer>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>FAQs</h2>
          <div className="mt-6">
            {data.faq.map(([q, a], i) => (
              <div key={i} className={styles.faqItem}>
                <div
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{q}</span>
                  {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                <div className={`${styles.faqAnswer} ${openFaq === i ? styles.open : ''}`}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embeds */}
      <section className="bg-muted py-12">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Featured Content</h2>
          <div className="mt-8 space-y-6">
            {data.embeds.map((item, i) => (
              <div key={i} className={styles.toggleSection}>
                <button
                  className={styles.toggleHeader}
                  onClick={() => setOpenEmbed(openEmbed === i ? null : i)}
                >
                  <span>{item.title}</span>
                  <span>{openEmbed === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
                </button>
                <div className={`${styles.toggleBody} ${openEmbed === i ? styles.open : ''}`}>
                  <p className="text-muted-text mb-3">{item.description}</p>
                  <div className={styles.embedWrapper}>
                    <iframe src={item.url} allowFullScreen loading="lazy" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 text-center">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Contact</h2>
          <form className={`max-w-xl mx-auto mt-8 grid gap-4 ${styles.contactForm}`}>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Your Message" rows={4}></textarea>
            <button type="submit" className={styles.btnPrimary}>Send Message</button>
          </form>
        </div>
      </section>

      {/* Map */}
      <section className="py-12">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Find Me</h2>
          <div className={styles.mapWrapper}>
            <iframe src={data.locationEmbed} allowFullScreen loading="lazy" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>
            Made with ❤️ by <span className={styles.brandName}>{data.name}</span> · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  );
}
