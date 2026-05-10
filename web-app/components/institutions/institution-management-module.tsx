'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, Mail, Phone, MapPin, Users, FileText, Plus, Search, 
  Edit, Trash2, X, Save, CheckCircle2, AlertCircle, Clock, ChevronRight,
  Briefcase, Globe, Banknote, Shield, Calendar, Activity
} from 'lucide-react';

interface Institution {
  id: string;
  name: string;
  type: 'government' | 'embassy' | 'partner' | 'agency' | 'airline' | 'medical' | 'other';
  country: string;
  city: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  collaborationStatus: 'active' | 'pending' | 'suspended' | 'inactive';
  collaborationStartDate: string;
  collaborationEndDate?: string;
  documents: number;
  totalEmployees: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface InstitutionFormData {
  name: string;
  type: Institution['type'];
  country: string;
  city: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  collaborationStatus: Institution['collaborationStatus'];
  collaborationStartDate: string;
  collaborationEndDate: string;
  notes: string;
}

export function InstitutionManagementModule() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState<Institution[]>([]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<InstitutionFormData>({
    name: '', type: 'partner', country: '', city: '', contactPerson: '',
    email: '', phone: '', address: '', website: '',
    collaborationStatus: 'pending', collaborationStartDate: '', 
    collaborationEndDate: '', notes: ''
  });

  useEffect(() => {
    fetchInstitutions();
  }, []);

  useEffect(() => {
    filterInstitutions();
  }, [institutions, typeFilter, statusFilter, searchQuery]);

  const fetchInstitutions = async () => {
    try {
      const mockInstitutions: Institution[] = [
        { id: 'INS-001', name: 'Saudi Ministry of Labor', type: 'government', country: 'Saudi Arabia', city: 'Riyadh', contactPerson: 'Dr. Ahmed bin Ali', email: 'mols@mol.gov.sa', phone: '+966-11-2345678', address: 'Riyadh, Saudi Arabia', website: 'https://mol.gov.sa', collaborationStatus: 'active', collaborationStartDate: '2023-06-15', documents: 12, totalEmployees: 500, createdAt: '2023-06-15', updatedAt: '2024-01-10' },
        { id: 'INS-002', name: 'UAE Embassy, Addis Ababa', type: 'embassy', country: 'United Arab Emirates', city: 'Addis Ababa', contactPerson: 'Mr. Hassan Mohamed', email: 'visa@uae-embassy.et', phone: '+251-11-5558889', address: 'Embassy Road, Addis Ababa', website: 'https://uae.et', collaborationStatus: 'active', collaborationStartDate: '2023-07-20', documents: 8, totalEmployees: 25, createdAt: '2023-07-20', updatedAt: '2024-02-15' },
        { id: 'INS-003', name: 'Ethiopian Airlines Cargo', type: 'airline', country: 'Ethiopia', city: 'Addis Ababa', contactPerson: 'Ms. Zeina Tekle', email: 'cargo@ethiopianairlines.com', phone: '+251-11-6175000', address: 'Bole International Airport', website: 'https://ethiopianairlines.com', collaborationStatus: 'pending', collaborationStartDate: '2023-08-10', documents: 5, totalEmployees: 150, createdAt: '2023-08-10', updatedAt: '2024-01-20' },
        { id: 'INS-004', name: 'Qatar Foundation', type: 'government', country: 'Qatar', city: 'Doha', contactPerson: 'Sheikh Abdullah Al-Thani', email: 'info@qf.org.qa', phone: '+974-44-444444', address: 'Doha, Qatar', website: 'https://qf.org.qa', collaborationStatus: 'active', collaborationStartDate: '2023-09-01', documents: 15, totalEmployees: 1000, createdAt: '2023-09-01', updatedAt: '2024-03-01' },
        { id: 'INS-005', name: 'Kuwait Manpower Agency', type: 'agency', country: 'Kuwait', city: 'Kuwait City', contactPerson: 'Mr. Salem Al-Dosari', email: 'info@kuwaitmanpower.gov.kw', phone: '+965-22-333333', address: 'Kuwait City', collaborationStatus: 'suspended', collaborationStartDate: '2023-05-01', collaborationEndDate: '2024-05-01', documents: 3, totalEmployees: 50, createdAt: '2023-05-01', updatedAt: '2024-02-01' },
      ];
      setInstitutions(mockInstitutions);
    } catch (error) {
      console.error('Failed to fetch institutions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterInstitutions = () => {
    let filtered = [...institutions];

    if (searchQuery) {
      filtered = filtered.filter((inst) =>
        inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.email.toLowerCase().includes(searchQuery.toLowerCase())
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
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      suspended: 'bg-red-100 text-red-700',
      inactive: 'bg-slate-100 text-slate-700',
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, any> = {
      government: Building2,
      embassy: Globe,
      partner: Briefcase,
      agency: Users,
      airline: Activity,
      medical: Shield,
      other: Building2,
    };
    return icons[type] || Building2;
  };

  const handleOpenModal = (institution?: Institution) => {
    if (institution) {
      setEditingId(institution.id);
      setFormData({
        name: institution.name,
        type: institution.type,
        country: institution.country,
        city: institution.city,
        contactPerson: institution.contactPerson,
        email: institution.email,
        phone: institution.phone,
        address: institution.address,
        website: institution.website || '',
        collaborationStatus: institution.collaborationStatus,
        collaborationStartDate: institution.collaborationStartDate,
        collaborationEndDate: institution.collaborationEndDate || '',
        notes: institution.notes || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '', type: 'partner', country: '', city: '', contactPerson: '',
        email: '', phone: '', address: '', website: '',
        collaborationStatus: 'pending', collaborationStartDate: new Date().toISOString().split('T')[0], 
        collaborationEndDate: '', notes: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.country) {
      alert('Please fill in required fields');
      return;
    }

    if (editingId) {
      setInstitutions(prev => prev.map(inst => 
        inst.id === editingId ? { ...inst, ...formData, updatedAt: new Date().toISOString() } : inst
      ));
    } else {
      const newInstitution: Institution = {
        id: `INS-${String(institutions.length + 1).padStart(3, '0')}`,
        ...formData,
        totalEmployees: 0,
        documents: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setInstitutions(prev => [...prev, newInstitution]);
    }

    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setInstitutions(prev => prev.filter(inst => inst.id !== id));
    setIsDeleteConfirmOpen(false);
    setSelectedInstitution(null);
  };

  const activeCount = institutions.filter(i => i.collaborationStatus === 'active').length;
  const pendingCount = institutions.filter(i => i.collaborationStatus === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-ink flex items-center gap-3">
              <Building2 className="h-7 w-7 text-indigo-600" />
              Institution Management
            </h2>
            <p className="mt-1 text-slate-600">Manage partner institutions, embassies, agencies, and government contacts</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Add Institution
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <Building2 className="h-6 w-6 text-indigo-600" />
            <span className="text-xs font-medium text-green-600">+2 this month</span>
          </div>
          <p className="text-3xl font-bold text-indigo-800">{institutions.length}</p>
          <p className="text-sm font-medium text-indigo-700 mt-1">Total Institutions</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-800">{activeCount}</p>
          <p className="text-sm font-medium text-green-700 mt-1">Active Partners</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100/50 border border-yellow-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-800">{pendingCount}</p>
          <p className="text-sm font-medium text-yellow-700 mt-1">Pending Approval</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <Globe className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-800">{new Set(institutions.map(i => i.country)).size}</p>
          <p className="text-sm font-medium text-blue-700 mt-1">Countries</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, country, or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="government">Government</option>
            <option value="embassy">Embassy</option>
            <option value="partner">Partner</option>
            <option value="agency">Agency</option>
            <option value="airline">Airline</option>
            <option value="medical">Medical</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/institutions/partners" className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-indigo-200 hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-indigo-100">
              <Users className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-ink">Partners</h3>
          </div>
          <p className="text-sm text-slate-500">Manage business partners and agencies</p>
        </Link>
        <Link href="/institutions/collaboration" className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-indigo-200 hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-green-100">
              <Briefcase className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-ink">Collaboration</h3>
          </div>
          <p className="text-sm text-slate-500">Track joint projects and agreements</p>
        </Link>
        <Link href="/institutions/institution-detail" className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-indigo-200 hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-ink">Documents</h3>
          </div>
          <p className="text-sm text-slate-500">View institution details and documents</p>
        </Link>
      </div>

      {/* Institutions Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <div className="col-span-full py-8 text-center text-slate-500">Loading institutions...</div>
        ) : filteredInstitutions.length === 0 ? (
          <div className="col-span-full py-8 text-center text-slate-500">No institutions found</div>
        ) : (
          filteredInstitutions.map((inst) => {
            const TypeIcon = getTypeIcon(inst.type);
            return (
              <div key={inst.id} className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-100">
                      <TypeIcon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink">{inst.name}</h3>
                      <p className="text-sm text-slate-500 capitalize">{inst.type}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(inst.collaborationStatus)}`}>
                    {inst.collaborationStatus}
                  </span>
                </div>

                <div className="space-y-2 border-t border-slate-200 pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">{inst.city}, {inst.country}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">{inst.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600 truncate">{inst.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">{inst.phone}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="text-xs text-slate-600">
                    <FileText className="inline h-3 w-3 mr-1" />
                    {inst.documents} docs
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleOpenModal(inst)}
                      className="p-1.5 rounded-lg hover:bg-slate-100"
                    >
                      <Edit className="h-4 w-4 text-slate-500" />
                    </button>
                    <button 
                      onClick={() => { setSelectedInstitution(inst); setIsDeleteConfirmOpen(true); }}
                      className="p-1.5 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-ink">{editingId ? 'Edit Institution' : 'Add New Institution'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-lg hover:bg-slate-100">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Institution Name *</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm"
                    placeholder="e.g., Saudi Ministry of Labor"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Type *</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm"
                  >
                    <option value="government">Government</option>
                    <option value="embassy">Embassy</option>
                    <option value="partner">Partner</option>
                    <option value="agency">Agency</option>
                    <option value="airline">Airline</option>
                    <option value="medical">Medical</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select 
                    value={formData.collaborationStatus}
                    onChange={(e) => setFormData({ ...formData, collaborationStatus: e.target.value as any })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Country *</label>
                  <input 
                    type="text" 
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm"
                    placeholder="e.g., Saudi Arabia"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                  <input 
                    type="text" 
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person *</label>
                  <input 
                    type="text" 
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
                  <input 
                    type="url" 
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                  <input 
                    type="date" 
                    value={formData.collaborationStartDate}
                    onChange={(e) => setFormData({ ...formData, collaborationStartDate: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                  <input 
                    type="text" 
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                  <textarea 
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 border-t border-slate-200 bg-white px-6 py-4 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800">
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                <Save className="h-4 w-4" />
                {editingId ? 'Save Changes' : 'Add Institution'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {isDeleteConfirmOpen && selectedInstitution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-ink mb-2">Delete Institution?</h3>
              <p className="text-slate-600 mb-6">
                Are you sure you want to delete <strong>{selectedInstitution.name}</strong>? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setIsDeleteConfirmOpen(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50">
                  Cancel
                </button>
                <button onClick={() => handleDelete(selectedInstitution.id)} className="px-5 py-2.5 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}