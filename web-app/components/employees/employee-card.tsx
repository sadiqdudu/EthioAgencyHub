'use client';

import { useState } from 'react';
import { User, MapPin, Briefcase, Calendar, Check, Lock, Eye, ExternalLink } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  role?: string;
  destination?: string;
  status: string;
  selectedByAgent?: string | null;
  selectedAt?: string | null;
  createdAt: string;
  _count?: { documents: number; travels: number };
}

interface EmployeeCardProps {
  employee: Employee;
  agentId: string;
  onSelect?: (employeeId: string) => void;
  viewOnly?: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  REGISTERED: 'bg-blue-100 text-blue-700',
  DOCUMENT_REVIEW: 'bg-amber-100 text-amber-700',
  MOLS_PENDING: 'bg-orange-100 text-orange-700',
  INTERVIEW_UPLOADED: 'bg-purple-100 text-purple-700',
  TRAVEL_READY: 'bg-emerald-100 text-emerald-700',
  DEPLOYED: 'bg-slate-100 text-slate-700',
  ARCHIVED: 'bg-red-100 text-red-700'
};

export function EmployeeCard({ employee, agentId, onSelect, viewOnly = false }: EmployeeCardProps) {
  const [selecting, setSelecting] = useState(false);
  const isSelected = employee.selectedByAgent !== null && employee.selectedByAgent !== undefined;
  const isSelectedByMe = employee.selectedByAgent === agentId;
  const isBlocked = isSelected && !isSelectedByMe;

  const handleSelect = async () => {
    if (isBlocked || viewOnly) return;
    setSelecting(true);
    try {
      await fetch('/api/agents/select-employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId: employee.id, agentId })
      });
      onSelect?.(employee.id);
    } catch (error) {
      console.error('Error selecting employee:', error);
    } finally {
      setSelecting(false);
    }
  };

  return (
    <div className={`relative rounded-2xl border bg-white p-5 shadow-sm transition-all ${isBlocked ? 'border-red-200 opacity-75' : 'border-slate-200 hover:border-brand-300 hover:shadow-md'}`}>
      {isBlocked && (
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
          <Lock className="h-3 w-3" />
          Selected
        </div>
      )}
      
      {isSelectedByMe && (
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
          <Check className="h-3 w-3" />
          Your Selection
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-2xl font-bold text-brand-600">
          {employee.name.charAt(0)}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate">{employee.name}</h3>
          <p className="text-sm text-slate-500">{employee.role || 'No role assigned'}</p>
          
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
            {employee.destination && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-slate-400" />
                {employee.destination}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4 text-slate-400" />
              {employee._count?.documents || 0} docs
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-slate-400" />
              {new Date(employee.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[employee.status] || 'bg-slate-100'}`}>
          {employee.status.replace(/_/g, ' ')}
        </span>
        
        <div className="flex gap-2">
          {viewOnly && (
            <button className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-medium hover:bg-slate-50">
              <Eye className="h-4 w-4" />
              View
            </button>
          )}
          
          {isSelectedByMe ? (
            <button className="flex items-center gap-1 rounded-xl bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-700">
              <Check className="h-4 w-4" />
              Selected
            </button>
          ) : isBlocked ? (
            <button disabled className="flex items-center gap-1 rounded-xl bg-red-50 px-3 py-1.5 text-sm font-medium text-red-400 cursor-not-allowed">
              <Lock className="h-4 w-4" />
              Unavailable
            </button>
          ) : (
            <button
              onClick={handleSelect}
              disabled={selecting}
              className="flex items-center gap-1 rounded-xl bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
            >
              {selecting ? 'Selecting...' : (
                <>
                  <ExternalLink className="h-4 w-4" />
                  Select
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface EmployeeCardGridProps {
  employees: Employee[];
  agentId: string;
  onSelect?: (employeeId: string) => void;
  viewOnly?: boolean;
}

export function EmployeeCardGrid({ employees, agentId, onSelect, viewOnly = false }: EmployeeCardGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {employees.map(employee => (
        <EmployeeCard 
          key={employee.id} 
          employee={employee} 
          agentId={agentId}
          onSelect={onSelect}
          viewOnly={viewOnly}
        />
      ))}
    </div>
  );
}
