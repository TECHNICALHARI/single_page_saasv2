'use client';

import styles from '@/styles/create.module.css';
import { Mail, Phone, Eye, EyeOff, User } from 'lucide-react';

export default function SignupForm({
  formData,
  setFormData,
  checking,
  subdomainAvailable,
  checkSubdomain,
  onNext,
}: {
  formData: any;
  setFormData: (d: any) => void;
  checking: boolean;
  subdomainAvailable: boolean | null;
  checkSubdomain: (val: string) => void;
  onNext: () => void;
}) {
  const togglePassword = () =>
    setFormData({ ...formData, showPass: !formData.showPass });

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.title}>Create your account</h1>
      <p className={styles.subtitle}>Start building your one-page site</p>

      {/* Subdomain */}
      <div className={styles.inputGroup}>
        <User className={styles.icon} size={18} />
        <input
          className={styles.input}
          placeholder="Choose your subdomain"
          value={formData.subdomain}
          onChange={(e) => {
            setFormData({ ...formData, subdomain: e.target.value });
            checkSubdomain(e.target.value);
          }}
        />
      </div>

      {formData.subdomain && (
        <div className={styles.previewBox}>
          <span
            className={`${styles.previewUrl} ${
              subdomainAvailable ? 'text-green-600' : 'text-red-500'
            }`}
          >
            🔗 https://pagebanao.com/{formData.subdomain}
          </span>
          <span className={styles.previewNote}>
            {checking
              ? 'Checking availability...'
              : subdomainAvailable
              ? 'Subdomain is available ✅'
              : 'Subdomain is taken ❌'}
          </span>
        </div>
      )}

      {/* Email */}
      <div className={styles.inputGroup}>
        <Mail className={styles.icon} size={18} />
        <input
          className={styles.input}
          placeholder="Email address (optional)"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      {/* Mobile */}
      <div className={styles.inputGroup}>
        <Phone className={styles.icon} size={18} />
        <input
          className={styles.input}
          placeholder="Mobile number (optional)"
          type="tel"
          maxLength={10}
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        />
      </div>

      {/* Password */}
      <div className={styles.inputGroup}>
        {formData.showPass ? (
          <EyeOff className={styles.icon} onClick={togglePassword} size={18} />
        ) : (
          <Eye className={styles.icon} onClick={togglePassword} size={18} />
        )}
        <input
          className={styles.input}
          type={formData.showPass ? 'text' : 'password'}
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>

      <button
        className="btn-primary btnFull mt-2"
        onClick={onNext}
        disabled={subdomainAvailable === false}
      >
        Continue
      </button>

      <p className={styles.bottomText}>
        Already signed up? <a href="/login" className="text-brand font-medium">Login</a>
      </p>
    </div>
  );
}
