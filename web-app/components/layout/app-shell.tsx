import Link from 'next/link';
import { ReactNode } from 'react';
import { Bell, ChevronDown, Globe2, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { modules } from '@/lib/mock-data';
import { siteConfig } from '@/config/site';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-slate-200 bg-white p-5 lg:block">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white">
            <Globe2 className="h-6 w-6" />
          </div>
          <div>
            <p className="font-bold text-ink">{siteConfig.name}</p>
            <p className="text-xs text-slate-500">Agency operations SaaS</p>
          </div>
        </Link>

        <nav className="mt-8 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-2xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700">
            <LayoutDashboard className="h-5 w-5" /> Dashboard
          </Link>
          {modules.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-ink">
              <item.icon className="h-5 w-5" /> {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 px-5 py-4 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Multi-tenant command center</p>
              <h1 className="text-xl font-bold text-ink">Foreign Employment Operations</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-2xl border border-slate-200 p-3 text-slate-600 hover:bg-slate-50" type="button">
                <Bell className="h-5 w-5" />
              </button>
              <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 px-4 py-2 md:flex">
                <ShieldCheck className="h-5 w-5 text-brand-600" />
                <div>
                  <p className="text-sm font-semibold text-ink">Agency Admin</p>
                  <p className="text-xs text-slate-500">RBAC protected</p>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>
        </header>
        <main className="px-5 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
