'use client';

import SignupForm from '@/lib/frontend/components/auth/SignupForm';
import VerifySignupOtpForm from '@/lib/frontend/components/auth/VerifySignupOtpForm';
import { useState } from 'react';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    password: '',
    subdomain: '',
    otp: '',
  });

  const [checkingSubdomain, setCheckingSubdomain] = useState(false);
  const [subdomainAvailable, setSubdomainAvailable] = useState<null | boolean>(null);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  // Check subdomain availability
  const checkSubdomain = async (name: string) => {
    if (!name) return setSubdomainAvailable(null);
    setCheckingSubdomain(true);
    try {
      const res = await fetch(`/api/check-subdomain?subdomain=${name}`);
      const data = await res.json();
      setSubdomainAvailable(data.available);
    } catch {
      setSubdomainAvailable(null);
    } finally {
      setCheckingSubdomain(false);
    }
  };

  const handleNext = async () => {
      setStep(2);
    // const { email, mobile, password, subdomain } = formData;
    // if (!email && !mobile) return alert('Please enter email or mobile');
    // if (!password || !subdomain || !subdomainAvailable) return alert('Please complete the form');

    // // Send OTP
    // await fetch('/api/send-otp', {
    //   method: 'POST',
    //   body: JSON.stringify({ email, mobile }),
    //   headers: { 'Content-Type': 'application/json' },
    // });

    // setStep(2);
  };

  const handleOtpVerify = async () => {
    setVerifyingOtp(true);
    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await res.json();
    if (result.success) {
      alert('Account created! Redirecting...');
      // window.location.href = '/dashboard';
    } else {
      alert(result.message || 'Invalid OTP');
    }

    setVerifyingOtp(false);
  };

  return (
    <main className="authPage">
      {step === 1 ? (
        <SignupForm
          formData={formData}
          setFormData={setFormData}
          checking={checkingSubdomain}
          subdomainAvailable={subdomainAvailable}
          checkSubdomain={checkSubdomain}
          onNext={handleNext}
        />
      ) : (
        <VerifySignupOtpForm
          formData={formData}
          setFormData={setFormData}
          verifying={verifyingOtp}
          onVerify={handleOtpVerify}
          onBack={() => setStep(1)}
        />
      )}
    </main>
  );
}
