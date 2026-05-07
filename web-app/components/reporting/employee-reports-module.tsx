'use client';

import { useState } from 'react';
import { Download, Filter, Users, TrendingUp, BarChart3 } from 'lucide-react';

export function EmployeeReportsModule() {
  const [dateRange, setDateRange] = useState('month');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const reportOptions = [
    {
      id: 1,
      title: 'Registration Summary',
      description: 'Overview of new employee registrations and completion rates',
      metrics: [
        { label: 'Total Registered', value: 156, trend: '+12 from last month' },
        { label: 'Completion Rate', value: '85%', trend: '+3% improvement' },
        { label: 'Avg Processing Time', value: '4.2 days', trend: '-0.9 days' },
        { label: 'Pending Review', value: 8, trend: '-2 from last month' }
      ]
    },
    {
      id: 2,
      title: 'Deployment Report',
      description: 'Track employee deployment status and assignments',
      metrics: [
        { label: 'Total Deployed', value: 143, trend: '+18 from last month' },
        { label: 'Deployment Rate', value: '92%', trend: '+4% improvement' },
        { label: 'Active in Field', value: 138, trend: '+16 deployed' },
        { label: 'Pending Deployment', value: 13, trend: '-2 expected' }
      ]
    },
    {
      id: 3,
      title: 'Workforce Analytics',
      description: 'Detailed workforce composition and distribution',
      metrics: [
        { label: 'Healthcare Workers', value: 78, trend: '+8 this month' },
        { label: 'Support Staff', value: 35, trend: '+2 this month' },
        { label: 'Administrative', value: 22, trend: 'Stable' },
        { label: 'Management', value: 21, trend: 'Stable' }
      ]
    },
    {
      id: 4,
      title: 'Performance Scorecard',
      description: 'Individual and team performance metrics',
      metrics: [
        { label: 'Avg Rating', value: '4.2/5', trend: '+0.3 points' },
        { label: 'High Performers', value: 42, trend: '+8 this month' },
        { label: 'Meeting Targets', value: '89%', trend: '+2% increase' },
        { label: 'Improvement Needed', value: 12, trend: '-3 resolved' }
      ]
    },
    {
      id: 5,
      title: 'Retention Analytics',
      description: 'Employee retention and attrition analysis',
      metrics: [
        { label: 'Retention Rate', value: '96%', trend: '+1% improvement' },
        { label: 'Attrition Rate', value: '4%', trend: '-1% improvement' },
        { label: 'Avg Tenure', value: '14 months', trend: '+2 months' },
        { label: 'Return to Post', value: '98%', trend: 'Excellent' }
      ]
    },
    {
      id: 6,
      title: 'Skills Inventory',
      description: 'Employee skills, certifications, and qualifications',
      metrics: [
        { label: 'Total Skills', value: 324, trend: '+45 new skills' },
        { label: 'Certified', value: '78%', trend: '+8% certified' },
        { label: 'Languages', value: 12, trend: 'Multilingual workforce' },
        { label: 'Specialized Training', value: 92, trend: '+12 trained' }
      ]
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-ink">Employee Reports</h2>
            <p className="mt-2 text-slate-600">
              Comprehensive employee analytics and workforce insights.
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-medium text-white hover:bg-brand-700">
            <Download className="h-5 w-5" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-2 font-medium focus:border-brand-600 focus:outline-none"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
          <option value="custom">Custom Range</option>
        </select>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-2 font-medium focus:border-brand-600 focus:outline-none"
        >
          <option value="all">All Departments</option>
          <option value="healthcare">Healthcare</option>
          <option value="support">Support Staff</option>
          <option value="admin">Administrative</option>
        </select>
      </div>

      {/* Report Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {reportOptions.map(report => (
          <div
            key={report.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-ink">{report.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{report.description}</p>
              </div>
              <Users className="h-8 w-8 text-brand-600 opacity-30" />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {report.metrics.map((metric, idx) => (
                <div key={idx} className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-600">{metric.label}</p>
                  <p className="mt-1 text-xl font-bold text-ink">{metric.value}</p>
                  <p className="text-xs text-emerald-600 mt-1">{metric.trend}</p>
                </div>
              ))}
            </div>

            <button className="w-full rounded-lg border border-brand-600 px-4 py-2 font-medium text-brand-600 hover:bg-brand-50 transition-colors">
              View Full Report
            </button>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-ink mb-6">Key Metrics Overview</h3>
        <div className="grid gap-6 md:grid-cols-4">
          <div className="text-center p-4">
            <div className="text-4xl font-bold text-blue-600">156</div>
            <p className="text-sm text-slate-600 mt-2">Total Employees</p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl font-bold text-emerald-600">143</div>
            <p className="text-sm text-slate-600 mt-2">Deployed</p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl font-bold text-purple-600">92%</div>
            <p className="text-sm text-slate-600 mt-2">Success Rate</p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl font-bold text-amber-600">4.2</div>
            <p className="text-sm text-slate-600 mt-2">Avg Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
}
