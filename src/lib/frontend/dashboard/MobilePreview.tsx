'use client';

import styles from '@/styles/preview.module.css';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type ThemeType = {
  type: 'color' | 'image';
  value: string;
};

interface FormProps {
  fullName?: string;
  username?: string;
  title?: string;
  avatar?: string;
  bio?: string;
  links?: { label: string; href: string }[];
  about?: string;
  gallery?: string[];
  testimonials?: [string, string][];
  faq?: [string, string][];
  embeds?: { title: string; description: string; url: string }[];
  locationEmbed?: string;
  brandingOff?: boolean;
  theme?: ThemeType;
}

export default function MobilePreview({ form }: { form: FormProps }) {
  const {
    fullName,
    username,
    title,
    avatar,
    bio,
    links = [],
    about,
    gallery = [],
    testimonials = [],
    faq = [],
    embeds = [],
    locationEmbed,
    brandingOff,
    theme,
  } = form;

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openEmbed, setOpenEmbed] = useState<number | null>(null);

  const getBackgroundStyle = (): React.CSSProperties => {
    const theme = form.theme;
    if (!theme) return {};

    if (theme.type === 'image') {
      return {
        backgroundImage: `url(${theme.value})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      };
    }

    if (theme.type === 'color') {
      return {
        backgroundColor: theme.value,
      };
    }

    return {};
  };

  return (
    <div className={styles.phoneFrame}>
      <div
        className={`${styles.preview}`}
        style={getBackgroundStyle()}
      >
        <section className="text-center">
          <img
            src={avatar || '/placeholder-avatar.png'}
            alt="avatar"
            className={`${styles.avatar} mx-auto mb-4`}
          />
          <h1 className="text-xl font-bold">{fullName || 'Your Name'}</h1>
          <p className="text-muted-text text-sm mt-1">
            @{username || 'username'} · {title || 'Your Title'}
          </p>
          <p className="text-muted-text text-sm mt-3">{bio || 'Your short bio here.'}</p>

          {links.length > 0 && (
            <div className={`flex justify-center flex-wrap gap-2 mt-5 ${styles.linkWrap}`}>
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className={styles.btnPrimary}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </section>

        {/* About */}
        {about && (
          <section className="mt-8">
            <h2 className={styles.sectionTitle}>About</h2>
            <p className="text-center text-muted-text text-sm">{about}</p>
          </section>
        )}

        {/* Gallery */}
        {gallery.length > 0 && (
          <section className="mt-8">
            <h2 className={styles.sectionTitle}>Gallery</h2>
            <div className={styles.gallerySlider}>
              {gallery.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`gallery-${i}`}
                  className={styles.gallerySlide}
                />
              ))}
            </div>
          </section>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="mt-8">
            <h2 className={styles.sectionTitle}>Testimonials</h2>
            <div className="grid gap-3 mt-4">
              {testimonials.map(([quote, by], i) => (
                <div key={i} className={styles.testimonial}>
                  <p className="text-sm">{quote}</p>
                  <footer className="mt-2 text-xs text-muted-text">{by}</footer>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        {faq.length > 0 && (
          <section className="mt-8">
            <h2 className={styles.sectionTitle}>FAQs</h2>
            <div className="mt-4">
              {faq.map(([q, a], i) => (
                <div key={i} className={styles.faqItem}>
                  <div
                    className={styles.faqQuestion}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{q}</span>
                    {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                  <div
                    className={`${styles.faqAnswer} ${openFaq === i ? styles.open : ''}`}
                  >
                    {a}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Embeds */}
        {embeds.length > 0 && (
          <section className="mt-8">
            <h2 className={styles.sectionTitle}>Featured</h2>
            <div className="mt-4 space-y-4">
              {embeds.map((embed, i) => (
                <div key={i} className={styles.toggleSection}>
                  <button
                    className={styles.toggleHeader}
                    onClick={() => setOpenEmbed(openEmbed === i ? null : i)}
                  >
                    <span>{embed.title}</span>
                    <span>
                      {openEmbed === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  <div
                    className={`${styles.toggleBody} ${openEmbed === i ? styles.open : ''}`}
                  >
                    <p className="text-sm text-muted-text mb-2">{embed.description}</p>
                    <div className={styles.embedWrapper}>
                      <iframe src={embed.url} allowFullScreen loading="lazy" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Location */}
        {locationEmbed && (
          <section className="mt-8">
            <h2 className={styles.sectionTitle}>Find Me</h2>
            <div className={styles.mapWrapper}>
              <iframe src={locationEmbed} loading="lazy" allowFullScreen />
            </div>
          </section>
        )}

        {/* Branding */}
        {!brandingOff && (
          <footer className="text-xs text-center text-muted mt-8">
            Powered by <span className="text-brand font-semibold">OnePage</span>
          </footer>
        )}
      </div>
    </div>
  );
}
