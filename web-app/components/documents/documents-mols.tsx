'use client';

import { useState } from 'react';
import { Landmark, Search } from 'lucide-react';

export function DocumentsMols() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const batches = [
    { batch: 'Batch #45', employees: 28, submitted: '18 Apr', status: 'Approved', daysAgo: '2 days' },
    { batch: 'Batch #46', employees: 32, submitted: '20 Apr', status: 'Under Review', daysAgo: '1 day' },
    { batch: 'Batch #47', employees: 25, submitted: '22 Apr', status: 'Issues Found', daysAgo: '3 hours' },
    { batch: 'Batch #48', employees: 21, submitted: '24 Apr', status: 'Pending Submission', daysAgo: 'Today' },
  ];
  
  const filteredBatches = batches.filter(b => b.batch.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">MOLS Processing</h1>
        <p className="mt-2 text-slate-500">Ministry of Labor & Social Affairs coordination and approvals</p>
      </div>

      {/* MOLS Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Submitted to MOLS</p>
          <p className="mt-2 text-2xl font-bold text-ink">156</p>
          <p className="mt-1 text-xs text-slate-500">This month</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Approved</p>
          <p className="mt-2 text-2xl font-bold text-green-600">134</p>
          <p className="mt-1 text-xs text-green-600">85.9% rate</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Under Review</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">18</p>
          <p className="mt-1 text-xs text-slate-500">5-10 days avg</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Issues</p>
          <p className="mt-2 text-2xl font-bold text-red-600">4</p>
          <p className="mt-1 text-xs text-red-600">Need clarification</p>
        </div>
      </div>

      {/* MOLS Batches */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4 flex flex-wrap gap-4 items-center justify-between">
          <h3 className="text-lg font-bold text-ink">MOLS Submission Batches</h3>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search batches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-300 py-2 pl-9 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
            <button className="text-sm font-medium text-brand-600 hover:text-brand-700 whitespace-nowrap">+ New Batch</button>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {filteredBatches.length === 0 ? (
            <div className="px-6 py-8 text-center text-slate-500">
              No batches found matching "{searchQuery}".
            </div>
          ) : filteredBatches.map((batch, idx) => (
            <div key={idx} className="px-6 py-4 hover:bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Landmark className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="font-medium text-ink">{batch.batch}</p>
                  <p className="text-xs text-slate-500">{batch.employees} employees • Submitted {batch.daysAgo}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  batch.status === 'Approved' ? 'bg-green-50 text-green-700' :
                  batch.status === 'Under Review' ? 'bg-blue-50 text-blue-700' :
                  batch.status === 'Issues Found' ? 'bg-red-50 text-red-700' :
                  'bg-yellow-50 text-yellow-700'
                }`}>
                  {batch.status}
                </span>
                <button className="text-xs font-medium text-brand-600 hover:text-brand-700">Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
