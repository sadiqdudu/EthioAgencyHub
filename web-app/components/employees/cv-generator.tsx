'use client';

import { useState, useEffect } from 'react';
import { FileText, Download, Share2, Eye, Upload, Users, FileDown, Globe, Search, X, Check, Loader2, Mail, Phone, MapPin, Briefcase, Languages, GraduationCap, Award, Calendar } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface Employee {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  contactPhone?: string;
  role?: string;
  jobRole?: string;
  destination?: string;
  status?: string;
  education?: string;
  experience?: string;
  languages?: string[];
  additionalSkills?: string;
  createdAt?: string;
  passportNumber?: string;
  dateOfBirth?: string;
  region?: string;
  nationality?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  emergencyRelation?: string;
  bankName?: string;
  bankAccountNumber?: string;
  psychologyScore?: number;
  maritalStatus?: string;
  fatherName?: string;
  motherName?: string;
  _count?: { documents: number; travels: number };
}

interface CvTemplate {
  id: string;
  name: string;
  description: string;
  color: string;
}

const CV_TEMPLATES: CvTemplate[] = [
  { id: 'professional', name: 'Professional', description: 'Clean corporate design with accent colors', color: '#1e40af' },
  { id: 'modern', name: 'Modern', description: 'Contemporary minimalist layout', color: '#0d9488' },
  { id: 'ethiopian', name: 'Ethiopian Style', description: 'Traditional inspired with cultural colors', color: '#059669' },
  { id: 'executive', name: 'Executive', description: 'High-end professional for managers', color: '#7c3aed' },
  { id: 'agency', name: 'Agency Format', description: 'Optimized for overseas employer submission', color: '#dc2626' },
  { id: 'simple', name: 'Simple', description: 'Plain text-focused for quick printing', color: '#64748b' }
];

