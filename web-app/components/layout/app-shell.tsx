'use client';

import { ReactNode } from 'react';
import { Bell } from 'lucide-react';
import { UserMenu } from '@/components/layout/user-menu';
import { Sidebar } from '@/components/layout/sidebar';
import { LanguageSelector } from '@/components/layout/language-selector';
import { useSidebar } from '@/components/layout/sidebar-provider';
import { useLanguage } from '@/components/layout/language-provider';
import type { SessionPayload } from '@/lib/auth/jwt';

export function AppShell({ children, session }: { children: ReactNode; session: SessionPayload | null }) {
  const { isOpen } = useSidebar();
  const { language, dict, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar dict={dict} />

      <div className="transition-all duration-300 lg:ml-0 lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 px-5 py-4 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Multi-tenant command center</p>
              <h1 className="text-xl font-bold text-ink">Foreign Employment Operations</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-2xl border border-slate-200 p-3 text-slate-600 hover:bg-slate-50" type="button" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </button>
              <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
              <UserMenu role={session?.role ?? 'Guest'} email={session ? session.userId : undefined} />
            </div>
          </div>
        </header>
        <main className="px-5 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
