'use client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

const trendData = [
  { month: 'Jan', employees: 1200, documents: 450, departures: 32 },
  { month: 'Feb', employees: 1450, documents: 520, departures: 38 },
  { month: 'Mar', employees: 1680, documents: 610, departures: 45 },
  { month: 'Apr', employees: 2100, documents: 720, departures: 52 },
  { month: 'May', employees: 2486, documents: 742, departures: 58 },
];

export function DashboardTrends() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ink">Operational Trends</h1>
        <p className="mt-2 text-slate-500">Monitor agency performance metrics over time</p>
      </div>

      {/* Trend Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Employee Growth</p>
              <p className="mt-2 text-2xl font-bold text-ink">+1,286</p>
              <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> +107% this year
              </p>
            </div>
            <div className="rounded-xl bg-green-100 p-3 text-green-600">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Document Processing</p>
              <p className="mt-2 text-2xl font-bold text-ink">+292</p>
              <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> +65% this year
              </p>
            </div>
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Departure Volume</p>
              <p className="mt-2 text-2xl font-bold text-ink">+26</p>
              <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> +81% this year
              </p>
            </div>
            <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-bold text-ink">Employee & Activity Timeline</h3>
        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
              />
              <Legend />
              <Line type="monotone" dataKey="employees" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              <Line type="monotone" dataKey="documents" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
              <Line type="monotone" dataKey="departures" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-bold text-ink">Monthly Comparison</h3>
        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="employees" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="documents" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="departures" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Period Selector */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink">Filter by Period</h3>
          <div className="flex gap-2">
            {['1M', '3M', '6M', '1Y', 'All'].map((period) => (
              <button
                key={period}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  period === '1Y'
                    ? 'bg-brand-600 text-white'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
