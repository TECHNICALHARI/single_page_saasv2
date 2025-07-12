'use client';

import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';
import styles from '@/styles/dashboard.module.css';

export default function CustomModal({
  children,
  onClose,
  width = '720px', // ✅ default width
}: {
  children: ReactNode;
  onClose: () => void;
  width?: string;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.customModal} style={{ maxWidth: width }}>
        <button className={styles.modalCloseBtn} onClick={onClose}>
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
