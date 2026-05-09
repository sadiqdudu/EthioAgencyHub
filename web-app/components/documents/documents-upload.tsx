'use client';

import { useState } from 'react';
import { Upload, CheckCircle2, FileText, AlertCircle, Search, User, FileType } from 'lucide-react';

export function DocumentsUpload() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDocType, setSelectedDocType] = useState('');

  const employees = ['Mekdes Tesfaye', 'Hana Bekele', 'Selamawit Alemu', 'Rahel Tadesse'];
  const docTypes = ['Passport', 'Medical Certificate', 'Visa Form', 'Contract', 'ID Card', 'Profile Photo'];

  const uploads = [
    { name: 'mekdes_tesfaye_passport.pdf', employee: 'Mekdes Tesfaye', size: '2.4 MB', status: 'Verified', type: 'Passport' },
    { name: 'hana_bekele_medical.jpg', employee: 'Hana Bekele', size: '1.8 MB', status: 'In Review', type: 'Medical Certificate' },
    { name: 'selamawit_visa_form.pdf', employee: 'Selamawit Alemu', size: '890 KB', status: 'Processing', type: 'Visa Form' },
  ];

  const filteredUploads = uploads.filter(u =>
    u.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Upload Documents</h1>
        <p className="mt-2 text-slate-500">Securely assign and upload required documents for specific employees.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload Form Configuration */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-ink mb-6">New Document Upload</h3>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">1. Select Employee</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-500" />
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-sm font-medium text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 appearance-none bg-white cursor-pointer"
                >
                  <option value="" disabled>Choose an employee...</option>
                  {employees.map(emp => <option key={emp} value={emp}>{emp}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">2. Document Type</label>
              <div className="relative">
                <FileType className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-500" />
                <select
                  value={selectedDocType}
                  onChange={(e) => setSelectedDocType(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-sm font-medium text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 appearance-none bg-white cursor-pointer"
                >
                  <option value="" disabled>Choose document type...</option>
                  {docTypes.map(doc => <option key={doc} value={doc}>{doc}</option>)}
                </select>
              </div>
            </div>
          </div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">3. Upload File</label>
          <div className={`rounded-2xl border-2 border-dashed ${selectedEmployee && selectedDocType ? 'border-brand-300 bg-brand-50/30 hover:border-brand-400 hover:bg-brand-50 transition-colors cursor-pointer' : 'border-slate-200 bg-slate-50/50 opacity-70 cursor-not-allowed'} p-10 text-center`}>
            <div className="flex justify-center mb-4">
              <div className={`rounded-full p-4 ${selectedEmployee && selectedDocType ? 'bg-brand-100 text-brand-600 shadow-sm' : 'bg-slate-200 text-slate-400'}`}>
                <Upload className="h-8 w-8" />
              </div>
            </div>
            <h4 className="text-lg font-bold text-ink">
              {selectedEmployee && selectedDocType ? 'Click or drag file to upload' : 'Select an employee & document type first'}
            </h4>
            <p className="text-sm font-medium text-slate-500 mt-2">
              Supports PDF, JPG, PNG up to 50MB
            </p>
            {selectedEmployee && selectedDocType && (
              <p className="text-xs font-semibold text-brand-600 mt-4 bg-brand-100 inline-block px-3 py-1 rounded-full">
                Target: {selectedDocType} for {selectedEmployee}
              </p>
            )}
          </div>
        </div>

        {/* Context Stats / Info Panel */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm bg-gradient-to-br from-white to-slate-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg text-green-600"><CheckCircle2 className="h-5 w-5" /></div>
              <p className="text-sm font-bold text-slate-700">Today's Uploads</p>
            </div>
            <p className="text-4xl font-extrabold text-ink">24</p>
            <p className="mt-2 text-xs font-semibold text-green-600 flex items-center gap-1">
              <span className="text-lg leading-none">+</span>8 files processed since yesterday
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-slate-700 mb-4">Storage Usage</p>
            <p className="text-3xl font-extrabold text-slate-800">124 <span className="text-lg text-slate-500 font-semibold">GB</span></p>
            <div className="mt-4 h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full rounded-full bg-brand-500" style={{ width: '12.4%' }}></div>
            </div>
            <p className="mt-3 text-xs font-semibold text-slate-500 flex justify-between">
              <span>12.4% Used</span>
              <span>1 TB Limit</span>
            </p>
          </div>
        </div>
      </div>

      {/* Uploads History Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm mt-8">
        <div className="border-b border-slate-200 px-6 py-5 flex flex-wrap gap-4 items-center justify-between bg-slate-50/50">
          <h3 className="text-lg font-bold text-ink">Recent Uploads History</h3>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by employee name or file..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm font-medium focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {filteredUploads.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-500 font-medium">
              No uploads found matching "{searchQuery}".
            </div>
          ) : filteredUploads.map((upload, idx) => (
            <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-slate-100 text-slate-500">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-ink">{upload.employee}</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    <span className="text-brand-600">{upload.type}</span> • {upload.name} ({upload.size})
                  </p>
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${upload.status === 'Verified' ? 'bg-green-50 text-green-700 border-green-200' :
                  upload.status === 'In Review' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-yellow-50 text-yellow-700 border-yellow-200'
                }`}>
                {upload.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
