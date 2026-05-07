'use client';

import { BriefcaseBusiness, MapPin, Phone, Mail } from 'lucide-react';

export function AgentDetail() {
  const agents = [
    { id: 'AGT-001', name: 'Abebe Tsegaye', region: 'Addis Ababa', phone: '+251911234567', email: 'abebe@agency.com', status: 'active', recruits: 45 },
    { id: 'AGT-002', name: 'Alemayehu Hailu', region: 'Dire Dawa', phone: '+251922345678', email: 'alemayehu@agency.com', status: 'active', recruits: 32 },
    { id: 'AGT-003', name: 'Yohannes Tadesse', region: 'Hawassa', phone: '+251933456789', email: 'yohannes@agency.com', status: 'active', recruits: 28 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Agent Details</h1>
        <p className="mt-2 text-slate-500">View comprehensive agent information and contact details</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-amber-50 to-amber-100/50">
          <p className="text-sm text-slate-600">Total Agents</p>
          <p className="mt-2 text-2xl font-bold text-amber-600">24</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-yellow-50 to-yellow-100/50">
          <p className="text-sm text-slate-600">Active</p>
          <p className="mt-2 text-2xl font-bold text-yellow-600">18</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-orange-50 to-orange-100/50">
          <p className="text-sm text-slate-600">Avg Recruits</p>
          <p className="mt-2 text-2xl font-bold text-orange-600">35</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-red-50 to-red-100/50">
          <p className="text-sm text-slate-600">Total Recruits</p>
          <p className="mt-2 text-2xl font-bold text-red-600">840</p>
        </div>
      </div>

      {/* Agents Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-bold text-ink">Agent Contacts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Name</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Region</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Phone</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Email</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Recruits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {agents.map((agent) => (
                <tr key={agent.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">{agent.name}</td>
                  <td className="px-6 py-4 flex items-center gap-1 text-slate-600">
                    <MapPin className="h-4 w-4" /> {agent.region}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{agent.phone}</td>
                  <td className="px-6 py-4 text-blue-600">{agent.email}</td>
                  <td className="px-6 py-4 font-semibold">{agent.recruits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
