'use client';

import { CheckCircle2, AlertCircle, Upload, FileText, Users, Plane, Calendar, Edit2 } from 'lucide-react';

const activities = [
  { id: 1, type: 'upload', user: 'Addis Admin', action: 'Uploaded interview video for Hana Bekele', module: 'Employee Mgmt', timestamp: new Date(Date.now() - 5 * 60000), status: 'success' },
  { id: 2, type: 'document', user: 'Dire Dawa Agent', action: 'Routed passport PDF to Teledrive sync folder', module: 'Documents', timestamp: new Date(Date.now() - 15 * 60000), status: 'success' },
  { id: 3, type: 'process', user: 'System', action: 'MOLS cross-match completed for 23 employees', module: 'Documents', timestamp: new Date(Date.now() - 30 * 60000), status: 'success' },
  { id: 4, type: 'travel', user: 'Hawassa Agent', action: 'Flight manifest prepared for Addis Ababa departures', module: 'Travel', timestamp: new Date(Date.now() - 1 * 60 * 60000), status: 'success' },
  { id: 5, type: 'warning', user: 'Alemayehu H.', action: 'Missing medical certificate for Selamawit Alemu', module: 'Documents', timestamp: new Date(Date.now() - 2 * 60 * 60000), status: 'warning' },
  { id: 6, type: 'edit', user: 'Yohannes T.', action: 'Updated institutional partner agreement - Saudi Medical Group', module: 'Institutions', timestamp: new Date(Date.now() - 3 * 60 * 60000), status: 'success' },
  { id: 7, type: 'users', user: 'Admin Panel', action: 'New agent onboarded: Fikru Dadi from Meki Office', module: 'Agents', timestamp: new Date(Date.now() - 4 * 60 * 60000), status: 'success' },
  { id: 8, type: 'calendar', user: 'Adama B.', action: 'Hajj pilgrimage group for 45 employees finalized', module: 'Hajj/Umrah', timestamp: new Date(Date.now() - 5 * 60 * 60000), status: 'success' },
];

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export function DashboardActivities() {
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'upload': return <Upload className="h-5 w-5" />;
      case 'document': return <FileText className="h-5 w-5" />;
      case 'process': return <CheckCircle2 className="h-5 w-5" />;
      case 'travel': return <Plane className="h-5 w-5" />;
      case 'warning': return <AlertCircle className="h-5 w-5" />;
      case 'edit': return <Edit2 className="h-5 w-5" />;
      case 'users': return <Users className="h-5 w-5" />;
      case 'calendar': return <Calendar className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getActivityColor = (type: string, status: string) => {
    if (status === 'warning') return 'bg-orange-100 text-orange-600';
    switch(type) {
      case 'upload': return 'bg-blue-100 text-blue-600';
      case 'document': return 'bg-green-100 text-green-600';
      case 'process': return 'bg-purple-100 text-purple-600';
      case 'travel': return 'bg-pink-100 text-pink-600';
      case 'edit': return 'bg-yellow-100 text-yellow-600';
      case 'users': return 'bg-cyan-100 text-cyan-600';
      case 'calendar': return 'bg-indigo-100 text-indigo-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ink">Activity Feed</h1>
        <p className="mt-2 text-slate-500">Track all operational events and changes in real-time</p>
      </div>

      {/* Activity Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Total Activities Today</p>
          <p className="mt-2 text-2xl font-bold text-ink">48</p>
          <p className="mt-1 text-xs text-slate-500">+12 from yesterday</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Successful Operations</p>
          <p className="mt-2 text-2xl font-bold text-green-600">45</p>
          <p className="mt-1 text-xs text-slate-500">93.75% success rate</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Alerts/Warnings</p>
          <p className="mt-2 text-2xl font-bold text-orange-600">3</p>
          <p className="mt-1 text-xs text-slate-500">Require attention</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Active Users</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">12</p>
          <p className="mt-1 text-xs text-slate-500">Currently online</p>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink">Recent Activities</h3>
          <div className="flex gap-2">
            <button className="text-sm text-slate-600 hover:text-slate-900 font-medium">All</button>
            <button className="text-sm text-slate-400">Success</button>
            <button className="text-sm text-slate-400">Warnings</button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {activities.map((activity, idx) => (
            <div key={activity.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-4">
                {/* Timeline dot */}
                <div className="mt-1 flex flex-col items-center">
                  <div className={`rounded-full p-2 ${getActivityColor(activity.type, activity.status)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  {idx < activities.length - 1 && (
                    <div className="mt-2 w-0.5 h-12 bg-slate-200" />
                  )}
                </div>

                {/* Activity Details */}
                <div className="flex-1 pt-1 min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-ink text-sm">
                        {activity.user}
                      </p>
                      <p className="text-slate-600 text-sm mt-0.5">
                        {activity.action}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                          {activity.module}
                        </span>
                        <span className="text-xs text-slate-500">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {activity.status === 'warning' && (
                        <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                          <AlertCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Module Filter */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-sm font-bold text-ink mb-4">Filter by Module</h3>
        <div className="flex flex-wrap gap-2">
          {['All Modules', 'Employee Mgmt', 'Documents', 'Travel', 'Hajj/Umrah', 'Institutions', 'Agents', 'System'].map((mod) => (
            <button
              key={mod}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                mod === 'All Modules'
                  ? 'bg-brand-600 text-white'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {mod}
            </button>
          ))}
        </div>
      </div>

      {/* Export Option */}
      <button className="w-full rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center hover:border-brand-600 hover:bg-brand-50/30 transition-colors">
        <p className="font-semibold text-ink">Export Activity Log</p>
        <p className="text-xs text-slate-500 mt-1">Download full activity history as CSV</p>
      </button>
    </div>
  );
}
