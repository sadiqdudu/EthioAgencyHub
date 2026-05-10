'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Plane, Globe, ChevronDown, CheckCircle2, Search, X, Plus, Filter, Clock, Ticket, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface ScheduleItem {
  id: string;
  date: string;
  country: string;
  city: string;
  employees: string[];
  status: 'confirmed' | 'pending' | 'planning';
  airline: string;
  agencyWorker: string;
  tasks: string[];
  employeeIds: string[];
}

export function TravelSchedule() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/travel/schedule');
      const data = await response.json();
      
      if (data.success && data.data) {
        setSchedule(data.data);
      } else {
        // Mock data fallback
        setSchedule([
          { id: '1', date: '2026-05-12', country: 'Saudi Arabia', city: 'Riyadh', employees: ['Mekdes Tesfaye', 'Aster Yilma', 'Dawit Alemu'], status: 'confirmed', airline: 'Saudi Arabia Airlines', agencyWorker: 'Solomon K.', tasks: ['Distribute Travel Packets', 'Airport Check-in Escort', 'Final Briefing'], employeeIds: ['1', '2', '3'] },
          { id: '2', date: '2026-05-15', country: 'UAE', city: 'Dubai', employees: ['Hana Bekele', 'Selamawit Tadesse'], status: 'pending', airline: 'Emirates', agencyWorker: 'Aster M.', tasks: ['Collect Visas from Embassy', 'Home Pickup', 'Bole Drop-off'], employeeIds: ['4', '5'] },
          { id: '3', date: '2026-05-18', country: 'Qatar', city: 'Doha', employees: ['Rahel Tadesse'], status: 'confirmed', airline: 'Qatar Airways', agencyWorker: 'Dawit T.', tasks: ['PCR Test Verification', 'Provide Sim Card', 'Boarding Assist'], employeeIds: ['6'] },
          { id: '4', date: '2026-05-22', country: 'Kuwait', city: 'Kuwait City', employees: ['Sara Lemma', 'Betelhem Kassahun'], status: 'planning', airline: 'Kuwait Airways', agencyWorker: 'Unassigned', tasks: ['Confirm Flight Booking', 'Medical Final Review'], employeeIds: ['7', '8'] },
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch schedule:', error);
      // Use mock data
      setSchedule([
        { id: '1', date: '2026-05-12', country: 'Saudi Arabia', city: 'Riyadh', employees: ['Mekdes Tesfaye', 'Aster Yilma', 'Dawit Alemu'], status: 'confirmed', airline: 'Saudi Arabia Airlines', agencyWorker: 'Solomon K.', tasks: ['Distribute Travel Packets', 'Airport Check-in Escort', 'Final Briefing'], employeeIds: ['1', '2', '3'] },
        { id: '2', date: '2026-05-15', country: 'UAE', city: 'Dubai', employees: ['Hana Bekele', 'Selamawit Tadesse'], status: 'pending', airline: 'Emirates', agencyWorker: 'Aster M.', tasks: ['Collect Visas from Embassy', 'Home Pickup', 'Bole Drop-off'], employeeIds: ['4', '5'] },
        { id: '3', date: '2026-05-18', country: 'Qatar', city: 'Doha', employees: ['Rahel Tadesse'], status: 'confirmed', airline: 'Qatar Airways', agencyWorker: 'Dawit T.', tasks: ['PCR Test Verification', 'Provide Sim Card', 'Boarding Assist'], employeeIds: ['6'] },
        { id: '4', date: '2026-05-22', country: 'Kuwait', city: 'Kuwait City', employees: ['Sara Lemma', 'Betelhem Kassahun'], status: 'planning', airline: 'Kuwait Airways', agencyWorker: 'Unassigned', tasks: ['Confirm Flight Booking', 'Medical Final Review'], employeeIds: ['7', '8'] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredSchedule = schedule.filter(item => {
    const matchesSearch = searchQuery.trim() === '' || 
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.airline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.agencyWorker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'planning': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'planning': return 'Planning';
      default: return status;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink">Travel Schedule & Assignments</h1>
          <p className="mt-2 text-slate-500">Manage departures by country, assigned employees, and agency worker tasks</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700">
          <Plus className="h-4 w-4" />
          Add Departure
        </button>
      </div>

      {/* Search and Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by country, city, airline, agent..."
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
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="planning">Planning</option>
            </select>
          </div>
        </div>
      </div>

      {/* Schedule List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink">Scheduled Departures</h3>
          <span className="text-sm text-slate-500">{filteredSchedule.length} trips</span>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          </div>
        ) : filteredSchedule.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No departures found matching your criteria
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredSchedule.map((item) => (
              <div key={item.id} className="bg-white">
                {/* Header - Click to expand */}
                <div 
                  className="flex items-center justify-between p-6 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-ink">{item.city}, {item.country}</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                          {getStatusLabel(item.status)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Plane className="h-3 w-3" />
                          {item.airline}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {item.employees.length} employees
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-sm font-medium text-slate-700">{item.agencyWorker}</p>
                      <p className="text-xs text-slate-500">Assigned Agent</p>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${expandedId === item.id ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === item.id && (
                  <div className="px-6 pb-6 border-t border-slate-100 bg-slate-50/50">
                    <div className="grid gap-6 md:grid-cols-3 pt-4">
                      {/* Employees */}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Employees ({item.employees.length})
                        </h4>
                        <div className="space-y-2">
                          {item.employees.map((emp, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                              {emp}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tasks */}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Agent Tasks
                        </h4>
                        <div className="space-y-2">
                          {item.tasks.map((task, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm">
                              <div className="mt-1 h-2 w-2 rounded-full bg-slate-300"></div>
                              {task}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                          <ArrowRight className="h-4 w-4" />
                          Actions
                        </h4>
                        <div className="space-y-2">
                          <button className="w-full text-left text-sm text-orange-600 hover:text-orange-800">
                            → Edit Departure Details
                          </button>
                          <button className="w-full text-left text-sm text-orange-600 hover:text-orange-800">
                            → Manage Tickets
                          </button>
                          <button className="w-full text-left text-sm text-orange-600 hover:text-orange-800">
                            → View Employee Documents
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}