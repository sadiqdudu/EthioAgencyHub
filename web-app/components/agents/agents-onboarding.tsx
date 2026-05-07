'use client';

import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export function AgentOnboarding() {
  const onboardingProcess = [
    { step: 1, task: 'Application Review', status: 'completed', dueDate: '2026-03-01' },
    { step: 2, task: 'Background Check', status: 'completed', dueDate: '2026-03-05' },
    { step: 3, task: 'Training & Orientation', status: 'in-progress', dueDate: '2026-03-15' },
    { step: 4, task: 'System Access Setup', status: 'pending', dueDate: '2026-03-20' },
    { step: 5, task: 'Contract Signing', status: 'pending', dueDate: '2026-03-25' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Agent Onboarding</h1>
        <p className="mt-2 text-slate-500">Manage new agent onboarding and training process</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-green-50 to-green-100/50">
          <p className="text-sm text-slate-600">Completed</p>
          <p className="mt-2 text-2xl font-bold text-green-600">12</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-blue-50 to-blue-100/50">
          <p className="text-sm text-slate-600">In Progress</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">5</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-yellow-50 to-yellow-100/50">
          <p className="text-sm text-slate-600">Pending</p>
          <p className="mt-2 text-2xl font-bold text-yellow-600">7</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-orange-50 to-orange-100/50">
          <p className="text-sm text-slate-600">Avg Duration</p>
          <p className="mt-2 text-2xl font-bold text-orange-600">28 days</p>
        </div>
      </div>

      {/* Onboarding Checklist */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-bold text-ink">Onboarding Steps</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {onboardingProcess.map((item) => (
            <div key={item.step} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white bg-slate-400">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-slate-700">{item.task}</p>
                  <p className="text-xs text-slate-500">{item.dueDate}</p>
                </div>
              </div>
              {item.status === 'completed' ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : item.status === 'in-progress' ? (
                <Clock className="h-5 w-5 text-blue-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