const CV_LANGUAGES = [
  { id: 'en', name: 'English', flag: '🇬🇧' },
  { id: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { id: 'am', name: 'Amharic', flag: '🇪🇹' },
  { id: 'both', name: 'Bilingual', flag: '🌍' }
];

const STATUS_COLORS: Record<string, string> = {
  REGISTERED: 'bg-blue-100 text-blue-700',
  DOCUMENT_REVIEW: 'bg-amber-100 text-amber-700',
  MOLS_PENDING: 'bg-orange-100 text-orange-700',
  INTERVIEW_UPLOADED: 'bg-purple-100 text-purple-700',
  TRAVEL_READY: 'bg-green-100 text-green-700',
  DEPLOYED: 'bg-emerald-100 text-emerald-700'
};

export function CvGenerator() {
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCv, setGeneratedCv] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
  const [showBatchMode, setShowBatchMode] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(0);
  
  // Agent template customization
  const [showAgentManager, setShowAgentManager] = useState(false);
  const [agentTemplates, setAgentTemplates] = useState<Record<string, { logo: string; header: string; footer: string; color: string }>>({});
  const [currentAgent, setCurrentAgent] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentLogo, setAgentLogo] = useState('');
  const [agentHeader, setAgentHeader] = useState('');
  const [agentFooter, setAgentFooter] = useState('');
  const [agentColor, setAgentColor] = useState('#1e40af');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('agentTemplates');
      if (saved) setAgentTemplates(JSON.parse(saved));
    } catch {}
  }, []);

  const saveAgentTemplate = () => {
    if (!agentName.trim()) return;
    const updated = { ...agentTemplates, [agentName]: { logo: agentLogo, header: agentHeader, footer: agentFooter, color: agentColor } };
    setAgentTemplates(updated);
    try { localStorage.setItem('agentTemplates', JSON.stringify(updated)); } catch {}
    setShowAgentManager(false);
  };

  const loadAgentTemplate = (name: string) => {
    const t = agentTemplates[name];
    if (t) {
      setCurrentAgent(name);
      setSelectedTemplate('agency');
      setAgentLogo(t.logo);
      setAgentHeader(t.header);
      setAgentFooter(t.footer);
      setAgentColor(t.color);
    }
  };

  const deleteAgentTemplate = (name: string) => {
    const updated = { ...agentTemplates };
    delete updated[name];
    setAgentTemplates(updated);
    try { localStorage.setItem('agentTemplates', JSON.stringify(updated)); } catch {}
    if (currentAgent === name) { setCurrentAgent(''); setAgentLogo(''); setAgentHeader(''); setAgentFooter(''); }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch('/api/employees?limit=200');
      const data = await res.json();
      if (data.success && data.data) {
        const mapped = data.data.map((e: any) => ({
          ...e,
          name: `${e.firstName || ''} ${e.lastName || ''}`.trim() || 'Unknown',
          role: e.role || e.jobRole || '-',
          email: e.email || '-',
          contactPhone: e.contactPhone || '-',
          education: e.education || '-',
          experience: e.experience || '-',
          languages: e.languages || [],
          additionalSkills: e.additionalSkills || '-',
          destination: e.destination || 'Open',
          passportNumber: e.passportNumber || '-',
          dateOfBirth: e.dateOfBirth || '-',
          region: e.region || '-',
          nationality: e.nationality || 'Ethiopian'
        }));
        setEmployees(mapped);
        setFilteredEmployees(mapped);
      }
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredEmployees(employees);
      return;
    }
    const filtered = employees.filter(emp =>
      emp.name?.toLowerCase().includes(query.toLowerCase()) ||
      emp.role?.toLowerCase().includes(query.toLowerCase()) ||
      emp.passportNumber?.toLowerCase().includes(query.toLowerCase()) ||
      emp.contactPhone?.includes(query)
    );
    setFilteredEmployees(filtered);
  };

  const handleSelectEmployee = (emp: Employee) => {
    if (showBatchMode) {
      setSelectedEmployees(prev => 
        prev.includes(emp.id) 
          ? prev.filter(id => id !== emp.id)
          : [...prev, emp.id]
      );
    } else {
      setSelectedEmployee(emp.id);
      setShowEmployeeDropdown(false);
    }
  };

  const handleGenerate = async () => {
    const empId = showBatchMode ? selectedEmployees[0] : selectedEmployee;
    if (!empId) return;
    
    setIsGenerating(true);
    try {
      const res = await fetch(`/api/employees/${empId}`);
      const data = await res.json();
      if (data.success) {
        const html = generateCvHtml(data.data, selectedTemplate, selectedLanguage, { color: agentColor, templates: agentTemplates, current: currentAgent });
        setGeneratedCv(html);

        try {
          await fetch('/api/cvs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              employeeId: empId,
              template: selectedTemplate,
              language: selectedLanguage,
              htmlContent: html
            })
          });
        } catch (saveError) {
          console.log('CV saved locally only');
        }
      }
    } catch (error) {
      console.error('Error generating CV:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBatchGenerate = async () => {
    if (selectedEmployees.length === 0) return;
    setIsGenerating(true);
    setGeneratedCount(0);
    
    for (const empId of selectedEmployees) {
      try {
        const res = await fetch(`/api/employees/${empId}`);
        const data = await res.json();
        if (data.success) {
          await generateAndDownloadPdf(data.data, selectedTemplate, selectedLanguage);
          setGeneratedCount(prev => prev + 1);

          try {
            const html = generateCvHtml(data.data, selectedTemplate, selectedLanguage, { color: agentColor, templates: agentTemplates, current: currentAgent });
            await fetch('/api/cvs', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                employeeId: empId,
                template: selectedTemplate,
                language: selectedLanguage,
                htmlContent: html
              })
            });
          } catch (e) {}
        }
      } catch (error) {
        console.error(`Error generating CV for ${empId}:`, error);
      }
    }
    
    setIsGenerating(false);
    setGeneratedCount(0);
  };

  const handleDownloadPdf = async () => {
    const empId = showBatchMode ? selectedEmployees[0] : selectedEmployee;
    if (!empId) return;
    setIsGenerating(true);

    try {
      const res = await fetch(`/api/employees/${empId}`);
      const data = await res.json();
      if (data.success) {
        const emp = {
          ...data.data,
          name: `${data.data.firstName || ''} ${data.data.lastName || ''}`.trim() || 'Unknown'
        };
        generateAndDownloadPdf(emp, selectedTemplate, selectedLanguage);
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
    
    const getTemplateColor = () => {
      switch(template) {
        case 'modern': return { primary: [13, 148, 136], secondary: [100, 116, 139] };
        case 'ethiopian': return { primary: [5, 150, 105], secondary: [100, 116, 139] };
        case 'executive': return { primary: [124, 58, 237], secondary: [100, 116, 139] };
        case 'simple': return { primary: [51, 65, 85], secondary: [100, 116, 139] };
        default: return { primary: [30, 41, 59], secondary: [100, 116, 139] };
      }
    };
    const colors = getTemplateColor();

    // Header with template color
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(employee.name || 'Employee Profile', pageWidth / 2, 25, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(employee.role || 'Job Candidate', pageWidth / 2, 33, { align: 'center' });

    y = 50;
    doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    doc.text(`📍 ${employee.destination || 'Open to Work'} | 🌍 ${employee.nationality || 'Ethiopian'}`, pageWidth / 2, y, { align: 'center' });

    // Contact Info
    y += 15;
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Contact Information', 20, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`📧 ${employee.email || 'Not provided'} | 📱 ${employee.contactPhone || 'Not provided'}`, 20, y);
    y += 6;
    doc.text(`🪪 Passport: ${employee.passportNumber || 'N/A'} | 📅 DOB: ${employee.dateOfBirth || 'N/A'}`, 20, y);

    // Professional Details
    y += 15;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.text('Professional Profile', 20, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    doc.text(`🎓 Education: ${employee.education || 'Not specified'}`, 20, y);
    y += 6;
    doc.text(`💼 Experience: ${employee.experience || 'Not specified'}`, 20, y);
    y += 6;
    doc.text(`🗣️ Languages: ${Array.isArray(employee.languages) ? employee.languages.join(', ') : employee.languages || 'Not specified'}`, 20, y);
    y += 6;
    doc.text(`🛠️ Skills: ${employee.additionalSkills || 'Not specified'}`, 20, y);

    // Status Badge
    y += 15;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Current Status', 20, y);
    y += 8;
    const status = (employee.status || 'REGISTERED').replace(/_/g, ' ');
    doc.setFontSize(14);
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.text(status, 20, y);

    // System Records
    y += 15;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.text('System Records', 20, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    doc.text(`🆔 ID: ${employee.id}`, 20, y);
    y += 6;
    doc.text(`📅 Registered: ${employee.createdAt ? new Date(employee.createdAt).toLocaleDateString() : 'N/A'}`, 20, y);
    y += 6;
    doc.text(`📁 Documents: ${employee._count?.documents || 0}`, 20, y);
    y += 6;
    doc.text(`✈️ Travel Records: ${employee._count?.travels || 0}`, 20, y);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Generated by Ethio Agency Hub | ${new Date().toLocaleDateString()}`, pageWidth / 2, 285, { align: 'center' });

    const fileName = employee.name ? employee.name.replace(/\s+/g, '-').toLowerCase() : 'employee-cv';
    doc.save(`${fileName}.pdf`);
  };

  const selectedEmp = employees.find(e => e.id === (showBatchMode ? selectedEmployees[0] : selectedEmployee));

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Employees</p>
          <p className="text-2xl font-bold text-ink">{employees.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Ready for CV</p>
          <p className="text-2xl font-bold text-brand-600">{employees.filter(e => e.status !== 'DEPLOYED').length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Templates</p>
          <p className="text-2xl font-bold text-purple-600">{CV_TEMPLATES.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Languages</p>
          <p className="text-2xl font-bold text-emerald-600">{CV_LANGUAGES.length}</p>
        </div>
      </div>

      {/* Main Generator Section */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-ink">CV Generator</h3>
            <p className="text-sm text-slate-500">Create professional CVs for employees</p>
          </div>
          
          {/* Batch Mode Toggle */}
          <button
            onClick={() => { setShowBatchMode(!showBatchMode); setSelectedEmployees([]); setSelectedEmployee(''); }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              showBatchMode ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-600'
            }`}
          >
            <Users className="h-4 w-4" />
            {showBatchMode ? 'Batch Mode ON' : 'Single Mode'}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Employee Selection */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                {showBatchMode ? 'Select Employees (Select multiple)' : 'Select Employee'}
              </label>
              
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, role, passport..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setShowEmployeeDropdown(true)}
                  className="w-full rounded-xl border border-slate-200 px-10 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(''); setFilteredEmployees(employees); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Employee Dropdown/List */}
              <div className="mt-2 max-h-64 overflow-auto rounded-xl border border-slate-200 bg-white">
                {filteredEmployees.length === 0 ? (
                  <div className="p-4 text-center text-slate-500">No employees found</div>
                ) : (
                  filteredEmployees.slice(0, 20).map(emp => (
                    <button
                      key={emp.id}
                      onClick={() => handleSelectEmployee(emp)}
                      className={`flex w-full items-center justify-between px-4 py-3 text-left hover:bg-slate-50 ${
                        (showBatchMode ? selectedEmployees.includes(emp.id) : selectedEmployee === emp.id) ? 'bg-brand-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {showBatchMode && (
                          <div className={`h-5 w-5 rounded border-2 flex items-center justify-center ${
                            selectedEmployees.includes(emp.id) ? 'bg-brand-600 border-brand-600' : 'border-slate-300'
                          }`}>
                            {selectedEmployees.includes(emp.id) && <Check className="h-3 w-3 text-white" />}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-ink">{emp.name}</p>
                          <p className="text-xs text-slate-500">{emp.role} • {emp.destination}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[emp.status || 'REGISTERED']}`}>
                        {emp.status?.replace('_', ' ') || 'Registered'}
                      </span>
                    </button>
                  ))
                )}
              </div>

              {/* Selected Count for Batch Mode */}
              {showBatchMode && selectedEmployees.length > 0 && (
                <p className="mt-2 text-sm text-brand-600 font-medium">
                  {selectedEmployees.length} employee(s) selected
                </p>
              )}
            </div>

            {/* Agent Template Manager */}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-brand-50 to-blue-50 p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-ink flex items-center gap-2"><Award className="h-5 w-5 text-brand-600" /> Agent CV Templates</h4>
                <button onClick={() => { setAgentName(''); setAgentLogo(''); setAgentHeader(''); setAgentFooter(''); setAgentColor('#1e40af'); setShowAgentManager(true); }} className="text-sm font-semibold text-brand-600 hover:text-brand-800">+ New Agent</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(agentTemplates).map(([name, t]) => (
                  <div key={name} className={`group relative rounded-xl border-2 px-3 py-2 cursor-pointer transition-all ${currentAgent === name ? 'border-brand-600 bg-brand-50' : 'border-slate-200 bg-white hover:border-brand-300'}`}>
                    <div onClick={() => loadAgentTemplate(name)} className="flex items-center gap-2 pr-6">
                      {t.logo ? <img src={t.logo} alt="" className="h-6 w-6 rounded object-cover" /> : <Award className="h-5 w-5 text-brand-500" />}
                      <span className="text-sm font-semibold">{name}</span>
                    </div>
                    <button onClick={() => deleteAgentTemplate(name)} className="absolute top-1 right-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><X className="h-3.5 w-3.5" /></button>
                  </div>
                ))}
                {Object.keys(agentTemplates).length === 0 && <p className="text-xs text-slate-500 py-2">No agent templates saved yet. Create one for each agent with their logo and branding.</p>}
              </div>
            </div>

            {/* Agent Template Modal */}
            {showAgentManager && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
                  <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="font-bold text-ink">Agent CV Template</h3>
                    <button onClick={() => setShowAgentManager(false)} className="p-1 rounded-lg hover:bg-slate-100"><X className="h-5 w-5 text-slate-500" /></button>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Agent Name *</label>
                      <input type="text" value={agentName} onChange={e => setAgentName(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm" placeholder="e.g., Qatar Career Hub" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Logo URL</label>
                      <input type="text" value={agentLogo} onChange={e => setAgentLogo(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm" placeholder="Paste image URL or upload" />
                      {agentLogo && <img src={agentLogo} alt="preview" className="mt-2 h-12 w-12 rounded-lg border object-cover" />}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Header Text</label>
                      <input type="text" value={agentHeader} onChange={e => setAgentHeader(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm" placeholder="e.g., Qatar Career Hub - Official CV" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Footer Text</label>
                      <input type="text" value={agentFooter} onChange={e => setAgentFooter(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm" placeholder="e.g., Approved by Ministry of Labor" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Brand Color</label>
                      <input type="color" value={agentColor} onChange={e => setAgentColor(e.target.value)} className="h-10 w-20 rounded border border-slate-300 cursor-pointer" />
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
                    <button onClick={() => setShowAgentManager(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600">Cancel</button>
                    <button onClick={saveAgentTemplate} className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-700 shadow-sm">Save Template</button>
                  </div>
                </div>
              </div>
            )}

            {/* Template & Language Selection */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">CV Template</label>
                <div className="grid grid-cols-2 gap-2">
                  {CV_TEMPLATES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTemplate(t.id)}
                      className={`rounded-xl border p-3 text-left transition-all ${
                        selectedTemplate === t.id 
                          ? 'border-2' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      style={selectedTemplate === t.id ? { borderColor: t.color, backgroundColor: `${t.color}10` } : {}}
                    >
                      <p className="font-medium text-sm" style={selectedTemplate === t.id ? { color: t.color } : {}}>{t.name}</p>
                      <p className="text-xs text-slate-500">{t.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">CV Language</label>
                <div className="grid grid-cols-2 gap-2">
                  {CV_LANGUAGES.map(lang => (
                    <button
                      key={lang.id}
                      onClick={() => setSelectedLanguage(lang.id)}
                      className={`rounded-xl border p-3 text-center transition-all ${
                        selectedLanguage === lang.id 
                          ? 'border-brand-600 bg-brand-50' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <p className="text-sm font-medium">{lang.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Selected Employee Preview */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="font-semibold text-slate-700 mb-3">Selected Employee</h4>
            {selectedEmp ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold">
                    {selectedEmp.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-bold text-ink">{selectedEmp.name}</p>
                    <p className="text-sm text-slate-500">{selectedEmp.role}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="h-4 w-4" /> {selectedEmp.contactPhone}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="h-4 w-4" /> {selectedEmp.email}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="h-4 w-4" /> {selectedEmp.destination}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Briefcase className="h-4 w-4" /> {selectedEmp.experience || 'Not specified'}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Languages className="h-4 w-4" /> {selectedEmp.languages?.join(', ') || 'Not specified'}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500 text-center py-8">
                {showBatchMode && selectedEmployees.length > 0 
                  ? `${selectedEmployees.length} employees selected` 
                  : 'No employee selected'}
              </p>
            )}

            {/* Action Buttons */}
            <div className="mt-4 space-y-2">
              {showBatchMode ? (
                <button
                  onClick={handleBatchGenerate}
                  disabled={selectedEmployees.length === 0 || isGenerating}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 font-medium text-white disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating {generatedCount}/{selectedEmployees.length}
                    </>
                  ) : (
                    <>
                      <FileDown className="h-4 w-4" />
                      Generate All PDFs ({selectedEmployees.length})
                    </>
                  )}
                </button>
              ) : (
                <>
                  <button
                    onClick={handleGenerate}
                    disabled={!selectedEmployee || isGenerating}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 font-medium text-white disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4" />
                        Preview CV
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDownloadPdf}
                    disabled={!selectedEmployee || isGenerating}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 font-medium text-white disabled:opacity-50"
                  >
                    <FileDown className="h-4 w-4" />
                    Download PDF
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CV Preview */}
      {generatedCv && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-ink">CV Preview</h3>
            <div className="flex gap-2">
              <button
                onClick={handleDownloadPdf}
                className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
              >
                <FileDown className="h-4 w-4" />
                Download PDF
              </button>
              <button
                onClick={() => setGeneratedCv(null)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
              >
                <X className="h-4 w-4" />
                Close
              </button>
            </div>
          </div>
          <div className="h-[600px] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <iframe
              srcDoc={generatedCv}
              className="h-full w-full"
              title="CV Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function generateCvHtml(employee: any, template: string, language: string, agentOpts?: { color: string; templates: Record<string, { logo: string; header: string; footer: string; color: string }>; current: string }): string {
  const templates: Record<string, { bg: string; primary: string; accent: string; font: string }> = {
    professional: { bg: '#f8fafc', primary: '#1e40af', accent: '#3b82f6', font: 'system-ui' },
    modern: { bg: '#f0fdf4', primary: '#0d9488', accent: '#14b8a6', font: 'Segoe UI' },
    ethiopian: { bg: '#fefce8', primary: '#059669', accent: '#22c55e', font: 'Georgia' },
    executive: { bg: '#faf5ff', primary: '#7c3aed', accent: '#a855f7', font: 'Arial' },
    agency: { bg: '#fff1f2', primary: agentOpts?.color || '#dc2626', accent: '#ef4444', font: 'Arial' },
    simple: { bg: '#ffffff', primary: '#334155', accent: '#64748b', font: 'Times New Roman' }
  };
  
  const t = templates[template] || templates.professional;
  const name = `${employee.firstName || ''} ${employee.lastName || ''}`.trim() || employee.name || 'Employee';
  const role = employee.role || employee.jobRole || 'Job Candidate';
  const dest = employee.destination || 'Open to Work';
  const lang = Array.isArray(employee.languages) ? employee.languages.join(', ') : employee.languages || 'Not specified';
  const exp = employee.experience || 'Not specified';
  const edu = employee.education || 'Not specified';
  const skills = employee.additionalSkills || 'Not specified';
  const email = employee.email || 'Not provided';
  const phone = employee.contactPhone || 'Not provided';
  const passport = employee.passportNumber || 'N/A';
  const dob = employee.dateOfBirth || 'N/A';
  const nationality = employee.nationality || 'Ethiopian';
  const status = (employee.status || 'REGISTERED').replace(/_/g, ' ');
  const region = employee.region || 'N/A';
  const fatherName = employee.fatherName || 'N/A';
  const motherName = employee.motherName || 'N/A';
  const maritalStatus = employee.maritalStatus || 'N/A';
  const emergencyInfo = employee.emergencyContact ? employee.emergencyContact + ' (' + (employee.emergencyRelation || 'N/A') + ') — ' + (employee.emergencyPhone || '') : 'Not provided';
  const bankInfo = employee.bankName ? employee.bankName + (employee.bankAccountNumber ? ' — Acc: ' + employee.bankAccountNumber : '') : 'Not provided';
  const isBilingual = language === 'both';
  const agentHeaderText = agentOpts?.current && agentOpts?.templates[agentOpts.current]?.header || '';

  return '<!DOCTYPE html><html' + (isBilingual ? ' lang="en"' : '') + '><head><meta charset="UTF-8"><title>' + name + ' - CV</title><style>' +
    '*{margin:0;padding:0;box-sizing:border-box}body{background:' + t.bg + ';font-family:' + t.font + ',sans-serif;color:#333;line-height:1.5;padding:15px}' +
    '.page{max-width:' + (isBilingual ? '1000' : '800') + 'px;margin:0 auto;background:#fff;padding:35px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08)}' +
    '.header{background:linear-gradient(135deg,' + t.primary + ',' + t.accent + ');color:#fff;padding:25px 30px;margin:-35px -35px 20px;border-radius:12px 12px 0 0;display:flex;align-items:center;gap:20px}' +
    '.passport-photo{width:80px;height:100px;border-radius:8px;border:3px solid rgba(255,255,255,0.5);object-fit:cover;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:bold;color:#fff;flex-shrink:0;overflow:hidden}' +
    '.passport-photo img{width:100%;height:100%;object-fit:cover}' +
    '.header-text{flex:1}.name{font-size:26px;font-weight:800}.role{font-size:14px;opacity:0.9;margin-top:3px}' +
    '.meta{margin-top:8px;font-size:11px;opacity:0.85;display:flex;gap:12px;flex-wrap:wrap}' +
    (isBilingual ? '.bilingual{display:grid;grid-template-columns:1fr 1fr;gap:20px}.ar-section{direction:rtl;text-align:right;font-family:\'Traditional Arabic\',Arial,sans-serif}.ar-section .section-title{text-align:right}.ar-section .card{border-left:none;border-right:3px solid ' + t.accent + '}' : '') +
    '.section{margin-bottom:18px}' +
    '.section-title{font-size:13px;font-weight:bold;color:' + t.primary + ';border-bottom:2px solid ' + t.accent + '20;padding-bottom:5px;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px}' +
    '.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}' +
    '.card{background:' + t.bg + ';padding:8px 10px;border-radius:6px;border-left:3px solid ' + t.accent + '}' +
    '.label{font-size:9px;text-transform:uppercase;color:#64748b;font-weight:600;letter-spacing:0.5px}' +
    '.value{font-size:12px;color:#1e293b;margin-top:1px;font-weight:500}' +
    '.contact-row{display:flex;gap:15px;font-size:11px;color:#64748b;margin-bottom:15px;flex-wrap:wrap}' +
    '.status-badge{display:inline-block;background:' + t.accent + '20;color:' + t.primary + ';padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700}' +
    '.full-photo-section{margin-top:20px;margin-bottom:15px;text-align:center}' +
    '.full-photo-section img{max-width:100%;max-height:300px;border-radius:8px;border:1px solid #e2e8f0}' +
    '.footer{margin-top:20px;padding-top:12px;border-top:1px solid #e2e8f0;text-align:center;font-size:9px;color:#94a3b8}' +
    '@media print{body{padding:0}.page{box-shadow:none}}' +
    '</style></head><body>' +
    '<div class="page">' +
    '<div class="header">' +
    '<div class="passport-photo">' + (employee.photoUrl ? '<img src="' + employee.photoUrl + '" alt="photo"/>' : name.split(' ').map((n:string)=>n[0]).join('').slice(0,2)) + '</div>' +
    '<div class="header-text">' + (agentHeaderText ? '<div style="font-size:10px;opacity:0.8;margin-bottom:4px">' + agentHeaderText + '</div>' : '') +
    '<div class="name">' + name + '</div><div class="role">' + role + '</div>' +
    '<div class="meta"><span>\u{1F4CD} ' + dest + '</span><span>\u{1F30D} ' + nationality + '</span><span>\u{1FAAA} ' + passport + '</span><span class="status-badge" style="background:rgba(255,255,255,0.25);color:#fff">' + status + '</span></div>' +
    '</div></div>' +

    (isBilingual ?
    '<div class="bilingual"><div class="bilingual-col">' +
    '<div class="section"><div class="section-title">Contact Information</div><div class="contact-row" style="flex-direction:column;gap:6px;margin-bottom:0">' +
    '<span>\u{1F4E7} ' + email + '</span><span>\u{1F4F1} ' + phone + '</span><span>\u{1FAAA} Passport: ' + passport + '</span><span>\u{1F4C5} DOB: ' + dob + '</span><span>\u{1F4CD} ' + region + '</span></div></div>' +
    '<div class="section"><div class="section-title">Professional Profile</div><div class="grid">' +
    '<div class="card"><div class="label">Education</div><div class="value">' + edu + '</div></div>' +
    '<div class="card"><div class="label">Experience</div><div class="value">' + exp + '</div></div>' +
    '<div class="card"><div class="label">Languages</div><div class="value">' + lang + '</div></div>' +
    '<div class="card"><div class="label">Skills</div><div class="value">' + skills + '</div></div></div></div>' +
    '<div class="section"><div class="section-title">Personal Info</div><div class="grid">' +
    '<div class="card"><div class="label">Nationality</div><div class="value">' + nationality + '</div></div>' +
    '<div class="card"><div class="label">Marital Status</div><div class="value">' + maritalStatus + '</div></div>' +
    '<div class="card"><div class="label">Father</div><div class="value">' + fatherName + '</div></div>' +
    '<div class="card"><div class="label">Mother</div><div class="value">' + motherName + '</div></div></div></div></div>' +

    '<div class="bilingual-col ar-section">' +
    '<div class="section"><div class="section-title">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0627\u062A\u0635\u0627\u0644</div><div class="contact-row" style="flex-direction:column;gap:6px;margin-bottom:0">' +
    '<span>\u{1F4E7} ' + email + '</span><span>\u{1F4F1} ' + phone + '</span><span>\u{1FAAA} \u062C\u0648\u0627\u0632 \u0627\u0644\u0633\u0641\u0631: ' + passport + '</span><span>\u{1F4C5} \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F: ' + dob + '</span><span>\u{1F4CD} ' + region + '</span></div></div>' +
    '<div class="section"><div class="section-title">\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0645\u0647\u0646\u064A</div><div class="grid">' +
    '<div class="card"><div class="label">\u0627\u0644\u0645\u0624\u0647\u0644</div><div class="value">' + edu + '</div></div>' +
    '<div class="card"><div class="label">\u0627\u0644\u062E\u0628\u0631\u0629</div><div class="value">' + exp + '</div></div>' +
    '<div class="card"><div class="label">\u0627\u0644\u0644\u063A\u0627\u062A</div><div class="value">' + lang + '</div></div>' +
    '<div class="card"><div class="label">\u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A</div><div class="value">' + skills + '</div></div></div></div>' +
    '<div class="section"><div class="section-title">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0634\u062E\u0635\u064A\u0629</div><div class="grid">' +
    '<div class="card"><div class="label">\u0627\u0644\u062C\u0646\u0633\u064A\u0629</div><div class="value">' + nationality + '</div></div>' +
    '<div class="card"><div class="label">\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0629</div><div class="value">' + maritalStatus + '</div></div>' +
    '<div class="card"><div class="label">\u0627\u0633\u0645 \u0627\u0644\u0623\u0628</div><div class="value">' + fatherName + '</div></div>' +
    '<div class="card"><div class="label">\u0627\u0633\u0645 \u0627\u0644\u0623\u0645</div><div class="value">' + motherName + '</div></div></div></div></div></div>'
    :
    '<div class="contact-row"><span>\u{1F4E7} ' + email + '</span><span>\u{1F4F1} ' + phone + '</span><span>\u{1FAAA} Passport: ' + passport + '</span><span>\u{1F4C5} DOB: ' + dob + '</span></div>' +
    '<div class="section"><div class="section-title">Professional Profile</div><div class="grid">' +
    '<div class="card"><div class="label">Education</div><div class="value">' + edu + '</div></div>' +
    '<div class="card"><div class="label">Experience</div><div class="value">' + exp + '</div></div>' +
    '<div class="card"><div class="label">Languages</div><div class="value">' + lang + '</div></div>' +
    '<div class="card"><div class="label">Skills</div><div class="value">' + skills + '</div></div></div></div>' +
    '<div class="section"><div class="section-title">Personal Info</div><div class="grid-3">' +
    '<div class="card"><div class="label">Nationality</div><div class="value">' + nationality + '</div></div>' +
    '<div class="card"><div class="label">Marital Status</div><div class="value">' + maritalStatus + '</div></div>' +
    '<div class="card"><div class="label">Region</div><div class="value">' + region + '</div></div></div></div>' +
    '<div class="section"><div class="section-title">Family &amp; Emergency</div><div class="grid">' +
    '<div class="card"><div class="label">Father</div><div class="value">' + fatherName + '</div></div>' +
    '<div class="card"><div class="label">Mother</div><div class="value">' + motherName + '</div></div>' +
    '<div class="card"><div class="label">Emergency Contact</div><div class="value">' + emergencyInfo + '</div></div>' +
    '<div class="card"><div class="label">Bank Account</div><div class="value">' + bankInfo + '</div></div></div></div>'
    ) +

    '<div class="full-photo-section">' + (employee.fullPhotoUrl ? '<img src="' + employee.fullPhotoUrl + '" alt="Full body photo"/>' : '<div style="padding:20px;background:' + t.bg + ';border-radius:8px;color:#94a3b8;font-size:12px">\u{1F4F7} Full Body Photo — Available from employee registration</div>') + '</div>' +

    '<div class="footer">' + (agentOpts?.current && agentOpts?.templates[agentOpts.current]?.footer ? agentOpts.templates[agentOpts.current].footer + ' | ' : '') + 'Generated by Ethio Agency Hub | ' + new Date().toLocaleDateString() + ' | Confidential</div>' +
    '</div></body></html>';
}