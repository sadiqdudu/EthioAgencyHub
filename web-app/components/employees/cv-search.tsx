'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Users, X, Sparkles, SlidersHorizontal, Printer, Share2, Tag, Download, CheckSquare, Settings2, Info } from 'lucide-react';
import { EmployeeCardGrid } from './employee-card';

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

interface CvSearchProps {
  agentId?: string;
  viewOnly?: boolean;
  onSelect?: (employeeId: string) => void;
}

export function CvSearch({ agentId, viewOnly = false, onSelect }: CvSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ status: '', destination: '' });
  const [showFilters, setShowFilters] = useState(false);

  const search = async (nextQuery = query, nextFilters = filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (nextQuery) params.set('q', nextQuery);
      if (nextFilters.status) params.set('status', nextFilters.status);
      if (nextFilters.destination) params.set('destination', nextFilters.destination);
      
      const res = await fetch(`/api/employees?${params.toString()}`);
      const data = await res.json();
      
      let employees = data.success ? data.data || [] : [];
      
      if (viewOnly && agentId) {
        employees = employees.filter((e: Employee) => 
          !e.selectedByAgent || e.selectedByAgent === agentId
        );
      }
      
      setResults(employees);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search();
  }, []);

  const clearFilters = () => {
    const emptyFilters = { status: '', destination: '' };
    setFilters(emptyFilters);
    search(query, emptyFilters);
  };

  const statuses = ['REGISTERED', 'DOCUMENT_REVIEW', 'MOLS_PENDING', 'INTERVIEW_UPLOADED', 'TRAVEL_READY', 'DEPLOYED'];
  const destinations = ['Germany', 'UK', 'Saudi Arabia', 'Qatar', 'UAE', 'USA', 'Canada'];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Top Search Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-slate-50/50">
          <div className="flex flex-1 items-center gap-3 min-w-[300px]">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && search()}
                placeholder="Search by name, skills, roles, or ID..."
                className="w-full rounded-2xl border border-slate-300 py-3 pl-11 pr-32 shadow-sm focus:border-brand-500 focus:ring-brand-500"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600">
                <Sparkles className="h-3.5 w-3.5 text-brand-500" />
                AI-Powered
              </div>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 rounded-2xl border px-5 py-3 font-semibold transition-all shadow-sm ${
                showFilters ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <SlidersHorizontal className="h-5 w-5" />
              Advanced Filters
            </button>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <select className="rounded-xl border border-slate-300 py-2.5 pl-4 pr-10 font-medium text-slate-700 shadow-sm bg-white">
              <option>Sort: Relevance</option>
              <option>Sort: Highest Rated</option>
              <option>Sort: Newest First</option>
            </select>
          </div>
        </div>

        {/* AI Applied Filters Summary */}
        <div className="bg-white px-6 py-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-semibold text-brand-600 bg-brand-50 px-3 py-1.5 rounded-lg">
              <Sparkles className="h-4 w-4" /> AI-Recommended Filters
            </button>
            <button className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1">
              <Info className="h-4 w-4" /> What's this?
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={clearFilters} className="text-sm font-semibold text-slate-600 hover:text-slate-800 px-4 py-2 border border-slate-200 rounded-xl">
              Reset Filters
            </button>
            <button onClick={search} className="text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 px-5 py-2 rounded-xl shadow-md">
              Apply Filters <span className="opacity-80 font-normal ml-1">({results.length} results)</span>
            </button>
          </div>
        </div>

        {/* Applied Filters Tags */}
        <div className="bg-slate-50/50 px-6 py-4 flex flex-wrap items-center gap-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 mr-2">
            <Filter className="h-4 w-4" /> Applied Filters:
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700">
            Semi-Skilled <button><X className="h-3.5 w-3.5 hover:text-brand-900" /></button>
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700">
            Arabic (Intermediate+) <button><X className="h-3.5 w-3.5 hover:text-brand-900" /></button>
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700">
            Female <button><X className="h-3.5 w-3.5 hover:text-brand-900" /></button>
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700">
            Age: 25-35 <button><X className="h-3.5 w-3.5 hover:text-brand-900" /></button>
          </span>
          <button className="text-sm font-medium text-brand-600 hover:underline ml-2">Clear All</button>
          
          <div className="ml-auto flex items-center gap-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm">
            {results.length} results found <Info className="h-4 w-4 text-brand-500" />
          </div>
        </div>

        {/* Advanced Filters Mega-Menu */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-white border-b border-slate-100">
            {/* Skill & Experience */}
            <div className="space-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <h4 className="flex items-center gap-2 font-bold text-slate-800 border-b border-slate-200 pb-2">
                🎓 Skill & Experience
              </h4>
              <div className="space-y-2.5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                  <span className="text-slate-700">Skilled</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                  <span className="text-slate-700 font-medium">Semi-Skilled</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                  <span className="text-slate-700">Unskilled</span>
                </label>
              </div>
              <div className="pt-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Experience (years)</label>
                <input type="range" className="w-full accent-brand-600" min="0" max="15" defaultValue="2" />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0+</span>
                  <span className="font-bold text-brand-700">2+ years</span>
                  <span>15+</span>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <h4 className="flex items-center gap-2 font-bold text-slate-800 border-b border-slate-200 pb-2">
                🔤 Languages
              </h4>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-0.5 w-5 h-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                  <span className="text-slate-700 font-medium leading-tight">Arabic<br/><span className="text-sm font-normal text-slate-500">(Intermediate+)</span></span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 w-5 h-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                  <span className="text-slate-700 leading-tight">English<br/><span className="text-sm font-normal text-slate-500">(Intermediate+)</span></span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                  <span className="text-slate-700">Other Languages</span>
                </label>
                <button className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 mt-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700">+</span>
                  Add more languages
                </button>
              </div>
            </div>

            {/* Demographics */}
            <div className="space-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <h4 className="flex items-center gap-2 font-bold text-slate-800 border-b border-slate-200 pb-2">
                👤 Demographics & Availability
              </h4>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Age Range</label>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue={25} className="w-20 rounded-lg border-slate-300 py-1.5 text-center shadow-sm" />
                  <span className="text-slate-400">-</span>
                  <input type="number" defaultValue={35} className="w-20 rounded-lg border-slate-300 py-1.5 text-center shadow-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                <div className="flex rounded-lg bg-slate-200/50 p-1">
                  <button className="flex-1 rounded-md bg-white py-1.5 text-sm font-bold text-brand-700 shadow-sm">Female</button>
                  <button className="flex-1 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900">Male</button>
                  <button className="flex-1 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900">Any</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Availability</label>
                <select className="w-full rounded-lg border-slate-300 py-2 shadow-sm">
                  <option>Any availability</option>
                  <option>Available Now</option>
                  <option>Available within 1 month</option>
                </select>
              </div>
            </div>

            {/* Additional Filters */}
            <div className="space-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <h4 className="flex items-center gap-2 font-bold text-slate-800 border-b border-slate-200 pb-2">
                ⚙️ Additional Filters
              </h4>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Region</label>
                <select className="w-full rounded-lg border-slate-300 py-2 shadow-sm">
                  <option>All Regions</option>
                  <option>Addis Ababa</option>
                  <option>Oromia</option>
                  <option>Amhara</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Special Skills</label>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700 cursor-pointer hover:bg-slate-300">Cooking</span>
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700 cursor-pointer hover:bg-slate-300">Childcare</span>
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700 cursor-pointer hover:bg-slate-300">Elder Care</span>
                  <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700 cursor-pointer">More...</span>
                </div>
              </div>
              <div className="pt-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Document Status</label>
                <label className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                  <span className="text-sm text-slate-700">Complete Documents</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                  <span className="text-sm text-slate-700">Valid Passport</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Batch Actions Bar */}
      <section className="rounded-2xl border border-brand-100 bg-brand-50/30 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
          <span className="font-bold text-slate-700">Select All Workers</span>
        </label>
        
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
            <Download className="h-4 w-4 text-brand-600" /> Batch Export
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
            <Printer className="h-4 w-4 text-brand-600" /> Print Selected
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
            <Share2 className="h-4 w-4 text-brand-600" /> Share Selected
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
            <Tag className="h-4 w-4 text-brand-600" /> Tag Selected
          </button>
        </div>
      </section>

      {/* Main Results Container */}
      <section>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
          </div>
        ) : results.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            No employees found. Try adjusting your search criteria.
          </div>
        ) : (
          <EmployeeCardGrid
            employees={results}
            agentId={agentId || ''}
            onSelect={onSelect}
            viewOnly={viewOnly}
          />
        )}
      </section>
    </div>
  );
}
