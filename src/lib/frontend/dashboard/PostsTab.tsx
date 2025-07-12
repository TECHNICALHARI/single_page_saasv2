'use client';

import { useState } from 'react';
import styles from '@/styles/dashboard.module.css';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(
  () => import('@/lib/frontend/components/createform/RichTextEditor'),
  { ssr: false }
);

export default function PostsTab() {
  const [posts, setPosts] = useState<any[]>([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postImage, setPostImage] = useState<File | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handlePublishPost = () => {
    if (!postTitle || !postBody) return;

    const newPost = {
      title: postTitle,
      body: postBody,
      image: postImage,
    };

    if (editingIndex !== null) {
      const updatedPosts = [...posts];
      updatedPosts[editingIndex] = newPost;
      setPosts(updatedPosts);
      setEditingIndex(null);
    } else {
      setPosts([...posts, newPost]);
    }

    // Reset form
    setPostTitle('');
    setPostBody('');
    setPostImage(null);
  };

  const handleEdit = (index: number) => {
    const post = posts[index];
    setPostTitle(post.title);
    setPostBody(post.body);
    setPostImage(post.image || null);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts((prev) => prev.filter((_, i) => i !== index));
      if (editingIndex === index) {
        setPostTitle('');
        setPostBody('');
        setPostImage(null);
        setEditingIndex(null);
      }
    }
  };

  return (
    <>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-brand">
          {editingIndex !== null ? 'Edit Post' : 'Write a Post'}
        </h3>
        <p className="text-sm text-muted mt-1">
          Share stories, updates, or ideas with your audience.
        </p>
      </div>

      {/* 📝 Post Form */}
      <div className={styles.postCard}>
        <input
          type="text"
          placeholder="Post Title"
          className={styles.input}
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />

        <RichTextEditor
          value={postBody}
          onChange={setPostBody}
          placeholder="Write your post here..."
        />

        <label className={styles.fileUpload}>
          <span className="text-sm font-medium text-muted mb-1">Thumbnail Image</span>
          <input
            type="file"
            className={styles.hiddenFile}
            onChange={(e) => setPostImage(e.target.files?.[0] || null)}
            accept="image/*"
          />
          <div className={styles.filePreview}>
            {postImage ? (postImage.name || 'Image attached') : 'No file selected'}
          </div>
        </label>

        <div className="flex justify-between items-center">
          {editingIndex !== null && (
            <button
              className="text-sm text-red-500"
              onClick={() => {
                setEditingIndex(null);
                setPostTitle('');
                setPostBody('');
                setPostImage(null);
              }}
            >
              Cancel Editing
            </button>
          )}
          <button
            className={styles.btnPrimary}
            onClick={handlePublishPost}
            disabled={!postTitle || !postBody}
          >
            {editingIndex !== null ? 'Update Post' : 'Publish Post'}
          </button>
        </div>
      </div>

      {/* 📜 Post List */}
      <div className="grid gap-5 mt-8">
        {posts.map((post, idx) => (
          <div key={idx} className={styles.postItem}>
            {post.image && (
              <img
                src={
                  typeof post.image === 'string'
                    ? post.image
                    : URL.createObjectURL(post.image)
                }
                alt="Thumbnail"
                className={styles.postThumbnail}
              />
            )}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-lg font-semibold">{post.title}</h4>
                <div className="flex gap-3">
                  <button
                    className="text-sm text-brand font-medium"
                    onClick={() => handleEdit(idx)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-sm text-red-500 font-medium"
                    onClick={() => handleDelete(idx)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div
                className="text-sm text-muted prose prose-sm max-w-none mb-2"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
              <div className="text-xs text-gray-400 flex justify-between">
                <span>Published Today</span>
                <span>100K views</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
