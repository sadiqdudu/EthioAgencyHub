'use client';

import { useState, useEffect } from 'react';
import { FileText, Plane, CheckCircle2, AlertCircle, Clock, Search, Shield, Globe, UserCheck, Send, Upload, Download, CheckSquare2, ChevronDown, ChevronUp, ClipboardList, Plus, X, Save, Edit, Eye, Trash2, Filter } from 'lucide-react';

type DocumentType = { id: string; label: string; };
type DocStatus = 'pending' | 'received' | 'submitted' | 'approved' | 'rejected';

interface VisaApplication {
  id: string;
  employeeId: string;
  employeeName: string;
  passportNumber: string;
  embassy: string;
  visaType: string;
  stage: number;
  documents: Record<string, DocStatus>;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const EMBASSIES = ['Saudi Arabia (KSA)', 'UAE', 'Qatar', 'Kuwait', 'Jordan'];
const VISA_TYPES = ['Work', 'Visit', 'Transit', 'Tourist', 'Business', 'Student', 'Diplomatic'];
const DOCUMENT_TYPES: DocumentType[] = [
  { id: 'passport', label: 'Passport' },
  { id: 'medical', label: 'Medical (GAMCA)' },
  { id: 'police', label: 'Police Clearance' },
  { id: 'contract', label: 'MoLS Contract' },
  { id: 'photos', label: 'Passport Photos' },
  { id: 'insurance', label: 'Health Insurance' },
  { id: 'certificate', label: 'Work Certificate' },
];
const STAGE_NAMES = ['Document Collection', 'Portal Registration', 'Submitted to Embassy', 'Visa Approved/Stamped', 'Rejected/Correction'];
const STAGE_COLORS = ['bg-blue-100 text-blue-700', 'bg-purple-100 text-purple-700', 'bg-amber-100 text-amber-700', 'bg-emerald-100 text-emerald-700', 'bg-red-100 text-red-700'];

interface Employee {
  id: string; name: string; phone: string; passportNumber?: string;
}

export function DocumentsVisaModule() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [applications, setApplications] = useState<VisaApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [embassyFilter, setEmbassyFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ ok: boolean; text: string } | null>(null);

  // Form state
  const [form, setForm] = useState({
    employeeSearch: '',
    employeeId: '',
    employeeName: '',
    passportNumber: '',
    embassy: EMBASSIES[0],
    visaType: VISA_TYPES[0],
    stage: 0,
    documents: Object.fromEntries(DOCUMENT_TYPES.map(d => [d.id, 'pending' as DocStatus])),
    notes: ''
  });

