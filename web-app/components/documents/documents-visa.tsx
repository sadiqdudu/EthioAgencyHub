'use client';

import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export function DocumentsVisa() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Visa Documents</h1>
        <p className="mt-2 text-slate-500">Manage visa applications, approvals, and rejections</p>
      </div>

      {/* Visa Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Total Applications</p>
          <p className="mt-2 text-2xl font-bold text-ink">342</p>
          <p className="mt-1 text-xs text-slate-500">This month</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Approved</p>
          <p className="mt-2 text-2xl font-bold text-green-600">298</p>
          <p className="mt-1 text-xs text-green-600">87% success rate</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Pending Review</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">32</p>
          <p className="mt-1 text-xs text-slate-500">3-5 days avg</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Rejected</p>
          <p className="mt-2 text-2xl font-bold text-red-600">12</p>
          <p className="mt-1 text-xs text-red-600">Under appeal</p>
        </div>
      </div>

      {/* Visa Applications Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-bold text-ink">Visa Applications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Employee</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Destination</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Applied</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { employee: 'Mekdes Tesfaye', destination: 'Saudi Arabia', status: 'Approved', applied: '15 Apr', icon: CheckCircle2, color: 'text-green-600' },
                { employee: 'Hana Bekele', destination: 'UAE', status: 'In Review', applied: '18 Apr', icon: Clock, color: 'text-blue-600' },
                { employee: 'Selamawit Alemu', destination: 'Qatar', status: 'Pending Documents', applied: '20 Apr', icon: AlertCircle, color: 'text-yellow-600' },
                { employee: 'Rahel Tadesse', destination: 'Kuwait', status: 'Rejected', applied: '12 Apr', icon: AlertCircle, color: 'text-red-600' },
              ].map((app, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-ink">{app.employee}</td>
                  <td className="px-6 py-4 text-slate-600">{app.destination}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <app.icon className={`h-4 w-4 ${app.color}`} />
                      <span className="text-slate-700">{app.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{app.applied}</td>
                  <td className="px-6 py-4">
                    <button className="text-xs font-medium text-brand-600 hover:text-brand-700">View</button>
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
