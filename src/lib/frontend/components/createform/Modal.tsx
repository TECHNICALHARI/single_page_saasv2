'use client';

export default function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Blur / Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative z-10 bg-white dark:bg-neutral-900 rounded-lg max-w-md w-full shadow-lg p-6">
        {children}
      </div>
    </div>
  );
}
