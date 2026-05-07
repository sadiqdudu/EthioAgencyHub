'use client';

import { useState } from 'react';
import { Search, Filter, Download, BarChart3, TrendingUp } from 'lucide-react';

export function ActivitiesModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const [activities] = useState([
    {
      id: 1,
      timestamp: '2024-02-15 16:32:05',
      user: 'Yohannes Tefera',
      action: 'Employee Registered',
      target: 'Senait Assefa',
      icon: '👤',
      category: 'registration'
    },
    {
      id: 2,
      timestamp: '2024-02-15 15:18:12',
      user: 'Getnet Kabede',
      action: 'Document Verified',
      target: 'Passport - Abebe Tadesse',
      icon: '✓',
      category: 'document'
    },
    {
      id: 3,
      timestamp: '2024-02-15 14:45:44',
      user: 'Senait Assefa',
      action: 'Travel Scheduled',
      target: 'Flight SR-123456 to Riyadh',
      icon: '✈️',
      category: 'travel'
    },
    {
      id: 4,
      timestamp: '2024-02-15 13:22:05',
      user: 'Marta Desalegn',
      action: 'CV Generated',
      target: 'Getnet Kabede - Nurse',
      icon: '📄',
      category: 'document'
    },
    {
      id: 5,
      timestamp: '2024-02-15 12:15:33',
      user: 'Admin',
      action: 'Settings Updated',
      target: 'System Configuration',
      icon: '⚙️',
      category: 'system'
    },
    {
      id: 6,
      timestamp: '2024-02-15 11:08:19',
      user: 'Zainab Hassan',
      action: 'Hajj Registration',
      target: 'Pilgrimage 2024 Hajj',
      icon: '🕌',
      category: 'hajj'
    },
    {
      id: 7,
      timestamp: '2024-02-15 10:45:52',
      user: 'Yohannes Tefera',
      action: 'Payment Processed',
      target: 'Agency Commission Payment',
      icon: '💰',
      category: 'billing'
    },
    {
      id: 8,
      timestamp: '2024-02-14 18:30:22',
      user: 'Getnet Kabede',
      action: 'Report Generated',
      target: 'Monthly Performance Report',
      icon: '📊',
      category: 'reporting'
    },
  ]);

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || activity.category === filterType;
    return matchesSearch && matchesType;
  });

  const categories = [
    { value: 'all', label: 'All Activities' },
    { value: 'registration', label: 'Registrations' },
    { value: 'document', label: 'Documents' },
    { value: 'travel', label: 'Travel' },
    { value: 'hajj', label: 'Hajj' },
    { value: 'billing', label: 'Billing' },
    { value: 'system', label: 'System' },
    { value: 'reporting', label: 'Reporting' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-ink">Activities</h2>
            <p className="mt-2 text-slate-600">
              Real-time audit trail of all agency operations and user actions.
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50">
            <Download className="h-5 w-5" />
            Export
          </button>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center">
          <p className="text-sm font-medium text-slate-600">Total Activities</p>
          <p className="mt-2 text-4xl font-bold text-blue-700">{activities.length}</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 text-center">
          <p className="text-sm font-medium text-slate-600">Today</p>
          <p className="mt-2 text-4xl font-bold text-emerald-700">7</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center">
          <p className="text-sm font-medium text-slate-600">This Week</p>
          <p className="mt-2 text-4xl font-bold text-purple-700">32</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 p-6 text-center">
          <p className="text-sm font-medium text-slate-600">This Month</p>
          <p className="mt-2 text-4xl font-bold text-amber-700">142</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2 focus:border-brand-600 focus:outline-none"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-2 font-medium focus:border-brand-600 focus:outline-none"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Activities Timeline */}
      <div className="space-y-2">
        {filteredActivities.map(activity => (
          <div key={activity.id} className="rounded-xl border border-slate-200 bg-white p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="text-3xl flex-shrink-0">{activity.icon}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-ink">{activity.action}</h4>
                    <p className="text-sm text-slate-600 mt-1">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap ml-4">{activity.timestamp}</span>
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  <span className="font-medium">{activity.target}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredActivities.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center">
          <BarChart3 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">No activities found</p>
          <p className="text-sm text-slate-500 mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
