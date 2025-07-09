'use client';

import LoginForm from '@/lib/frontend/components/auth/LoginForm';
import { useState } from 'react';
import styles from '@/styles/create.module.css';
export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    password: '',
    otp: '',
    useOtp: false,
    loginWith: 'email', // or 'mobile'
  });

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = async () => {
    const { email, mobile, password, otp, useOtp, loginWith } = formData;
    const identifier = loginWith === 'email' ? email : mobile;

    if (!identifier) return alert(`Please enter your ${loginWith}`);

    if (!useOtp && !password) return alert('Please enter password');
    if (useOtp && !otp) return alert('Please enter OTP');

    setLoading(true);

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        [loginWith]: identifier,
        ...(useOtp ? { otp } : { password }),
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await res.json();
    if (result.success) {
      alert('Login successful!');
      // window.location.href = '/dashboard';
    } else {
      alert(result.message || 'Login failed');
    }

    setLoading(false);
  };

  const handleSendOtp = async () => {
     setFormData({ ...formData, useOtp: true });
    // const { email, mobile, loginWith } = formData;
    // const identifier = loginWith === 'email' ? email : mobile;

    // if (!identifier) return alert(`Enter your ${loginWith} to receive OTP`);

    // const res = await fetch('/api/send-login-otp', {
    //   method: 'POST',
    //   body: JSON.stringify({ [loginWith]: identifier }),
    //   headers: { 'Content-Type': 'application/json' },
    // });

    // if (res.ok) {
    //   alert('OTP sent!');
    //   setFormData({ ...formData, useOtp: true });
    //   setOtpSent(true);
    // } else {
    //   alert('Failed to send OTP');
    // }
  };

  return (
    <main className={styles.authPage}>
      <LoginForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleLogin}
        onSendOtp={handleSendOtp}
        loading={loading}
        otpSent={otpSent}
      />
    </main>
  );
}
