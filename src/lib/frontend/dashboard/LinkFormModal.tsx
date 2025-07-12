'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/dashboard.module.css';

interface LinkFormModalProps {
  onSave: (data: any) => void;
  onClose: () => void;
  initialData?: {
    title: string;
    url: string;
    highlighted: boolean;
    image?: File;
    id?: string;
  };
}

export default function LinkFormModal({ onSave, onClose, initialData }: LinkFormModalProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [highlighted, setHighlighted] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setUrl(initialData.url || '');
      setHighlighted(initialData.highlighted || false);
      setImage(initialData.image || null);
    }
  }, [initialData]);

  const handleSave = () => {
    if (!title.trim() || !url.trim()) return;

    onSave({
      title: title.trim(),
      url: url.trim(),
      highlighted,
      image,
      id: initialData?.id || Date.now().toString(),
    });

    // Reset only if it's a new entry
    if (!initialData) {
      setTitle('');
      setUrl('');
      setHighlighted(false);
      setImage(null);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className="text-xl font-bold text-brand mb-4">
          {initialData ? 'Edit Link' : 'Add Link'}
        </h2>

        <input
          className={styles.input}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className={styles.input}
          type="url"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={highlighted}
            onChange={() => setHighlighted(!highlighted)}
          />
          <span>Highlight this link</span>
        </label>

        <label className={styles.fileUpload}>
          <span className="text-sm font-medium text-muted">Upload Thumbnail</span>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className={styles.hiddenFile}
            accept="image/*"
          />
          <div className={styles.filePreview}>
            {image ? image.name : 'No file chosen'}
          </div>
        </label>

        <div className="flex justify-end mt-6 gap-4">
          <button className="btnFull max-w-[120px]" onClick={handleSave}>
            Save
          </button>
          <button className="text-muted text-sm font-medium" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
