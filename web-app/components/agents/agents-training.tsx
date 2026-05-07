'use client';

import { BookOpen, Award, CheckCircle2 } from 'lucide-react';

export function AgentTraining() {
  const trainingPrograms = [
    { program: 'Compliance & Regulations', sessions: 5, completed: 3, status: 'in-progress', duration: '8 hours' },
    { program: 'Customer Service Excellence', sessions: 4, completed: 4, status: 'completed', duration: '6 hours' },
    { program: 'System & Tools Training', sessions: 6, completed: 2, status: 'in-progress', duration: '10 hours' },
    { program: 'Sales Techniques', sessions: 5, completed: 0, status: 'pending', duration: '8 hours' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Agent Training</h1>
        <p className="mt-2 text-slate-500">Manage training programs and professional development</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-blue-50 to-blue-100/50">
          <p className="text-sm text-slate-600">Active Programs</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">4</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-green-50 to-green-100/50">
          <p className="text-sm text-slate-600">Completed</p>
          <p className="mt-2 text-2xl font-bold text-green-600">18</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-yellow-50 to-yellow-100/50">
          <p className="text-sm text-slate-600">In Progress</p>
          <p className="mt-2 text-2xl font-bold text-yellow-600">12</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-orange-50 to-orange-100/50">
          <p className="text-sm text-slate-600">Total Hours</p>
          <p className="mt-2 text-2xl font-bold text-orange-600">156 hrs</p>
        </div>
      </div>

      {/* Training Programs */}
      <div className="space-y-3">
        {trainingPrograms.map((prog, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-bold text-ink">{prog.program}</p>
                  <p className="text-sm text-slate-500">{prog.duration}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                prog.status === 'completed' ? 'bg-green-100 text-green-700' :
                prog.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {prog.status.charAt(0).toUpperCase() + prog.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">Progress</span>
                  <span className="font-semibold">{prog.completed}/{prog.sessions}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(prog.completed / prog.sessions) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
