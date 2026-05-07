'use client';

import { CheckCircle2, Circle, AlertCircle, Clock, Flag, Zap } from 'lucide-react';

const tasks = [
  { id: 1, title: 'Review pending MOLS documents', priority: 'high', dueDate: '2026-05-06', status: 'pending', category: 'Documents' },
  { id: 2, title: 'Process visa applications batch #42', priority: 'high', dueDate: '2026-05-07', status: 'in_progress', category: 'Visas' },
  { id: 3, title: 'Update employee skills database', priority: 'medium', dueDate: '2026-05-08', status: 'pending', category: 'Employee Mgmt' },
  { id: 4, title: 'Prepare travel manifests for May 15th departure', priority: 'high', dueDate: '2026-05-12', status: 'pending', category: 'Travel' },
  { id: 5, title: 'Verify Hajj pilgrim documentation', priority: 'medium', dueDate: '2026-05-10', status: 'pending', category: 'Hajj/Umrah' },
  { id: 6, title: 'Monthly reconciliation report', priority: 'low', dueDate: '2026-05-15', status: 'completed', category: 'Reporting' },
  { id: 7, title: 'Onboard new institutional partner - ABC Group', priority: 'high', dueDate: '2026-05-09', status: 'in_progress', category: 'Institutions' },
  { id: 8, title: 'Review agent commission calculations', priority: 'medium', dueDate: '2026-05-11', status: 'pending', category: 'Agents' },
];

export function DashboardTasks() {
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'in_progress': return <Zap className="h-5 w-5 text-blue-600" />;
      default: return <Circle className="h-5 w-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ink">Tasks & To-Do List</h1>
        <p className="mt-2 text-slate-500">Manage operational tasks across all modules</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Tasks</p>
              <p className="mt-2 text-2xl font-bold text-ink">{tasks.length}</p>
            </div>
            <div className="rounded-lg bg-slate-100 p-3 text-slate-600">
              <Flag className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pending</p>
              <p className="mt-2 text-2xl font-bold text-ink">{pendingCount}</p>
            </div>
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <Clock className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">In Progress</p>
              <p className="mt-2 text-2xl font-bold text-ink">{inProgressCount}</p>
            </div>
            <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
              <Zap className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Completed</p>
              <p className="mt-2 text-2xl font-bold text-ink">{completedCount}</p>
            </div>
            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-bold text-ink">All Tasks</h3>
        </div>

        <div className="divide-y divide-slate-100">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3 flex-1">
                {getStatusIcon(task.status)}
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-ink'}`}>
                    {task.title}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                      {task.category}
                    </span>
                    <span className="text-xs text-slate-500">Due {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-3 py-1 rounded-lg border ${getPriorityColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
                {task.status === 'pending' && (
                  <button className="rounded-lg px-3 py-1 text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-100">
                    Start
                  </button>
                )}
                {task.status === 'in_progress' && (
                  <button className="rounded-lg px-3 py-1 text-xs font-medium border border-green-200 bg-green-50 text-green-700 hover:bg-green-100">
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-sm font-bold text-ink mb-4">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {['All', 'Documents', 'Employee Mgmt', 'Travel', 'Visas', 'Hajj/Umrah', 'Institutions', 'Agents', 'Reporting'].map((cat) => (
            <button
              key={cat}
              className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                cat === 'All'
                  ? 'bg-brand-600 text-white'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
