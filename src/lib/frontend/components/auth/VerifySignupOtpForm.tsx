'use client';

import styles from '@/styles/create.module.css';

export default function VerifySignupOtpForm({
  formData,
  setFormData,
  verifying,
  onVerify,
  onBack,
}: {
  formData: any;
  setFormData: (d: any) => void;
  verifying: boolean;
  onVerify: () => void;
  onBack: () => void;
}) {
  return (
    <div className={styles.authContainer}>
      <h1 className={styles.title}>Verify OTP</h1>
      <p className={styles.subtitle}>
        We've sent an OTP to your {formData.email ? 'email' : 'mobile'}
      </p>

      <input
        className={styles.input}
        placeholder="Enter OTP"
        value={formData.otp}
        onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
      />

      <button
        className="btn-primary btnFull mt-2"
        onClick={onVerify}
        disabled={verifying}
      >
        {verifying ? 'Verifying...' : 'Verify & Create Account'}
      </button>

      <p className={styles.bottomText}>
        Didn’t receive OTP?{' '}
        <button onClick={onBack} className="text-brand font-medium">Edit Info</button>
      </p>
    </div>
  );
}
