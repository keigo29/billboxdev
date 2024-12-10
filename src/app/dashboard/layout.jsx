'use client';
import NavLinks from '@/components/NavLinks'

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <NavLinks />
      <main>
        {children}
      </main>
    </div>
  );
}
