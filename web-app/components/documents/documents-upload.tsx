'use client';

import { Upload, CheckCircle2, FileText, AlertCircle } from 'lucide-react';

export function DocumentsUpload() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Document Upload</h1>
        <p className="mt-2 text-slate-500">Bulk upload employee documents securely</p>
      </div>

      {/* Upload Area */}
      <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center hover:border-brand-400 hover:bg-brand-50/30 transition-colors">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-brand-100 p-4 text-brand-600">
            <Upload className="h-8 w-8" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-ink">Drop files here or click to upload</h3>
        <p className="text-sm text-slate-500 mt-2">Supports PDF, JPG, PNG up to 50MB per file</p>
        <button className="mt-6 rounded-lg bg-brand-600 text-white px-6 py-3 font-medium hover:bg-brand-700">
          Select Files
        </button>
      </div>

      {/* Upload Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Files Uploaded Today</p>
          <p className="mt-2 text-2xl font-bold text-ink">24</p>
          <p className="mt-1 text-xs text-green-600">+8 from yesterday</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Processing</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">6</p>
          <p className="mt-1 text-xs text-slate-500">Average 2 mins</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-600">Storage Used</p>
          <p className="mt-2 text-2xl font-bold text-slate-700">124 GB</p>
          <p className="mt-1 text-xs text-slate-500">of 1 TB (via Teledrive)</p>
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-bold text-ink">Recent Uploads</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { name: 'mekdes_tesfaye_passport.pdf', employee: 'Mekdes Tesfaye', size: '2.4 MB', status: 'Verified' },
            { name: 'hana_bekele_medical.jpg', employee: 'Hana Bekele', size: '1.8 MB', status: 'In Review' },
            { name: 'selamawit_visa_form.pdf', employee: 'Selamawit Alemu', size: '890 KB', status: 'Processing' },
          ].map((upload, idx) => (
            <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <FileText className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="font-medium text-ink">{upload.name}</p>
                  <p className="text-xs text-slate-500">{upload.employee} • {upload.size}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                upload.status === 'Verified' ? 'bg-green-50 text-green-700' :
                upload.status === 'In Review' ? 'bg-blue-50 text-blue-700' :
                'bg-yellow-50 text-yellow-700'
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
