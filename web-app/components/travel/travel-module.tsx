'use client';

import { useState, useEffect } from 'react';
import { Plane, Calendar, MapPin, Users, Ticket, CheckCircle2, ArrowRight, Search, X, Plus, Filter, Clock, Globe, Map, Bus, Home, Building2 } from 'lucide-react';
import Link from 'next/link';

interface TravelStats {
  totalDepartures: number;
  scheduledDepartures: number;
  employeesTraveling: number;
  ticketsIssued: number;
  pendingTickets: number;
  completedTrips: number;
}

interface Departure {
  id: string;
  date: string;
  destination: string;
  country: string;
  employees: number;
  status: 'ready' | 'partial' | 'planning' | 'completed';
  airline?: string;
}

interface Employee {
  id: string;
  name: string;
  destination: string;
  status: string;
  departureDate?: string;
}

export function TravelModule() {
  const [stats, setStats] = useState<TravelStats>({
    totalDepartures: 0,
    scheduledDepartures: 0,
    employeesTraveling: 0,
    ticketsIssued: 0,
    pendingTickets: 0,
    completedTrips: 0
  });
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchTravelData();
  }, []);

  const fetchTravelData = async () => {
    setLoading(true);
    try {
      const [statsRes, employeesRes] = await Promise.all([
        fetch('/api/travel/stats'),
        fetch('/api/employees?status=TRAVEL_READY')
      ]);

      const statsData = await statsRes.json();
      const employeesData = await employeesRes.json();

      if (statsData.success) {
        setStats(statsData.data);
      }

      // Mock departures based on employees
      if (employeesData.success && employeesData.data) {
        const mockDepartures: Departure[] = [
          { id: '1', date: '2026-05-12', destination: 'Riyadh', country: 'Saudi Arabia', employees: 12, status: 'ready', airline: 'Saudi Arabia Airlines' },
          { id: '2', date: '2026-05-15', destination: 'Dubai', country: 'UAE', employees: 8, status: 'partial', airline: 'Emirates' },
          { id: '3', date: '2026-05-18', destination: 'Doha', country: 'Qatar', employees: 6, status: 'planning', airline: 'Qatar Airways' },
          { id: '4', date: '2026-05-22', destination: 'Kuwait City', country: 'Kuwait', employees: 5, status: 'planning', airline: 'Kuwait Airways' },
        ];
        setDepartures(mockDepartures);
        
        // Update employees traveling count
        setStats(prev => ({
          ...prev,
          employeesTraveling: employeesData.data.length,
          scheduledDepartures: mockDepartures.filter(d => d.status !== 'completed').length,
          ticketsIssued: Math.floor(employeesData.data.length * 0.85),
          pendingTickets: employeesData.data.length - Math.floor(employeesData.data.length * 0.85)
        }));
      }
    } catch (error) {
      console.error('Failed to fetch travel data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDepartures = departures.filter(dep => {
    const matchesSearch = searchQuery.trim() === '' || 
      dep.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dep.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || dep.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-700 border-green-200';
      case 'partial': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'planning': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ready': return 'Ready to Travel';
      case 'partial': return 'Partial Ready';
      case 'planning': return 'In Planning';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink">Travel Management</h1>
          <p className="mt-2 text-slate-500">Coordinate employee travel, tickets, and departure readiness</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/travel/schedule"
            className="flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
          >
            <Plus className="h-4 w-4" />
            Schedule Trip
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
              <Plane className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-green-600">+8%</span>
          </div>
          <p className="text-3xl font-bold text-ink">{stats.scheduledDepartures}</p>
          <p className="mt-1 text-sm text-slate-500">Scheduled Departures</p>
          <p className="mt-2 text-xs text-orange-600">{stats.employeesTraveling} employees ready</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <Calendar className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-blue-600">Next 7 days</span>
          </div>
          <p className="text-3xl font-bold text-ink">{stats.scheduledDepartures}</p>
          <p className="mt-1 text-sm text-slate-500">Upcoming Trips</p>
          <p className="mt-2 text-xs text-blue-600">View calendar →</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <Ticket className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-green-600">+15%</span>
          </div>
          <p className="text-3xl font-bold text-ink">{stats.ticketsIssued}</p>
          <p className="mt-1 text-sm text-slate-500">Tickets Issued</p>
          <p className="mt-2 text-xs text-amber-600">{stats.pendingTickets} pending approval</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg bg-purple-100 p-3 text-purple-600">
              <Globe className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-purple-600">Active</span>
          </div>
          <p className="text-3xl font-bold text-ink">{stats.completedTrips}</p>
          <p className="mt-1 text-sm text-slate-500">Completed Trips</p>
          <p className="mt-2 text-xs text-slate-500">This year</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/travel/schedule" className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-orange-300 hover:bg-orange-50/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="rounded-xl bg-orange-100 p-3 text-orange-600 group-hover:bg-orange-200">
              <Calendar className="h-6 w-6" />
            </div>
            <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-orange-500 transition-colors" />
          </div>
          <p className="font-bold text-ink">Schedule</p>
          <p className="text-xs text-slate-500 mt-1">Plan new travel dates</p>
        </Link>
        <Link href="/travel/ticket" className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-orange-300 hover:bg-orange-50/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600 group-hover:bg-blue-200">
              <Ticket className="h-6 w-6" />
            </div>
            <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
          </div>
          <p className="font-bold text-ink">Tickets</p>
          <p className="text-xs text-slate-500 mt-1">Manage bookings</p>
        </Link>
        <Link href="/travel/today" className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-orange-300 hover:bg-orange-50/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="rounded-xl bg-green-100 p-3 text-green-600 group-hover:bg-green-200">
              <Plane className="h-6 w-6" />
            </div>
            <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-green-500 transition-colors" />
          </div>
          <p className="font-bold text-ink">Today</p>
          <p className="text-xs text-slate-500 mt-1">Today's departures</p>
        </Link>
        <Link href="/travel/departure" className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-orange-300 hover:bg-orange-50/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="rounded-xl bg-purple-100 p-3 text-purple-600 group-hover:bg-purple-200">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-purple-500 transition-colors" />
          </div>
          <p className="font-bold text-ink">Departure Prep</p>
          <p className="text-xs text-slate-500 mt-1">Readiness checklist</p>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by destination, country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-10 text-sm focus:border-brand-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="ready">Ready</option>
              <option value="partial">Partial</option>
              <option value="planning">Planning</option>
            </select>
          </div>
        </div>
      </div>

      {/* Upcoming Departures Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink">Upcoming Departures</h3>
          <span className="text-sm text-slate-500">{filteredDepartures.length} trips found</span>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          </div>
        ) : filteredDepartures.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No departures found matching your criteria
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredDepartures.map((departure) => (
              <div key={departure.id} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="rounded-xl bg-orange-100 p-3">
                    <Plane className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-bold text-ink">{departure.destination}, {departure.country}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(departure.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {departure.employees} employees
                      </span>
                      {departure.airline && (
                        <span className="flex items-center gap-1">
                          <Ticket className="h-3 w-3" />
                          {departure.airline}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(departure.status)}`}>
                    {getStatusLabel(departure.status)}
                  </span>
                  <Link
                    href={`/travel/${departure.id}`}
                    className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Journey Progress Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-blue-100 p-2">
              <Home className="h-5 w-5 text-blue-600" />
            </div>
            <h4 className="font-bold text-ink">Home Pickup</h4>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-500">Completion</span>
            <span className="font-semibold text-green-600">78%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
          </div>
          <p className="text-xs text-slate-500 mt-3">32 of 45 employees picked up</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-amber-100 p-2">
              <Building2 className="h-5 w-5 text-amber-600" />
            </div>
            <h4 className="font-bold text-ink">Bole Handover</h4>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-500">Completion</span>
            <span className="font-semibold text-amber-600">62%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-amber-500 h-2 rounded-full" style={{ width: '62%' }}></div>
          </div>
          <p className="text-xs text-slate-500 mt-3">28 of 45 employees handed over</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-green-100 p-2">
              <Globe className="h-5 w-5 text-green-600" />
            </div>
            <h4 className="font-bold text-ink">Abroad Agent</h4>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-500">Completion</span>
            <span className="font-semibold text-green-600">45%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <p className="text-xs text-slate-500 mt-3">12 of 45 confirmed received</p>
        </div>
      </div>
    </div>
  );
}