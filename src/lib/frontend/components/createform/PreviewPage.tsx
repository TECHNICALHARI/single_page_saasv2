'use client'
import styles from '@/styles/preview.module.css'

type Link = { label: string; href: string }
type FormData = {
  fullName: string
  username: string
  title: string
  bio: string
  links: Link[]
  avatarUrl: string
  galleryUrls: string[]
  youtube: string
  instagram: string
  calendly: string
  metaTitle: string
  metaDescription: string
}

export default function PreviewPage({ data }: { data: FormData }) {
  return (
    <main className={`min-h-screen p-8 ${styles.preview}`}>
      {/* SEO Preview */}
      <section className="text-center mb-6 text-sm text-muted-text">
        <p><strong>Title:</strong> {data.metaTitle || '—'}</p>
        <p><strong>Description:</strong> {data.metaDescription || '—'}</p>
      </section>

      {/* Profile */}
      <section className="text-center">
        {data.avatarUrl && <img src={data.avatarUrl} alt="avatar" className={`${styles.avatar} mx-auto mb-4`} />}
        <h1 className="text-3xl font-bold">{data.fullName || 'Full Name'}</h1>
        <p className="text-muted-text mt-1">@{data.username || 'username'} • {data.title || 'Title'}</p>
        <p className="max-w-xl mx-auto mt-4 text-muted-text">{data.bio || 'Short bio goes here...'}</p>
        <div className={`flex justify-center flex-wrap gap-3 mt-6 ${styles.linkWrap}`}>
          {data.links.map((l, i) => (
            <a key={i} href={l.href} className={styles.btnPrimary} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </div>
      </section>

      {/* Gallery */}
      {data.galleryUrls.length > 0 && (
        <section className="py-12 text-center">
          <h2 className={styles.sectionTitle}>Gallery</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 px-4">
            {data.galleryUrls.map((src, i) => (
              <img key={i} src={src} alt={`Gallery ${i+1}`} className={styles.galleryImage} />
            ))}
          </div>
        </section>
      )}

      {/* Media Embeds */}
      {(data.youtube || data.instagram || data.calendly) && (
        <section className="py-12 bg-muted px-4">
          <h2 className={styles.sectionTitle + ' text-center'}>Featured Content</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {data.youtube && (
              <div className={styles.embedWrapper}>
                <iframe src={data.youtube} allowFullScreen loading="lazy" />
              </div>
            )}
            {data.instagram && (
              <div className={styles.embedWrapper}>
                <iframe src={data.instagram} allowFullScreen loading="lazy" />
              </div>
            )}
            {data.calendly && (
              <div className={styles.embedWrapper}>
                <iframe src={data.calendly} allowFullScreen loading="lazy" />
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  )
}
