'use client';

import { LifeBuoy, AlertCircle, CheckCircle2 } from 'lucide-react';

export function AgentSupport() {
  const supportTickets = [
    { id: 'SUP-001', agent: 'Abebe Tsegaye', issue: 'System Access Problem', priority: 'high', status: 'open' },
    { id: 'SUP-002', agent: 'Alemayehu Hailu', issue: 'Commission Calculation Error', priority: 'medium', status: 'in-progress' },
    { id: 'SUP-003', agent: 'Yohannes Tadesse', issue: 'Report Generation Issue', priority: 'low', status: 'resolved' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Agent Support</h1>
        <p className="mt-2 text-slate-500">Manage support tickets and agent assistance</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-blue-50 to-blue-100/50">
          <p className="text-sm text-slate-600">Total Tickets</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">47</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-red-50 to-red-100/50">
          <p className="text-sm text-slate-600">Open</p>
          <p className="mt-2 text-2xl font-bold text-red-600">8</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-yellow-50 to-yellow-100/50">
          <p className="text-sm text-slate-600">In Progress</p>
          <p className="mt-2 text-2xl font-bold text-yellow-600">5</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-green-50 to-green-100/50">
          <p className="text-sm text-slate-600">Resolved</p>
          <p className="mt-2 text-2xl font-bold text-green-600">34</p>
        </div>
      </div>

      {/* Support Tickets */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-bold text-ink">Support Tickets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Ticket</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Agent</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Issue</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Priority</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {supportTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-blue-600">{ticket.id}</td>
                  <td className="px-6 py-4">{ticket.agent}</td>
                  <td className="px-6 py-4">{ticket.issue}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      ticket.priority === 'high' ? 'bg-red-100 text-red-700' :
                      ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {ticket.status === 'resolved' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                    )}
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
