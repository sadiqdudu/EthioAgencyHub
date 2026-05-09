'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle, Eye, AlertTriangle, FileText, Plane, Search } from 'lucide-react';

const crossMatchResults = [
  { 
    id: 'MATCH-001', 
    employee: 'Mekdes Tesfaye', 
    status: 'verified', 
    passportExpiry: '2028-10-15', 
    issues: [], 
    lastChecked: '2026-05-05' 
  },
  { 
    id: 'MATCH-002', 
    employee: 'Hana Bekele', 
    status: 'verified', 
    passportExpiry: '2027-02-20', 
    issues: [], 
    lastChecked: '2026-05-05' 
  },
  { 
    id: 'MATCH-003', 
    employee: 'Selamawit Alemu', 
    status: 'critical', 
    passportExpiry: '2026-08-10', // Less than 6 months from now
    issues: [
      'Passport expires in < 6 months (Bole Airport Risk)', 
      'Ticket Name Spelling Mismatch'
    ], 
    lastChecked: '2026-05-04' 
  },
  { 
    id: 'MATCH-004', 
    employee: 'Rahel Tadesse', 
    status: 'discrepancy', 
    passportExpiry: '2029-01-05', 
    issues: [
      'Visa & Passport Number Mismatch'
    ], 
    lastChecked: '2026-05-03' 
  },
  { 
    id: 'MATCH-005', 
    employee: 'Addis Worker', 
    status: 'pending', 
    passportExpiry: 'Pending', 
    issues: [], 
    lastChecked: 'Pending' 
  },
];

export function DocumentsCrossMatch() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredResults = crossMatchResults.filter(r => 
    r.employee.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const stats = [
    { label: 'Total Records', value: '234', color: 'bg-blue-100 text-blue-600' },
    { label: 'Cleared for Departure', value: '218', color: 'bg-green-100 text-green-600' },
    { label: 'Spelling/Number Discrepancy', value: '12', color: 'bg-orange-100 text-orange-600' },
    { label: 'Critical (Passport < 6 Months)', value: '4', color: 'bg-red-100 text-red-600' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Departure Cross-Match Verification</h1>
        <p className="mt-2 text-slate-500">Strictly verify Passport Expiry ({'>'} 6 months), Name Spelling, and Document Numbers across Passport, Visa, and Ticket before Bole Airport departure.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-2xl ${stat.color} p-6 border border-white/20 shadow-sm`}>
            <p className="text-3xl font-extrabold">{stat.value}</p>
            <p className="text-sm font-semibold opacity-90 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-700 shadow-sm transition-colors">
          <Plane className="h-4 w-4" /> Run Pre-Departure Cross-Match
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
          <AlertTriangle className="h-4 w-4 text-orange-500" /> View Discrepancy Log
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
          <FileText className="h-4 w-4 text-slate-500" /> Export Results
        </button>
      </div>

      {/* Cross-Match Results */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4 flex flex-wrap gap-4 items-center justify-between bg-slate-50/50">
          <h3 className="text-lg font-bold text-ink">Verification Results</h3>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by employee name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 py-2 pl-9 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left font-bold text-slate-700">ID</th>
                <th className="px-6 py-4 text-left font-bold text-slate-700">Employee</th>
                <th className="px-6 py-4 text-left font-bold text-slate-700">Departure Status</th>
                <th className="px-6 py-4 text-left font-bold text-slate-700">Passport Expiry</th>
                <th className="px-6 py-4 text-left font-bold text-slate-700">Detected Issues (Visa/Ticket/Passport)</th>
                <th className="px-6 py-4 text-left font-bold text-slate-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResults.length === 0 ? (
                <tr>
                  <td className="px-6 py-6 text-slate-500 text-center" colSpan={6}>
                    No verification records found matching "{searchQuery}".
                  </td>
                </tr>
              ) : filteredResults.map((result) => (
                <tr key={result.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-brand-600">{result.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-800">{result.employee}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {result.status === 'verified' && (
                        <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                          <CheckCircle2 className="h-4 w-4" /> Cleared
                        </span>
                      )}
                      {result.status === 'discrepancy' && (
                        <span className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                          <AlertTriangle className="h-4 w-4" /> Data Mismatch
                        </span>
                      )}
                      {result.status === 'critical' && (
                        <span className="flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                          <AlertCircle className="h-4 w-4" /> Airport Risk
                        </span>
                      )}
                      {result.status === 'pending' && (
                        <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                          Pending Check
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${result.status === 'critical' ? 'text-red-600 font-bold' : 'text-slate-600'}`}>
                      {result.passportExpiry}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {result.issues.length > 0 ? (
                      <div className="space-y-1">
                        {result.issues.map((issue, idx) => (
                          <div key={idx} className={`text-xs font-medium px-2 py-1 rounded-md ${issue.includes('< 6 months') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-orange-50 text-orange-700 border border-orange-100'}`}>
                            • {issue}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-green-600 font-medium text-xs flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> All names & numbers match
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1 text-brand-600 hover:text-brand-800 font-bold text-sm bg-brand-50 px-3 py-1.5 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" /> Review
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
