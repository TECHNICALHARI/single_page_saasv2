'use client';

import { useState } from "react";
import styles from "@/styles/dashboard.module.css";

const filters = ["30 Days", "All Time"];

const topLinks = [
  { title: "what is this?", url: "https://youtu.be/xksCilIrst0?si=sTbzvMiTKB5GNsLM", clicks: 2 },
  { title: "Instagram", url: "http://instagram.com", clicks: 1 },
];

const trafficSources = [
  { label: "Direct", views: 7 },
  { label: "sonaltomar.bio.link", views: 5 },
  { label: "Bio.link", views: 1 },
  { label: "localhost", views: 1 },
];

export default function StatsTab() {
  const [selectedFilter, setSelectedFilter] = useState("30 Days");

  const totalViews = trafficSources.reduce((sum, t) => sum + t.views, 0);
  const totalClicks = topLinks.reduce((sum, l) => sum + l.clicks, 0);
  const ctr = totalViews ? Math.round((totalClicks / totalViews) * 100) : 0;

  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-brand">Stats & Insights</h3>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                selectedFilter === f
                  ? "bg-[var(--color-brand)] text-white"
                  : "bg-muted text-muted hover:bg-[var(--color-brand)]/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={styles.statCard}>
          <h4>Views</h4>
          <p>{totalViews}</p>
        </div>
        <div className={styles.statCard}>
          <h4>Clicks</h4>
          <p>{totalClicks}</p>
        </div>
        <div className={styles.statCard}>
          <h4>CTR</h4>
          <p>{ctr}%</p>
        </div>
      </div>

      {/* Top Links Section */}
      <div className={styles.postCard}>
        <h4 className="text-base font-semibold mb-2">Top Links</h4>
        {topLinks.length > 0 ? (
          <ul className="space-y-3 text-sm">
            {topLinks.map((link, i) => (
              <li key={i} className="border p-3 rounded-md">
                <div className="flex justify-between items-center font-medium">
                  <div>
                    {i + 1}. {link.title}
                    <p className="text-muted text-xs mt-1">{link.url}</p>
                  </div>
                  <div className="text-brand font-semibold text-sm">
                    {link.clicks} {link.clicks > 1 ? "clicks" : "click"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted text-sm">No link click data so far.</p>
        )}
      </div>

      {/* Top Socials */}
      <div className={styles.postCard}>
        <h4 className="text-base font-semibold mb-2">Top Socials</h4>
        <p className="text-muted text-sm">No social clicks data so far.</p>
      </div>

      {/* Page Views by Source */}
      <div className={styles.postCard}>
        <h4 className="text-base font-semibold mb-2">Traffic Sources</h4>
        <ul className="space-y-3 text-sm">
          {trafficSources.map((src, i) => (
            <li key={i} className="flex justify-between border-b pb-2">
              <span>
                {i + 1}. {src.label}
              </span>
              <span className="text-muted">
                {src.views} {src.views > 1 ? "views" : "view"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
