'use client';

import { useState, useEffect } from 'react';
import { Plane, Users, Clock, Search, X, MapPin, Ticket, Building2, Globe, Phone, CheckCircle2, AlertCircle } from 'lucide-react';

interface TodayDeparture {
  id: string;
  name: string;
  country: string;
  destination: string;
  flightTime: string;
  airline: string;
  status: 'checked_in' | 'boarding' | 'departed' | 'pending';
  gate?: string;
  passportNumber?: string;
  phone?: string;
}

export function TravelToday() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departures, setDepartures] = useState<TodayDeparture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayDepartures();
  }, []);

  const fetchTodayDepartures = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/travel/today');
      const data = await response.json();
      
      if (data.success && data.data) {
        setDepartures(data.data);
      } else {
        // Mock data
        setDepartures([
          { id: 'EMP-101', name: 'Mekdes Tesfaye', country: 'Saudi Arabia', destination: 'Riyadh', flightTime: '08:00 AM', airline: 'Saudi Arabia Airlines', status: 'checked_in', gate: 'A12', passportNumber: 'EP1234567', phone: '+251912345678' },
          { id: 'EMP-102', name: 'Hana Bekele', country: 'UAE', destination: 'Dubai', flightTime: '02:30 PM', airline: 'Emirates', status: 'boarding', gate: 'B05', passportNumber: 'EP2345678', phone: '+251912345679' },
          { id: 'EMP-103', name: 'Selamawit Alemu', country: 'Qatar', destination: 'Doha', flightTime: '06:45 PM', airline: 'Qatar Airways', status: 'pending', passportNumber: 'EP3456789', phone: '+251912345680' },
          { id: 'EMP-104', name: 'Rahel Tadesse', country: 'Kuwait', destination: 'Kuwait City', flightTime: '11:59 PM', airline: 'Kuwait Airways', status: 'pending', passportNumber: 'EP4567890', phone: '+251912345681' },
          { id: 'EMP-105', name: 'Yohannes Demeke', country: 'Saudi Arabia', destination: 'Jeddah', flightTime: '08:00 AM', airline: 'Saudi Arabia Airlines', status: 'departed', gate: 'A12', passportNumber: 'EP5678901', phone: '+251912345682' },
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch today departures:', error);
      setDepartures([
        { id: 'EMP-101', name: 'Mekdes Tesfaye', country: 'Saudi Arabia', destination: 'Riyadh', flightTime: '08:00 AM', airline: 'Saudi Arabia Airlines', status: 'checked_in', gate: 'A12', passportNumber: 'EP1234567', phone: '+251912345678' },
        { id: 'EMP-102', name: 'Hana Bekele', country: 'UAE', destination: 'Dubai', flightTime: '02:30 PM', airline: 'Emirates', status: 'boarding', gate: 'B05', passportNumber: 'EP2345678', phone: '+251912345679' },
        { id: 'EMP-103', name: 'Selamawit Alemu', country: 'Qatar', destination: 'Doha', flightTime: '06:45 PM', airline: 'Qatar Airways', status: 'pending', passportNumber: 'EP3456789', phone: '+251912345680' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredDepartures = departures.filter(dep => 
    dep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dep.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dep.flightTime.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'departed': return 'bg-slate-100 text-slate-600';
      case 'boarding': return 'bg-green-100 text-green-700';
      case 'checked_in': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'departed': return 'Departed';
      case 'boarding': return 'Boarding';
      case 'checked_in': return 'Checked In';
      case 'pending': return 'Pending';
      default: return status;
    }
  };

  const stats = {
    total: departures.length,
    pending: departures.filter(d => d.status === 'pending').length,
    checkedIn: departures.filter(d => d.status === 'checked_in').length,
    boarding: departures.filter(d => d.status === 'boarding').length,
    departed: departures.filter(d => d.status === 'departed').length
  };

  const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink">Today's Departures</h1>
          <p className="mt-2 text-slate-500">Live tracking of employees departing today from Bole International Airport</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">Current Time</p>
          <p className="text-2xl font-bold text-ink">{currentTime}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
          <p className="text-3xl font-bold text-ink">{stats.total}</p>
          <p className="text-sm text-slate-500">Total Departures</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center">
          <p className="text-3xl font-bold text-amber-700">{stats.pending}</p>
          <p className="text-sm text-amber-600">Pending</p>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-center">
          <p className="text-3xl font-bold text-blue-700">{stats.checkedIn}</p>
          <p className="text-sm text-blue-600">Checked In</p>
        </div>
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-center">
          <p className="text-3xl font-bold text-green-700">{stats.boarding}</p>
          <p className="text-sm text-green-600">Boarding</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
          <p className="text-3xl font-bold text-slate-700">{stats.departed}</p>
          <p className="text-sm text-slate-500">Departed</p>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, country, flight time..."
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
      </div>

      {/* Departures List */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink">Departing Today</h3>
          <span className="text-sm text-slate-500">{filteredDepartures.length} passengers</span>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          </div>
        ) : filteredDepartures.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No departures found for today
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredDepartures.map((dep) => (
              <div key={dep.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Employee Info */}
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-lg">
                      {dep.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-bold text-ink">{dep.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {dep.destination}, {dep.country}
                        </span>
                        <span className="flex items-center gap-1">
                          <Ticket className="h-3 w-3" />
                          {dep.passportNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Flight Info */}
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-lg font-bold text-ink">{dep.flightTime}</p>
                      <p className="text-xs text-slate-500">Flight Time</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-slate-700">{dep.airline}</p>
                      <p className="text-xs text-slate-500">Airline</p>
                    </div>
                    {dep.gate && (
                      <div className="text-center">
                        <p className="text-lg font-bold text-brand-600">{dep.gate}</p>
                        <p className="text-xs text-slate-500">Gate</p>
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(dep.status)}`}>
                      {getStatusLabel(dep.status)}
                    </span>
                    {dep.status === 'pending' && (
                      <button className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                        Check In
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}