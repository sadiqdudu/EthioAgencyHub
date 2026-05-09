'use client';

import { useState } from 'react';
import { Plane, Calendar, Ticket, CheckCircle2, Map } from 'lucide-react';
import { TravelSchedule } from './travel-schedule';
import { TravelTicket } from './travel-ticket';
import { TravelToday } from './travel-today';
import { TravelDeparture } from './travel-departure';
import { TravelScheduleCalendar } from './schedule-calendar';

export function TravelManagementModule() {
  const [activeTab, setActiveTab] = useState('today');

  const tabs = [
    { id: 'today', label: "Today's Flights", icon: Plane },
    { id: 'departure', label: 'Transit & Readiness', icon: CheckCircle2 },
    { id: 'schedule', label: 'Departures By Country', icon: Map },
    { id: 'calendar', label: 'Calendar View', icon: Calendar },
    { id: 'ticket', label: 'Tickets & Tasks', icon: Ticket },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'today':
        return <TravelToday />;
      case 'departure':
        return <TravelDeparture />;
      case 'schedule':
        return <TravelSchedule />;
      case 'calendar':
        return <TravelScheduleCalendar />;
      case 'ticket':
        return <TravelTicket />;
      default:
        return <TravelToday />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 flex items-center gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-2 border-b-2 font-bold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-brand-600' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Render the Active Sub-Module */}
      <div className="px-2">
        {renderContent()}
      </div>
    </div>
  );
}
