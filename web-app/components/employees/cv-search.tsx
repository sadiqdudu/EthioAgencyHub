'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Users, X } from 'lucide-react';
import { EmployeeCardGrid } from './employee-card';

interface Employee {
  id: string;
  name: string;
  role?: string;
  destination?: string;
  status: string;
  selectedByAgent?: string | null;
  selectedAt?: string | null;
  createdAt: string;
  _count?: { documents: number; travels: number };
}

interface CvSearchProps {
  agentId?: string;
  viewOnly?: boolean;
  onSelect?: (employeeId: string) => void;
}

export function CvSearch({ agentId, viewOnly = false, onSelect }: CvSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ status: '', destination: '' });
  const [showFilters, setShowFilters] = useState(false);

  const search = async (nextQuery = query, nextFilters = filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (nextQuery) params.set('q', nextQuery);
      if (nextFilters.status) params.set('status', nextFilters.status);
      if (nextFilters.destination) params.set('destination', nextFilters.destination);
      
      const res = await fetch(`/api/employees?${params.toString()}`);
      const data = await res.json();
      
      let employees = data.success ? data.data || [] : [];
      
      if (viewOnly && agentId) {
        employees = employees.filter((e: Employee) => 
          !e.selectedByAgent || e.selectedByAgent === agentId
        );
      }
      
      setResults(employees);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search();
  }, []);

  const clearFilters = () => {
    const emptyFilters = { status: '', destination: '' };
    setFilters(emptyFilters);
    search(query, emptyFilters);
  };

  const statuses = ['REGISTERED', 'DOCUMENT_REVIEW', 'MOLS_PENDING', 'INTERVIEW_UPLOADED', 'TRAVEL_READY', 'DEPLOYED'];
  const destinations = ['Germany', 'UK', 'Saudi Arabia', 'Qatar', 'UAE', 'USA', 'Canada'];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && search()}
              placeholder="Search by name, role, or destination..."
              className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 font-medium transition-colors ${
              showFilters ? 'border-brand-600 bg-brand-50 text-brand-600' : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
          <button
            onClick={search}
            disabled={loading}
            className="rounded-xl bg-brand-600 px-6 py-2.5 font-medium text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 flex flex-wrap gap-4 rounded-xl bg-slate-50 p-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="rounded-lg border border-slate-200 px-3 py-2"
              >
                <option value="">All Statuses</option>
                {statuses.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Destination</label>
              <select
                value={filters.destination}
                onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                className="rounded-lg border border-slate-200 px-3 py-2"
              >
                <option value="">All Destinations</option>
                {destinations.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            {(filters.status || filters.destination) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 self-end rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            )}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">
            {viewOnly ? 'My Selected Employees' : 'CV Database'}
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Users className="h-4 w-4" />
            {results.length} employee{results.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
          </div>
        ) : results.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            No employees found. Try adjusting your search criteria.
          </div>
        ) : (
          <EmployeeCardGrid
            employees={results}
            agentId={agentId || ''}
            onSelect={onSelect}
            viewOnly={viewOnly}
          />
        )}
      </section>
    </div>
  );
}
