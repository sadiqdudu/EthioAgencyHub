'use client';

import { useState } from 'react';
import { User, MapPin, Briefcase, Calendar, Check, Lock, Eye, ExternalLink, FileText, Star, Bookmark, MoreHorizontal, ShieldCheck, X } from 'lucide-react';
import Link from 'next/link';

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
  const [showDetails, setShowDetails] = useState(false);
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
    <>
      <div className={`relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all ${isBlocked ? 'border-red-200 opacity-75' : 'border-slate-200 hover:border-brand-300 hover:shadow-md'}`}>
        
        {/* Top Photo Section */}
        <div className="relative h-56 w-full bg-slate-200">
          {/* Using placeholder images based on role/gender, but falling back to a nice gradient if none */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-600 to-indigo-400"></div>
          
          {/* Badges Overlay */}
          <div className="absolute left-3 top-3 flex items-center gap-1 text-sm font-semibold text-white drop-shadow-md">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            4.8/5
          </div>
          
          <div className="absolute right-3 top-3">
            {isBlocked ? (
              <span className="rounded-full bg-red-500/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white shadow-sm flex items-center gap-1">
                <Lock className="h-3 w-3" /> Reserved
              </span>
            ) : (
              <span className="rounded-full bg-emerald-500/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white shadow-sm">
                Available
              </span>
            )}
          </div>
          
          <div className="absolute top-0 right-1/2 translate-x-1/2 rounded-b-xl bg-fuchsia-500 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
            AI Match
          </div>
          
          {/* Bottom Action Buttons Overlay */}
          <div className="absolute bottom-3 right-3 flex gap-2">
            <Link 
              href={`/dashboard/cv-generator?employeeId=${employee.id}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm hover:bg-slate-50 transition-colors"
              title="Generate CV"
            >
              <FileText className="h-5 w-5" />
            </Link>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm hover:bg-slate-50 transition-colors">
              <Bookmark className="h-5 w-5 fill-current" />
            </button>
            <button 
              onClick={() => setShowDetails(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm hover:bg-slate-50 transition-colors"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-bold text-slate-800 truncate">{employee.name}</h3>
              <p className="text-sm text-slate-500">ID: {employee.id.slice(0, 10).toUpperCase()}</p>
            </div>
            <div className="text-right pl-2 shrink-0">
              <div className="font-semibold text-slate-800">26 years</div>
              <span className="inline-block mt-0.5 rounded-full bg-pink-50 px-2 py-0.5 text-xs font-medium text-pink-600 border border-pink-100">
                Female
              </span>
            </div>
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2 text-slate-800 font-bold">
              <Briefcase className="h-4 w-4 text-brand-600" />
              {employee.role || 'Semi-Skilled Caregiver'}
            </div>
            <p className="ml-6 text-sm text-slate-500">3 years experience</p>
          </div>

          <div className="mt-4">
            <p className="text-xs text-slate-400 mb-2 font-medium">Languages:</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">Amharic (Native)</span>
              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">English (Intermediate)</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">Arabic (Basic)</span>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-slate-400 mb-2 font-medium">Key Skills:</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">Eldercare</span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">Cooking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Profile */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                <User className="h-6 w-6 text-brand-600 bg-brand-50 p-1 rounded-full" />
                Worker Profile: {employee.name}
              </h2>
              <button 
                onClick={() => setShowDetails(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">
              {/* Left Sidebar */}
              <div className="w-full md:w-1/3 bg-slate-50 p-6 border-r border-slate-100 flex flex-col gap-6">
                
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <Briefcase className="h-4 w-4 text-brand-500" />
                    Occupation
                  </h4>
                  <p className="text-slate-800 font-medium pl-6">{employee.role || 'Semi-Skilled Caregiver'}</p>
                  <p className="text-sm text-slate-500 pl-6">3 years experience</p>
                </div>
                
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <User className="h-4 w-4 text-brand-500" />
                    Personal Info
                  </h4>
                  <p className="text-slate-800 pl-6 text-sm">26 years old, Female</p>
                  <p className="text-slate-500 pl-6 text-sm">Addis Ababa, Ethiopia</p>
                </div>
                
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <FileText className="h-4 w-4 text-brand-500" />
                    Languages
                  </h4>
                  <ul className="text-sm text-slate-800 pl-6 space-y-1">
                    <li>Amharic (Native)</li>
                    <li>English (Intermediate)</li>
                    <li>Arabic (Basic)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <ShieldCheck className="h-4 w-4 text-brand-500" />
                    Documents
                  </h4>
                  <ul className="text-sm pl-6 space-y-1">
                    <li className="flex justify-between text-slate-600">Passport: <span className="text-emerald-600 font-medium">Valid</span></li>
                    <li className="flex justify-between text-slate-600">Medical: <span className="text-emerald-600 font-medium">Completed</span></li>
                    <li className="flex justify-between text-slate-600">Training: <span className="text-emerald-600 font-medium">Certified</span></li>
                  </ul>
                </div>
                
                <div className="mt-auto pt-6 space-y-3">
                  <Link 
                    href={`/dashboard/cv-generator?employeeId=${employee.id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700 transition-colors shadow-sm"
                  >
                    <FileText className="h-4 w-4" /> Generate CV
                  </Link>
                  <button 
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-brand-700 hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    <Bookmark className="h-4 w-4" /> Reserve Worker
                  </button>
                </div>
              </div>
              
              {/* Right Content */}
              <div className="w-full md:w-2/3 p-6 md:p-8">
                
                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3">
                  <Briefcase className="h-5 w-5 text-brand-600" />
                  Professional Summary
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Experienced caregiver with 3 years of professional experience providing quality care for elderly individuals. Skilled in daily assistance, medication management, and creating a comfortable environment. Compassionate, patient, and attentive to details with strong communication skills.
                </p>
                
                <div className="mt-6">
                  <p className="text-sm font-semibold text-slate-700 mb-3">Key Capabilities:</p>
                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Elderly Care</div>
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Medication Management</div>
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Meal Preparation</div>
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Personal Hygiene Assistance</div>
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> First Aid Knowledge</div>
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Compassionate Care</div>
                  </div>
                </div>

                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mt-10 mb-6">
                  <Star className="h-5 w-5 text-brand-600 fill-brand-600" />
                  Skills Assessment
                </h3>
                
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-slate-700">Eldercare</span>
                      <span className="text-slate-500">Very Good</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100">
                      <div className="h-2.5 rounded-full bg-brand-500 w-[85%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-slate-700">Meal Preparation</span>
                      <span className="text-slate-500">Excellent</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100">
                      <div className="h-2.5 rounded-full bg-brand-500 w-[95%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-slate-700">Medication Management</span>
                      <span className="text-slate-500">Good</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100">
                      <div className="h-2.5 rounded-full bg-brand-500 w-[70%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-slate-700">House Cleaning</span>
                      <span className="text-slate-500">Very Good</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100">
                      <div className="h-2.5 rounded-full bg-brand-500 w-[85%]"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-right">
                  <button className="text-sm font-semibold text-brand-600 hover:text-brand-800 flex items-center justify-end gap-1 w-full">
                    <FileText className="h-4 w-4" /> Print Assessment Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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
