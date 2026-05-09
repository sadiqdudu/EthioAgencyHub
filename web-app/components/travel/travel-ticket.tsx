'use client';

import { useState } from 'react';
import { Ticket, Plane, MapPin, Clock, Search, Globe, User } from 'lucide-react';

export function TravelTicket() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const tickets = [
    { id: 'TKT-001', employee: 'Mekdes Tesfaye', country: 'Saudi Arabia', city: 'Riyadh', date: '2026-05-08', airline: 'Saudi Arabia Airlines', status: 'issued', agencyWorker: 'Solomon K.', task: 'Handover physical ticket at Bole' },
    { id: 'TKT-002', employee: 'Hana Bekele', country: 'UAE', city: 'Dubai', date: '2026-05-12', airline: 'Emirates', status: 'pending', agencyWorker: 'Aster M.', task: 'Confirm ticket with agency' },
    { id: 'TKT-003', employee: 'Selamawit Alemu', country: 'Qatar', city: 'Doha', date: '2026-05-15', airline: 'Qatar Airways', status: 'issued', agencyWorker: 'Dawit T.', task: 'Verify spelling against Passport' },
    { id: 'TKT-004', employee: 'Rahel Tadesse', country: 'Kuwait', city: 'Kuwait City', date: '2026-05-20', airline: 'Kuwait Airways', status: 'cancelled', agencyWorker: 'Unassigned', task: 'Re-book requested' },
  ];

  const filteredTickets = tickets.filter(t => 
    t.employee.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Ticket Management & Escort Tasks</h1>
        <p className="mt-2 text-slate-500">Manage airline tickets by country and assign ticket handover tasks to agency workers</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-green-50 to-green-100/50 shadow-sm">
          <p className="text-sm font-bold text-slate-600">Issued Tickets</p>
          <p className="mt-2 text-3xl font-extrabold text-green-600">234</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-yellow-50 to-yellow-100/50 shadow-sm">
          <p className="text-sm font-bold text-slate-600">Pending</p>
          <p className="mt-2 text-3xl font-extrabold text-yellow-600">18</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-sm">
          <p className="text-sm font-bold text-slate-600">Worker Escorts Assigned</p>
          <p className="mt-2 text-3xl font-extrabold text-blue-600">92%</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-red-50 to-red-100/50 shadow-sm">
          <p className="text-sm font-bold text-slate-600">Cancelled</p>
          <p className="mt-2 text-3xl font-extrabold text-red-600">3</p>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5 flex flex-wrap gap-4 items-center justify-between bg-slate-50">
          <h3 className="text-lg font-bold text-ink">Employee Flight Tickets</h3>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by employee, country, or ticket ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm font-medium focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-white">
                <th className="px-6 py-4 text-left font-bold text-slate-700">Ticket ID & Employee</th>
                <th className="px-6 py-4 text-left font-bold text-slate-700">Country & Destination</th>
                <th className="px-6 py-4 text-left font-bold text-slate-700">Agency Escort Task</th>
                <th className="px-6 py-4 text-left font-bold text-slate-700">Flight Details</th>
                <th className="px-6 py-4 text-left font-bold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">
                    No tickets found matching "{searchQuery}".
                  </td>
                </tr>
              ) : filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-ink">{ticket.employee}</p>
                    <p className="text-xs font-semibold text-brand-600 mt-0.5">{ticket.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 font-bold text-slate-700">
                      <Globe className="h-4 w-4 text-brand-500" />
                      {ticket.country}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <MapPin className="h-3 w-3" /> {ticket.city}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="bg-slate-100 border border-slate-200 rounded-lg p-2">
                      <p className="text-xs font-bold text-slate-700 flex items-center gap-1 mb-1">
                        <User className="h-3 w-3 text-brand-600" /> {ticket.agencyWorker}
                      </p>
                      <p className="text-xs font-medium text-slate-600">{ticket.task}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-700">{ticket.airline}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{ticket.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1.5 text-xs font-bold border ${
                      ticket.status === 'issued' ? 'bg-green-50 text-green-700 border-green-200' :
                      ticket.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {ticket.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
