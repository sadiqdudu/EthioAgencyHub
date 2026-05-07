'use client';

import { BadgeCheck, Users, Lock, Settings, BarChart3, Zap } from 'lucide-react';
import Link from 'next/link';

export function AdministrationModule() {
  const stats = [
    { label: 'Total Users', value: '187', icon: Users, color: 'bg-red-100 text-red-600' },
    { label: 'Roles', value: '6', icon: BadgeCheck, color: 'bg-pink-100 text-pink-600' },
    { label: 'Active Sessions', value: '42', icon: Zap, color: 'bg-rose-100 text-rose-600' },
    { label: 'Last Audit', value: '2h ago', icon: BarChart3, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Administration</h1>
        <p className="mt-2 text-slate-500">Manage users, roles, permissions, and system settings</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-2xl ${stat.color} p-6`}>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm opacity-90">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Link href="/administration/users" className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-red-200 hover:bg-red-50/50 transition-all">
          <Users className="h-5 w-5 text-red-600 mb-3" />
          <p className="font-semibold text-ink">Users</p>
          <p className="text-xs text-slate-500 mt-1">Manage users</p>
        </Link>
        <Link href="/administration/roles-permissions" className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-red-200 hover:bg-red-50/50 transition-all">
          <Lock className="h-5 w-5 text-red-600 mb-3" />
          <p className="font-semibold text-ink">Roles</p>
          <p className="text-xs text-slate-500 mt-1">Permissions</p>
        </Link>
        <Link href="/administration/settings" className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-red-200 hover:bg-red-50/50 transition-all">
          <Settings className="h-5 w-5 text-red-600 mb-3" />
          <p className="font-semibold text-ink">Settings</p>
          <p className="text-xs text-slate-500 mt-1">System config</p>
        </Link>
        <Link href="/administration/logs" className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-red-200 hover:bg-red-50/50 transition-all">
          <BarChart3 className="h-5 w-5 text-red-600 mb-3" />
          <p className="font-semibold text-ink">Logs</p>
          <p className="text-xs text-slate-500 mt-1">System logs</p>
        </Link>
        <Link href="/administration/audit" className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-red-200 hover:bg-red-50/50 transition-all">
          <Zap className="h-5 w-5 text-red-600 mb-3" />
          <p className="font-semibold text-ink">Audit</p>
          <p className="text-xs text-slate-500 mt-1">Audit trail</p>
        </Link>
        <Link href="/administration/users" className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-red-200 hover:bg-red-50/50 transition-all">
          <BadgeCheck className="h-5 w-5 text-red-600 mb-3" />
          <p className="font-semibold text-ink">Billing</p>
          <p className="text-xs text-slate-500 mt-1">Subscriptions</p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-bold text-ink mb-4">Recent Admin Activities</h3>
        <div className="space-y-3">
          {[
            '14:32 - New user role created: Regional Manager',
            '12:45 - System backup completed successfully',
            '10:22 - Admin password policy updated',
          ].map((activity, idx) => (
            <div key={idx} className="text-sm text-slate-600 p-3 border border-slate-200 rounded-lg">
              {activity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