  useEffect(() => { fetchEmployees(); loadDrafts(); }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch('/api/employees?limit=100');
      const data = await res.json();
      if (data.success && data.data) {
        setEmployees(data.data.map((e: any) => ({
          id: e.id,
          name: e.name || `${e.firstName || ''} ${e.lastName || ''}`.trim() || 'Unknown',
          phone: e.contactPhone || e.phone || '',
          passportNumber: e.passportNumber || '',
        })));
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const loadDrafts = () => {
    try {
      const saved = localStorage.getItem('visaApplications');
      if (saved) setApplications(JSON.parse(saved));
    } catch {}
  };

  const saveDrafts = (apps: VisaApplication[]) => {
    setApplications(apps);
    try { localStorage.setItem('visaApplications', JSON.stringify(apps)); } catch {}
  };

  const filteredEmployees = employees.filter(e =>
    !form.employeeId && (!form.employeeSearch || e.name.toLowerCase().includes(form.employeeSearch.toLowerCase()))
  );

  const selectEmployee = (emp: Employee) => {
    setForm({ ...form, employeeId: emp.id, employeeName: emp.name, passportNumber: emp.passportNumber || '', employeeSearch: '' });
  };

  const resetForm = () => {
    setForm({
      employeeSearch: '', employeeId: '', employeeName: '', passportNumber: '',
      embassy: EMBASSIES[0], visaType: VISA_TYPES[0], stage: 0,
      documents: Object.fromEntries(DOCUMENT_TYPES.map(d => [d.id, 'pending' as DocStatus])), notes: ''
    });
    setEditingId(null);
  };

  const handleSave = (submit: boolean) => {
    if (!form.employeeId) { setStatusMsg({ ok: false, text: 'Please select an employee' }); return; }

    const app: VisaApplication = {
      id: editingId || 'visa-' + Date.now(),
      employeeId: form.employeeId,
      employeeName: form.employeeName,
      passportNumber: form.passportNumber,
      embassy: form.embassy,
      visaType: form.visaType,
      stage: form.stage,
      documents: form.documents,
      notes: form.notes,
      createdAt: editingId ? (applications.find(a => a.id === editingId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let updated: VisaApplication[];
    if (editingId) {
      updated = applications.map(a => a.id === editingId ? app : a);
    } else {
      updated = [...applications, app];
    }
    saveDrafts(updated);
    setShowForm(false);
    resetForm();
    setStatusMsg({ ok: true, text: submit ? 'Visa application submitted!' : 'Draft saved successfully!' });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const editApplication = (app: VisaApplication) => {
    setForm({
      employeeSearch: '', employeeId: app.employeeId, employeeName: app.employeeName,
      passportNumber: app.passportNumber, embassy: app.embassy, visaType: app.visaType,
      stage: app.stage, documents: app.documents, notes: app.notes
    });
    setEditingId(app.id);
    setShowForm(true);
  };

  const deleteApplication = (id: string) => {
    saveDrafts(applications.filter(a => a.id !== id));
    setStatusMsg({ ok: true, text: 'Visa application deleted' });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const updateStage = (id: string, stage: number) => {
    saveDrafts(applications.map(a => a.id === id ? { ...a, stage, updatedAt: new Date().toISOString() } : a));
  };

  const updateDocStatus = (appId: string, docId: string, status: DocStatus) => {
    saveDrafts(applications.map(a => a.id === appId ? { ...a, documents: { ...a.documents, [docId]: status }, updatedAt: new Date().toISOString() } : a));
  };

  const toggleSelect = (id: string) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const selectAll = () => setSelectedIds(prev => prev.length === filteredApps.length ? [] : filteredApps.map(a => a.id));
  const handleBulkManifest = () => { alert(`Generated manifest for ${selectedIds.length} applications.`); setSelectedIds([]); };
  const handleBulkAdvance = () => { selectedIds.forEach(id => updateStage(id, Math.min((applications.find(a => a.id === id)?.stage || 0) + 1, 4))); setSelectedIds([]); };

  const getDocColor = (s: DocStatus) => {
    const map: Record<DocStatus, string> = { pending: 'bg-slate-100 text-slate-600', received: 'bg-blue-100 text-blue-700', submitted: 'bg-purple-100 text-purple-700', approved: 'bg-emerald-100 text-emerald-700', rejected: 'bg-red-100 text-red-700' };
    return map[s];
  };
  const getDocIcon = (s: DocStatus) => {
    if (s === 'approved') return <CheckCircle2 className="h-3.5 w-3.5" />;
    if (s === 'rejected') return <AlertCircle className="h-3.5 w-3.5" />;
    if (s === 'submitted') return <Send className="h-3.5 w-3.5" />;
    if (s === 'received') return <Download className="h-3.5 w-3.5" />;
    return <Clock className="h-3.5 w-3.5" />;
  };

  const filteredApps = applications.filter(a => {
    if (embassyFilter !== 'all' && a.embassy !== embassyFilter) return false;
    if (stageFilter !== 'all' && a.stage !== parseInt(stageFilter)) return false;
    if (searchQuery && !a.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) && !a.passportNumber?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const summary = {
    total: applications.length,
    submitted: applications.filter(a => a.stage >= 2).length,
    approved: applications.filter(a => a.stage >= 3).length,
    pending: applications.filter(a => a.stage < 2).length,
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600" /></div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-purple-50/30 to-white p-8 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">Visa Management</h1>
          <p className="mt-2 text-slate-600 max-w-xl">Manage visa applications across all embassies. Assign employees, track documents, and monitor process stages.</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-purple-700 shadow-sm">
          <Plus className="h-4 w-4" />New Application
        </button>
      </div>

      {/* Status Message */}
      {statusMsg && (
        <div className={`rounded-2xl border p-4 shadow-sm ${statusMsg.ok ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
          <div className="flex items-center gap-3">
            {statusMsg.ok ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            <span className="font-semibold">{statusMsg.text}</span>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        {[
          { label: 'Total Applications', value: summary.total, icon: FileText, color: 'from-blue-50 to-blue-100/50 border-blue-200 text-blue-800 text-blue-700' },
          { label: 'Submitted to Embassy', value: summary.submitted, icon: Plane, color: 'from-purple-50 to-purple-100/50 border-purple-200 text-purple-800 text-purple-700' },
          { label: 'Approved/Stamped', value: summary.approved, icon: CheckCircle2, color: 'from-emerald-50 to-emerald-100/50 border-emerald-200 text-emerald-800 text-emerald-700' },
          { label: 'Pending Collection', value: summary.pending, icon: Clock, color: 'from-amber-50 to-amber-100/50 border-amber-200 text-amber-800 text-amber-700' },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl bg-gradient-to-br ${s.color} p-4 shadow-sm`}>
            <s.icon className="h-5 w-5 mb-2" />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* New Application Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-xl font-bold text-ink">{editingId ? 'Edit' : 'New'} Visa Application</h3>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="p-2 rounded-lg hover:bg-slate-100"><X className="h-5 w-5 text-slate-500" /></button>
            </div>
            <div className="p-6 space-y-5">
              {/* Select Employee */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Select Employee *</label>
                {form.employeeId ? (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 border border-purple-200">
                    <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">{form.employeeName.charAt(0)}</div>
                    <div className="flex-1">
                      <p className="font-bold text-ink">{form.employeeName}</p>
                      <p className="text-xs text-slate-500">Passport: {form.passportNumber || 'N/A'}</p>
                    </div>
                    <button onClick={() => setForm({ ...form, employeeId: '', employeeName: '' })} className="text-slate-400 hover:text-red-500"><X className="h-4 w-4" /></button>
                  </div>
                ) : (
                  <div>
                    <input type="text" value={form.employeeSearch} onChange={e => setForm({ ...form, employeeSearch: e.target.value })}
                      placeholder="Search employee by name..."
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-purple-500 focus:outline-none" />
                    {form.employeeSearch && (
                      <div className="mt-2 max-h-40 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                        {filteredEmployees.slice(0, 10).map(emp => (
                          <button key={emp.id} onClick={() => selectEmployee(emp)} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-purple-50 text-left">
                            <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">{emp.name.charAt(0)}</div>
                            <div>
                              <p className="text-sm font-medium">{emp.name}</p>
                              <p className="text-xs text-slate-400">{emp.passportNumber || 'No passport'}</p>
                            </div>
                          </button>
                        ))}
                        {filteredEmployees.length === 0 && <p className="px-4 py-3 text-sm text-slate-500">No employees found</p>}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Country / Embassy *</label>
                  <select value={form.embassy} onChange={e => setForm({ ...form, embassy: e.target.value })} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm">
                    {EMBASSIES.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Visa Type *</label>
                  <select value={form.visaType} onChange={e => setForm({ ...form, visaType: e.target.value })} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm">
                    {VISA_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>

              {/* Process Stage */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Process Stage</label>
                <div className="grid gap-2 sm:grid-cols-5">
                  {STAGE_NAMES.map((name, i) => (
                    <button key={name} onClick={() => setForm({ ...form, stage: i })}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${form.stage === i ? 'bg-brand-600 text-white border-brand-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}>
                      {i + 1}. {name.split('/')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Document Types Checklist */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Document Types & Status</label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {DOCUMENT_TYPES.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-sm font-medium text-slate-700">{doc.label}</span>
                      <select value={form.documents[doc.id]} onChange={e => setForm({ ...form, documents: { ...form.documents, [doc.id]: e.target.value as DocStatus } })}
                        className={`text-xs font-bold px-2 py-1 rounded-lg border-0 ${getDocColor(form.documents[doc.id])}`}>
                        <option value="pending">Pending</option>
                        <option value="received">Received</option>
                        <option value="submitted">Submitted</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Notes</label>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm" placeholder="Additional notes about this visa application..." />
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 border-t border-slate-200 bg-white px-6 py-4 flex items-center justify-between rounded-b-2xl">
              <button onClick={() => { setShowForm(false); resetForm(); }} className="px-5 py-2.5 text-sm font-medium text-slate-600">Cancel</button>
              <div className="flex gap-3">
                {editingId && <button onClick={() => { setShowForm(false); resetForm(); }} className="px-5 py-2.5 text-sm font-bold text-red-600">Cancel Edit</button>}
                <button onClick={() => handleSave(false)} className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50">
                  {editingId ? 'Update' : 'Save Draft'}
                </button>
                <button onClick={() => handleSave(true)} className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-purple-700 shadow-sm">
                  <Save className="h-4 w-4" />{editingId ? 'Save & Update' : 'Save & Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters & Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-semibold text-slate-500 mb-1">Filter by Embassy</label>
            <select value={embassyFilter} onChange={e => setEmbassyFilter(e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm">
              <option value="all">All Embassies</option>
              {EMBASSIES.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-semibold text-slate-500 mb-1">Filter by Stage</label>
            <select value={stageFilter} onChange={e => setStageFilter(e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm">
              <option value="all">All Stages</option>
              {STAGE_NAMES.map((s, i) => <option key={s} value={i}>{s}</option>)}
            </select>
          </div>
          <div className="flex-[2] min-w-[220px]">
            <label className="block text-xs font-semibold text-slate-500 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Name or passport..."
                className="w-full rounded-xl border border-slate-300 py-2 pl-9 pr-4 text-sm focus:border-brand-500 focus:outline-none" />
            </div>
          </div>
          <button onClick={() => { setEmbassyFilter('all'); setStageFilter('all'); setSearchQuery(''); }} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Reset</button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="rounded-2xl border-2 border-brand-300 bg-brand-50 p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <p className="text-sm font-bold text-brand-800 flex items-center gap-2"><CheckSquare2 className="h-5 w-5" /> {selectedIds.length} selected</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={handleBulkManifest} className="rounded-xl bg-brand-600 px-5 py-2 text-sm font-bold text-white hover:bg-brand-700 shadow-sm"><Download className="h-4 w-4 inline-block mr-1.5" />Generate Manifest</button>
            <button onClick={handleBulkAdvance} className="rounded-xl border border-brand-300 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">Advance Stage</button>
            <button onClick={() => setSelectedIds([])} className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100">Clear</button>
          </div>
        </div>
      )}

      {/* Visa Applications Checklist */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-ink">Visa Applications</h3>
          <span className="text-xs text-slate-500">{filteredApps.length} of {applications.length} applications</span>
        </div>
        {filteredApps.length === 0 ? (
          <div className="px-6 py-16 text-center text-slate-500">
            <FileText className="h-12 w-12 mx-auto mb-3 text-slate-300" />
            <p className="font-medium">No visa applications yet</p>
            <p className="text-sm mt-1">Click "New Application" to assign an employee and start tracking their visa process.</p>
            {applications.length === 0 && <button onClick={() => { resetForm(); setShowForm(true); }} className="mt-4 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-purple-700">Create First Application</button>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 w-10"><input type="checkbox" checked={selectedIds.length === filteredApps.length && filteredApps.length > 0} onChange={selectAll} className="h-4 w-4 rounded border-slate-300 text-brand-600" /></th>
                  <th className="px-4 py-3 text-left">Employee</th>
                  <th className="px-4 py-3 text-left">Embassy</th>
                  <th className="px-4 py-3 text-left">Visa Type</th>
                  <th className="px-4 py-3 text-left">Documents</th>
                  <th className="px-4 py-3 text-left">Stage</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.map(app => {
                  const isExpanded = expandedId === app.id;
                  const docCount = Object.values(app.documents);
                  const approved = docCount.filter(s => s === 'approved').length;
                  const total = docCount.length;
                  return (
                    <>
                      <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3"><input type="checkbox" checked={selectedIds.includes(app.id)} onChange={() => toggleSelect(app.id)} className="h-4 w-4 rounded border-slate-300 text-brand-600" /></td>
                        <td className="px-4 py-3">
                          <button onClick={() => setExpandedId(isExpanded ? null : app.id)} className="flex items-center gap-2 font-medium text-ink hover:text-purple-600">
                            {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                            {app.employeeName}
                          </button>
                          <p className="text-xs text-slate-400 ml-6">Passport: {app.passportNumber || 'N/A'}</p>
                        </td>
                        <td className="px-4 py-3"><span className="font-medium text-sm">{app.embassy}</span></td>
                        <td className="px-4 py-3"><span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700">{app.visaType}</span></td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-xs font-bold ${approved === total ? 'text-emerald-600' : 'text-amber-600'}`}>{approved}/{total}</span>
                            <div className="flex -space-x-1">
                              {Object.entries(app.documents).slice(0, 4).map(([docId, status]) => (
                                <span key={docId} className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${status === 'approved' ? 'bg-emerald-500' : status === 'submitted' ? 'bg-purple-500' : status === 'received' ? 'bg-blue-500' : 'bg-slate-300'}`}
                                  title={`${DOCUMENT_TYPES.find(d => d.id === docId)?.label}: ${status}`}>
                                  {status === 'approved' ? '✓' : status === 'rejected' ? '✗' : '·'}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${STAGE_COLORS[app.stage] || 'bg-slate-100 text-slate-700'}`}>{STAGE_NAMES[app.stage]}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5">
                            <button onClick={() => editApplication(app)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600" title="Edit"><Edit className="h-4 w-4" /></button>
                            <button onClick={() => deleteApplication(app.id)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-600" title="Delete"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        </td>
                      </tr>
                      {/* Expandable Detail */}
                      {isExpanded && (
                        <tr key={`${app.id}-detail`}>
                          <td colSpan={7} className="px-6 py-5 bg-slate-50 border-b border-slate-200">
                            <div className="grid gap-5 md:grid-cols-3">
                              <div className="rounded-xl border border-slate-200 bg-white p-4">
                                <h4 className="font-bold text-ink text-sm mb-3 flex items-center gap-2"><Globe className="h-4 w-4 text-purple-600" /> Application Details</h4>
                                <div className="space-y-2 text-xs">
                                  <div className="flex justify-between"><span className="text-slate-500">Employee:</span><span className="font-medium">{app.employeeName}</span></div>
                                  <div className="flex justify-between"><span className="text-slate-500">Embassy:</span><span className="font-medium">{app.embassy}</span></div>
                                  <div className="flex justify-between"><span className="text-slate-500">Visa Type:</span><span className="font-medium">{app.visaType}</span></div>
                                  <div className="flex justify-between"><span className="text-slate-500">Passport:</span><span className="font-medium">{app.passportNumber || '-'}</span></div>
                                  <div className="flex justify-between"><span className="text-slate-500">Created:</span><span className="font-medium">{new Date(app.createdAt).toLocaleDateString()}</span></div>
                                  <div className="flex justify-between"><span className="text-slate-500">Updated:</span><span className="font-medium">{new Date(app.updatedAt).toLocaleDateString()}</span></div>
                                </div>
                              </div>
                              <div className="rounded-xl border border-slate-200 bg-white p-4">
                                <h4 className="font-bold text-ink text-sm mb-3 flex items-center gap-2"><FileText className="h-4 w-4 text-purple-600" /> Documents</h4>
                                <div className="space-y-2">
                                  {DOCUMENT_TYPES.map(doc => {
                                    const status = app.documents[doc.id] || 'pending';
                                    return (
                                      <div key={doc.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                                        <span className="text-xs text-slate-700">{doc.label}</span>
                                        <select value={status} onChange={e => updateDocStatus(app.id, doc.id, e.target.value as DocStatus)}
                                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded border-0 ${getDocColor(status)}`}>
                                          <option value="pending">Pending</option>
                                          <option value="received">Received</option>
                                          <option value="submitted">Submitted</option>
                                          <option value="approved">Approved</option>
                                          <option value="rejected">Rejected</option>
                                        </select>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="rounded-xl border border-slate-200 bg-white p-4">
                                <h4 className="font-bold text-ink text-sm mb-3 flex items-center gap-2"><ClipboardList className="h-4 w-4 text-purple-600" /> Process & Notes</h4>
                                <div className="space-y-3">
                                  {STAGE_NAMES.map((name, i) => (
                                    <label key={name} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer text-xs ${app.stage === i ? 'bg-purple-50 border border-purple-200 font-medium' : 'bg-slate-50 hover:bg-slate-100'}`}>
                                      <input type="radio" name={`stage-${app.id}`} checked={app.stage === i} onChange={() => updateStage(app.id, i)} className="h-3.5 w-3.5 text-purple-600" />
                                      {i + 1}. {name}
                                    </label>
                                  ))}
                                </div>
                                {app.notes && (
                                  <div className="mt-3 p-3 rounded-lg bg-slate-50 text-xs text-slate-600">
                                    <span className="font-semibold">Notes:</span> {app.notes}
                                  </div>
                                )}
                                <button onClick={() => editApplication(app)} className="mt-3 w-full rounded-xl bg-purple-600 py-2 text-xs font-bold text-white hover:bg-purple-700">
                                  <Edit className="h-3.5 w-3.5 inline-block mr-1" />Edit Application
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
