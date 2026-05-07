'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye } from 'lucide-react';
import Link from 'next/link';

interface Employee {
  id: string;
  firstName?: string;
  lastName?: string;
  name: string;
  email?: string;
  role?: string;
  destination?: string;
  status: string;
  createdAt: string;
}

export function EmployeeProfilesComponent() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [destinationFilter, setDestinationFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [employees, searchQuery, statusFilter, destinationFilter]);

  const fetchEmployees = async () => {
    try {
      setError(null);
      const res = await fetch('/api/employees?limit=100');
      const data = await res.json();
      if (data.success && data.data) {
        setEmployees(data.data);
      } else {
        throw new Error(data.error?.message || 'Failed to fetch employees');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch employees';
      setError(errorMessage);
      console.error('Failed to fetch employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterEmployees = () => {
    let filtered = employees;

    if (searchQuery) {
      filtered = filtered.filter((emp) =>
        (emp.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         emp.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         emp.role?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((emp) => emp.status === statusFilter);
    }

    if (destinationFilter !== 'all') {
      filtered = filtered.filter((emp) => emp.destination === destinationFilter);
    }

    setFilteredEmployees(filtered);
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map((emp) => emp.id));
    }
  };

  const handleSelectEmployee = (id: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'REGISTERED', label: 'Registered' },
    { value: 'DOCUMENT_REVIEW', label: 'Document Review' },
    { value: 'INTERVIEW_UPLOADED', label: 'Interview Uploaded' },
    { value: 'TRAVEL_READY', label: 'Travel Ready' },
    { value: 'DEPLOYED', label: 'Deployed' }
  ];

  const destinationOptions = [
    'all',
    ...Array.from(new Set(employees.map((emp) => emp.destination).filter(Boolean))) as string[]
  ];

  const exportEmployees = () => {
    if (filteredEmployees.length === 0) return;
    const lines = [
      'Name,Email,Role,Destination,Status,Registered Date',
      ...filteredEmployees.map((emp) =>
        [
          `"${(emp.name || '').replace(/"/g, '""')}"`,
          `"${(emp.email || '').replace(/"/g, '""')}"`,
          `"${(emp.role || '').replace(/"/g, '""')}"`,
          `"${(emp.destination || '').replace(/"/g, '""')}"`,
          `"${emp.status}"`,
          `"${new Date(emp.createdAt).toISOString()}"`
        ].join(',')
      )
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `employee-profiles-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage('Employee profiles exported successfully.');
  };

  return (
    <div className="space-y-6">
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
            onClick={fetchEmployees}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-ink">Employee Profiles</h2>
        <p className="mt-2 text-slate-600">
          Browse and manage {filteredEmployees.length} employee profiles. View details, documents, and travel history.
        </p>
      </div>

      {/* Controls */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-sm focus:border-brand-600 focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-600 focus:outline-none"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => {
            setStatusFilter('all');
            setDestinationFilter('all');
            setSearchQuery('');
          }}
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          <Filter className="h-4 w-4" />
          Reset Filters
        </button>

        <button
          type="button"
          onClick={exportEmployees}
          disabled={filteredEmployees.length === 0}
          className="flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>
      {message ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {message}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-4">
        <select
          value={destinationFilter}
          onChange={(e) => setDestinationFilter(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-600 focus:outline-none"
        >
          {destinationOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt === 'all' ? 'All Destinations' : opt}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-3">
                <input
                  type="checkbox"
                  checked={
                    selectedEmployees.length === filteredEmployees.length &&
                    filteredEmployees.length > 0
                  }
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-slate-300"
                />
              </th>
              <th className="px-6 py-3 font-semibold text-ink">Name</th>
              <th className="px-6 py-3 font-semibold text-ink">Email</th>
              <th className="px-6 py-3 font-semibold text-ink">Role</th>
              <th className="px-6 py-3 font-semibold text-ink">Destination</th>
              <th className="px-6 py-3 font-semibold text-ink">Status</th>
              <th className="px-6 py-3 font-semibold text-ink">Registered</th>
              <th className="px-6 py-3 font-semibold text-ink">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                  Loading employees...
                </td>
              </tr>
            ) : filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                  No employees found
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(emp.id)}
                      onChange={() => handleSelectEmployee(emp.id)}
                      className="h-4 w-4 rounded border-slate-300"
                    />
                  </td>
                  <td className="px-6 py-3 font-medium text-ink">{emp.name}</td>
                  <td className="px-6 py-3 text-slate-600">{emp.email || '-'}</td>
                  <td className="px-6 py-3 text-slate-600">{emp.role || '-'}</td>
                  <td className="px-6 py-3 text-slate-600">{emp.destination || '-'}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(emp.status)}`}>
                      {emp.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-slate-500">
                    {new Date(emp.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/employee-management/${emp.id}`} className="p-1 hover:bg-slate-100 rounded">
                        <Eye className="h-4 w-4 text-slate-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-600">
          Showing {filteredEmployees.length} of {employees.length} employees
        </p>
        <div className="flex gap-2">
          <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">Previous</button>
          <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">Next</button>
        </div>
      </div>
    </div>
  );
}
