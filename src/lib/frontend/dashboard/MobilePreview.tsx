'use client';

import styles from '@/styles/dashboard.module.css';
import { ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MobilePreview({ form }: { form: any }) {
  const {
    fullName,
    bio,
    avatar,
    links = [],
    headers = [],
    posts = [],
    username = 'yourname',
    brandingOff,
    nsfwWarning,
    preferredLink,
    theme = 'link',
  } = form;

  const [showWarning, setShowWarning] = useState(nsfwWarning);

  useEffect(() => {
    setShowWarning(nsfwWarning);
  }, [nsfwWarning]);

  const resolvedLink =
    preferredLink === 'subdomain' ? `${username}.bio.link` : `bio.link/${username}`;

  return (
    <div className="w-[360px] rounded-3xl border-2 border-muted bg-white shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-brand text-white text-center py-4 px-6">
        <div className="text-sm mb-1 font-mono opacity-80">{resolvedLink}</div>
        <h2 className="text-xl font-bold">{fullName || 'Your Name'}</h2>
      </div>

      {/* NSFW warning (if enabled) */}
      {showWarning && (
        <div className="p-4 bg-red-100 text-red-700 text-sm text-center">
          ⚠️ This page contains sensitive content.{' '}
          <button
            onClick={() => setShowWarning(false)}
            className="text-red-500 underline ml-1"
          >
            View Anyway
          </button>
        </div>
      )}

      {!showWarning && (
        <>
          {/* Avatar */}
          {avatar && (
            <div className="flex justify-center mt-4">
              <img
                src={avatar}
                alt="avatar"
                className="w-24 h-24 rounded-full border object-cover shadow-sm"
              />
            </div>
          )}

          {/* Bio */}
          <div className="text-center px-6 mt-3">
            <p className="text-sm text-muted">{bio || 'This is your short bio.'}</p>
          </div>

          {/* Links Section */}
          {(headers.length > 0 || links.length > 0) && (
            <div className="mt-6 px-4">
              {headers.map((header: any, i: number) => (
                <div key={header.id} className="text-sm font-bold text-brand mt-4 mb-2">
                  {header.title}
                </div>
              ))}

              <div className="grid gap-3">
                {links.map((link: any, i: number) => (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-muted px-4 py-2 rounded-xl text-sm hover:bg-brand hover:text-white transition-all group"
                  >
                    <span>{link.label}</span>
                    <ExternalLink size={16} className="text-muted group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Posts Section */}
          {posts.length > 0 && (
            <div className="mt-8 px-4">
              <h4 className="text-sm font-bold text-brand mb-2">Posts</h4>
              <div className="grid gap-3">
                {posts.map((post: any, i: number) => (
                  <div key={i} className="bg-muted p-3 rounded-xl">
                    {post.image && (
                      <img
                        src={
                          typeof post.image === 'string'
                            ? post.image
                            : URL.createObjectURL(post.image)
                        }
                        alt="Post"
                        className="w-full h-40 object-cover rounded-md mb-2"
                      />
                    )}
                    <h5 className="font-semibold text-sm">{post.title}</h5>
                    <div
                      className="text-xs text-muted prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: post.body }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Branding */}
          {!brandingOff && (
            <div className="mt-10 mb-4 text-xs text-center text-muted px-4">
              Powered by <a className="underline text-brand" href="/">OnePage</a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
