'use client';

import { useState } from 'react';
import { Download, Filter, FileText, BarChart3, AlertCircle } from 'lucide-react';

export function DocumentReportsModule() {
  const [dateRange, setDateRange] = useState('month');
  const [docTypeFilter, setDocTypeFilter] = useState('all');

  const reportOptions = [
    {
      id: 1,
      title: 'Document Verification Summary',
      description: 'Track document processing and verification status',
      metrics: [
        { label: 'Total Processed', value: 892, trend: '+47 this month' },
        { label: 'Verified', value: '78%', trend: '+5% rate' },
        { label: 'Pending', value: 195, trend: '-8 items' },
        { label: 'Rejected', value: 12, trend: '-2 items' }
      ]
    },
    {
      id: 2,
      title: 'Document Type Analysis',
      description: 'Breakdown by document type and processing time',
      metrics: [
        { label: 'Passports', value: 234, trend: '4.1 days avg' },
        { label: 'Visas', value: 189, trend: '5.2 days avg' },
        { label: 'Medical', value: 267, trend: '2.8 days avg' },
        { label: 'Employment', value: 202, trend: '3.5 days avg' }
      ]
    },
    {
      id: 3,
      title: 'Compliance Report',
      description: 'Document compliance and regulatory adherence',
      metrics: [
        { label: 'Compliant', value: '96%', trend: '+1% improvement' },
        { label: 'Non-Compliant', value: 32, trend: '-4 items' },
        { label: 'Under Review', value: 18, trend: '-2 pending' },
        { label: 'Expiration Risk', value: 24, trend: '+6 flagged' }
      ]
    },
    {
      id: 4,
      title: 'Expiration Dashboard',
      description: 'Track document expiration dates and renewals',
      metrics: [
        { label: 'Expired', value: 8, trend: 'Action needed' },
        { label: 'Expiring Soon', value: 34, trend: 'Next 30 days' },
        { label: 'Valid', value: 758, trend: 'Current status' },
        { label: 'Renewal Rate', value: '94%', trend: 'Proactive' }
      ]
    },
    {
      id: 5,
      title: 'Upload Analytics',
      description: 'Document upload patterns and success rates',
      metrics: [
        { label: 'Total Uploads', value: 1204, trend: '+156 this month' },
        { label: 'Success Rate', value: '99.2%', trend: 'Excellent' },
        { label: 'Failed', value: 9, trend: '-3 resolved' },
        { label: 'Retried', value: 8, trend: 'Success' }
      ]
    },
    {
      id: 6,
      title: 'Storage Report',
      description: 'Document storage usage and capacity',
      metrics: [
        { label: 'Total Size', value: '24.5 GB', trend: '+2.3 GB' },
        { label: 'Used', value: '78%', trend: 'Managed' },
        { label: 'Available', value: '6.8 GB', trend: 'Sufficient' },
        { label: 'Archive', value: '4.2 GB', trend: 'Backup ready' }
      ]
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-ink">Document Reports</h2>
            <p className="mt-2 text-slate-600">
              Comprehensive document lifecycle and processing analytics.
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
        </select>
        <select
          value={docTypeFilter}
          onChange={(e) => setDocTypeFilter(e.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-2 font-medium focus:border-brand-600 focus:outline-none"
        >
          <option value="all">All Document Types</option>
          <option value="passport">Passports</option>
          <option value="visa">Visas</option>
          <option value="medical">Medical</option>
          <option value="employment">Employment</option>
        </select>
      </div>

      {/* Alert */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium text-amber-900">Action Required</p>
          <p className="text-sm text-amber-800 mt-1">
            8 documents have expired and 34 are expiring within 30 days. Review the Expiration Dashboard for details.
          </p>
        </div>
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
              <FileText className="h-8 w-8 text-brand-600 opacity-30" />
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
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
