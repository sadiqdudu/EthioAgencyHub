'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronLeft, ChevronDown, Globe2, LayoutDashboard } from 'lucide-react';
import { modules } from '@/lib/mock-data';
import { siteConfig } from '@/config/site';
import { useSidebar } from '@/components/layout/sidebar-provider';
import type { Dictionary } from '@/lib/i18n/dictionaries';

type Props = {
  dict: Dictionary;
};

export function Sidebar({ dict }: Props) {
  const { isOpen, toggle } = useSidebar();
  const [expandedModules, setExpandedModules] = useState<string[]>(['Dashboard', 'Travel']);

  const toggleModule = (moduleTitle: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleTitle)
        ? prev.filter((m) => m !== moduleTitle)
        : [...prev, moduleTitle]
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/50 lg:hidden"
          onClick={toggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') toggle();
          }}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 flex w-72 flex-col border-r border-slate-200 bg-white transition-all duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white">
              <Globe2 className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold text-ink">{siteConfig.name}</p>
              <p className="text-xs text-slate-500">Agency operations</p>
            </div>
          </Link>
          <button
            onClick={toggle}
            className="rounded-lg p-1 hover:bg-slate-100 lg:hidden"
            type="button"
            aria-label="Close sidebar"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {/* Dashboard Home */}
          <div className="mb-1">
            <div className="flex items-center gap-0">
              <Link
                href="/dashboard"
                className="flex flex-1 items-center gap-3 rounded-xl bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100"
              >
                <LayoutDashboard className="h-5 w-5 shrink-0" />
                <span className="truncate">{dict.common.dashboard}</span>
              </Link>
              <button
                onClick={() => toggleModule('Dashboard')}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                type="button"
                aria-label="Toggle Dashboard submenu"
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    expandedModules.includes('Dashboard') ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
            {expandedModules.includes('Dashboard') && (
              <div className="ml-6 mt-1 space-y-1 border-l border-slate-200 py-1 pl-3">
                <Link
                  href="/dashboard/trends"
                  className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                >
                  <span className="truncate">Trends</span>
                </Link>
                <Link
                  href="/dashboard/tasks"
                  className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                >
                  <span className="truncate">Tasks</span>
                </Link>
                <Link
                  href="/dashboard/activities"
                  className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                >
                  <span className="truncate">Activities</span>
                </Link>
              </div>
            )}
          </div>

          {/* Module Groups */}
          {modules.map((module) => {
            const isExpanded = expandedModules.includes(module.title);

            return (
              <div key={module.title}>
                {/* Main Module Item */}
                <div className="flex items-center gap-0">
                  <Link
                    href={module.href}
                    className="flex flex-1 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-ink"
                  >
                    <module.icon className="h-5 w-5 shrink-0" />
                    <span className="truncate">{module.title}</span>
                  </Link>

                  {/* Expand/Collapse Button */}
                  {module.submenu && module.submenu.length > 0 && (
                    <button
                      onClick={() => toggleModule(module.title)}
                      className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                      type="button"
                      aria-label={`Toggle ${module.title} submenu`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Submenu Items */}
                {isExpanded && module.submenu && module.submenu.length > 0 && (
                  <div className="ml-6 space-y-1 border-l border-slate-200 py-1 pl-3">
                    {module.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <subitem.icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{subitem.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="border-t border-slate-200 px-5 py-3">
          <p className="text-xs text-slate-500">
            🌍 Multi-tenant SaaS for Ethiopian labor agencies
          </p>
        </div>
      </aside>

      {/* Toggle button for mobile */}
      {!isOpen && (
        <button
          onClick={toggle}
          className="fixed bottom-6 left-6 z-20 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg hover:bg-slate-50 lg:hidden"
          type="button"
          aria-label="Open sidebar"
        >
          <ChevronLeft className="h-5 w-5 rotate-180" />
        </button>
      )}
    </>
  );
}
