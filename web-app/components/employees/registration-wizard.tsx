'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Save, RefreshCw, Clock } from 'lucide-react';
import { SelectField, TextField } from '@/components/employees/form-fields';
import { PassportScanner } from '@/components/employees/passport-scanner';
import {
  ethiopianRegions,
  jobRoles,
  countries,
  languages,
  genders,
  maritalStatus,
  educationLevels,
  experienceLevels
} from '@/config/registration-data';

type PersonalData = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  nationality: string;
  region: string;
  zone: string;
  contactPhone: string;
  alternatePhone: string;
  emergencyContact: string;
  emergencyPhone: string;
  nationalId: string;
  laborId: string;
  passportNumber: string;
  passportExpiryDate: string;
  fatherName: string;
  motherName: string;
};

type SkillsData = {
  education: string;
  role: string;
  experience: string;
  destination: string;
  languages: string[];
  additionalSkills: string;
};

type DocumentsData = { docPath: string; tgVideoId: string };

type Draft = {
  id: string;
  personal: PersonalData;
  skills: SkillsData;
  docs: DocumentsData;
  step: number;
  createdAt: string;
};

const steps = ['Personal', 'Skills', 'Documents', 'Review'] as const;

type RegistrationWizardProps = {
  initialStep?: number;
};

export function RegistrationWizard({ initialStep = 0 }: RegistrationWizardProps) {
  const [step, setStep] = useState(Math.max(0, Math.min(initialStep, steps.length - 1)));
  const [personal, setPersonal] = useState<PersonalData>({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    nationality: '',
    region: '',
    zone: '',
    contactPhone: '',
    alternatePhone: '',
    emergencyContact: '',
    emergencyPhone: '',
    nationalId: '',
    laborId: '',
    passportNumber: '',
    passportExpiryDate: '',
    fatherName: '',
    motherName: ''
  });

  const [skills, setSkills] = useState<SkillsData>({
    education: '',
    role: '',
    experience: '',
    destination: '',
    languages: [],
    additionalSkills: ''
  });

  const [docs, setDocs] = useState<DocumentsData>({ docPath: '', tgVideoId: '' });
  const [submitting, setSubmitting] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [draftSaved, setDraftSaved] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [showDraftSelector, setShowDraftSelector] = useState(false);
  const [existingDrafts, setExistingDrafts] = useState<Draft[]>([]);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setStep(Math.max(0, Math.min(initialStep, steps.length - 1)));
    
    const loadExistingDrafts = async () => {
      try {
        const response = await fetch('/api/employees/drafts');
        const data = await response.json();
        
        if (response.ok && data.success && data.data.length > 0) {
          setExistingDrafts(data.data);
        }
      } catch (error) {
        console.error('Failed to load existing drafts:', error);
      }
    };
    
    loadExistingDrafts();
  }, [initialStep]);

  const next = () => {
    autoSave();
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const prev = () => {
    autoSave();
    setStep((s) => Math.max(s - 1, 0));
  };

  const autoSave = useCallback(async (showFeedback = false) => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    
    autoSaveTimeoutRef.current = setTimeout(async () => {
      try {
        setIsAutoSaving(true);
        await saveDraft(false);
      } catch (error) {
        console.error('Auto-save failed:', error);
      } finally {
        setIsAutoSaving(false);
      }
    }, 1000);
  }, [personal, skills, docs, step, draftId]);

  const saveDraft = async (showFeedback = true) => {
    try {
      const draftData = {
        personal,
        skills,
        docs,
        step,
        createdAt: new Date().toISOString()
      };

      let response;
      let url = '/api/employees/drafts';
      let method = 'POST';

      if (draftId && !draftId.startsWith('mock-')) {
        url = `/api/employees/drafts/${draftId}`;
        method = 'PUT';
      }

      response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draftData)
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setDraftId(data.data.id);
        if (showFeedback) {
          setDraftSaved(true);
          setTimeout(() => setDraftSaved(false), 3000);
        }
        return data.data.id;
      } else {
        throw new Error(data.error?.message || 'Failed to save draft');
      }
    } catch (error) {
      console.error('Failed to save draft:', error);
      throw error;
    }
  };

  const loadDraft = async (draftIdToLoad: string) => {
    try {
      const response = await fetch(`/api/employees/drafts/${draftIdToLoad}`);
      const data = await response.json();
      
      if (response.ok && data.success) {
        const draft = data.data;
        setPersonal(draft.personal || personal);
        setSkills(draft.skills || skills);
        setDocs(draft.documents || docs);
        setStep(draft.step || 0);
        setDraftId(draftIdToLoad);
        setShowDraftSelector(false);
        return true;
      } else {
        throw new Error(data.error?.message || 'Failed to load draft');
      }
    } catch (error) {
      console.error('Failed to load draft:', error);
      throw error;
    }
  };

  const deleteDraft = async (draftIdToDelete: string) => {
    try {
      const response = await fetch(`/api/employees/drafts/${draftIdToDelete}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setExistingDrafts(existingDrafts.filter(d => d.id !== draftIdToDelete));
        if (draftId === draftIdToDelete) {
          setDraftId(null);
          setStep(0);
          setPersonal({
            firstName: '',
            lastName: '',
            email: '',
            dateOfBirth: '',
            gender: '',
            maritalStatus: '',
            nationality: '',
            region: '',
            zone: '',
            contactPhone: '',
            alternatePhone: '',
            emergencyContact: '',
            emergencyPhone: '',
            nationalId: '',
            laborId: '',
            passportNumber: '',
            passportExpiryDate: '',
            fatherName: '',
            motherName: ''
          });
          setSkills({
            education: '',
            role: '',
            experience: '',
            destination: '',
            languages: [],
            additionalSkills: ''
          });
          setDocs({ docPath: '', tgVideoId: '' });
        }
      }
    } catch (error) {
      console.error('Failed to delete draft:', error);
    }
  };

  const startNewRegistration = () => {
    setDraftId(null);
    setStep(0);
    setShowDraftSelector(false);
  };

  // Get zones for selected region
  const selectedRegionData = ethiopianRegions.find((r) => r.region === personal.region);
  const zones = selectedRegionData?.zones || [];

  const handlePassportAutoFill = (data: any) => {
    setPersonal((prev) => ({
      ...prev,
      firstName: data.firstName || prev.firstName,
      lastName: data.lastName || prev.lastName,
      dateOfBirth: data.dateOfBirth || prev.dateOfBirth,
      gender: data.gender || prev.gender,
      nationality: data.nationality || prev.nationality,
      passportNumber: data.passportNumber || prev.passportNumber,
      passportExpiryDate: data.passportExpiryDate || prev.passportExpiryDate,
      fatherName: data.fatherName || prev.fatherName,
      motherName: data.motherName || prev.motherName
    }));
  };

  const saveAndContinue = async () => {
    try {
      await saveDraft(true);
      next();
    } catch (error) {
      setResult({ ok: false, message: error instanceof Error ? error.message : 'Failed to save draft' });
    }
  };

  const onSubmit = async () => {
    if (uploadingFiles) return;
    setSubmitting(true);
    setResult(null);
    try {
      // Save final draft before submission
      await saveDraft();
      
      const response = await fetch('/api/employees/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personal: {
            firstName: personal.firstName,
            lastName: personal.lastName,
            email: personal.email,
            dateOfBirth: personal.dateOfBirth,
            gender: personal.gender || undefined,
            maritalStatus: personal.maritalStatus || undefined,
            nationality: personal.nationality || undefined,
            region: personal.region || undefined,
            zone: personal.zone || undefined,
            contactPhone: personal.contactPhone,
            alternatePhone: personal.alternatePhone || undefined,
            emergencyContact: personal.emergencyContact,
            emergencyPhone: personal.emergencyPhone || undefined,
            nationalId: personal.nationalId || undefined,
            laborId: personal.laborId || undefined,
            passportNumber: personal.passportNumber || undefined,
            passportExpiryDate: personal.passportExpiryDate || undefined,
            fatherName: personal.fatherName || undefined,
            motherName: personal.motherName || undefined
          },
          skills: {
            education: skills.education || undefined,
            role: skills.role || undefined,
            experience: skills.experience || undefined,
            destination: skills.destination || undefined,
            languages: skills.languages.length > 0 ? skills.languages : undefined,
            additionalSkills: skills.additionalSkills || undefined
          },
          documents: {
            docPath: docs.docPath || undefined,
            tgVideoId: docs.tgVideoId || undefined
          }
        })
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error?.message ?? 'Registration failed');
      }
      setResult({ ok: true, message: `Employee registered (${data.data.id ?? 'new'})` });
    } catch (error) {
      setResult({ ok: false, message: error instanceof Error ? error.message : 'Registration failed' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <ol className="mb-6 flex flex-wrap gap-2">
        {steps.map((name, index) => (
          <li
            key={name}
            className={`flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold ${
              index === step ? 'bg-brand-600 text-white' : index < step ? 'bg-brand-50 text-brand-700' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {index < step ? <CheckCircle2 className="h-4 w-4" /> : <span>{index + 1}</span>}
            {name}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="space-y-6">
          {/* Passport Scanner Section */}
          <PassportScanner onAutoFill={handlePassportAutoFill} />

          {/* Personal Information Fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="First Name"
              value={personal.firstName}
              onChange={(v) => setPersonal({ ...personal, firstName: v })}
              required
            />
            <TextField
              label="Last Name"
              value={personal.lastName}
              onChange={(v) => setPersonal({ ...personal, lastName: v })}
              required
            />
            <TextField
              label="Email"
              type="email"
              value={personal.email}
              onChange={(v) => setPersonal({ ...personal, email: v })}
            />
            <TextField
              label="Date of Birth"
              type="date"
              value={personal.dateOfBirth}
              onChange={(v) => setPersonal({ ...personal, dateOfBirth: v })}
            />
            <SelectField
              label="Gender"
              value={personal.gender}
              onChange={(v) => setPersonal({ ...personal, gender: v })}
              options={genders}
            />
            <SelectField
              label="Marital Status"
              value={personal.maritalStatus}
              onChange={(v) => setPersonal({ ...personal, maritalStatus: v })}
              options={maritalStatus}
            />
            <SelectField
              label="Nationality"
              value={personal.nationality}
              onChange={(v) => setPersonal({ ...personal, nationality: v })}
              options={countries}
            />
            <SelectField
              label="Region"
              value={personal.region}
              onChange={(v) => setPersonal({ ...personal, region: v, zone: '' })}
              options={ethiopianRegions.map((r) => r.region)}
            />
            {personal.region && (
              <SelectField
                label="Zone"
                value={personal.zone}
                onChange={(v) => setPersonal({ ...personal, zone: v })}
                options={zones}
              />
            )}
            <TextField
              label="Contact Phone"
              type="tel"
              value={personal.contactPhone}
              onChange={(v) => setPersonal({ ...personal, contactPhone: v })}
              required
            />
            <TextField
              label="Alternate Phone"
              type="tel"
              value={personal.alternatePhone}
              onChange={(v) => setPersonal({ ...personal, alternatePhone: v })}
            />
            <TextField
              label="Emergency Contact Name"
              value={personal.emergencyContact}
              onChange={(v) => setPersonal({ ...personal, emergencyContact: v })}
              required
            />
            <TextField
              label="Emergency Contact Phone"
              type="tel"
              value={personal.emergencyPhone}
              onChange={(v) => setPersonal({ ...personal, emergencyPhone: v })}
              required
            />
          </div>

          {/* ID and Passport Section */}
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
            <h4 className="mb-4 font-semibold text-ink">📋 Official IDs & Passport</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="National ID Number"
                value={personal.nationalId}
                onChange={(v) => setPersonal({ ...personal, nationalId: v })}
                placeholder="e.g., 1234567890"
              />
              <TextField
                label="Labor ID Number"
                value={personal.laborId}
                onChange={(v) => setPersonal({ ...personal, laborId: v })}
                placeholder="e.g., LAB-2024-001"
              />
              <TextField
                label="Passport Number"
                value={personal.passportNumber}
                onChange={(v) => setPersonal({ ...personal, passportNumber: v })}
                placeholder="e.g., ET1234567"
              />
              <TextField
                label="Passport Expiry Date"
                type="date"
                value={personal.passportExpiryDate}
                onChange={(v) => setPersonal({ ...personal, passportExpiryDate: v })}
              />
            </div>
          </div>

          {/* Family Information Section */}
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-purple-50 to-pink-50 p-4">
            <h4 className="mb-4 font-semibold text-ink">👨‍👩‍👧 Family Information</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Father's Name"
                value={personal.fatherName}
                onChange={(v) => setPersonal({ ...personal, fatherName: v })}
                placeholder="Full name of father"
              />
              <TextField
                label="Mother's Name"
                value={personal.motherName}
                onChange={(v) => setPersonal({ ...personal, motherName: v })}
                placeholder="Full name of mother"
              />
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              label="Education Level"
              value={skills.education}
              onChange={(v) => setSkills({ ...skills, education: v })}
              options={educationLevels}
            />
            <SelectField
              label="Job Role"
              value={skills.role}
              onChange={(v) => setSkills({ ...skills, role: v })}
              options={jobRoles}
            />
            <SelectField
              label="Experience Level"
              value={skills.experience}
              onChange={(v) => setSkills({ ...skills, experience: v })}
              options={experienceLevels}
            />
            <SelectField
              label="Destination Country"
              value={skills.destination}
              onChange={(v) => setSkills({ ...skills, destination: v })}
              options={countries}
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">Languages (Select multiple by holding Ctrl/Cmd)</label>
            <select
              multiple
              value={skills.languages}
              onChange={(event) => {
                const selected = Array.from(event.target.selectedOptions, (option) => option.value);
                setSkills({ ...skills, languages: selected });
              }}
              className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm font-normal shadow-sm focus:border-brand-600 focus:outline-none"
              style={{ minHeight: '100px' }}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            {skills.languages.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((lang) => (
                  <span key={lang} className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {lang}
                    <button
                      type="button"
                      onClick={() => setSkills({ ...skills, languages: skills.languages.filter((l) => l !== lang) })}
                      className="hover:text-brand-900"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <TextField
            label="Additional Skills (comma separated)"
            value={skills.additionalSkills}
            onChange={(v) => setSkills({ ...skills, additionalSkills: v })}
            placeholder="e.g., First aid, Cooking, Childcare"
          />
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <TextField label="Document path (Teledrive)" value={docs.docPath} onChange={(v) => setDocs({ ...docs, docPath: v })} />
            <label className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-4 hover:bg-slate-100">
              <span className="text-sm font-medium text-slate-600">Click to upload Photo/Passport</span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*,application/pdf"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setUploadingFiles(true);
                  try {
                    const fd = new FormData();
                    fd.append('file', file);
                    fd.append('folder', 'documents');
                    const res = await fetch('/api/upload', { method: 'POST', body: fd });
                    const data = await res.json();
                    if (data.success && data.data?.filePath) {
                      setDocs(d => ({ ...d, docPath: data.data.filePath }));
                    }
                  } finally {
                    setUploadingFiles(false);
                  }
                }}
              />
            </label>
          </div>
          
          <div className="space-y-2">
            <TextField label="Telegram video ID" value={docs.tgVideoId} onChange={(v) => setDocs({ ...docs, tgVideoId: v })} />
            <label className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-4 hover:bg-slate-100">
              <span className="text-sm font-medium text-slate-600">Click to upload Interview Video</span>
              <input 
                type="file" 
                className="hidden" 
                accept="video/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setUploadingFiles(true);
                  try {
                    const fd = new FormData();
                    fd.append('file', file);
                    fd.append('caption', `Interview video for ${personal.firstName}`);
                    const res = await fetch('/api/upload', { method: 'POST', body: fd });
                    const data = await res.json();
                    if (data.success && data.data?.fileId) {
                      setDocs(d => ({ ...d, tgVideoId: data.data.fileId }));
                    }
                  } finally {
                    setUploadingFiles(false);
                  }
                }}
              />
            </label>
          </div>
          <p className="md:col-span-2 text-sm text-slate-500">You can manually paste paths/IDs, or use the upload boxes above to automatically send files to Teledrive/Telegram.</p>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-brand-50 p-4">
            <h3 className="mb-3 font-semibold text-ink">👤 Personal Information</h3>
            <div className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">
              <p><strong>First Name:</strong> {personal.firstName || '-'}</p>
              <p><strong>Last Name:</strong> {personal.lastName || '-'}</p>
              <p><strong>Email:</strong> {personal.email || '-'}</p>
              <p><strong>Date of Birth:</strong> {personal.dateOfBirth || '-'}</p>
              <p><strong>Gender:</strong> {personal.gender || '-'}</p>
              <p><strong>Marital Status:</strong> {personal.maritalStatus || '-'}</p>
              <p><strong>Nationality:</strong> {personal.nationality || '-'}</p>
              <p><strong>Region:</strong> {personal.region || '-'}</p>
              <p><strong>Zone:</strong> {personal.zone || '-'}</p>
              <p><strong>Contact Phone:</strong> {personal.contactPhone || '-'}</p>
              <p><strong>Alternate Phone:</strong> {personal.alternatePhone || '-'}</p>
              <p><strong>Emergency Contact:</strong> {personal.emergencyContact || '-'}</p>
              <p><strong>Emergency Phone:</strong> {personal.emergencyPhone || '-'}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-blue-50 p-4">
            <h3 className="mb-3 font-semibold text-ink">📋 Official IDs & Passport</h3>
            <div className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">
              <p><strong>National ID:</strong> {personal.nationalId || '-'}</p>
              <p><strong>Labor ID:</strong> {personal.laborId || '-'}</p>
              <p><strong>Passport Number:</strong> {personal.passportNumber || '-'}</p>
              <p><strong>Passport Expiry:</strong> {personal.passportExpiryDate || '-'}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-purple-50 p-4">
            <h3 className="mb-3 font-semibold text-ink">👨‍👩‍👧 Family Information</h3>
            <div className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">
              <p><strong>Father's Name:</strong> {personal.fatherName || '-'}</p>
              <p><strong>Mother's Name:</strong> {personal.motherName || '-'}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-emerald-50 p-4">
            <h3 className="mb-3 font-semibold text-ink">💼 Skills & Qualifications</h3>
            <div className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">
              <p><strong>Education:</strong> {skills.education || '-'}</p>
              <p><strong>Job Role:</strong> {skills.role || '-'}</p>
              <p><strong>Experience:</strong> {skills.experience || '-'}</p>
              <p><strong>Destination:</strong> {skills.destination || '-'}</p>
              <div className="md:col-span-2">
                <strong>Languages:</strong>
                {skills.languages.length > 0 ? (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {skills.languages.map((lang) => (
                      <span key={lang} className="inline-block rounded-full bg-emerald-200 px-2 py-1 text-xs">
                        {lang}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-1">-</p>
                )}
              </div>
              <p className="md:col-span-2"><strong>Additional Skills:</strong> {skills.additionalSkills || '-'}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-cyan-50 p-4">
            <h3 className="mb-3 font-semibold text-ink">📁 Documents</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p><strong>Document path:</strong> {docs.docPath || '-'}</p>
              <p><strong>Interview video ID:</strong> {docs.tgVideoId || '-'}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          
          {/* Draft selector */}
          <button
            type="button"
            onClick={() => setShowDraftSelector(true)}
            className="inline-flex items-center gap-2 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-100"
          >
            <Clock className="h-4 w-4" />
            {draftId ? 'Continue Draft' : 'Saved Drafts'}
            {existingDrafts.length > 0 && (
              <span className="ml-1 rounded-full bg-amber-200 px-2 py-0.5 text-xs">{existingDrafts.length}</span>
            )}
          </button>
        </div>

        {step < steps.length - 1 ? (
          <div className="flex gap-3">
<button
              type="button"
              onClick={() => saveDraft(true)}
              disabled={
                (step === 0 && (!personal.firstName.trim() || !personal.lastName.trim() || !personal.contactPhone.trim())) ||
                (step === 1 && !skills.role)
              }
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
            >
              <Save className="h-4 w-4" />
              Save Draft
            </button>
            <button
              type="button"
              onClick={next}
              disabled={
                (step === 0 && (!personal.firstName.trim() || !personal.lastName.trim() || !personal.contactPhone.trim())) ||
                (step === 1 && !skills.role)
              }
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
            >
              <Save className="h-4 w-4" />
              Save Draft
            </button>
            <button
              type="button"
              onClick={next}
              disabled={
                (step === 0 && (!personal.firstName.trim() || !personal.lastName.trim() || !personal.contactPhone.trim())) ||
                (step === 1 && !skills.role)
              }
              className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting || uploadingFiles}
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : uploadingFiles ? 'Uploading...' : 'Submit registration'}
          </button>
        )}
      </div>

      {/* Autosave indicator */}
      <div className="mt-3 flex items-center justify-end gap-2 text-xs text-slate-500">
        {isAutoSaving ? (
          <span className="flex items-center gap-1">
            <RefreshCw className="h-3 w-3 animate-spin" /> Auto-saving...
          </span>
        ) : draftId ? (
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Draft auto-saved
          </span>
        ) : null}
      </div>

      {/* Draft Status */}
      {draftSaved && (
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          Draft saved successfully
        </div>
      )}

      {result ? (
        <p className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${result.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          {result.message}
        </p>
      ) : null}

      {/* Draft Selector Modal */}
      {showDraftSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[80vh] w-full max-w-lg overflow-auto rounded-3xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-ink">Saved Drafts</h3>
              <button
                type="button"
                onClick={() => setShowDraftSelector(false)}
                className="rounded-full p-2 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {existingDrafts.length > 0 ? (
              <div className="space-y-3">
                {existingDrafts.map((draft) => (
                  <div
                    key={draft.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 hover:border-brand-300"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-ink">
                        {draft.personal?.firstName || 'Unnamed'} {draft.personal?.lastName || ''}
                      </p>
                      <p className="text-sm text-slate-500">
                        Step {draft.step + 1}: {steps[draft.step]} • Created: {new Date(draft.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => loadDraft(draft.id)}
                        className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                      >
                        Continue
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteDraft(draft.id)}
                        className="rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-slate-500">No saved drafts found.</p>
            )}

            <button
              type="button"
              onClick={startNewRegistration}
              className="mt-4 w-full rounded-2xl border border-slate-300 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Start New Registration
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
