'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronDown, Globe2, LayoutDashboard, X, Search, PlusCircle, FileText, Plane, Ticket } from 'lucide-react';
import { modules } from '@/lib/mock-data';
import { siteConfig } from '@/config/site';
import { useSidebar } from '@/components/layout/sidebar-provider';
import type { Dictionary } from '@/lib/i18n/dictionaries';

type Props = { dict: Dictionary };

export function Sidebar({ dict }: Props) {
  const { isOpen, toggle } = useSidebar();
  const pathname = usePathname();
  const [expandedModules, setExpandedModules] = useState<string[]>(['Employee Management', 'Documents', 'Travel']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleModule = (title: string) => {
    setExpandedModules(prev => prev.includes(title) ? prev.filter(m => m !== title) : [...prev, title]);
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  const allNavItems = modules.flatMap(m => [
    { title: m.title, href: m.href, icon: m.icon, isMain: true },
    ...(m.submenu?.map(s => ({ title: s.title, href: s.href, icon: s.icon, isMain: false, parent: m.title })) || [])
  ]);

  const filteredNav = searchQuery
    ? allNavItems.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-10 bg-black/50 lg:hidden" onClick={toggle} />}

      <aside className={`fixed inset-y-0 left-0 z-20 flex w-72 flex-col border-r border-slate-200 bg-white transition-all duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <Link href="/dashboard" className="flex items-center gap-3" onClick={() => isOpen && toggle()}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm">
              <Globe2 className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold text-ink">{siteConfig.name}</p>
              <p className="text-xs text-slate-500">Agency operations</p>
            </div>
          </Link>
          <button onClick={toggle} className="rounded-lg p-1.5 hover:bg-slate-100 lg:hidden" type="button" aria-label="Close sidebar">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Quick Search */}
        <div className="px-3 pt-3 pb-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search menu..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs focus:border-brand-500 focus:outline-none" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mx-3 mb-2 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            {filteredNav.length > 0 ? filteredNav.slice(0, 10).map(item => (
              <Link key={item.href} href={item.href} onClick={() => { toggle(); setSearchQuery(''); }}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-brand-50 transition-colors ${isActive(item.href) ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-600'}`}>
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.title}</span>
                {!item.isMain && <span className="text-[10px] text-slate-400 ml-auto truncate">{(item as any).parent}</span>}
              </Link>
            )) : <p className="px-4 py-3 text-sm text-slate-500">No results found</p>}
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {/* Dashboard */}
          <div className="mb-2">
            <Link href="/dashboard"
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${isActive('/dashboard') ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-ink'}`}>
              <LayoutDashboard className="h-5 w-5 shrink-0" />
              <span className="truncate">{dict.common.dashboard}</span>
            </Link>
          </div>

          <div className="border-t border-slate-100 my-2" />

          {/* Module Groups */}
          {modules.map((module) => {
            const isExpanded = expandedModules.includes(module.title);
            const modActive = isActive(module.href);
            return (
              <div key={module.title} className="mb-1 group"
                onMouseEnter={() => { if (module.submenu?.length) toggleModule(module.title); }}
                onMouseLeave={() => { if (module.submenu?.length && expandedModules.includes(module.title)) toggleModule(module.title); }}
              >
                <div className={`flex items-center gap-0 rounded-xl transition-colors ${modActive ? 'bg-brand-50' : ''}`}>
                  <Link href={module.href}
                    className={`flex flex-1 items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${modActive ? 'text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-ink'}`}>
                    <module.icon className="h-5 w-5 shrink-0" />
                    <span className="truncate">{module.title}</span>
                  </Link>
                  {module.submenu && module.submenu.length > 0 && (
                    <button onClick={() => toggleModule(module.title)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600" type="button" aria-label={`Toggle ${module.title}`}>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
                {isExpanded && module.submenu && module.submenu.length > 0 && (
                  <div className="ml-6 space-y-0.5 border-l border-slate-200 py-1 pl-3">
                    {module.submenu.map((sub) => {
                      const subActive = isActive(sub.href);
                      return (
                        <Link key={sub.href} href={sub.href}
                          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${subActive ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}>
                          <sub.icon className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{sub.title}</span>
                          {subActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-500" />}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Quick Actions Footer */}
        <div className="border-t border-slate-200 px-4 py-3">
          <div className="grid grid-cols-3 gap-2">
            <Link href="/employee-management/registration" className="flex flex-col items-center gap-1 rounded-xl bg-brand-50 py-2 text-brand-700 hover:bg-brand-100 transition-colors" title="Register Employee">
              <PlusCircle className="h-4 w-4" />
              <span className="text-[10px] font-semibold">Register</span>
            </Link>
            <Link href="/travel" className="flex flex-col items-center gap-1 rounded-xl bg-blue-50 py-2 text-blue-700 hover:bg-blue-100 transition-colors" title="Travel">
              <Plane className="h-4 w-4" />
              <span className="text-[10px] font-semibold">Travel</span>
            </Link>
            <Link href="/documents" className="flex flex-col items-center gap-1 rounded-xl bg-purple-50 py-2 text-purple-700 hover:bg-purple-100 transition-colors" title="Documents">
              <FileText className="h-4 w-4" />
              <span className="text-[10px] font-semibold">Documents</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile toggle */}
      {!isOpen && (
        <button onClick={toggle} className="fixed bottom-6 left-6 z-20 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg hover:bg-slate-50 lg:hidden" type="button" aria-label="Open sidebar">
          <ChevronLeft className="h-5 w-5 rotate-180" />
        </button>
      )}
    </>
  );
}
