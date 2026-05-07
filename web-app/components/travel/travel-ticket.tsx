'use client';

import { Ticket, Plane, MapPin, Clock } from 'lucide-react';

export function TravelTicket() {
  const tickets = [
    { id: 'TKT-001', employee: 'Mekdes Tesfaye', destination: 'Riyadh, Saudi Arabia', date: '2026-05-08', airline: 'Saudi Arabia Airlines', status: 'issued' },
    { id: 'TKT-002', employee: 'Hana Bekele', destination: 'Dubai, UAE', date: '2026-05-12', airline: 'Emirates', status: 'pending' },
    { id: 'TKT-003', employee: 'Selamawit Alemu', destination: 'Doha, Qatar', date: '2026-05-15', airline: 'Qatar Airways', status: 'issued' },
    { id: 'TKT-004', employee: 'Rahel Tadesse', destination: 'Kuwait City', date: '2026-05-20', airline: 'Kuwait Airways', status: 'cancelled' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Ticket Management</h1>
        <p className="mt-2 text-slate-500">Manage airline tickets and booking confirmations</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-green-50 to-green-100/50">
          <p className="text-sm text-slate-600">Issued Tickets</p>
          <p className="mt-2 text-2xl font-bold text-green-600">234</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-yellow-50 to-yellow-100/50">
          <p className="text-sm text-slate-600">Pending</p>
          <p className="mt-2 text-2xl font-bold text-yellow-600">18</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-blue-50 to-blue-100/50">
          <p className="text-sm text-slate-600">Modifications</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">5</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-red-50 to-red-100/50">
          <p className="text-sm text-slate-600">Cancelled</p>
          <p className="mt-2 text-2xl font-bold text-red-600">3</p>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-bold text-ink">Tickets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Ticket ID</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Employee</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Destination</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Airline</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Date</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-blue-600">{ticket.id}</td>
                  <td className="px-6 py-4 text-slate-600">{ticket.employee}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {ticket.destination}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{ticket.airline}</td>
                  <td className="px-6 py-4 text-slate-600">{ticket.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      ticket.status === 'issued' ? 'bg-green-100 text-green-700' :
                      ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
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
