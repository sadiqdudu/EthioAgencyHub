'use client';

import { User, Briefcase, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

export function HajjUmrahPilgrimDetail() {
  const pilgrims = [
    { id: 'PILG-001', name: 'Abebe Tekle', status: 'approved', group: 'Hajj 2026', passport: 'P-123456', health: 'cleared' },
    { id: 'PILG-002', name: 'Hiwot Desta', status: 'approved', group: 'Hajj 2026', passport: 'P-123457', health: 'cleared' },
    { id: 'PILG-003', name: 'Girma Tadesse', status: 'pending', group: 'Umrah - Business', passport: 'P-123458', health: 'pending' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Pilgrim Details</h1>
        <p className="mt-2 text-slate-500">View and manage individual pilgrim information</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-purple-50 to-purple-100/50">
          <p className="text-sm text-slate-600">Total Pilgrims</p>
          <p className="mt-2 text-2xl font-bold text-purple-600">342</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-green-50 to-green-100/50">
          <p className="text-sm text-slate-600">Approved</p>
          <p className="mt-2 text-2xl font-bold text-green-600">289</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-yellow-50 to-yellow-100/50">
          <p className="text-sm text-slate-600">Pending</p>
          <p className="mt-2 text-2xl font-bold text-yellow-600">45</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-red-50 to-red-100/50">
          <p className="text-sm text-slate-600">Issues</p>
          <p className="mt-2 text-2xl font-bold text-red-600">8</p>
        </div>
      </div>

      {/* Pilgrims Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-bold text-ink">Pilgrims List</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left font-semibold text-slate-600">ID</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Name</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Group</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pilgrims.map((pilgrim) => (
                <tr key={pilgrim.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-purple-600">{pilgrim.id}</td>
                  <td className="px-6 py-4">{pilgrim.name}</td>
                  <td className="px-6 py-4 text-slate-600">{pilgrim.group}</td>
                  <td className="px-6 py-4">
                    {pilgrim.status === 'approved' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    )}
                  </td>
                  <td className="px-6 py-4">{pilgrim.health}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
