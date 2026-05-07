'use client';

import { FileCheck2, Upload, AlertCircle, Search } from 'lucide-react';
import Link from 'next/link';

export function DocumentsModule() {
  const documentTypes = [
    { title: 'Upload Documents', href: '/documents/upload', icon: Upload, description: 'Bulk upload passports, medical certificates, and forms', count: '0 pending' },
    { title: 'Visa Documents', href: '/documents/visa', icon: FileCheck2, description: 'Manage visa applications and approvals', count: '12 processing' },
    { title: 'MOLS Processing', href: '/documents/mols', icon: FileCheck2, description: 'Ministry of Labor & Social Affairs coordination', count: '8 in review' },
    { title: 'Missing Reports', href: '/documents/missing-report', icon: AlertCircle, description: 'Track missing or incomplete documents', count: '5 alerts' },
    { title: 'Cross-Match', href: '/documents/cross-match', icon: Search, description: 'Verify document consistency across systems', count: '3 pending' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Document Management</h1>
        <p className="mt-2 text-slate-500">Manage all employee documents including visas, MOLS, passports, and medical certificates</p>
      </div>

      {/* Document Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Total Documents</p>
          <p className="mt-2 text-2xl font-bold text-ink">1,284</p>
          <p className="mt-1 text-xs text-green-600">+12% from last month</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">In Processing</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">234</p>
          <p className="mt-1 text-xs text-slate-500">Average 3 days</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Verified</p>
          <p className="mt-2 text-2xl font-bold text-green-600">892</p>
          <p className="mt-1 text-xs text-slate-500">Ready for travel</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Issues Found</p>
          <p className="mt-2 text-2xl font-bold text-red-600">158</p>
          <p className="mt-1 text-xs text-slate-500">Require follow-up</p>
        </div>
      </div>

      {/* Document Workflows */}
      <div>
        <h2 className="text-xl font-bold text-ink mb-4">Document Workflows</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {documentTypes.map((doc) => (
            <Link
              key={doc.href}
              href={doc.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-brand-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="rounded-lg bg-slate-100 p-3 text-slate-600 group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors">
                  <doc.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded">{doc.count}</span>
              </div>
              <h3 className="font-bold text-ink">{doc.title}</h3>
              <p className="text-sm text-slate-500 mt-2">{doc.description}</p>
              <div className="mt-4 flex items-center text-brand-600 text-sm font-medium group-hover:gap-2 gap-1 transition-all">
                <span>Access</span> →
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Documents Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-bold text-ink">Recent Documents</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Document Type</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Employee</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Uploaded</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { type: 'Passport', employee: 'Mekdes Tesfaye', status: 'Verified', date: '2 days ago' },
                { type: 'Medical Certificate', employee: 'Hana Bekele', status: 'In Review', date: '3 days ago' },
                { type: 'Visa Application', employee: 'Selamawit Alemu', status: 'Pending MOLS', date: '1 day ago' },
                { type: 'Medical Report', employee: 'Rahel Tadesse', status: 'Missing', date: '5 days ago' },
              ].map((doc, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-ink">{doc.type}</td>
                  <td className="px-6 py-4 text-slate-600">{doc.employee}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      doc.status === 'Verified' ? 'bg-green-50 text-green-700' :
                      doc.status === 'In Review' ? 'bg-blue-50 text-blue-700' :
                      doc.status === 'Pending MOLS' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{doc.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
