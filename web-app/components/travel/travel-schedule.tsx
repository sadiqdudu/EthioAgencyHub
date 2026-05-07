'use client';

import { Calendar, MapPin, Users, Plane } from 'lucide-react';

export function TravelSchedule() {
  const schedule = [
    { date: '2026-05-08', destination: 'Saudi Arabia', employees: 45, status: 'confirmed', airline: 'Saudi Arabia Airlines' },
    { date: '2026-05-12', destination: 'UAE', employees: 32, status: 'pending', airline: 'Emirates' },
    { date: '2026-05-15', destination: 'Qatar', employees: 28, status: 'confirmed', airline: 'Qatar Airways' },
    { date: '2026-05-20', destination: 'Kuwait', employees: 38, status: 'planning', airline: 'Kuwait Airways' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Travel Schedule</h1>
        <p className="mt-2 text-slate-500">View and manage all planned departures and travel dates</p>
      </div>

      {/* Calendar View */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-bold text-ink mb-4">Scheduled Departures</h3>
        <div className="space-y-3">
          {schedule.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-200 p-4 hover:bg-slate-50">
              <div className="flex items-center gap-4 flex-1">
                <Calendar className="h-5 w-5 text-slate-400" />
                <div className="flex-1">
                  <p className="font-semibold text-ink">{item.date}</p>
                  <p className="text-sm text-slate-500">{item.airline}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm font-semibold text-slate-600">
                    <Users className="h-4 w-4" /> {item.employees}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <MapPin className="h-3 w-3" /> {item.destination}
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  item.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                  item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Schedule */}
      <button className="w-full rounded-lg border-2 border-dashed border-slate-300 px-4 py-6 text-center hover:border-brand-400 hover:bg-brand-50/30 transition-colors">
        <p className="font-semibold text-ink">+ Add New Departure</p>
      </button>
    </div>
  );
}
