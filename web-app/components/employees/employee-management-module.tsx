'use client';

import { useState, useEffect } from 'react';
import { UsersRound, Plus, TrendingUp, FileText, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

interface EmployeeStats {
  total: number;
  registered: number;
  documentReview: number;
  interviewUploaded: number;
  travelReady: number;
  deployed: number;
}

interface RecentEmployee {
  id: string;
  name: string;
  role?: string;
  destination?: string;
  status: string;
  registeredAt: string;
}

export function EmployeeManagementModule() {
  const [stats, setStats] = useState<EmployeeStats>({
    total: 0,
    registered: 0,
    documentReview: 0,
    interviewUploaded: 0,
    travelReady: 0,
    deployed: 0
  });
  const [recentEmployees, setRecentEmployees] = useState<RecentEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setError(null);
      const [statsRes, recentRes] = await Promise.all([
        fetch('/api/employees/stats'),
        fetch('/api/employees?limit=10&sortBy=createdAt&order=desc')
      ]);

      const statsData = await statsRes.json();
      const recentData = await recentRes.json();

      if (statsData.success) {
        setStats(statsData.data);
      } else {
        throw new Error(statsData.error?.message || 'Failed to fetch stats');
      }

      if (recentData.success) {
        setRecentEmployees(recentData.data || []);
      } else {
        throw new Error(recentData.error?.message || 'Failed to fetch recent employees');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data';
      setError(errorMessage);
      console.error('Failed to fetch stats:', error);
      
      // Keep mock data as fallback
      const mockStats: EmployeeStats = {
        total: 156,
        registered: 45,
        documentReview: 28,
        interviewUploaded: 32,
        travelReady: 38,
        deployed: 13
      };

      const mockRecent: RecentEmployee[] = [
        {
          id: '1',
          name: 'Yohannes Tefera',
          role: 'Nurse',
          destination: 'Saudi Arabia',
          status: 'TRAVEL_READY',
          registeredAt: '2024-01-28'
        },
        {
          id: '2',
          name: 'Senait Assefa',
          role: 'Driver',
          destination: 'UAE',
          status: 'INTERVIEW_UPLOADED',
          registeredAt: '2024-01-25'
        },
        {
          id: '3',
          name: 'Getnet Kabede',
          role: 'Security Officer',
          destination: 'Kuwait',
          status: 'DOCUMENT_REVIEW',
          registeredAt: '2024-01-20'
        }
      ];

      setStats(mockStats);
      setRecentEmployees(mockRecent);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REGISTERED':
        return 'bg-blue-100 text-blue-800';
      case 'DOCUMENT_REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'INTERVIEW_UPLOADED':
        return 'bg-purple-100 text-purple-800';
      case 'TRAVEL_READY':
        return 'bg-green-100 text-green-800';
      case 'DEPLOYED':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const deploymentRate = stats.total > 0 
    ? Math.round((stats.deployed / stats.total) * 100)
    : 0;

  const readinessRate = stats.total > 0
    ? Math.round(((stats.travelReady + stats.deployed) / stats.total) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-ink">Employee Management</h2>
            <p className="mt-2 text-slate-600">
              Manage {stats.total} employees. Register workers, generate CVs, match skills to opportunities, and track lifecycle status.
            </p>
          </div>
          <Link
            href="/employee-management/registration/personal"
            className="flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 text-sm font-medium text-white hover:bg-brand-700"
          >
            <Plus className="h-4 w-4" />
            Register Employee
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-600">Deployment Rate</p>
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-ink">{deploymentRate}%</p>
          <p className="mt-2 text-sm text-slate-600">
            {stats.deployed} of {stats.total} deployed
          </p>
          <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-emerald-500 transition-all"
              style={{ width: `${deploymentRate}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-600">Readiness Rate</p>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-ink">{readinessRate}%</p>
          <p className="mt-2 text-sm text-slate-600">
            {stats.travelReady + stats.deployed} ready for travel
          </p>
          <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-blue-500 transition-all"
              style={{ width: `${readinessRate}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-600">In Process</p>
            <Clock className="h-5 w-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-ink">{stats.documentReview + stats.interviewUploaded}</p>
          <p className="mt-2 text-sm text-slate-600">
            Under review or pending
          </p>
          <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-yellow-500 transition-all"
              style={{ width: `${Math.round(((stats.documentReview + stats.interviewUploaded) / stats.total) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Status Grid */}
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {[
          { label: 'Total', value: stats.total, color: 'bg-slate-100 text-slate-700' },
          { label: 'Registered', value: stats.registered, color: 'bg-blue-100 text-blue-700' },
          { label: 'Doc Review', value: stats.documentReview, color: 'bg-yellow-100 text-yellow-700' },
          { label: 'Interview', value: stats.interviewUploaded, color: 'bg-purple-100 text-purple-700' },
          { label: 'Ready', value: stats.travelReady, color: 'bg-green-100 text-green-700' },
          { label: 'Deployed', value: stats.deployed, color: 'bg-emerald-100 text-emerald-700' }
        ].map((item) => (
          <div
            key={item.label}
            className={`rounded-2xl p-4 text-center ${item.color}`}
          >
            <p className="text-2xl font-bold">{item.value}</p>
            <p className="mt-1 text-xs font-medium">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Link
          href="/employee-management/registration/personal"
          className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow"
        >
          <Plus className="h-6 w-6 text-brand-600 mb-3" />
          <h3 className="font-semibold text-ink">New Registration</h3>
          <p className="mt-1 text-sm text-slate-600">Start employee registration</p>
        </Link>

        <Link
          href="/employee-management/profiles"
          className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow"
        >
          <UsersRound className="h-6 w-6 text-brand-600 mb-3" />
          <h3 className="font-semibold text-ink">View Profiles</h3>
          <p className="mt-1 text-sm text-slate-600">Browse all employees</p>
        </Link>

        <Link
          href="/employee-management/cv-generator"
          className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow"
        >
          <FileText className="h-6 w-6 text-brand-600 mb-3" />
          <h3 className="font-semibold text-ink">Generate CV</h3>
          <p className="mt-1 text-sm text-slate-600">Create professional CVs</p>
        </Link>

        <Link
          href="/employee-management/cv-database"
          className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow"
        >
          <TrendingUp className="h-6 w-6 text-brand-600 mb-3" />
          <h3 className="font-semibold text-ink">CV Database</h3>
          <p className="mt-1 text-sm text-slate-600">Search and filter CVs</p>
        </Link>
      </div>

      {/* Error Display */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-2 text-red-700">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Error loading data</span>
          </div>
          <p className="mt-1 text-sm text-red-600">{error}</p>
          <button
            onClick={fetchStats}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Recent Employees */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-ink mb-4">Recent Registrations</h3>
        <div className="space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
            </div>
          ) : recentEmployees.length === 0 ? (
            <p className="text-center text-slate-500 py-4">No recent employees</p>
          ) : (
            recentEmployees.map((emp) => (
              <div
                key={emp.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-ink">{emp.name}</p>
                  <p className="text-sm text-slate-600">
                    {emp.role} • {emp.destination}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(emp.status)}`}>
                  {emp.status.replace(/_/g, ' ')}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
