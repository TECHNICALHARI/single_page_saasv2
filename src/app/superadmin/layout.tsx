import SuperAdminSidebar from '@/lib/frontend/superadmin/SuperAdminSidebar';
import '@/styles/superadmin.module.css';

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SuperAdminSidebar />
      <main className="flex-1 overflow-y-auto p-6 bg-muted">
        {children}
      </main>
    </div>
  );
}
