import Link from 'next/link';
import { ArrowRight, CheckCircle2, Cloud, FileVideo, UploadCloud } from 'lucide-react';
import { activities, employees, kpis, modules, storageRoutes } from '@/lib/mock-data';

export function DashboardHome() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-emerald-500 p-8 text-white shadow-soft">
        <div className="max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-100">Modernizing Ethiopian recruitment agencies</p>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Manage registration, documents, travel, pilgrimages, and partners in one secure hub.</h2>
          <p className="mt-4 max-w-2xl text-emerald-50">Built around the README roadmap with a hybrid Telegram + Teledrive storage model for low operating costs and global interview streaming.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/employee-management" className="rounded-2xl bg-white px-5 py-3 font-semibold text-brand-700 hover:bg-emerald-50">Register employee</Link>
            <Link href="/documents/upload" className="rounded-2xl border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white/10">Upload documents</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <article key={item.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-2xl bg-brand-50 p-3 text-brand-700"><item.icon className="h-5 w-5" /></div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-brand-700">{item.change}</span>
            </div>
            <p className="text-3xl font-bold text-ink">{item.value}</p>
            <p className="mt-1 text-sm text-slate-500">{item.label}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-ink">Core modules</h3>
              <p className="text-sm text-slate-500">Route map implemented from the README.</p>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {modules.map((item) => (
              <Link key={item.href} href={item.href} className="group rounded-2xl border border-slate-200 p-4 hover:border-brand-200 hover:bg-brand-50/50">
                <div className="mb-3 flex items-center justify-between">
                  <item.icon className="h-5 w-5 text-brand-600" />
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 group-hover:text-brand-600" />
                </div>
                <p className="font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-ink">Hybrid storage routing</h3>
            <div className="mt-4 space-y-3">
              {storageRoutes.map((route) => (
                <div key={route.type} className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-brand-700">
                    {route.type.includes('Videos') ? <FileVideo className="h-5 w-5" /> : <UploadCloud className="h-5 w-5" />}
                    <p className="font-semibold">{route.type}</p>
                  </div>
                  <p className="text-sm text-slate-600">{route.destination}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{route.cost} · {route.purpose}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-ink">Activity feed</h3>
            <div className="mt-4 space-y-3">
              {activities.map((activity) => (
                <div key={activity} className="flex gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {activity}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <Cloud className="h-5 w-5 text-brand-600" />
          <h3 className="text-lg font-bold text-ink">Employee pipeline snapshot</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-slate-500">
              <tr><th className="py-3">ID</th><th>Name</th><th>Role</th><th>Destination</th><th>Status</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map((employee) => (
                <tr key={employee.id} className="text-slate-700">
                  <td className="py-4 font-semibold text-ink">{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.destination}</td>
                  <td><span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{employee.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
