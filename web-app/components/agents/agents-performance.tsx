'use client';

import { TrendingUp, Target, Award } from 'lucide-react';

export function AgentPerformance() {
  const performance = [
    { agent: 'Abebe Tsegaye', recruits: 45, revenue: '185,000 ETB', rating: 9.2, trend: '+8%' },
    { agent: 'Alemayehu Hailu', recruits: 32, revenue: '128,000 ETB', rating: 8.7, trend: '+5%' },
    { agent: 'Yohannes Tadesse', recruits: 28, revenue: '112,000 ETB', rating: 8.5, trend: '+3%' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Agent Performance</h1>
        <p className="mt-2 text-slate-500">Track agent metrics, targets, and performance indicators</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-amber-50 to-amber-100/50">
          <p className="text-sm text-slate-600">Avg Rating</p>
          <p className="mt-2 text-2xl font-bold text-amber-600">8.8/10</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-green-50 to-green-100/50">
          <p className="text-sm text-slate-600">Total Revenue</p>
          <p className="mt-2 text-2xl font-bold text-green-600">425,000 ETB</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-blue-50 to-blue-100/50">
          <p className="text-sm text-slate-600">Avg Growth</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">+5.3%</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-orange-50 to-orange-100/50">
          <p className="text-sm text-slate-600">On Target</p>
          <p className="mt-2 text-2xl font-bold text-orange-600">17/24</p>
        </div>
      </div>

      {/* Performance Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-bold text-ink">Performance Metrics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Agent</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Recruits</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Revenue</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Rating</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {performance.map((perf, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">{perf.agent}</td>
                  <td className="px-6 py-4">{perf.recruits}</td>
                  <td className="px-6 py-4 font-semibold text-green-600">{perf.revenue}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-yellow-500" />
                      {perf.rating}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-green-600 font-semibold">
                      <TrendingUp className="h-4 w-4" /> {perf.trend}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
