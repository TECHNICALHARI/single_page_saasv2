'use client';

import styles from '@/styles/dashboard.module.css';

export default function SettingsTab({
  form,
  setForm,
}: {
  form: any;
  setForm: (f: any) => void;
}) {
  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid gap-6">
      <h3 className="text-xl font-bold text-brand">Settings</h3>

      {/* Preferred Link */}
      <div className={styles.postCard}>
        <h4 className="text-base font-semibold mb-3">Preferred Link</h4>
        <p className="text-muted text-sm mb-4">
          This is an aesthetic choice. Both links are usable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex items-center gap-2 p-2 rounded-md border cursor-pointer hover:border-brand transition-all">
            <input
              type="radio"
              name="preferredLink"
              value="primary"
              checked={form.preferredLink === 'primary'}
              onChange={() => handleChange('preferredLink', 'primary')}
              className="accent-brand"
            />
            <span>bio.link/{form.username || 'yourname'}</span>
          </label>
          <label className="flex items-center gap-2 p-2 rounded-md border cursor-pointer hover:border-brand transition-all">
            <input
              type="radio"
              name="preferredLink"
              value="subdomain"
              checked={form.preferredLink === 'subdomain'}
              onChange={() => handleChange('preferredLink', 'subdomain')}
              className="accent-brand"
            />
            <span>{form.username || 'yourname'}.bio.link</span>
          </label>
        </div>
      </div>

      {/* NSFW Warning */}
      <div className={styles.postCard}>
        <h4 className="text-base font-semibold mb-3">NSFW Warning</h4>
        <label className="flex items-center gap-3 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={form.nsfwWarning}
            onChange={(e) => handleChange('nsfwWarning', e.target.checked)}
            className="accent-brand w-4 h-4"
          />
          <span className="text-muted">Show a warning before displaying your page.</span>
        </label>
      </div>

      {/* SEO Settings */}
      <div className={styles.postCard}>
        <h4 className="text-base font-semibold mb-2">SEO</h4>
        <p className="text-muted text-sm mb-4">
          Choose the title and description to appear on search engines and social posts.
        </p>
        <input
          className={styles.input}
          placeholder="SEO Title"
          value={form.metaTitle}
          onChange={(e) => handleChange('metaTitle', e.target.value)}
        />
        <textarea
          className={`${styles.input} mt-3`}
          placeholder="SEO description will show here"
          rows={3}
          value={form.metaDescription}
          onChange={(e) => handleChange('metaDescription', e.target.value)}
        />
      </div>

      {/* Google Analytics */}
      <div className={styles.postCard}>
        <h4 className="text-base font-semibold mb-2">Google Analytics</h4>
        <input
          className={styles.input}
          placeholder="G-728288282222"
          value={form.gaId}
          onChange={(e) => handleChange('gaId', e.target.value)}
        />
      </div>

      {/* Username */}
      <div className={styles.postCard}>
        <h4 className="text-base font-semibold mb-2">My Username</h4>
        <div className="flex items-center gap-2">
          <span className="text-muted">bio.link/</span>
          <input
            className={`${styles.input} w-full`}
            value={form.username}
            onChange={(e) => handleChange('username', e.target.value)}
          />
        </div>
      </div>

      {/* Pro Links - Custom Domain */}
      <div className={`${styles.postCard} border border-dashed border-brand p-4`}>
        <h4 className="text-base font-semibold mb-3 text-brand">Pro Links: Custom Domain</h4>
        <p className="text-muted text-sm mb-2">
          Try your own custom domain eg: jaseem.com
        </p>
        <input
          className={styles.input}
          placeholder="yourdomain.com"
          value={form.customDomain}
          onChange={(e) => handleChange('customDomain', e.target.value)}
        />
        <button className={`${styles.btnPrimary} mt-3`}>Set up domain</button>
      </div>

      {/* Pro Links - Emoji Link */}
      <div className={`${styles.postCard} border border-dashed border-brand p-4`}>
        <h4 className="text-base font-semibold mb-3 text-brand">Pro Links: Emoji Link</h4>
        <p className="text-muted text-sm mb-2">
          Add emojis to your link eg: bio.link/😄😭🥵
        </p>
        <input
          className={styles.input}
          placeholder="😄😭🥵"
          value={form.emojiLink}
          onChange={(e) => handleChange('emojiLink', e.target.value)}
        />
        <button className={`${styles.btnPrimary} mt-3`}>Create</button>
      </div>

      {/* Help Center */}
      <div className="text-sm text-center text-muted mt-6">
        Go to{' '}
        <a href="/help" className="text-brand underline">
          Help Center
        </a>{' '}
        to learn more or contact support.
      </div>
    </div>
  );
}
