'use client';

import { useState, useEffect } from 'react';
import { FileText, Download, Share2, Eye, Upload, Users, FileDown, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { jsPDF } from 'jspdf';

interface Employee {
  id: string;
  name: string;
  role?: string;
  destination?: string;
  status: string;
}

const CV_TEMPLATES = [
  { id: 'professional', name: 'Professional', description: 'Clean, corporate design' },
  { id: 'modern', name: 'Modern', description: 'Contemporary with accent colors' },
  { id: 'minimal', name: 'Minimal', description: 'Simple, text-focused layout' }
];

const CV_LANGUAGES = [
  { id: 'en', name: 'English' },
  { id: 'ar', name: 'Arabic (العربية)' },
  { id: 'both', name: 'Bilingual (EN & AR)' }
];

export function CvGenerator() {
  const router = useRouter();
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCv, setGeneratedCv] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/employees?limit=100')
      .then(res => res.json())
      .then(data => {
        if (data.data) setEmployees(data.data);
      })
      .catch(() => setEmployees([]));
  }, []);

  const handleGenerate = async () => {
    if (!selectedEmployee) return;
    setIsGenerating(true);

    try {
      const res = await fetch(`/api/employees/${selectedEmployee}`);
      const data = await res.json();

      if (data.success) {
        const html = generateCvHtml(data.data, selectedTemplate, selectedLanguage);
        setGeneratedCv(html);
      }
    } catch (error) {
      console.error('Error generating CV:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedCv) return;

    const blob = new Blob([generatedCv], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cv-${selectedEmployee}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = async () => {
    if (!selectedEmployee) return;
    setIsGenerating(true);

    try {
      const res = await fetch(`/api/employees/${selectedEmployee}`);
      const data = await res.json();

      if (data.success) {
        generateAndDownloadPdf(data.data, selectedTemplate, selectedLanguage);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAndDownloadPdf = (employee: any, template: string, language: string) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    // Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(employee.name, pageWidth / 2, y, { align: 'center' });
    y += 10;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(employee.role || 'Employee Profile', pageWidth / 2, y, { align: 'center' });
    y += 8;

    if (employee.destination) {
      doc.text(`Preferred Destination: ${employee.destination}`, pageWidth / 2, y, { align: 'center' });
      y += 10;
    }

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.line(20, y, pageWidth - 20, y);
    y += 15;

    // Info section
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Professional Details', 20, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Experience: ${employee.experienceYears ? employee.experienceYears + ' years' : 'Not specified'}`, 20, y);
    y += 8;

    // Since skills are not directly an array in the mock, we handle it if available
    const languages = employee.languages ? (Array.isArray(employee.languages) ? employee.languages.join(', ') : employee.languages) : 'Not specified';
    doc.text(`Languages: ${languages}`, 20, y);
    y += 8;
    doc.text(`Status: ${employee.status.replace(/_/g, ' ')}`, 20, y);
    y += 15;

    // System Data
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('System Records', 20, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Employee ID: ${employee.id}`, 20, y);
    y += 8;
    doc.text(`Registration Date: ${new Date(employee.createdAt).toLocaleDateString()}`, 20, y);
    y += 8;

    const docCount = employee.documents?.length || employee._count?.documents || 0;
    doc.text(`Documents on file: ${docCount}`, 20, y);
    y += 8;

    const travelCount = employee.travels?.length || employee._count?.travels || 0;
    doc.text(`Travel records: ${travelCount}`, 20, y);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text(`Generated securely by Ethio Agency Hub - ${new Date().toLocaleDateString()}`, pageWidth / 2, 280, { align: 'center' });

    doc.save(`cv-${employee.name.replace(/\s+/g, '-').toLowerCase()}.pdf`);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold">Generate CV</h3>
        <p className="mt-1 text-sm text-slate-500">Create professional CVs for employees from stored data.</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Select Employee</label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5"
            >
              <option value="">Choose employee...</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} - {emp.role || 'No role'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Template</label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5"
            >
              {CV_TEMPLATES.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">CV Language</label>
            <div className="flex gap-4">
              {CV_LANGUAGES.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`flex-1 rounded-xl border p-3 text-sm font-medium transition-colors ${selectedLanguage === lang.id
                      ? 'border-brand-600 bg-brand-50 text-brand-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!selectedEmployee || isGenerating}
          className="mt-6 flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-2.5 font-medium text-white disabled:opacity-50"
        >
          {isGenerating ? (
            <>Generating...</>
          ) : (
            <>
              <FileText className="h-4 w-4" />
              Generate CV
            </>
          )}
        </button>
        <button
          onClick={handleDownloadPdf}
          disabled={!selectedEmployee || isGenerating}
          className="mt-6 ml-4 flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 font-medium text-white disabled:opacity-50"
        >
          <FileDown className="h-4 w-4" />
          Download PDF
        </button>
      </section>

      {generatedCv && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Preview</h3>
            <div className="flex gap-2">
              <button
                onClick={handleDownloadPdf}
                className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
              >
                <FileDown className="h-4 w-4" />
                PDF
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
              >
                <Download className="h-4 w-4" />
                HTML
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([generatedCv], { type: 'text/html' });
                  const url = URL.createObjectURL(blob);
                  window.open(url, '_blank');
                }}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
              >
                <Eye className="h-4 w-4" />
                Open
              </button>
            </div>
          </div>
          <div className="mt-4 h-96 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
            <iframe
              srcDoc={generatedCv}
              className="h-full w-full rounded"
              title="CV Preview"
            />
          </div>
        </section>
      )}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold">Templates</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {CV_TEMPLATES.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTemplate(t.id)}
              className={`rounded-xl border p-4 text-left transition-all ${selectedTemplate === t.id
                  ? 'border-brand-600 bg-brand-50'
                  : 'border-slate-200 hover:border-slate-300'
                }`}
            >
              <div className="flex h-24 items-center justify-center rounded-lg bg-slate-100">
                <FileText className="h-8 w-8 text-slate-400" />
              </div>
              <h4 className="mt-3 font-semibold">{t.name}</h4>
              <p className="text-sm text-slate-500">{t.description}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function generateCvHtml(employee: any, template: string, language: string): string {
  const isModern = template === 'modern';
  const isMinimal = template === 'minimal';

  const bg = isModern ? '#f8fafc' : isMinimal ? '#ffffff' : '#f1f5f9';
  const font = isMinimal ? 'Georgia, serif' : 'system-ui, -apple-system, sans-serif';
  const primary = isModern ? '#0ea5e9' : isMinimal ? '#333333' : '#1e293b';
  const secondary = isMinimal ? '#666666' : '#64748b';

  const languages = employee.languages ? (Array.isArray(employee.languages) ? employee.languages.join(', ') : employee.languages) : 'Not specified';
  const exp = employee.experienceYears ? `${employee.experienceYears} years` : 'Not specified';

  const labels = {
    exp: language === 'en' ? 'Experience' : language === 'ar' ? 'الخبرة' : 'Experience / الخبرة',
    lang: language === 'en' ? 'Languages' : language === 'ar' ? 'اللغات' : 'Languages / اللغات',
    status: language === 'en' ? 'Current Status' : language === 'ar' ? 'الحالة الحالية' : 'Current Status / الحالة الحالية',
    reg: language === 'en' ? 'Registration Date' : language === 'ar' ? 'تاريخ التسجيل' : 'Registration Date / تاريخ التسجيل',
    prof: language === 'en' ? 'Professional Details' : language === 'ar' ? 'التفاصيل المهنية' : 'Professional Details / التفاصيل المهنية',
    sys: language === 'en' ? 'System Records' : language === 'ar' ? 'سجلات النظام' : 'System Records / سجلات النظام',
    docs: language === 'en' ? 'Documents on File' : language === 'ar' ? 'المستندات في الملف' : 'Documents on File / المستندات في الملف',
    travel: language === 'en' ? 'Travel History' : language === 'ar' ? 'سجل السفر' : 'Travel History / سجل السفر',
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return `
<!DOCTYPE html>
<html dir="\${dir}">
<head>
  <meta charset="UTF-8">
  <title>\${employee.name} - CV</title>
  <style>
    :root { --primary: \${primary}; --secondary: \${secondary}; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: \${bg}; font-family: \${font}; color: #333; line-height: 1.6; padding: 40px 0; }
    .page { max-width: 800px; margin: 0 auto; background: #fff; padding: 50px; position: relative; box-shadow: \${isMinimal ? 'none' : '0 10px 25px rgba(0,0,0,0.05)'}; border-radius: \${isMinimal ? '0' : '16px'}; border: \${isMinimal ? '1px solid #eaeaea' : 'none'}; }
    .passport-photo { position: absolute; top: 50px; \${dir === 'rtl' ? 'left: 50px;' : 'right: 50px;'} width: 120px; height: 160px; background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #94a3b8; text-align: center; font-weight: 500; }
    .header { text-align: \${isModern ? 'left' : 'center'}; margin-bottom: 40px; border-bottom: \${isModern ? '4px solid var(--primary)' : '1px solid #eaeaea'}; padding-bottom: 20px; padding-\${dir === 'rtl' ? 'left' : 'right'}: 150px; }
    .name { font-size: 36px; font-weight: 800; color: var(--primary); letter-spacing: -0.5px; }
    .role { font-size: 18px; color: var(--secondary); margin-top: 8px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; }
    .meta { margin-top: 15px; font-size: 14px; color: #888; display: flex; gap: 20px; justify-content: \${isModern ? 'flex-start' : 'center'}; }
    .section { margin-bottom: 35px; }
    .section-title { font-size: 18px; font-weight: bold; color: var(--primary); border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 20px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .card { background: \${isMinimal ? '#fff' : '#f8fafc'}; padding: 15px; border-radius: 8px; border: \${isMinimal ? '1px solid #eaeaea' : 'none'}; }
    .item-label { font-size: 12px; text-transform: uppercase; color: var(--secondary); font-weight: 600; letter-spacing: 0.5px; }
    .item-value { font-size: 16px; color: #1e293b; font-weight: 500; margin-top: 4px; }
    .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #eaeaea; display: flex; justify-content: space-between; align-items: flex-end; }
    .footer-text { font-size: 12px; color: #cbd5e1; }
    .full-body-photo { width: 45%; max-width: 250px; height: 350px; background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #94a3b8; font-weight: 500; text-align: center; }
  </style>
</head>
<body>
  <div class="page">
    <div class="passport-photo">Passport Size<br>Photo</div>
    <div class="header">
      <div class="name">\${employee.name}</div>
      <div class="role">\${employee.role || 'Employee Profile'}</div>
      <div class="meta">
        <span>📍 \${employee.destination || 'Open Destination'}</span>
        <span>🆔 ID: \${employee.id.slice(0, 8)}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">\${labels.prof}</div>
      <div class="grid">
        <div class="card">
          <div class="item-label">\${labels.exp}</div>
          <div class="item-value">\${exp}</div>
        </div>
        <div class="card">
          <div class="item-label">\${labels.lang}</div>
          <div class="item-value">\${languages}</div>
        </div>
        <div class="card">
          <div class="item-label">\${labels.status}</div>
          <div class="item-value">\${employee.status.replace(/_/g, ' ')}</div>
        </div>
        <div class="card">
          <div class="item-label">\${labels.reg}</div>
          <div class="item-value">\${new Date(employee.createdAt).toLocaleDateString()}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">\${labels.sys}</div>
      <div class="grid">
        <div class="card">
          <div class="item-label">\${labels.docs}</div>
          <div class="item-value">\${employee.documents?.length || employee._count?.documents || 0} Verified Documents</div>
        </div>
        <div class="card">
          <div class="item-label">\${labels.travel}</div>
          <div class="item-value">\${employee.travels?.length || employee._count?.travels || 0} Recorded Trips</div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-text">Generated securely by Ethio Agency Hub</div>
      <div class="full-body-photo">Full Body<br>Photo<br>(Half Side)</div>
    </div>
  </div>
</body>
</html>
  `.trim();
}