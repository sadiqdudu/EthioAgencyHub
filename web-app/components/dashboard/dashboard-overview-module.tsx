'use client';

import { useState } from 'react';
import { CheckCircle2, Clock, AlertCircle, TrendingUp, Bell, Calendar, Users, FileText } from 'lucide-react';
import Link from 'next/link';

export function DashboardOverviewModule() {
  const quickStats = [
    { label: 'New Employees', value: '12', icon: Users, color: 'bg-blue-100 text-blue-700', href: '/employee-management' },
    { label: 'Pending Documents', value: '8', icon: FileText, color: 'bg-yellow-100 text-yellow-700', href: '/documents' },
    { label: 'Departures Today', value: '3', icon: Calendar, color: 'bg-emerald-100 text-emerald-700', href: '/travel/today' },
    { label: 'Tasks Due', value: '5', icon: Bell, color: 'bg-red-100 text-red-700', href: '/dashboard/tasks' }
  ];

  const dashboardCards = [
    {
      title: 'Tasks',
      description: 'Manage priority operational tasks and follow-ups.',
      href: '/dashboard/tasks',
      icon: CheckCircle2
    },
    {
      title: 'Activities',
      description: 'Review audit-ready activity across the agency workspace.',
      href: '/dashboard/activities',
      icon: TrendingUp
    },
    {
      title: 'Trends',
      description: 'Track agency performance trends across registration, documents, and travel.',
      href: '/dashboard/trends',
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-brand-50 to-blue-50 p-8">
        <h2 className="text-3xl font-bold text-ink">Dashboard</h2>
        <p className="mt-2 text-slate-600">
          Welcome back! Here's your agency overview for today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className={`rounded-2xl p-6 hover:shadow-lg transition-shadow ${stat.color}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium opacity-80">{stat.label}</p>
                  <p className="mt-3 text-3xl font-bold">{stat.value}</p>
                </div>
                <Icon className="h-8 w-8 opacity-30" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Key Alerts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Urgent Items */}
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <h3 className="font-semibold text-red-900">Urgent Items</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-red-800">• 2 employees with expired documents</p>
            <p className="text-sm text-red-800">• 1 visa application rejected</p>
            <p className="text-sm text-red-800">• 3 MOLS submissions overdue</p>
          </div>
          <Link href="/documents/missing-report" className="mt-4 text-sm font-medium text-red-600 hover:text-red-700">
            Review Issues →
          </Link>
        </div>

        {/* Upcoming Events */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Upcoming Events</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-blue-800">• Flight to Saudi Arabia - Feb 15</p>
            <p className="text-sm text-blue-800">• Hajj season registration opens - Feb 20</p>
            <p className="text-sm text-blue-800">• Agency audit scheduled - Feb 28</p>
          </div>
          <Link href="/calendar" className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700">
            View Calendar →
          </Link>
        </div>
      </div>

      {/* Dashboard Sections */}
      <div className="grid gap-4 md:grid-cols-3">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow"
            >
              <Icon className="h-8 w-8 text-brand-600 mb-3" />
              <h3 className="font-semibold text-ink">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{card.description}</p>
              <p className="mt-4 text-xs font-medium text-brand-600">
                Go →
              </p>
            </Link>
          );
        })}
      </div>

      {/* Performance Indicators */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-ink mb-6">Performance Indicators</h3>
        <div className="space-y-4">
          {[
            { label: 'Registration Completion Rate', value: 85, color: 'bg-blue-500' },
            { label: 'Document Verification Speed', value: 72, color: 'bg-emerald-500' },
            { label: 'Deployment Success Rate', value: 92, color: 'bg-purple-500' },
            { label: 'Agent Performance Score', value: 88, color: 'bg-amber-500' }
          ].map((indicator) => (
            <div key={indicator.label}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">{indicator.label}</span>
                <span className="text-sm font-semibold text-ink">{indicator.value}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-200">
                <div
                  className={`h-3 rounded-full transition-all ${indicator.color}`}
                  style={{ width: `${indicator.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-ink mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'New Employee Registered', details: 'Yohannes Tefera', time: '2 hours ago' },
            { action: 'Document Verified', details: 'Senait Assefa - Passport', time: '4 hours ago' },
            { action: 'Travel Scheduled', details: 'Flight SR-123456 to Riyadh', time: '1 day ago' },
            { action: 'CV Generated', details: 'Getnet Kabede - Nurse profile', time: '2 days ago' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-200 last:border-0">
              <div>
                <p className="font-medium text-ink">{item.action}</p>
                <p className="text-sm text-slate-600">{item.details}</p>
              </div>
              <span className="text-xs text-slate-500">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
