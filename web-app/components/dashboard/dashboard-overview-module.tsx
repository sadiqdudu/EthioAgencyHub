'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Clock, AlertCircle, TrendingUp, Bell, Calendar, Users, FileText, Building2, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  newEmployees: number;
  pendingDocuments: number;
  departuresToday: number;
  tasksDue: number;
  totalEmployees: number;
  totalAgencies: number;
}

interface Agency {
  id: string;
  name: string;
}

export function DashboardOverviewModule() {
  const [stats, setStats] = useState<DashboardStats>({
    newEmployees: 0,
    pendingDocuments: 0,
    departuresToday: 0,
    tasksDue: 0,
    totalEmployees: 0,
    totalAgencies: 0
  });
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [selectedAgency, setSelectedAgency] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgencies();
  }, []);

  useEffect(() => {
    fetchStats();
  }, [selectedAgency]);

  const fetchAgencies = async () => {
    try {
      const response = await fetch('/api/employees/stats');
      const data = await response.json();
      if (data.success && data.agencies) {
        setAgencies(data.agencies);
      }
    } catch (error) {
      console.error('Failed to fetch agencies:', error);
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const url = selectedAgency === 'all' 
        ? '/api/employees/stats' 
        : `/api/employees/stats?agencyId=${selectedAgency}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setStats({
          newEmployees: data.stats?.newEmployees || 0,
          pendingDocuments: data.stats?.pendingDocuments || 0,
          departuresToday: data.stats?.departuresToday || 0,
          tasksDue: data.stats?.tasksDue || 0,
          totalEmployees: data.stats?.totalEmployees || 0,
          totalAgencies: data.stats?.totalAgencies || 0
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickStats = [
    { label: 'New Employees', value: stats.newEmployees, icon: Users, color: 'bg-blue-100 text-blue-700', href: '/employee-management' },
    { label: 'Pending Documents', value: stats.pendingDocuments, icon: FileText, color: 'bg-yellow-100 text-yellow-700', href: '/documents' },
    { label: 'Departures Today', value: stats.departuresToday, icon: Calendar, color: 'bg-emerald-100 text-emerald-700', href: '/travel/today' },
    { label: 'Tasks Due', value: stats.tasksDue, icon: Bell, color: 'bg-red-100 text-red-700', href: '/dashboard/tasks' }
  ];

  const dashboardCards = [
    { title: 'Tasks', description: 'Manage priority operational tasks and follow-ups.', href: '/dashboard/tasks', icon: CheckCircle2 },
    { title: 'Activities', description: 'Review audit-ready activity across the agency workspace.', href: '/dashboard/activities', icon: TrendingUp },
    { title: 'Trends', description: 'Track agency performance trends across registration, documents, and travel.', href: '/dashboard/trends', icon: TrendingUp }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section with Agency Filter */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-brand-50 to-blue-50 p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-ink">Dashboard</h2>
            <p className="mt-2 text-slate-600">
              Welcome back! Here&apos;s your {selectedAgency === 'all' ? 'global' : 'agency'} overview for today.
            </p>
          </div>
          
          {/* Agency Filter */}
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-slate-400" />
            <select
              value={selectedAgency}
              onChange={(e) => setSelectedAgency(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium focus:border-brand-600 focus:outline-none"
            >
              <option value="all">All Agencies</option>
              {agencies.map((agency) => (
                <option key={agency.id} value={agency.id}>
                  {agency.name}
                </option>
              ))}
            </select>
            <button
              onClick={fetchStats}
              className="rounded-xl border border-slate-200 p-2 hover:bg-slate-50"
              title="Refresh data"
            >
              <RefreshCw className={`h-4 w-4 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
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
                  <p className="mt-3 text-3xl font-bold">
                    {loading ? '-' : stat.value}
                  </p>
                </div>
                <Icon className="h-8 w-8 opacity-30" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Summary Stats */}
      {selectedAgency !== 'all' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="font-semibold text-ink mb-4">Agency Statistics</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-600">Total Employees</span>
              <span className="text-2xl font-bold text-ink">{stats.totalEmployees}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-600">Active Agencies</span>
              <span className="text-2xl font-bold text-ink">{stats.totalAgencies}</span>
            </div>
          </div>
        </div>
      )}

      {/* Key Alerts */}
      <div className="grid gap-4 md:grid-cols-2">
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
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-slate-600" />
            <h3 className="font-semibold text-ink">Pending Approvals</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-slate-700">• 5 employee registrations awaiting review</p>
            <p className="text-sm text-slate-700">• 2 document uploads pending verification</p>
            <p className="text-sm text-slate-700">• 8 travel bookings need confirmation</p>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-brand-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-brand-100 p-3 text-brand-600 group-hover:bg-brand-200">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-ink group-hover:text-brand-700">{card.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{card.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="font-semibold text-ink mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-sm text-slate-600">New employee registered</span>
            <span className="text-xs text-slate-400">2 minutes ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-sm text-slate-600">Document uploaded for passport</span>
            <span className="text-xs text-slate-400">15 minutes ago</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-slate-600">Travel booking confirmed</span>
            <span className="text-xs text-slate-400">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}