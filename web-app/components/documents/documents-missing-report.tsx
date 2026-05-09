'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, Clock, Download, FileText, Printer, RefreshCcw, Send, Search } from 'lucide-react';

type Priority = 'critical' | 'high' | 'medium';
type ReportStatus = 'draft' | 'submitted_to_mols' | 'under_review' | 'resolved';

type MissingAbroadCase = {
  id: string;
  employeeId: string;
  employeeName: string;
  passportNo: string;
  destinationCountry: string;
  employerName: string;
  missingSince: string;
  lastContactDate: string;
  agencyContactName: string;
  agencyContactPhone: string;
  priority: Priority;
  status: ReportStatus;
  molsReference?: string;
  notes: string;
  letterText?: string;
};

export function DocumentsMissingReport() {
  const [cases, setCases] = useState<MissingAbroadCase[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState('');
  const [letterText, setLetterText] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCases = useMemo(() => {
    return cases.filter(item => 
      item.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.passportNo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cases, searchQuery]);

  const selectedCase = useMemo(
    () => cases.find((item) => item.id === selectedCaseId) ?? filteredCases[0],
    [cases, selectedCaseId, filteredCases]
  );

  const loadCases = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/documents/missing-report');
      const payload = await res.json();
      if (!res.ok || !payload?.success || !Array.isArray(payload.data)) {
        throw new Error(payload?.error?.message ?? 'Failed to load missing abroad cases');
      }

      setCases(payload.data as MissingAbroadCase[]);
      if (payload.data.length > 0) {
        const first = payload.data[0] as MissingAbroadCase;
        setSelectedCaseId(first.id);
        setLetterText(buildMolsLetter(first));
      } else {
        setSelectedCaseId('');
        setLetterText('');
      }
      setLastUpdatedAt(new Date());
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to load missing abroad cases');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCases();
  }, []);

  const buildMolsLetter = (caseItem: MissingAbroadCase) => {
    const today = new Date().toLocaleDateString();
    return [
      `Date: ${today}`,
      '',
      'To: Ministry of Labor and Skills (MOLS)',
      'Subject: Official Missing Employee Abroad Report',
      '',
      'Dear Sir/Madam,',
      '',
      `This is to officially report that employee ${caseItem.employeeName} (Employee ID: ${caseItem.employeeId}) is missing abroad.`,
      '',
      'Employee Details:',
      `- Full Name: ${caseItem.employeeName}`,
      `- Employee ID: ${caseItem.employeeId}`,
      `- Passport Number: ${caseItem.passportNo}`,
      `- Destination Country: ${caseItem.destinationCountry}`,
      `- Employer Abroad: ${caseItem.employerName}`,
      `- Missing Since: ${new Date(caseItem.missingSince).toLocaleDateString()}`,
      `- Last Contact Date: ${new Date(caseItem.lastContactDate).toLocaleDateString()}`,
      '',
      'Case Summary:',
      caseItem.notes,
      '',
      'Agency Contact for Follow-up:',
      `- Contact Person: ${caseItem.agencyContactName}`,
      `- Phone: ${caseItem.agencyContactPhone}`,
      '',
      'We request urgent coordination with relevant authorities and diplomatic channels to locate and safeguard the employee.',
      '',
      'Sincerely,',
      'Agency Compliance Office',
      'Ethio Agency Hub'
    ].join('\n');
  };

  const generateLetter = () => {
    if (!selectedCase) return;
    setLetterText(buildMolsLetter(selectedCase));
    setMessage('MOLS official letter generated from selected case details.');
  };

  const downloadLetter = () => {
    if (!selectedCase || !letterText.trim()) return;
    const blob = new Blob([letterText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedCase.id.toLowerCase()}-mols-letter.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const printLetter = () => {
    if (!selectedCase || !letterText.trim()) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <html>
        <head>
          <title>MOLS Letter - ${selectedCase.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; line-height: 1.5; white-space: pre-wrap; }
          </style>
        </head>
        <body>${letterText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const submitToMols = async () => {
    if (!selectedCase) return;
    const molsReference = selectedCase.molsReference ?? `MOLS-${new Date().getTime().toString().slice(-6)}`;
    const updatedCase: MissingAbroadCase = {
      ...selectedCase,
      status: 'submitted_to_mols',
      molsReference,
      letterText
    };

    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch('/api/documents/missing-report', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          case: updatedCase,
          reason: 'submitted_to_mols'
        })
      });
      const payload = await res.json();

      if (!res.ok || !payload?.success) {
        throw new Error(payload?.error?.message ?? 'Failed to submit case to MOLS');
      }

      setCases((prev) => prev.map((item) => (item.id === selectedCase.id ? updatedCase : item)));
      setLastUpdatedAt(new Date());
      setMessage(`Case ${selectedCase.id} submitted to MOLS successfully. Reference: ${molsReference}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to submit case to MOLS');
    } finally {
      setSubmitting(false);
    }
  };

  const exportCaseSummary = () => {
    if (cases.length === 0) return;
    const summary = [
      'Missing Employee Abroad Cases Summary (MOLS)',
      `Generated At: ${new Date().toLocaleString()}`,
      `Total Cases: ${cases.length}`,
      `Submitted to MOLS: ${cases.filter((item) => item.status === 'submitted_to_mols').length}`,
      `Under Review: ${cases.filter((item) => item.status === 'under_review').length}`,
      `Resolved: ${cases.filter((item) => item.status === 'resolved').length}`,
      `Critical Priority: ${cases.filter((item) => item.priority === 'critical').length}`,
      '',
      'Case Details:',
      ...cases.map((item) =>
        [
          `- ${item.id}`,
          `  Employee: ${item.employeeName} (${item.employeeId})`,
          `  Destination: ${item.destinationCountry}`,
          `  Missing Since: ${new Date(item.missingSince).toLocaleDateString()}`,
          `  Status: ${item.status.replaceAll('_', ' ')}`,
          `  Priority: ${item.priority}`,
          `  MOLS Ref: ${item.molsReference ?? 'N/A'}`
        ].join('\n')
      )
    ].join('\n');

    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mols-missing-cases-summary-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage('Case summary exported successfully.');
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'submitted_to_mols':
        return 'bg-blue-100 text-blue-700';
      case 'under_review':
        return 'bg-purple-100 text-purple-700';
      case 'resolved':
        return 'bg-emerald-100 text-emerald-700';
      case 'draft':
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const stats = [
    { label: 'Missing Abroad Cases', value: String(cases.length), color: 'bg-red-100 text-red-700' },
    { label: 'Submitted to MOLS', value: String(cases.filter((item) => item.status === 'submitted_to_mols').length), color: 'bg-blue-100 text-blue-700' },
    { label: 'Under Government Review', value: String(cases.filter((item) => item.status === 'under_review').length), color: 'bg-purple-100 text-purple-700' },
    { label: 'Critical Cases', value: String(cases.filter((item) => item.priority === 'critical').length), color: 'bg-orange-100 text-orange-700' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Missing Employee Abroad Report (MOLS)</h1>
        <p className="mt-2 text-slate-500">
          Track employees reported missing abroad, prepare official letters, and submit complete case details to MOLS.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-2xl ${stat.color} p-6`}>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm opacity-90">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={generateLetter}
          disabled={!selectedCase || loading}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <FileText className="h-4 w-4" />
          Generate MOLS Letter
        </button>
        <button
          type="button"
          onClick={submitToMols}
          disabled={!selectedCase || submitting || loading}
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          {submitting ? 'Submitting...' : 'Submit to MOLS'}
        </button>
        <button
          type="button"
          onClick={downloadLetter}
          disabled={!letterText.trim() || loading}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          Download Letter
        </button>
        <button
          type="button"
          onClick={printLetter}
          disabled={!letterText.trim() || loading}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >
          <Printer className="h-4 w-4" />
          Print / Save PDF
        </button>
        <button
          type="button"
          onClick={loadCases}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          <RefreshCcw className="h-4 w-4" />
          Refresh Cases
        </button>
        <button
          type="button"
          onClick={exportCaseSummary}
          disabled={cases.length === 0 || loading}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >
          <CheckCircle2 className="h-4 w-4" />
          Export Case Summary
        </button>
      </div>
      {message ? (
        <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          {message}
        </div>
      ) : null}

      {/* Cases Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4 flex flex-wrap gap-4 items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-lg font-bold text-ink">Missing Abroad Cases</h3>
            <span className="text-xs font-semibold text-slate-600">
              Last updated: {lastUpdatedAt ? lastUpdatedAt.toLocaleTimeString() : 'N/A'}
            </span>
          </div>
          
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Employee Name, ID, or Passport..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 py-2 pl-9 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Case ID</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Employee</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Destination</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Missing Since</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Last Contact</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Priority</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">MOLS Ref</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td className="px-6 py-6 text-slate-500" colSpan={9}>Loading cases...</td>
                </tr>
              ) : filteredCases.length === 0 ? (
                <tr>
                  <td className="px-6 py-6 text-slate-500 text-center" colSpan={9}>
                    No missing-abroad cases found matching "{searchQuery}".
                  </td>
                </tr>
              ) : filteredCases.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-red-600">{item.id}</td>
                  <td className="px-6 py-4 text-slate-700">
                    <p className="font-semibold text-ink">{item.employeeName}</p>
                    <p className="text-xs text-slate-500">{item.employeeId} • {item.passportNo}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{item.destinationCountry}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(item.missingSince).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {new Date(item.lastContactDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getPriorityColor(item.priority)}`}>
                      {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{item.molsReference ?? '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(item.status)}`}>
                      {item.status.replaceAll('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCaseId(item.id);
                        setLetterText(buildMolsLetter(item));
                        setMessage(`Loaded case ${item.id} for letter preparation.`);
                      }}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      <AlertCircle className="h-4 w-4" />
                      Prepare
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Letter Editor */}
      {selectedCase ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-ink">Official MOLS Letter</h3>
              <p className="text-sm text-slate-500">
                Case: {selectedCase.id} • Employee: {selectedCase.employeeName}
              </p>
            </div>
            <button
              type="button"
              onClick={generateLetter}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Regenerate Letter
            </button>
          </div>
          <textarea
            value={letterText}
            onChange={(event) => setLetterText(event.target.value)}
            rows={18}
            className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand-600 focus:outline-none"
            placeholder="Generate official letter text for MOLS from selected case details..."
          />
        </section>
      ) : null}
    </div>
  );
}
