'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle, Users, Plane, Search, User, MapPin, Map, Globe } from 'lucide-react';

export function TravelDeparture() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Track transit workflows for each employee
  const employeeTransits = [
    { id: 'EMP-101', name: 'Mekdes Tesfaye', country: 'Saudi Arabia', destination: 'Riyadh', assignedAgent: 'Solomon K.', agentTask: 'Ensure Home to Bole safe transfer', status: 'En Route to Bole', flightTime: '08:00 AM' },
    { id: 'EMP-102', name: 'Hana Bekele', country: 'UAE', destination: 'Dubai', assignedAgent: 'Aster M.', agentTask: 'Handover passport & visa physically', status: 'At Bole International', flightTime: '02:30 PM' },
    { id: 'EMP-103', name: 'Selamawit Alemu', country: 'Qatar', destination: 'Doha', assignedAgent: 'Dawit T.', agentTask: 'Verify receiving by Abroad Agency', status: 'Abroad Agent Received', flightTime: 'YDAY' },
    { id: 'EMP-104', name: 'Rahel Tadesse', country: 'Kuwait', destination: 'Kuwait', assignedAgent: 'Solomon K.', agentTask: 'Call driver for Home Pickup', status: 'Home Pickup Pending', flightTime: '11:45 PM' },
  ];

  const departureChecklist = [
    { task: 'Passports collected & verified', completed: true, employees: '45/45' },
    { task: 'Medical certificates verified', completed: true, employees: '45/45' },
    { task: 'Visa approvals confirmed', completed: true, employees: '45/45' },
    { task: 'Agency Escort Assigned & Tasked', completed: true, employees: '45/45' },
    { task: 'Home Pickup completed', completed: false, employees: '32/45' },
    { task: 'Bole Airport Handover completed', completed: false, employees: '28/45' },
    { task: 'Abroad Agent Receive Confirmation', completed: false, employees: '12/45' },
  ];

  const completionRate = (departureChecklist.filter(t => t.completed).length / departureChecklist.length * 100).toFixed(0);

  const filteredTransits = employeeTransits.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    emp.assignedAgent.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Departure & Transit Readiness</h1>
        <p className="mt-2 text-slate-500">Track employee transit from home to Bole International and verify abroad agent handover by Country.</p>
      </div>

      {/* Readiness Progress */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-ink">Overall Journey Readiness</h3>
          <span className="text-3xl font-bold text-slate-700">{completionRate}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-brand-500 h-full rounded-full transition-all"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      {/* Workflow Assignment Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5 flex flex-wrap gap-4 items-center justify-between bg-slate-50">
          <h3 className="text-lg font-bold text-ink flex items-center gap-2">
            <Map className="h-5 w-5 text-brand-600" /> Transit Tracking & Agent Tasks
          </h3>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search employee, agent, country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm font-medium focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-slate-700">Employee</th>
                <th className="px-6 py-4 text-left font-bold text-slate-700">Country & Destination</th>
                <th className="px-6 py-4 text-left font-bold text-slate-700">Assigned Agent (Escort) & Task</th>
                <th className="px-6 py-4 text-left font-bold text-slate-700">Transit Status</th>
                <th className="px-6 py-4 text-left font-bold text-slate-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransits.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                    No transit assignments found matching "{searchQuery}".
                  </td>
                </tr>
              ) : filteredTransits.map((transit, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-ink text-base">{transit.name}</p>
                    <p className="text-xs font-semibold text-brand-600 mt-1">{transit.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-700 flex items-center gap-1.5">
                      <Globe className="h-4 w-4 text-brand-500" /> {transit.country}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{transit.destination} <span className="font-semibold ml-1">({transit.flightTime})</span></p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-sm">
                      <div className="flex items-center gap-2 text-brand-700 font-bold mb-1 border-b border-slate-100 pb-1">
                        <User className="h-4 w-4 text-brand-500" />
                        {transit.assignedAgent}
                      </div>
                      <p className="text-xs font-medium text-slate-600">{transit.agentTask}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border ${
                      transit.status.includes('Abroad Agent') ? 'bg-green-50 text-green-700 border-green-200' :
                      transit.status.includes('Bole') ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      transit.status.includes('En Route') ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>
                      <MapPin className="h-3 w-3" />
                      {transit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-xs font-bold text-brand-600 hover:text-brand-800 bg-brand-50 px-4 py-2 rounded-lg hover:bg-brand-100 transition-colors border border-brand-100">
                      Update Transit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Checklist */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5 bg-slate-50">
          <h3 className="text-lg font-bold text-ink">Global Pre-Departure & Task Checklist</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {departureChecklist.map((item, idx) => (
            <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                {item.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                )}
                <span className={item.completed ? 'text-slate-500 font-semibold' : 'font-bold text-ink'}>
                  {item.task}
                </span>
              </div>
              <span className="text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">{item.employees}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-700 shadow-sm transition-colors">
          Assign New Agent Task
        </button>
        <button className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
          Generate Manifest By Country
        </button>
      </div>
    </div>
  );
}
