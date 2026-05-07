'use client';

import { useState, useEffect } from 'react';
import { Users, MapPin, Calendar, CheckCircle2, AlertCircle, Landmark } from 'lucide-react';

interface Pilgrim {
  id: string;
  name: string;
  season: string;
  destination: 'Hajj' | 'Umrah';
  groupId?: string;
  status: string;
  documents: number;
  registeredAt: string;
}

export function HajjUmrahManagementModule() {
  const [pilgrims, setPilgrims] = useState<Pilgrim[]>([]);
  const [filteredPilgrims, setFilteredPilgrims] = useState<Pilgrim[]>([]);
  const [destinationFilter, setDestinationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPilgrims();
  }, []);

  useEffect(() => {
    filterPilgrims();
  }, [pilgrims, destinationFilter, statusFilter]);

  const fetchPilgrims = async () => {
    try {
      const mockPilgrims: Pilgrim[] = [
        {
          id: '1',
          name: 'Ahmed Hassan',
          season: '2024 Hajj',
          destination: 'Hajj',
          groupId: 'GRP-001',
          status: 'DOCUMENTS_PENDING',
          documents: 2,
          registeredAt: '2024-01-10'
        },
        {
          id: '2',
          name: 'Fatima Mohammed',
          season: '2024 Umrah',
          destination: 'Umrah',
          groupId: 'GRP-002',
          status: 'REQUIREMENTS_MET',
          documents: 4,
          registeredAt: '2024-01-15'
        },
        {
          id: '3',
          name: 'Ibrahim Ali',
          season: '2024 Hajj',
          destination: 'Hajj',
          groupId: 'GRP-001',
          status: 'READY_FOR_TRAVEL',
          documents: 5,
          registeredAt: '2024-01-20'
        }
      ];
      setPilgrims(mockPilgrims);
    } catch (error) {
      console.error('Failed to fetch pilgrims:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPilgrims = () => {
    let filtered = pilgrims;

    if (destinationFilter !== 'all') {
      filtered = filtered.filter((p) => p.destination === destinationFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    setFilteredPilgrims(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DOCUMENTS_PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'REQUIREMENTS_MET':
        return 'bg-blue-100 text-blue-800';
      case 'READY_FOR_TRAVEL':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const pilgrims2024 = pilgrims.filter((p) => p.season.includes('2024')).length;
  const hajjCount = pilgrims.filter((p) => p.destination === 'Hajj').length;
  const umrahCount = pilgrims.filter((p) => p.destination === 'Umrah').length;
  const readyCount = pilgrims.filter((p) => p.status === 'READY_FOR_TRAVEL').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-ink">Hajj & Umrah Management</h2>
        <p className="mt-2 text-slate-600">
          Manage {filteredPilgrims.length} pilgrims. Register pilgrims, organize groups, verify requirements, and track religious travel documents.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Pilgrims</p>
              <p className="mt-2 text-2xl font-bold text-ink">{pilgrims.length}</p>
            </div>
            <Users className="h-8 w-8 text-brand-600 opacity-20" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Hajj 2024</p>
              <p className="mt-2 text-2xl font-bold text-purple-600">{hajjCount}</p>
            </div>
            <Landmark className="h-8 w-8 text-purple-600 opacity-20" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Umrah 2024</p>
              <p className="mt-2 text-2xl font-bold text-blue-600">{umrahCount}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600 opacity-20" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Ready to Travel</p>
              <p className="mt-2 text-2xl font-bold text-emerald-600">{readyCount}</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-emerald-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-3">
        <select
          value={destinationFilter}
          onChange={(e) => setDestinationFilter(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-600 focus:outline-none"
        >
          <option value="all">All Types</option>
          <option value="Hajj">Hajj</option>
          <option value="Umrah">Umrah</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-600 focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="DOCUMENTS_PENDING">Documents Pending</option>
          <option value="REQUIREMENTS_MET">Requirements Met</option>
          <option value="READY_FOR_TRAVEL">Ready for Travel</option>
        </select>

        <button className="flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
          <Users className="h-4 w-4" />
          Register Pilgrim
        </button>
      </div>

      {/* Pilgrim Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-3 font-semibold text-ink">Name</th>
              <th className="px-6 py-3 font-semibold text-ink">Type</th>
              <th className="px-6 py-3 font-semibold text-ink">Season</th>
              <th className="px-6 py-3 font-semibold text-ink">Group</th>
              <th className="px-6 py-3 font-semibold text-ink">Status</th>
              <th className="px-6 py-3 font-semibold text-ink">Documents</th>
              <th className="px-6 py-3 font-semibold text-ink">Registered</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                  Loading pilgrims...
                </td>
              </tr>
            ) : filteredPilgrims.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                  No pilgrims found
                </td>
              </tr>
            ) : (
              filteredPilgrims.map((pilgrim) => (
                <tr key={pilgrim.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium text-ink">{pilgrim.name}</td>
                  <td className="px-6 py-3 text-slate-600">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      pilgrim.destination === 'Hajj'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {pilgrim.destination}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-slate-600">{pilgrim.season}</td>
                  <td className="px-6 py-3 text-slate-600 font-mono">{pilgrim.groupId || '-'}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(pilgrim.status)}`}>
                      {pilgrim.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                      {pilgrim.documents}/5
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-slate-500">
                    {new Date(pilgrim.registeredAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
