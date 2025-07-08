'use client';

import { useState } from 'react';
import styles from '@/styles/create.module.css';
import Modal from '@/lib/frontend/components/createform/Modal';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/lib/frontend/components/createform/RichTextEditor'), {
  ssr: false,
});

export default function CreatePage() {
  const [activeTab, setActiveTab] = useState<'basic' | 'links' | 'media' | 'seo' | 'preview'>('basic');

  const [form, setForm] = useState({
    fullName: '',
    username: '',
    title: '',
    bio: '',
    links: [],
    avatar: '',
    gallery: [],
    youtube: '',
    instagram: '',
    calendly: '',
    metaTitle: '',
    metaDescription: '',
  });

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [tempLink, setTempLink] = useState({ label: '', href: '' });

  const addLink = () => {
    setForm((prev) => ({
      ...prev,
      links: [...prev.links, { ...tempLink }],
    }));
    setTempLink({ label: '', href: '' });
    setShowLinkModal(false);
  };

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Create Your Page</h1>

      {/* Tabs */}
      <div className="flex justify-center mb-6 gap-3 flex-wrap">
        {['basic', 'links', 'media', 'seo', 'preview'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === tab
                ? 'bg-[var(--color-brand)] text-white'
                : 'bg-muted text-[var(--color-text-muted)]'
              }`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Basic Info */}
      {activeTab === 'basic' && (
        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => handleChange('username', e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={styles.input}
          />
       
          <RichTextEditor
            value={form.bio}
            onChange={(val) => handleChange('bio', val)}
            placeholder="Short Bio"
          />
        </div>
      )}

      {/* Links */}
      {activeTab === 'links' && (
        <div>
          <div className="mb-4">
            <button
              onClick={() => setShowLinkModal(true)}
              className="bg-[var(--color-brand)] text-white px-4 py-2 rounded-md text-sm"
            >
              + Add Link
            </button>
          </div>

          {form.links.length === 0 && (
            <p className="text-sm text-muted-text">No links added yet.</p>
          )}
          <ul className="space-y-2">
            {form.links.map((link, i) => (
              <li key={i} className="border p-2 rounded text-sm">
                <strong>{link.label}</strong>: {link.href}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Media */}
      {activeTab === 'media' && (
        <div className="grid gap-4">
          <input
            placeholder="Avatar Image URL"
            value={form.avatar}
            onChange={(e) => handleChange('avatar', e.target.value)}
            className={styles.input}
          />
          <input
            placeholder="YouTube Embed Link"
            value={form.youtube}
            onChange={(e) => handleChange('youtube', e.target.value)}
            className={styles.input}
          />
          <input
            placeholder="Instagram Embed Link"
            value={form.instagram}
            onChange={(e) => handleChange('instagram', e.target.value)}
            className={styles.input}
          />
          <input
            placeholder="Calendly Link"
            value={form.calendly}
            onChange={(e) => handleChange('calendly', e.target.value)}
            className={styles.input}
          />
        </div>
      )}

      {/* SEO */}
      {activeTab === 'seo' && (
        <div className="grid gap-4">
          <input
            placeholder="Meta Title"
            value={form.metaTitle}
            onChange={(e) => handleChange('metaTitle', e.target.value)}
            className={styles.input}
          />
          <textarea
            placeholder="Meta Description"
            value={form.metaDescription}
            onChange={(e) => handleChange('metaDescription', e.target.value)}
            className={styles.input}
          />
        </div>
      )}

      {/* Preview */}
      {activeTab === 'preview' && (
        <div className="bg-muted p-4 rounded-md text-sm text-muted-text">
          <pre className="whitespace-pre-wrap break-all">{JSON.stringify(form, null, 2)}</pre>
        </div>
      )}

      {/* Link Modal */}
      {showLinkModal && (
        <Modal onClose={() => setShowLinkModal(false)}>
          <div className="p-4 grid gap-4">
            <h2 className="text-lg font-semibold mb-4">Add Link</h2>
            <input
              placeholder="Link Label"
              value={tempLink.label}
              onChange={(e) => setTempLink({ ...tempLink, label: e.target.value })}
              className={styles.input}
            />
            <input
              placeholder="Link URL"
              value={tempLink.href}
              onChange={(e) => setTempLink({ ...tempLink, href: e.target.value })}
              className={styles.input}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowLinkModal(false)} className="text-sm text-muted-text">
                Cancel
              </button>
              <button onClick={addLink} className="bg-[var(--color-brand)] text-white px-4 py-2 rounded-md text-sm">
                Add Link
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}
