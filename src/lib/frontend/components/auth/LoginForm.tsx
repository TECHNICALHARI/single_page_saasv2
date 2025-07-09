'use client';

import styles from '@/styles/create.module.css';
import { Mail, Phone, Eye, EyeOff, Lock } from 'lucide-react';

export default function LoginForm({
  formData,
  setFormData,
  onSubmit,
  onSendOtp,
  loading,
  otpSent,
}: {
  formData: any;
  setFormData: (d: any) => void;
  onSubmit: () => void;
  onSendOtp: () => void;
  loading: boolean;
  otpSent: boolean;
}) {
  const togglePassword = () =>
    setFormData({ ...formData, showPass: !formData.showPass });

  const { loginWith, useOtp } = formData;

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.title}>Welcome Back</h1>
      <p className={styles.subtitle}>Login to your OnePage profile</p>

      {/* Toggle between Email or Mobile */}
      <div className="text-sm text-center mb-4">
        {loginWith === 'email' ? (
          <>
            Prefer mobile?{' '}
            <button
              onClick={() => setFormData({ ...formData, loginWith: 'mobile' })}
              className="text-brand font-medium"
            >
              Use mobile
            </button>
          </>
        ) : (
          <>
            Prefer email?{' '}
            <button
              onClick={() => setFormData({ ...formData, loginWith: 'email' })}
              className="text-brand font-medium"
            >
              Use email
            </button>
          </>
        )}
      </div>

      {/* Email or Mobile */}
      <div className={styles.inputGroup}>
        {loginWith === 'email' ? (
          <Mail className={styles.icon} size={18} />
        ) : (
          <Phone className={styles.icon} size={18} />
        )}
        <input
          className={styles.input}
          placeholder={loginWith === 'email' ? 'Email address' : 'Mobile number'}
          value={formData[loginWith]}
          onChange={(e) =>
            setFormData({ ...formData, [loginWith]: e.target.value })
          }
        />
      </div>

      {/* Password or OTP */}
      {useOtp ? (
        <input
          className={styles.input}
          placeholder="Enter OTP"
          value={formData.otp}
          onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
        />
      ) : (
        <div className={styles.inputGroup}>
          {formData.showPass ? (
            <EyeOff className={styles.icon} size={18} onClick={togglePassword} />
          ) : (
            <Eye className={styles.icon} size={18} onClick={togglePassword} />
          )}
          <input
            className={styles.input}
            placeholder="Password"
            type={formData.showPass ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
      )}

      <button
        className="btn-primary btnFull mt-2"
        onClick={onSubmit}
        disabled={loading}
      >
        {useOtp ? 'Verify OTP & Login' : 'Login'}
      </button>

      {!useOtp && (
        <p className="text-center text-sm mt-4">
          OR{' '}
          <button
            className="text-brand font-medium cursor-pointer"
            onClick={onSendOtp}
            disabled={otpSent}
          >
            Send OTP instead
          </button>
        </p>
      )}

      <p className={styles.bottomText}>
        Don't have an account?{' '}
        <a href="/signup" className="text-brand font-medium">
          Sign up
        </a>
      </p>
    </div>
  );
}
