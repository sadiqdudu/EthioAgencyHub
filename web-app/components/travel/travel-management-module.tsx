'use client';

import { useState, useEffect } from 'react';
import { Plane, Calendar, Users, MapPin, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Travel {
  id: string;
  employeeId: string;
  destination: string;
  departureAt: string;
  status: string;
  ticket?: string;
}

export function TravelManagementModule() {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [filteredTravels, setFilteredTravels] = useState<Travel[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTravels();
  }, []);

  useEffect(() => {
    filterTravels();
  }, [travels, statusFilter]);

  const fetchTravels = async () => {
    try {
      const mockTravels: Travel[] = [
        {
          id: '1',
          employeeId: 'emp1',
          destination: 'Saudi Arabia',
          departureAt: '2024-02-15',
          status: 'SCHEDULED',
          ticket: 'SR-123456'
        },
        {
          id: '2',
          employeeId: 'emp2',
          destination: 'UAE',
          departureAt: '2024-02-20',
          status: 'TICKETED',
          ticket: 'EM-789012'
        },
        {
          id: '3',
          employeeId: 'emp3',
          destination: 'Qatar',
          departureAt: '2024-02-25',
          status: 'READY',
          ticket: 'QT-345678'
        }
      ];
      setTravels(mockTravels);
    } catch (error) {
      console.error('Failed to fetch travels:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTravels = () => {
    let filtered = travels;

    if (statusFilter !== 'all') {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    setFilteredTravels(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800';
      case 'TICKETED':
        return 'bg-purple-100 text-purple-800';
      case 'READY':
        return 'bg-emerald-100 text-emerald-800';
      case 'DEPARTED':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'READY':
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case 'SCHEDULED':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Plane className="h-5 w-5 text-slate-500" />;
    }
  };

  const upcomingDepartures = travels.filter(
    (t) => new Date(t.departureAt) > new Date()
  ).length;

  const travelStatuses = ['SCHEDULED', 'TICKETED', 'READY', 'DEPARTED', 'ARRIVED', 'CANCELLED'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-ink">Travel Management</h2>
        <p className="mt-2 text-slate-600">
          Manage {filteredTravels.length} travel records. Coordinate flights, ticketing, and pre-departure readiness.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Travels</p>
              <p className="mt-2 text-2xl font-bold text-ink">{travels.length}</p>
            </div>
            <Plane className="h-8 w-8 text-brand-600 opacity-20" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Upcoming</p>
              <p className="mt-2 text-2xl font-bold text-brand-600">{upcomingDepartures}</p>
            </div>
            <Calendar className="h-8 w-8 text-brand-600 opacity-20" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Ticketed</p>
              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {travels.filter((t) => t.status === 'TICKETED').length}
              </p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-emerald-600 opacity-20" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Ready to Depart</p>
              <p className="mt-2 text-2xl font-bold text-blue-600">
                {travels.filter((t) => t.status === 'READY').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-600 focus:outline-none"
        >
          <option value="all">All Status</option>
          {travelStatuses.map((status) => (
            <option key={status} value={status}>
              {status.replace(/_/g, ' ')}
            </option>
          ))}
        </select>

        <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50">
          <Calendar className="h-4 w-4" />
          View Calendar
        </button>

        <button className="flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
          <Plane className="h-4 w-4" />
          Plan New Departure
        </button>
      </div>

      {/* Travel List */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <div className="col-span-full py-8 text-center text-slate-500">Loading travels...</div>
        ) : filteredTravels.length === 0 ? (
          <div className="col-span-full py-8 text-center text-slate-500">No travels found</div>
        ) : (
          filteredTravels.map((travel) => (
            <div
              key={travel.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-brand-600" />
                    <h3 className="font-semibold text-ink">{travel.destination}</h3>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">Employee: {travel.employeeId}</p>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(travel.status)}`}>
                  {getStatusIcon(travel.status)}
                  {travel.status}
                </span>
              </div>

              <div className="space-y-2 border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Departure:</span>
                  <span className="font-medium">{new Date(travel.departureAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Ticket:</span>
                  <span className="font-medium font-mono">{travel.ticket || 'Pending'}</span>
                </div>
              </div>

              <button className="mt-4 w-full rounded-lg border border-brand-600 px-3 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50">
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
