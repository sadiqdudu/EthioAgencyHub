'use client';

import { BriefcaseBusiness, TrendingUp, Users, Award } from 'lucide-react';
import Link from 'next/link';

export function AgentsModule() {
  const stats = [
    { label: 'Total Agents', value: '24', icon: BriefcaseBusiness, color: 'bg-amber-100 text-amber-600' },
    { label: 'Active', value: '18', icon: Users, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Top Performers', value: '5', icon: Award, color: 'bg-orange-100 text-orange-600' },
    { label: 'Avg Performance', value: '8.2/10', icon: TrendingUp, color: 'bg-red-100 text-red-600' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Agent Management</h1>
        <p className="mt-2 text-slate-500">Manage agent onboarding, performance, and commissions</p>
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
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        <Link href="/agents/agent-detail" className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-amber-200 hover:bg-amber-50/50 transition-all">
          <Users className="h-5 w-5 text-amber-600 mb-3" />
          <p className="font-semibold text-ink">Details</p>
          <p className="text-xs text-slate-500 mt-1">Agent info</p>
        </Link>
        <Link href="/agents/performance" className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-amber-200 hover:bg-amber-50/50 transition-all">
          <TrendingUp className="h-5 w-5 text-amber-600 mb-3" />
          <p className="font-semibold text-ink">Performance</p>
          <p className="text-xs text-slate-500 mt-1">Metrics</p>
        </Link>
        <Link href="/agents/onboarding" className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-amber-200 hover:bg-amber-50/50 transition-all">
          <Users className="h-5 w-5 text-amber-600 mb-3" />
          <p className="font-semibold text-ink">Onboarding</p>
          <p className="text-xs text-slate-500 mt-1">New agents</p>
        </Link>
        <Link href="/agents/training" className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-amber-200 hover:bg-amber-50/50 transition-all">
          <Award className="h-5 w-5 text-amber-600 mb-3" />
          <p className="font-semibold text-ink">Training</p>
          <p className="text-xs text-slate-500 mt-1">Programs</p>
        </Link>
        <Link href="/agents/support" className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-amber-200 hover:bg-amber-50/50 transition-all">
          <Users className="h-5 w-5 text-amber-600 mb-3" />
          <p className="font-semibold text-ink">Support</p>
          <p className="text-xs text-slate-500 mt-1">Help & issues</p>
        </Link>
      </div>

      {/* Agent List */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-bold text-ink mb-4">Active Agents</h3>
        <div className="space-y-3">
          {[
            { name: 'Abebe Tsegaye', region: 'Addis Ababa', recruits: 45, rating: 9.2 },
            { name: 'Alemayehu Hailu', region: 'Dire Dawa', recruits: 32, rating: 8.7 },
            { name: 'Yohannes Tadesse', region: 'Hawassa', recruits: 28, rating: 8.5 },
          ].map((agent, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-200 p-4 hover:bg-slate-50">
              <div>
                <p className="font-semibold text-ink">{agent.name}</p>
                <p className="text-xs text-slate-500">{agent.region} • {agent.recruits} recruits</p>
              </div>
              <div className="text-right">
                <div className="font-semibold text-amber-600">{agent.rating}/10</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
