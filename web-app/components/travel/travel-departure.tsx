'use client';

import { CheckCircle2, AlertCircle, FileCheck2, Users, Plane } from 'lucide-react';

export function TravelDeparture() {
  const departureChecklist = [
    { task: 'Passports collected & verified', completed: true, employees: '45/45' },
    { task: 'Medical certificates verified', completed: true, employees: '45/45' },
    { task: 'Visa approvals confirmed', completed: true, employees: '45/45' },
    { task: 'Travel insurance arranged', completed: false, employees: '32/45' },
    { task: 'Airport pickup arranged', completed: false, employees: '28/45' },
    { task: 'Currency exchange arranged', completed: true, employees: '45/45' },
    { task: 'Emergency contacts provided', completed: true, employees: '44/45' },
    { task: 'Flight manifests prepared', completed: false, employees: '0/45' },
  ];

  const completionRate = (departureChecklist.filter(t => t.completed).length / departureChecklist.length * 100).toFixed(0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Departure Readiness</h1>
        <p className="mt-2 text-slate-500">Pre-departure checklist and readiness verification</p>
      </div>

      {/* Readiness Progress */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-ink">Overall Readiness</h3>
          <span className="text-3xl font-bold text-slate-700">{completionRate}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div
            className="bg-green-600 h-3 rounded-full transition-all"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      {/* Departure Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Employees Ready</p>
          <p className="mt-2 text-2xl font-bold text-green-600">42</p>
          <p className="mt-1 text-xs text-green-600">of 45 (93%)</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Pending Actions</p>
          <p className="mt-2 text-2xl font-bold text-orange-600">8</p>
          <p className="mt-1 text-xs text-slate-500">Follow-ups needed</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Issues Found</p>
          <p className="mt-2 text-2xl font-bold text-red-600">3</p>
          <p className="mt-1 text-xs text-red-600">Urgent</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Departure Time</p>
          <p className="mt-2 text-2xl font-bold text-slate-700">08:00 AM</p>
          <p className="mt-1 text-xs text-slate-500">May 8, 2026</p>
        </div>
      </div>

      {/* Checklist */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-bold text-ink">Pre-Departure Checklist</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {departureChecklist.map((item, idx) => (
            <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-3">
                {item.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                )}
                <span className={item.completed ? 'text-slate-600' : 'font-semibold text-ink'}>
                  {item.task}
                </span>
              </div>
              <span className="text-sm font-medium text-slate-600">{item.employees}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          Generate Manifest
        </button>
        <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
          Send Reminders
        </button>
        <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
          Export Report
        </button>
      </div>
    </div>
  );
}
