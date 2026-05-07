'use client';

import { Plane, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export function TravelToday() {
  const todayDepartures = [
    { id: 'DEP-001', destination: 'Riyadh', employees: 12, time: '08:00 AM', airline: 'Saudi Airlines', status: 'boarding' },
    { id: 'DEP-002', destination: 'Dubai', employees: 8, time: '02:30 PM', airline: 'Emirates', status: 'confirmed' },
    { id: 'DEP-003', destination: 'Doha', employees: 6, time: '06:45 PM', airline: 'Qatar Airways', status: 'confirmed' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Today's Departures</h1>
        <p className="mt-2 text-slate-500">Monitor real-time flight status and employee readiness for today</p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-orange-50 to-orange-100/50">
          <p className="text-sm text-slate-600">Flights Today</p>
          <p className="mt-2 text-2xl font-bold text-orange-600">3</p>
          <p className="mt-1 text-xs text-slate-500">26 employees</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-blue-50 to-blue-100/50">
          <p className="text-sm text-slate-600">Boarding</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">1</p>
          <p className="mt-1 text-xs text-slate-500">12 employees</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-green-50 to-green-100/50">
          <p className="text-sm text-slate-600">All Set</p>
          <p className="mt-2 text-2xl font-bold text-green-600">100%</p>
          <p className="mt-1 text-xs text-slate-500">Documents ready</p>
        </div>
      </div>

      {/* Today's Flights */}
      <div className="space-y-3">
        {todayDepartures.map((flight) => (
          <div key={flight.id} className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="rounded-lg bg-orange-100 p-3">
                  <Plane className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-ink">{flight.destination}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      flight.status === 'boarding' ? 'bg-red-100 text-red-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {flight.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Plane className="h-4 w-4" /> {flight.airline}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-ink">{flight.employees}</p>
                <p className="text-xs text-slate-500">employees</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Updates */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-bold text-ink mb-4">Live Updates</h3>
        <div className="space-y-3">
          {[
            '08:12 - Flight SA201 boarding gate 5',
            '07:45 - All employees checked in for DEP-001',
            '06:30 - Catering service started',
          ].map((update, idx) => (
            <div key={idx} className="flex gap-3 text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
              <p className="text-slate-600">{update}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
