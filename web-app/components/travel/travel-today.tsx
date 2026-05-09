'use client';

import { useState } from 'react';
import { Plane, Clock, MapPin, CheckCircle2, Search, Users, Globe, Activity } from 'lucide-react';

export function TravelToday() {
  const [searchQuery, setSearchQuery] = useState('');

  const todayDepartures = [
    { 
      id: 'DEP-001', 
      country: 'Saudi Arabia',
      destination: 'Riyadh', 
      employees: 12, 
      time: '08:00 AM', 
      airline: 'Saudi Airlines', 
      status: 'boarding', 
      assignedAgent: 'Mekdes T.', 
      agentTask: 'Boarding Gate Handover',
      employeeNames: ['Hana Bekele', 'Dawit Alemu', 'Aster Yilma'] 
    },
    { 
      id: 'DEP-002', 
      country: 'UAE',
      destination: 'Dubai', 
      employees: 8, 
      time: '02:30 PM', 
      airline: 'Emirates', 
      status: 'confirmed', 
      assignedAgent: 'Solomon K.', 
      agentTask: 'Home to Airport Escort',
      employeeNames: ['Selamawit Tadesse', 'Betelhem Kassahun'] 
    },
    { 
      id: 'DEP-003', 
      country: 'Qatar',
      destination: 'Doha', 
      employees: 6, 
      time: '06:45 PM', 
      airline: 'Qatar Airways', 
      status: 'confirmed', 
      assignedAgent: 'Aster M.', 
      agentTask: 'Group Assembly at Hub',
      employeeNames: ['Abel Sisay', 'Mekdes Tadesse'] 
    },
  ];

  const filteredDepartures = todayDepartures.filter(f => 
    f.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.country.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.assignedAgent.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.employeeNames.some(name => name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink">Today's Departures & Active Tasks</h1>
          <p className="mt-2 text-slate-500">Monitor real-time flight status, employee readiness, and agency worker tasks for today.</p>
        </div>
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search country, employee, or flight ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm font-medium focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 shadow-sm">
          <p className="text-sm font-bold text-slate-600">Flights Today</p>
          <p className="mt-2 text-3xl font-extrabold text-orange-600">3</p>
          <p className="mt-1 text-xs font-semibold text-slate-500">26 total employees</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-sm">
          <p className="text-sm font-bold text-slate-600">Active Agency Tasks</p>
          <p className="mt-2 text-3xl font-extrabold text-blue-600">3</p>
          <p className="mt-1 text-xs font-semibold text-slate-500">3 Agents Deployed</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-green-50 to-green-100/50 shadow-sm">
          <p className="text-sm font-bold text-slate-600">All Set Readiness</p>
          <p className="mt-2 text-3xl font-extrabold text-green-600">100%</p>
          <p className="mt-1 text-xs font-semibold text-slate-500">Documents ready</p>
        </div>
      </div>

      {/* Today's Flights */}
      <div className="space-y-4">
        {filteredDepartures.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 font-medium shadow-sm">
            No departures or tasks found matching "{searchQuery}".
          </div>
        ) : filteredDepartures.map((flight) => (
          <div key={flight.id} className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-start gap-4 flex-1 min-w-[300px]">
                <div className="rounded-xl bg-brand-50 p-4">
                  <Plane className="h-6 w-6 text-brand-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-ink flex items-center gap-2">
                      <Globe className="h-5 w-5 text-brand-500" /> {flight.country} 
                      <span className="text-sm font-medium text-slate-400">({flight.destination})</span>
                    </h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      flight.status === 'boarding' ? 'bg-red-50 text-red-700 border-red-200' :
                      'bg-green-50 text-green-700 border-green-200'
                    }`}>
                      {flight.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm text-slate-600 mt-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" /> 
                      <span className="font-semibold text-slate-700">{flight.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Plane className="h-4 w-4 text-slate-400" /> 
                      <span className="font-semibold text-slate-700">{flight.airline}</span>
                    </div>
                    <div className="col-span-2 bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-start gap-3 mt-1">
                      <Users className="h-5 w-5 text-brand-500 shrink-0" /> 
                      <div>
                        <p className="font-bold text-slate-700">Escort Agent: {flight.assignedAgent}</p>
                        <p className="text-xs font-medium text-slate-500 mt-1">Task: <span className="text-brand-600">{flight.agentTask}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right border-l border-slate-100 pl-6 hidden md:block">
                <p className="text-4xl font-extrabold text-ink">{flight.employees}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">Employees</p>
                <div className="mt-3 text-left">
                  <p className="text-xs text-slate-400 font-medium mb-1">E.g.,</p>
                  <ul className="text-xs font-semibold text-slate-600 space-y-1">
                    {flight.employeeNames.slice(0,2).map((n, i) => <li key={i}>• {n}</li>)}
                    {flight.employeeNames.length > 2 && <li className="text-slate-400">...and more</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Updates */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm bg-slate-50/30">
        <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
           <Activity className="h-5 w-5 text-brand-500" /> Live Task Updates
        </h3>
        <div className="space-y-4">
          {[
            { time: '08:12 AM', task: 'Mekdes T. successfully completed Boarding Gate Handover for SA201.' },
            { time: '07:45 AM', task: 'All employees checked in for DEP-001.' },
            { time: '06:30 AM', task: 'Solomon K. initiated Home to Airport Escort for Dubai group.' },
          ].map((update, idx) => (
            <div key={idx} className="flex gap-4 items-start bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
              <div className="bg-green-100 p-1.5 rounded-full mt-0.5">
                 <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">{update.time}</p>
                <p className="text-sm font-semibold text-slate-700">{update.task}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
