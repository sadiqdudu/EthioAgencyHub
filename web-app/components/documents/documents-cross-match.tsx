'use client';

import { CheckCircle2, AlertCircle, Eye } from 'lucide-react';

const crossMatchResults = [
  { id: 'MATCH-001', employee: 'Mekdes Tesfaye', status: 'verified', documents: 8, discrepancies: 0, lastChecked: '2026-05-05' },
  { id: 'MATCH-002', employee: 'Hana Bekele', status: 'verified', documents: 7, discrepancies: 0, lastChecked: '2026-05-05' },
  { id: 'MATCH-003', employee: 'Selamawit Alemu', status: 'discrepancy', documents: 6, discrepancies: 1, lastChecked: '2026-05-04' },
  { id: 'MATCH-004', employee: 'Rahel Tadesse', status: 'verified', documents: 9, discrepancies: 0, lastChecked: '2026-05-03' },
  { id: 'MATCH-005', employee: 'Addis Worker', status: 'pending', documents: 5, discrepancies: '-', lastChecked: 'Pending' },
];

export function DocumentsCrossMatch() {
  const stats = [
    { label: 'Total Records', value: '234', color: 'bg-blue-100 text-blue-600' },
    { label: 'Verified', value: '218', color: 'bg-green-100 text-green-600' },
    { label: 'Discrepancies', value: '12', color: 'bg-orange-100 text-orange-600' },
    { label: 'Pending', value: '4', color: 'bg-slate-100 text-slate-600' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Cross-Match Verification</h1>
        <p className="mt-2 text-slate-500">Verify document authenticity and employee information consistency</p>
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

      {/* Actions */}
      <div className="flex gap-3">
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          Run Cross-Match
        </button>
        <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
          View Discrepancy Log
        </button>
        <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
          Export Results
        </button>
      </div>

      {/* Cross-Match Results */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-bold text-ink">Verification Results</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left font-semibold text-slate-600">ID</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Employee</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Documents</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Discrepancies</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Last Checked</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {crossMatchResults.map((result) => (
                <tr key={result.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-blue-600">{result.id}</td>
                  <td className="px-6 py-4 text-slate-600">{result.employee}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {result.status === 'verified' && (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-green-700 font-semibold">Verified</span>
                        </>
                      )}
                      {result.status === 'discrepancy' && (
                        <>
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                          <span className="text-orange-700 font-semibold">Discrepancy</span>
                        </>
                      )}
                      {result.status === 'pending' && (
                        <span className="text-slate-600">Pending</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{result.documents}</td>
                  <td className="px-6 py-4 text-slate-600">{result.discrepancies}</td>
                  <td className="px-6 py-4 text-slate-600">{result.lastChecked}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                      <Eye className="h-4 w-4" />
                    </button>
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
