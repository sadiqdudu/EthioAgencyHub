'use client';

import { useState, useEffect } from 'react';
import { Building2, Mail, Phone, MapPin, Users, FileText, Plus } from 'lucide-react';

interface Institution {
  id: string;
  name: string;
  type: string;
  country: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  collaborationStatus: string;
  documents: number;
  createdAt: string;
}

export function InstitutionManagementModule() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState<Institution[]>([]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstitutions();
  }, []);

  useEffect(() => {
    filterInstitutions();
  }, [institutions, typeFilter, statusFilter, searchQuery]);

  const fetchInstitutions = async () => {
    try {
      const mockInstitutions: Institution[] = [
        {
          id: '1',
          name: 'Saudi Ministry of Labor',
          type: 'Government',
          country: 'Saudi Arabia',
          contactPerson: 'Dr. Ahmed bin Ali',
          email: 'mols@mol.gov.sa',
          phone: '+966-11-2345678',
          collaborationStatus: 'ACTIVE',
          documents: 12,
          createdAt: '2023-06-15'
        },
        {
          id: '2',
          name: 'UAE Embassy, Addis Ababa',
          type: 'Embassy',
          country: 'United Arab Emirates',
          contactPerson: 'Mr. Hassan Mohamed',
          email: 'visa@uae-embassy.et',
          phone: '+251-11-5558889',
          collaborationStatus: 'ACTIVE',
          documents: 8,
          createdAt: '2023-07-20'
        },
        {
          id: '3',
          name: 'Ethiopian Airlines Cargo',
          type: 'Partner',
          country: 'Ethiopia',
          contactPerson: 'Ms. Zeina Tekle',
          email: 'cargo@ethiopianairlines.com',
          phone: '+251-11-6175000',
          collaborationStatus: 'PENDING',
          documents: 5,
          createdAt: '2023-08-10'
        }
      ];
      setInstitutions(mockInstitutions);
    } catch (error) {
      console.error('Failed to fetch institutions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterInstitutions = () => {
    let filtered = institutions;

    if (searchQuery) {
      filtered = filtered.filter((inst) =>
        inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter((inst) => inst.type === typeFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((inst) => inst.collaborationStatus === statusFilter);
    }

    setFilteredInstitutions(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-emerald-100 text-emerald-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'INACTIVE':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const institutionTypes = ['Government', 'Embassy', 'Partner', 'Airline', 'Hospital', 'Other'];
  const collaborationStatuses = ['ACTIVE', 'PENDING', 'INACTIVE'];

  const activeCount = institutions.filter((i) => i.collaborationStatus === 'ACTIVE').length;
  const pendingCount = institutions.filter((i) => i.collaborationStatus === 'PENDING').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-ink">Institution Management</h2>
        <p className="mt-2 text-slate-600">
          Manage {filteredInstitutions.length} institutions. Maintain partner relationships, collaboration status, and document exchange.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Institutions</p>
              <p className="mt-2 text-2xl font-bold text-ink">{institutions.length}</p>
            </div>
            <Building2 className="h-8 w-8 text-brand-600 opacity-20" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Partners</p>
              <p className="mt-2 text-2xl font-bold text-emerald-600">{activeCount}</p>
            </div>
            <Users className="h-8 w-8 text-emerald-600 opacity-20" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pending Review</p>
              <p className="mt-2 text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <Mail className="h-8 w-8 text-yellow-600 opacity-20" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Documents Shared</p>
              <p className="mt-2 text-2xl font-bold text-blue-600">
                {institutions.reduce((sum, i) => sum + i.documents, 0)}
              </p>
            </div>
            <FileText className="h-8 w-8 text-blue-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="grid gap-4 md:grid-cols-4">
        <input
          type="text"
          placeholder="Search by name or country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-600 focus:outline-none"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-600 focus:outline-none"
        >
          <option value="all">All Types</option>
          {institutionTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-600 focus:outline-none"
        >
          <option value="all">All Status</option>
          {collaborationStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button className="flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
          <Plus className="h-4 w-4" />
          Add Institution
        </button>
      </div>

      {/* Institutions Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <div className="col-span-full py-8 text-center text-slate-500">Loading institutions...</div>
        ) : filteredInstitutions.length === 0 ? (
          <div className="col-span-full py-8 text-center text-slate-500">No institutions found</div>
        ) : (
          filteredInstitutions.map((inst) => (
            <div
              key={inst.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-ink">{inst.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{inst.type}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(inst.collaborationStatus)}`}>
                  {inst.collaborationStatus}
                </span>
              </div>

              <div className="space-y-2 border-t border-slate-200 pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">{inst.country}</span>
                </div>
                {inst.contactPerson && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">{inst.contactPerson}</span>
                  </div>
                )}
                {inst.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600 truncate">{inst.email}</span>
                  </div>
                )}
                {inst.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">{inst.phone}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="text-xs text-slate-600">
                  <FileText className="inline h-3 w-3 mr-1" />
                  {inst.documents} documents
                </span>
                <button className="text-xs font-medium text-brand-600 hover:text-brand-700">
                  View Details →
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
