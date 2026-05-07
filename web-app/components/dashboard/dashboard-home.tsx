'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Cloud, FileVideo, UploadCloud, TrendingUp, Users, FileText, Briefcase } from 'lucide-react';
import { activities, employees, kpis, modules, storageRoutes } from '@/lib/mock-data';
import { useLanguage } from '@/components/layout/language-provider';

export function DashboardHome() {
  const { dict } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-emerald-500 p-8 text-white shadow-soft">
        <div className="max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-100">Modernizing Ethiopian recruitment agencies</p>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Manage registration, documents, travel, pilgrimages, and partners in one secure hub.</h2>
          <p className="mt-4 max-w-2xl text-emerald-50">Built around the README roadmap with a hybrid Telegram + Teledrive storage model for low operating costs and global interview streaming.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/employee-management" className="rounded-2xl bg-white px-5 py-3 font-semibold text-brand-700 hover:bg-emerald-50 transition-colors">
              {dict.common.employees}
            </Link>
            <Link href="/documents/upload" className="rounded-2xl border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white/10 transition-colors">
              {dict.common.documents}
            </Link>
            <Link href="/travel/schedule" className="rounded-2xl border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white/10 transition-colors">
              Travel
            </Link>
          </div>
        </div>
      </section>

      {/* KPI Section */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-ink">Key Performance Indicators</h3>
          <p className="mt-1 text-sm text-slate-500">Real-time operational metrics across all agencies</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => (
            <article key={item.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex items-center justify-between">
                <div className={`rounded-2xl ${item.color} p-3 text-white`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-brand-700">{item.change}</span>
              </div>
              <p className="text-3xl font-bold text-ink">{item.value}</p>
              <p className="mt-1 text-sm text-slate-500">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Core Modules */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-ink">Core modules</h3>
              <p className="mt-1 text-sm text-slate-500">Quick access to all operational areas</p>
            </div>
            <Briefcase className="h-6 w-6 text-brand-600" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {modules.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-slate-200 p-4 hover:border-brand-200 hover:bg-brand-50/50 transition-all"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="rounded-lg bg-slate-100 p-2 text-brand-600 group-hover:bg-brand-100">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 group-hover:text-brand-600 transition-all" />
                </div>
                <p className="font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Hybrid Storage */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Cloud className="h-5 w-5 text-brand-600" />
              <h3 className="text-lg font-bold text-ink">Hybrid storage</h3>
            </div>
            <div className="space-y-3">
              {storageRoutes.map((route) => (
                <div key={route.type} className="rounded-2xl bg-slate-50 p-4 hover:bg-slate-100 transition-colors">
                  <div className="mb-2 flex items-center gap-2 text-brand-700">
                    {route.type.includes('Videos') ? (
                      <FileVideo className="h-4 w-4" />
                    ) : (
                      <UploadCloud className="h-4 w-4" />
                    )}
                    <p className="font-semibold text-sm">{route.type}</p>
                  </div>
                  <p className="text-xs text-slate-600">{route.destination}</p>
                  <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-slate-500">
                    <span className={`inline-block h-2 w-2 rounded-full ${route.cost === 'Free' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                    {route.cost} · {route.purpose}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-brand-600" />
              <h3 className="text-lg font-bold text-ink">Recent activity</h3>
            </div>
            <div className="space-y-3">
              {activities.map((activity, idx) => (
                <div key={idx} className="flex gap-3 rounded-lg p-2 hover:bg-slate-50 text-sm text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Employees Section */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-brand-600" />
            <h3 className="text-lg font-bold text-ink">Recent employees</h3>
          </div>
          <Link href="/employee-management" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-left font-semibold text-slate-600">ID</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Position</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Destination</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-brand-600">{emp.id}</td>
                  <td className="px-4 py-3 text-slate-600">{emp.name}</td>
                  <td className="px-4 py-3 text-slate-600">{emp.role}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{emp.destination}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Stats Row */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-blue-100/50 p-6">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
            <FileText className="h-5 w-5" />
          </div>
          <p className="text-sm text-slate-600">Documents Processed</p>
          <p className="mt-1 text-2xl font-bold text-ink">1,284</p>
          <p className="mt-2 text-xs text-slate-500">+12% from last month</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-green-50 to-green-100/50 p-6">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-white">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <p className="text-sm text-slate-600">Completed Registrations</p>
          <p className="mt-1 text-2xl font-bold text-ink">892</p>
          <p className="mt-2 text-xs text-slate-500">+8% from last month</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-purple-50 to-purple-100/50 p-6">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 text-white">
            <TrendingUp className="h-5 w-5" />
          </div>
          <p className="text-sm text-slate-600">Success Rate</p>
          <p className="mt-1 text-2xl font-bold text-ink">94.2%</p>
          <p className="mt-2 text-xs text-slate-500">2.1% improvement</p>
        </div>
      </section>
    </div>
  );
}
