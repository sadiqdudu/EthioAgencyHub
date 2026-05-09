'use client';

import { useState } from 'react';
import { Calendar, MapPin, Users, Plane, Globe, ChevronDown, CheckCircle2 } from 'lucide-react';

export function TravelSchedule() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const schedule = [
    { 
      id: 1, 
      date: '2026-05-08', 
      country: 'Saudi Arabia', 
      city: 'Riyadh', 
      employees: ['Mekdes Tesfaye', 'Aster Yilma', 'Dawit Alemu'], 
      status: 'confirmed', 
      airline: 'Saudi Arabia Airlines',
      agencyWorker: 'Solomon K.',
      tasks: ['Distribute Travel Packets', 'Airport Check-in Escort', 'Final Briefing']
    },
    { 
      id: 2, 
      date: '2026-05-12', 
      country: 'UAE', 
      city: 'Dubai', 
      employees: ['Hana Bekele', 'Selamawit Tadesse'], 
      status: 'pending', 
      airline: 'Emirates',
      agencyWorker: 'Aster M.',
      tasks: ['Collect Visas from Embassy', 'Home Pickup', 'Bole Drop-off']
    },
    { 
      id: 3, 
      date: '2026-05-15', 
      country: 'Qatar', 
      city: 'Doha', 
      employees: ['Rahel Tadesse'], 
      status: 'confirmed', 
      airline: 'Qatar Airways',
      agencyWorker: 'Dawit T.',
      tasks: ['PCR Test Verification', 'Provide Sim Card', 'Boarding Assist']
    },
    { 
      id: 4, 
      date: '2026-05-20', 
      country: 'Kuwait', 
      city: 'Kuwait City', 
      employees: ['Sara Lemma', 'Betelhem Kassahun'], 
      status: 'planning', 
      airline: 'Kuwait Airways',
      agencyWorker: 'Unassigned',
      tasks: ['Confirm Flight Booking', 'Medical Final Review']
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Travel Schedule & Assignments</h1>
        <p className="mt-2 text-slate-500">Manage departures by country, assigned employees, and agency worker tasks</p>
      </div>

      {/* Calendar View */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50">
          <h3 className="text-lg font-bold text-ink">Scheduled Departures</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {schedule.map((item) => (
            <div key={item.id} className="bg-white">
              <div 
                className="flex items-center justify-between p-6 hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 bg-brand-50 text-brand-600 rounded-xl">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-ink text-lg">{item.date}</p>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        item.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
                        item.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm font-medium text-slate-500">
                      <span className="flex items-center gap-1"><Plane className="h-4 w-4" /> {item.airline}</span>
                      <span className="flex items-center gap-1"><Globe className="h-4 w-4 text-brand-500" /> {item.country} ({item.city})</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5 justify-end">
                      <Users className="h-4 w-4 text-brand-500" /> {item.employees.length} Employees
                    </p>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">Escort: <span className="text-brand-600">{item.agencyWorker}</span></p>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${expandedId === item.id ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === item.id && (
                <div className="px-6 pb-6 pt-2 bg-slate-50/50 border-t border-slate-100">
                  <div className="grid md:grid-cols-2 gap-8 mt-4">
                    {/* Traveling Employees */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                        <Users className="h-4 w-4 text-brand-500" /> Traveling Employees
                      </h4>
                      <ul className="space-y-2">
                        {item.employees.map((emp, i) => (
                          <li key={i} className="text-sm font-medium text-slate-600 bg-white border border-slate-200 px-3 py-2 rounded-lg flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-brand-400"></div>
                            {emp} - <span className="text-slate-400 text-xs">Destination: {item.country}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Agency Worker Tasks */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-orange-500" /> Agency Worker Tasks ({item.agencyWorker})
                      </h4>
                      <ul className="space-y-2">
                        {item.tasks.map((task, i) => (
                          <li key={i} className="text-sm font-medium text-slate-600 bg-white border border-slate-200 px-3 py-2 rounded-lg flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add New Schedule */}
      <button className="w-full rounded-xl border-2 border-dashed border-brand-300 bg-brand-50/30 px-4 py-6 text-center hover:border-brand-500 hover:bg-brand-50 transition-colors">
        <p className="font-bold text-brand-700 flex items-center justify-center gap-2">
          <span>+</span> Create New Travel Schedule
        </p>
      </button>
    </div>
  );
}
