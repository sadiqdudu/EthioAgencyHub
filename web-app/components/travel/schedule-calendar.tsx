'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plane, Calendar, Users } from 'lucide-react';

interface Travel {
  id: string;
  destination: string;
  departureAt: string;
  status: string;
  employeeName: string;
  ticket?: string;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function TravelScheduleCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [travels, setTravels] = useState<Travel[]>([]);
  const [selectedTravel, setSelectedTravel] = useState<Travel | null>(null);

  useEffect(() => {
    fetch('/api/travel')
      .then(res => res.json())
      .then(data => {
        if (data.data) setTravels(data.data);
      })
      .catch(() => setTravels([]));
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getTravelsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return travels.filter(t => t.departureAt.startsWith(dateStr));
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      SCHEDULED: 'bg-blue-100 text-blue-700',
      TICKETED: 'bg-amber-100 text-amber-700',
      READY: 'bg-emerald-100 text-emerald-700',
      DEPARTED: 'bg-slate-100 text-slate-700',
      ARRIVED: 'bg-green-100 text-green-700',
      CANCELLED: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-slate-100';
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Travel Schedule Calendar</h3>
            <p className="mt-1 text-sm text-slate-500">View and manage departure schedules by month.</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={prevMonth}
              className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-lg font-semibold">
              {MONTHS[month]} {year}
            </span>
            <button
              onClick={nextMonth}
              className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-1">
          {DAYS.map(day => (
            <div key={day} className="py-2 text-center text-sm font-medium text-slate-500">
              {day}
            </div>
          ))}
          
          {Array(firstDay).fill(null).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[100px] border border-slate-100 bg-slate-50" />
          ))}
          
          {Array(daysInMonth).fill(null).map((_, i) => {
            const day = i + 1;
            const dayTravels = getTravelsForDay(day);
            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
            
            return (
              <div
                key={day}
                className={`min-h-[100px] border border-slate-200 p-2 ${isToday ? 'bg-brand-50' : ''}`}
              >
                <div className={`text-sm font-medium ${isToday ? 'text-brand-600' : 'text-slate-700'}`}>
                  {day}
                </div>
                <div className="mt-1 space-y-1">
                  {dayTravels.slice(0, 2).map(t => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTravel(t)}
                      className={`w-full truncate rounded px-1 py-0.5 text-xs font-medium ${getStatusColor(t.status)}`}
                    >
                      {t.employeeName} → {t.destination}
                    </button>
                  ))}
                  {dayTravels.length > 2 && (
                    <div className="text-xs text-slate-500">+{dayTravels.length - 2} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {selectedTravel && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Travel Details</h3>
            <button
              onClick={() => setSelectedTravel(null)}
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              Close
            </button>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-brand-100 p-2">
                <Users className="h-5 w-5 text-brand-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Employee</p>
                <p className="font-medium">{selectedTravel.employeeName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-brand-100 p-2">
                <Plane className="h-5 w-5 text-brand-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Destination</p>
                <p className="font-medium">{selectedTravel.destination}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-brand-100 p-2">
                <Calendar className="h-5 w-5 text-brand-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Departure</p>
                <p className="font-medium">{new Date(selectedTravel.departureAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(selectedTravel.status)}`}>
                {selectedTravel.status}
              </div>
            </div>
          </div>
          {selectedTravel.ticket && (
            <div className="mt-4 rounded-lg bg-slate-50 p-4">
              <p className="text-sm font-medium">Ticket / PNR</p>
              <p className="mt-1 font-mono text-lg">{selectedTravel.ticket}</p>
            </div>
          )}
        </section>
      )}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold">Upcoming Departures</h3>
        <div className="mt-4 space-y-3">
          {travels
            .filter(t => new Date(t.departureAt) > new Date())
            .sort((a, b) => new Date(a.departureAt).getTime() - new Date(b.departureAt).getTime())
            .slice(0, 5)
            .map(t => (
              <div key={t.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                <div>
                  <p className="font-medium">{t.employeeName}</p>
                  <p className="text-sm text-slate-500">To: {t.destination}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{new Date(t.departureAt).toLocaleDateString()}</p>
                  <span className={`text-xs ${getStatusColor(t.status)}`}>{t.status}</span>
                </div>
              </div>
            ))}
          {travels.length === 0 && (
            <p className="text-center text-slate-500">No upcoming travels</p>
          )}
        </div>
      </section>
    </div>
  );
}