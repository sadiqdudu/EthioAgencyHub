'use client';

import { useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

type PersonalData = { name: string; contactPhone: string; emergencyContact: string };
type SkillsData = { role: string; destination: string; experienceYears: string; languages: string };
type DocumentsData = { docPath: string; tgVideoId: string };

const steps = ['Personal', 'Skills', 'Documents', 'Review'] as const;

export function RegistrationWizard() {
  const [step, setStep] = useState(0);
  const [personal, setPersonal] = useState<PersonalData>({ name: '', contactPhone: '', emergencyContact: '' });
  const [skills, setSkills] = useState<SkillsData>({ role: '', destination: '', experienceYears: '', languages: '' });
  const [docs, setDocs] = useState<DocumentsData>({ docPath: '', tgVideoId: '' });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async () => {
    setSubmitting(true);
    setResult(null);
    try {
      const response = await fetch('/api/employees/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personal,
          skills: {
            role: skills.role || undefined,
            destination: skills.destination || undefined,
            experienceYears: skills.experienceYears ? Number(skills.experienceYears) : undefined,
            languages: skills.languages ? skills.languages.split(',').map((s) => s.trim()) : undefined
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
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full name" value={personal.name} onChange={(v) => setPersonal({ ...personal, name: v })} required />
          <Field label="Contact phone" value={personal.contactPhone} onChange={(v) => setPersonal({ ...personal, contactPhone: v })} />
          <Field label="Emergency contact" value={personal.emergencyContact} onChange={(v) => setPersonal({ ...personal, emergencyContact: v })} />
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Role" value={skills.role} onChange={(v) => setSkills({ ...skills, role: v })} />
          <Field label="Destination" value={skills.destination} onChange={(v) => setSkills({ ...skills, destination: v })} />
          <Field label="Experience (years)" type="number" value={skills.experienceYears} onChange={(v) => setSkills({ ...skills, experienceYears: v })} />
          <Field label="Languages (comma separated)" value={skills.languages} onChange={(v) => setSkills({ ...skills, languages: v })} />
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Document path (Teledrive)" value={docs.docPath} onChange={(v) => setDocs({ ...docs, docPath: v })} />
          <Field label="Telegram video ID" value={docs.tgVideoId} onChange={(v) => setDocs({ ...docs, tgVideoId: v })} />
          <p className="md:col-span-2 text-sm text-slate-500">Use the Telegram upload form to capture a short interview video and paste the video ID here.</p>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3 text-sm text-slate-700">
          <p><strong>Name:</strong> {personal.name || '-'}</p>
          <p><strong>Role:</strong> {skills.role || '-'}</p>
          <p><strong>Destination:</strong> {skills.destination || '-'}</p>
          <p><strong>Experience:</strong> {skills.experienceYears || '-'} years</p>
          <p><strong>Languages:</strong> {skills.languages || '-'}</p>
          <p><strong>Document path:</strong> {docs.docPath || '-'}</p>
          <p><strong>Interview video ID:</strong> {docs.tgVideoId || '-'}</p>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={prev}
          disabled={step === 0}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={next}
            disabled={step === 0 && personal.name.length < 2}
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit registration'}
          </button>
        )}
      </div>

      {result ? (
        <p className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${result.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          {result.message}
        </p>
      ) : null}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
      {label}
      {required ? <span className="text-xs text-red-500">*</span> : null}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm font-normal shadow-sm focus:border-brand-600 focus:outline-none"
      />
    </label>
  );
}
