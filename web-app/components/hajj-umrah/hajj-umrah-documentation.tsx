'use client';

import { FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export function HajjUmrahDocumentation() {
  const documents = [
    { id: 'DOC-001', pilgrim: 'Abebe Tekle', docType: 'Passport', status: 'verified', uploadDate: '2026-03-15' },
    { id: 'DOC-002', pilgrim: 'Hiwot Desta', docType: 'Health Certificate', status: 'verified', uploadDate: '2026-03-16' },
    { id: 'DOC-003', pilgrim: 'Girma Tadesse', docType: 'Visa', status: 'pending', uploadDate: '2026-03-17' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Documentation Tracking</h1>
        <p className="mt-2 text-slate-500">Track pilgrim documentation and upload status</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-green-50 to-green-100/50">
          <p className="text-sm text-slate-600">Verified</p>
          <p className="mt-2 text-2xl font-bold text-green-600">289</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-yellow-50 to-yellow-100/50">
          <p className="text-sm text-slate-600">Pending Review</p>
          <p className="mt-2 text-2xl font-bold text-yellow-600">34</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-blue-50 to-blue-100/50">
          <p className="text-sm text-slate-600">Pending Upload</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">12</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 bg-gradient-to-br from-red-50 to-red-100/50">
          <p className="text-sm text-slate-600">Issues</p>
          <p className="mt-2 text-2xl font-bold text-red-600">7</p>
        </div>
      </div>

      {/* Documents Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-bold text-ink">Document Status</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Doc ID</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Pilgrim</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Document Type</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Upload Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-purple-600">{doc.id}</td>
                  <td className="px-6 py-4">{doc.pilgrim}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-400" />
                    {doc.docType}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      doc.status === 'verified' ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{doc.uploadDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
