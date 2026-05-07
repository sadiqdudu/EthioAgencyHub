'use client';

import { Plane, Calendar, MapPin, Users, Ticket, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function TravelModule() {
  const travelStats = [
    { label: 'Total Departures', value: '156', change: '+12% this month', icon: Plane },
    { label: 'Scheduled', value: '24', change: 'In next 7 days', icon: Calendar },
    { label: 'Employees Traveling', value: '1,248', change: '68% documented', icon: Users },
    { label: 'Tickets Issued', value: '1,142', change: '+98 pending', icon: Ticket },
  ];

  const upcomingDepartures = [
    { date: '2026-05-08', destination: 'Saudi Arabia', employees: 45, status: 'Ready' },
    { date: '2026-05-12', destination: 'UAE', employees: 32, status: 'Partial' },
    { date: '2026-05-15', destination: 'Qatar', employees: 28, status: 'Planning' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Travel Management</h1>
        <p className="mt-2 text-slate-500">Coordinate employee travel, tickets, and departure readiness</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {travelStats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="text-2xl font-bold text-ink">{stat.value}</p>
            <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            <p className="mt-1 text-xs text-orange-600">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/travel/schedule" className="group rounded-2xl border border-slate-200 bg-white p-4 hover:border-orange-200 hover:bg-orange-50/50 transition-all">
          <Calendar className="h-5 w-5 text-orange-600 mb-3" />
          <p className="font-semibold text-ink">Schedule</p>
          <p className="text-xs text-slate-500 mt-1">View travel calendar</p>
        </Link>
        <Link href="/travel/ticket" className="group rounded-2xl border border-slate-200 bg-white p-4 hover:border-orange-200 hover:bg-orange-50/50 transition-all">
          <Ticket className="h-5 w-5 text-orange-600 mb-3" />
          <p className="font-semibold text-ink">Tickets</p>
          <p className="text-xs text-slate-500 mt-1">Manage bookings</p>
        </Link>
        <Link href="/travel/today" className="group rounded-2xl border border-slate-200 bg-white p-4 hover:border-orange-200 hover:bg-orange-50/50 transition-all">
          <Plane className="h-5 w-5 text-orange-600 mb-3" />
          <p className="font-semibold text-ink">Today</p>
          <p className="text-xs text-slate-500 mt-1">Today's departures</p>
        </Link>
        <Link href="/travel/departure" className="group rounded-2xl border border-slate-200 bg-white p-4 hover:border-orange-200 hover:bg-orange-50/50 transition-all">
          <CheckCircle2 className="h-5 w-5 text-orange-600 mb-3" />
          <p className="font-semibold text-ink">Departure Prep</p>
          <p className="text-xs text-slate-500 mt-1">Readiness check</p>
        </Link>
      </div>

      {/* Upcoming Departures */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-bold text-ink mb-4">Upcoming Departures</h3>
        <div className="space-y-3">
          {upcomingDepartures.map((departure, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-200 p-4 hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-orange-100 p-3">
                  <Plane className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-ink">{departure.destination}</p>
                  <p className="text-xs text-slate-500">{departure.date} • {departure.employees} employees</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                departure.status === 'Ready' ? 'bg-green-100 text-green-700' :
                departure.status === 'Partial' ? 'bg-orange-100 text-orange-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {departure.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
