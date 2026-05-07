'use client';

import Link from 'next/link';
import { FileCheck2, Upload, FileText, Landmark, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

const documentStats = [
  { label: 'Total Documents', value: '5,284', change: '+18.4%', icon: FileCheck2, color: 'bg-blue-500' },
  { label: 'Pending Review', value: '142', change: '+9.2%', icon: AlertCircle, color: 'bg-orange-500' },
  { label: 'Approved', value: '4,890', change: '+12.1%', icon: CheckCircle2, color: 'bg-green-500' },
  { label: 'In MOLS Processing', value: '252', change: '18 completed', icon: Landmark, color: 'bg-purple-500' }
];

const recentDocuments = [
  { id: 'DOC-001', type: 'Passport', employee: 'Mekdes Tesfaye', status: 'approved', uploadedBy: 'Addis Admin', date: '2026-05-05' },
  { id: 'DOC-002', type: 'Visa', employee: 'Hana Bekele', status: 'pending', uploadedBy: 'Dire Dawa Agent', date: '2026-05-04' },
  { id: 'DOC-003', type: 'Medical Report', employee: 'Selamawit Alemu', status: 'processing', uploadedBy: 'Hawassa Agent', date: '2026-05-03' },
  { id: 'DOC-004', type: 'Employment Contract', employee: 'Rahel Tadesse', status: 'approved', uploadedBy: 'System', date: '2026-05-02' },
];

export function DocumentsOverview() {
  const documentCategories = [
    { title: 'Upload Documents', href: '/documents/upload', icon: Upload, desc: 'Add new documents to the system' },
    { title: 'Visa Documents', href: '/documents/visa', icon: FileText, desc: 'Manage visa applications' },
    { title: 'MOLS Processing', href: '/documents/mols', icon: Landmark, desc: 'Track MOLS submissions' },
    { title: 'Missing Reports', href: '/documents/missing-report', icon: AlertCircle, desc: 'Find missing documents' },
    { title: 'Cross-Match', href: '/documents/cross-match', icon: CheckCircle2, desc: 'Verify document matches' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Document Management</h1>
        <p className="mt-2 text-slate-500">Centralized document processing, MOLS integration, and compliance tracking</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {documentStats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow">
            <div className="mb-4 flex items-center justify-between">
              <div className={`rounded-lg ${stat.color} p-3 text-white`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-ink">{stat.value}</p>
            <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Document Categories */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {documentCategories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group rounded-2xl border border-slate-200 bg-white p-4 hover:border-blue-200 hover:bg-blue-50/50 transition-all"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="rounded-lg bg-slate-100 p-2 text-blue-600 group-hover:bg-blue-100">
                <cat.icon className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
            </div>
            <p className="font-semibold text-ink">{cat.title}</p>
            <p className="mt-1 text-xs text-slate-500">{cat.desc}</p>
          </Link>
        ))}
      </div>

      {/* Recent Documents Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-bold text-ink">Recent Documents</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left font-semibold text-slate-600">ID</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Type</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Employee</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Uploaded By</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-blue-600">{doc.id}</td>
                  <td className="px-6 py-4 text-slate-600">{doc.type}</td>
                  <td className="px-6 py-4 text-slate-600">{doc.employee}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      doc.status === 'approved' ? 'bg-green-100 text-green-700' :
                      doc.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{doc.uploadedBy}</td>
                  <td className="px-6 py-4 text-slate-600">{doc.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
