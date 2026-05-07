'use client';

import { CheckCircle2, AlertCircle, Paperclip } from 'lucide-react';

export function HajjUmrahRequirements() {
  const requirements = [
    { id: 'REQ-001', requirement: 'Valid Passport', mandatory: true, verified: 95 },
    { id: 'REQ-002', requirement: 'Health Certificate', mandatory: true, verified: 98 },
    { id: 'REQ-003', requirement: 'Meningitis Vaccination', mandatory: true, verified: 89 },
    { id: 'REQ-004', requirement: 'Travel Insurance', mandatory: true, verified: 92 },
    { id: 'REQ-005', requirement: 'Religious Training', mandatory: false, verified: 78 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Religious Requirements</h1>
        <p className="mt-2 text-slate-500">View mandatory and optional pilgrim requirements</p>
      </div>

      {/* Verification Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-green-50 to-green-100/50">
          <p className="text-sm text-slate-600">Overall Compliance</p>
          <p className="mt-2 text-2xl font-bold text-green-600">94%</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-blue-50 to-blue-100/50">
          <p className="text-sm text-slate-600">Mandatory Complete</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">289/342</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-purple-50 to-purple-100/50">
          <p className="text-sm text-slate-600">Optional Complete</p>
          <p className="mt-2 text-2xl font-bold text-purple-600">267/342</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-orange-50 to-orange-100/50">
          <p className="text-sm text-slate-600">Issues</p>
          <p className="mt-2 text-2xl font-bold text-orange-600">8</p>
        </div>
      </div>

      {/* Requirements List */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-bold text-ink">Requirements Checklist</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {requirements.map((req) => (
            <div key={req.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <Paperclip className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="font-semibold text-slate-700">{req.requirement}</p>
                  <p className="text-xs text-slate-500">{req.mandatory ? 'Mandatory' : 'Optional'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-700">{req.verified}%</p>
                <div className="w-24 bg-slate-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${req.verified}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
