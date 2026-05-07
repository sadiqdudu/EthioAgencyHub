'use client';

import { useState } from 'react';
import { Download, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';

export function FinancialReportsModule() {
  const [dateRange, setDateRange] = useState('month');

  const financialMetrics = [
    {
      id: 1,
      title: 'Revenue Summary',
      description: 'Total agency revenue and income streams',
      metrics: [
        { label: 'Total Revenue', value: '$42,500', trend: '+$5,200 (+13.9%)' },
        { label: 'Registration Fees', value: '$18,900', trend: '+$2,100' },
        { label: 'Service Fees', value: '$16,200', trend: '+$1,800' },
        { label: 'Premium Services', value: '$7,400', trend: '+$1,300' }
      ]
    },
    {
      id: 2,
      title: 'Commission Tracking',
      description: 'Agent commission payments and distributions',
      metrics: [
        { label: 'Total Commissions', value: '$8,450', trend: '+$950 disbursed' },
        { label: 'Pending', value: '$2,100', trend: 'Scheduled for payment' },
        { label: 'Paid', value: '$6,350', trend: '75% paid' },
        { label: 'Avg per Agent', value: '$423', trend: '20 agents paid' }
      ]
    },
    {
      id: 3,
      title: 'Expense Report',
      description: 'Operating expenses and cost management',
      metrics: [
        { label: 'Total Expenses', value: '$12,300', trend: '-$500 optimized' },
        { label: 'Payroll', value: '$7,200', trend: '59% of expenses' },
        { label: 'Operations', value: '$3,100', trend: '25% of expenses' },
        { label: 'Marketing', value: '$2,000', trend: '16% of expenses' }
      ]
    },
    {
      id: 4,
      title: 'Profitability Analysis',
      description: 'Net profit and margin metrics',
      metrics: [
        { label: 'Net Profit', value: '$30,200', trend: '+$4,250 (+16.3%)' },
        { label: 'Profit Margin', value: '71.1%', trend: '+2.1% improvement' },
        { label: 'Operating Ratio', value: '28.9%', trend: '-2.1% improved' },
        { label: 'ROI', value: '142%', trend: 'Strong returns' }
      ]
    },
    {
      id: 5,
      title: 'Cash Flow Statement',
      description: 'Inflows and outflows analysis',
      metrics: [
        { label: 'Opening Balance', value: '$125,400', trend: 'Previous month' },
        { label: 'Cash Inflows', value: '+$42,500', trend: 'All revenue' },
        { label: 'Cash Outflows', value: '-$20,750', trend: 'Expenses + commissions' },
        { label: 'Closing Balance', value: '$147,150', trend: '+$21,750' }
      ]
    },
    {
      id: 6,
      title: 'Payment Status',
      description: 'Outstanding invoices and collections',
      metrics: [
        { label: 'Total Outstanding', value: '$15,800', trend: '-$2,100 collected' },
        { label: 'Overdue', value: '$3,200', trend: '20% overdue' },
        { label: 'Pending', value: '$12,600', trend: 'Expected soon' },
        { label: 'Collection Rate', value: '92%', trend: '+3% this month' }
      ]
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-ink">Financial Reports</h2>
            <p className="mt-2 text-slate-600">
              Revenue, expenses, commissions, and profitability analysis.
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-medium text-white hover:bg-brand-700">
            <Download className="h-5 w-5" />
            Export Financials
          </button>
        </div>
      </div>

      {/* Date Range */}
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

      {/* Financial Summary */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-emerald-50 to-cyan-50 p-6">
        <div className="grid gap-6 md:grid-cols-4">
          <div>
            <p className="text-sm font-medium text-slate-600">Total Revenue</p>
            <p className="mt-3 text-3xl font-bold text-emerald-700">$42,500</p>
            <p className="text-xs text-emerald-600 mt-2">+13.9% from last month</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600">Total Expenses</p>
            <p className="mt-3 text-3xl font-bold text-red-600">$12,300</p>
            <p className="text-xs text-red-600 mt-2">-4% optimized</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600">Net Profit</p>
            <p className="mt-3 text-3xl font-bold text-blue-700">$30,200</p>
            <p className="text-xs text-emerald-600 mt-2">+16.3% increase</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600">Profit Margin</p>
            <p className="mt-3 text-3xl font-bold text-purple-700">71.1%</p>
            <p className="text-xs text-emerald-600 mt-2">+2.1% improvement</p>
          </div>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {financialMetrics.map(report => (
          <div
            key={report.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-ink">{report.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{report.description}</p>
              </div>
              <DollarSign className="h-8 w-8 text-brand-600 opacity-30" />
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

      {/* Financial Chart Preview */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-ink mb-6">Revenue vs Expenses Trend</h3>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="font-medium text-slate-700 mb-3">Monthly Revenue Trend</p>
            <div className="flex items-end justify-around gap-2 h-32">
              {[{ month: 'Jan', value: 38000 }, { month: 'Feb', value: 40200 }, { month: 'Mar', value: 42500 }].map((data, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg"
                    style={{ height: `${(data.value / 45000) * 100}%` }}
                  />
                  <p className="text-xs text-slate-600 mt-2">{data.month}</p>
                  <p className="text-sm font-semibold text-ink">${(data.value / 1000).toFixed(0)}K</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium text-slate-700 mb-3">Monthly Expenses Trend</p>
            <div className="flex items-end justify-around gap-2 h-32">
              {[{ month: 'Jan', value: 10500 }, { month: 'Feb', value: 12100 }, { month: 'Mar', value: 12300 }].map((data, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-red-600 to-red-400 rounded-t-lg"
                    style={{ height: `${(data.value / 15000) * 100}%` }}
                  />
                  <p className="text-xs text-slate-600 mt-2">{data.month}</p>
                  <p className="text-sm font-semibold text-ink">${(data.value / 1000).toFixed(1)}K</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
