'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Users, Plane, Search, User, MapPin, Map, Globe, Clock, Home, Building2, ArrowRight, X, RefreshCw } from 'lucide-react';

interface EmployeeTransit {
  id: string;
  name: string;
  country: string;
  destination: string;
  assignedAgent: string;
  agentTask: string;
  status: string;
  flightTime: string;
  phone?: string;
}

interface ChecklistItem {
  task: string;
  completed: boolean;
  employees: string;
}

export function TravelDeparture() {
  const [searchQuery, setSearchQuery] = useState('');
  const [transits, setTransits] = useState<EmployeeTransit[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartureData();
  }, []);

  const fetchDepartureData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/travel/departure');
      const data = await response.json();
      
      if (data.success && data.data) {
        setTransits(data.data.transits || []);
        setChecklist(data.data.checklist || []);
      } else {
        // Mock data fallback
        setTransits([
          { id: 'EMP-101', name: 'Mekdes Tesfaye', country: 'Saudi Arabia', destination: 'Riyadh', assignedAgent: 'Solomon K.', agentTask: 'Ensure Home to Bole safe transfer', status: 'En Route to Bole', flightTime: '08:00 AM' },
          { id: 'EMP-102', name: 'Hana Bekele', country: 'UAE', destination: 'Dubai', assignedAgent: 'Aster M.', agentTask: 'Handover passport & visa physically', status: 'At Bole International', flightTime: '02:30 PM' },
          { id: 'EMP-103', name: 'Selamawit Alemu', country: 'Qatar', destination: 'Doha', assignedAgent: 'Dawit T.', agentTask: 'Verify receiving by Abroad Agency', status: 'Abroad Agent Received', flightTime: 'YDAY' },
          { id: 'EMP-104', name: 'Rahel Tadesse', country: 'Kuwait', destination: 'Kuwait', assignedAgent: 'Solomon K.', agentTask: 'Call driver for Home Pickup', status: 'Home Pickup Pending', flightTime: '11:45 PM' },
          { id: 'EMP-105', name: 'Yohannes Demeke', country: 'Saudi Arabia', destination: 'Jeddah', assignedAgent: 'Aster M.', agentTask: 'Airport Check-in Assist', status: 'Ready for Pickup', flightTime: '06:00 AM' },
          { id: 'EMP-106', name: ' Tigist Haile', country: 'UAE', destination: 'Abu Dhabi', assignedAgent: 'Dawit T.', agentTask: 'Final Document Check', status: 'At Home', flightTime: '10:15 AM' },
        ]);
        
        setChecklist([
          { task: 'Passports collected & verified', completed: true, employees: '45/45' },
          { task: 'Medical certificates verified', completed: true, employees: '45/45' },
          { task: 'Visa approvals confirmed', completed: true, employees: '45/45' },
          { task: 'Agency Escort Assigned & Tasked', completed: true, employees: '45/45' },
          { task: 'Home Pickup completed', completed: false, employees: '32/45' },
          { task: 'Bole Airport Handover completed', completed: false, employees: '28/45' },
          { task: 'Abroad Agent Receive Confirmation', completed: false, employees: '12/45' },
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch departure data:', error);
      setTransits([
        { id: 'EMP-101', name: 'Mekdes Tesfaye', country: 'Saudi Arabia', destination: 'Riyadh', assignedAgent: 'Solomon K.', agentTask: 'Ensure Home to Bole safe transfer', status: 'En Route to Bole', flightTime: '08:00 AM' },
        { id: 'EMP-102', name: 'Hana Bekele', country: 'UAE', destination: 'Dubai', assignedAgent: 'Aster M.', agentTask: 'Handover passport & visa physically', status: 'At Bole International', flightTime: '02:30 PM' },
        { id: 'EMP-103', name: 'Selamawit Alemu', country: 'Qatar', destination: 'Doha', assignedAgent: 'Dawit T.', agentTask: 'Verify receiving by Abroad Agency', status: 'Abroad Agent Received', flightTime: 'YDAY' },
        { id: 'EMP-104', name: 'Rahel Tadesse', country: 'Kuwait', destination: 'Kuwait', assignedAgent: 'Solomon K.', agentTask: 'Call driver for Home Pickup', status: 'Home Pickup Pending', flightTime: '11:45 PM' },
      ]);
      setChecklist([
        { task: 'Passports collected & verified', completed: true, employees: '45/45' },
        { task: 'Medical certificates verified', completed: true, employees: '45/45' },
        { task: 'Visa approvals confirmed', completed: true, employees: '45/45' },
        { task: 'Agency Escort Assigned & Tasked', completed: true, employees: '45/45' },
        { task: 'Home Pickup completed', completed: false, employees: '32/45' },
        { task: 'Bole Airport Handover completed', completed: false, employees: '28/45' },
        { task: 'Abroad Agent Receive Confirmation', completed: false, employees: '12/45' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const completionRate = checklist.length > 0 
    ? (checklist.filter(t => t.completed).length / checklist.length * 100).toFixed(0)
    : 0;

  const filteredTransits = transits.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    emp.assignedAgent.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    if (status.includes('Received') || status.includes('Completed')) return 'bg-green-100 text-green-700';
    if (status.includes('Bole') || status.includes('Route')) return 'bg-blue-100 text-blue-700';
    if (status.includes('Pending') || status.includes('Ready')) return 'bg-amber-100 text-amber-700';
    return 'bg-slate-100 text-slate-700';
  };

  const getStatusIcon = (status: string) => {
    if (status.includes('Received') || status.includes('Completed')) return <Globe className="h-4 w-4" />;
    if (status.includes('Bole') || status.includes('Route')) return <Building2 className="h-4 w-4" />;
    if (status.includes('Pending') || status.includes('Ready')) return <Clock className="h-4 w-4" />;
    return <Home className="h-4 w-4" />;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink">Departure & Transit Readiness</h1>
          <p className="mt-2 text-slate-500">Track employee transit from home to Bole International and verify abroad agent handover by Country.</p>
        </div>
        <button 
          onClick={fetchDepartureData}
          className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </button>
      </div>

      {/* Readiness Progress */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-ink flex items-center gap-2">
            <Map className="h-5 w-5 text-brand-600" />
            Overall Journey Readiness
          </h3>
          <span className="text-3xl font-bold text-slate-700">{completionRate}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
          <div
            className="bg-brand-500 h-full rounded-full transition-all"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-7">
          {checklist.map((item, idx) => (
            <div key={idx} className={`text-center p-2 rounded-lg ${item.completed ? 'bg-green-50' : 'bg-amber-50'}`}>
              {item.completed ? (
                <CheckCircle2 className="h-4 w-4 mx-auto text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 mx-auto text-amber-600" />
              )}
              <p className="text-xs mt-1 truncate">{item.task.split(' ')[0]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist Summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-bold text-ink mb-4">Pre-Departure Checklist</h3>
        <div className="space-y-3">
          {checklist.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:bg-slate-50">
              <div className="flex items-center gap-3">
                {item.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                )}
                <span className={`font-medium ${item.completed ? 'text-green-700' : 'text-amber-700'}`}>
                  {item.task}
                </span>
              </div>
              <span className="text-sm font-semibold text-slate-600">{item.employees}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search employee, agent, country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-10 text-sm font-medium focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Transit Tracking Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5 bg-slate-50">
          <h3 className="text-lg font-bold text-ink flex items-center gap-2">
            <Plane className="h-5 w-5 text-brand-600" />
            Transit Tracking & Agent Tasks
          </h3>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-slate-700">Employee</th>
                  <th className="px-6 py-4 text-left font-bold text-slate-700">Country & Destination</th>
                  <th className="px-6 py-4 text-left font-bold text-slate-700">Assigned Agent & Task</th>
                  <th className="px-6 py-4 text-left font-bold text-slate-700">Current Status</th>
                  <th className="px-6 py-4 text-left font-bold text-slate-700">Flight Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransits.map((transit) => (
                  <tr key={transit.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm">
                          {transit.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-ink">{transit.name}</p>
                          <p className="text-xs text-slate-500">{transit.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-ink">{transit.country}</p>
                      <p className="text-xs text-slate-500">{transit.destination}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-ink">{transit.assignedAgent}</p>
                      <p className="text-xs text-slate-500 mt-1">{transit.agentTask}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(transit.status)}`}>
                        {getStatusIcon(transit.status)}
                        {transit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-700">{transit.flightTime}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {filteredTransits.length === 0 && !loading && (
          <div className="text-center py-12 text-slate-500">
            No employees found matching your search
          </div>
        )}
      </div>
    </div>
  );
}