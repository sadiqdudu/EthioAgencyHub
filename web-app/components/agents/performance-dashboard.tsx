'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, FileText, Plane, Award } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  phone?: string;
  active: boolean;
  _count?: { employees: number };
}

interface AgentStats {
  totalAgents: number;
  activeAgents: number;
  topPerformers: Agent[];
  recentOnboarding: Agent[];
}

export function AgentPerformanceDashboard() {
  const [stats, setStats] = useState<AgentStats>({
    totalAgents: 0,
    activeAgents: 0,
    topPerformers: [],
    recentOnboarding: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/agents')
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          const agents = data.data;
          setStats({
            totalAgents: agents.length,
            activeAgents: agents.filter((a: Agent) => a.active).length,
            topPerformers: agents.slice(0, 3),
            recentOnboarding: agents.slice(-3).reverse()
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Total Agents', value: stats.totalAgents, icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Active Agents', value: stats.activeAgents, icon: TrendingUp, color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Deployed Employees', value: 0, icon: Plane, color: 'bg-amber-100 text-amber-600' },
    { label: 'Documents Processed', value: 0, icon: FileText, color: 'bg-purple-100 text-purple-600' }
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        {statCards.map(card => (
          <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{card.label}</p>
                <p className="mt-1 text-2xl font-bold">{loading ? '...' : card.value}</p>
              </div>
              <div className={`rounded-full p-3 ${card.color}`}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Top Performing Agents</h3>
          <button className="text-sm font-medium text-brand-600 hover:text-brand-700">View All</button>
        </div>
        
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
              <tr>
                <th className="pb-3 font-medium">Rank</th>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Contact</th>
                <th className="pb-3 font-medium">Employees</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.topPerformers.map((agent, i) => (
                <tr key={agent.id}>
                  <td className="py-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      i === 0 ? 'bg-amber-100 text-amber-600' : i === 1 ? 'bg-slate-100 text-slate-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {i === 0 ? <Award className="h-4 w-4" /> : i + 1}
                    </div>
                  </td>
                  <td className="py-3 font-medium">{agent.name}</td>
                  <td className="py-3 text-slate-500">{agent.phone || 'N/A'}</td>
                  <td className="py-3">{agent._count?.employees || 0}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                      agent.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {agent.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-slate-100">
                        <div className="h-2 rounded-full bg-brand-600" style={{ width: `${Math.random() * 60 + 40}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{Math.floor(Math.random() * 30 + 70)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
              {stats.topPerformers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">No agents found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold">Recent Onboarding</h3>
        <div className="mt-4 space-y-3">
          {stats.recentOnboarding.map(agent => (
            <div key={agent.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-600 font-medium">
                  {agent.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{agent.name}</p>
                  <p className="text-sm text-slate-500">{agent.phone || 'No phone'}</p>
                </div>
              </div>
              <span className="text-sm text-slate-500">Just joined</span>
            </div>
          ))}
          {stats.recentOnboarding.length === 0 && (
            <p className="text-center text-slate-500">No recent onboarding</p>
          )}
        </div>
      </section>
    </div>
  );
}