import { ReactNode } from 'react';

export default function RegistrationLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-r from-brand-50 to-emerald-50 p-6 shadow-sm">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-ink">Employee Registration Wizard</h2>
          <p className="mt-2 text-slate-600">
            Complete the multi-step registration form to add a new employee to your agency. All required fields must be filled before proceeding to the next step.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-white p-3 text-center">
              <p className="text-xs font-semibold text-brand-600">STEP 1</p>
              <p className="mt-1 text-sm font-bold text-ink">Personal Info</p>
            </div>
            <div className="rounded-xl bg-white p-3 text-center">
              <p className="text-xs font-semibold text-brand-600">STEP 2</p>
              <p className="mt-1 text-sm font-bold text-ink">Skills</p>
            </div>
            <div className="rounded-xl bg-white p-3 text-center">
              <p className="text-xs font-semibold text-brand-600">STEP 3</p>
              <p className="mt-1 text-sm font-bold text-ink">Documents</p>
            </div>
            <div className="rounded-xl bg-white p-3 text-center">
              <p className="text-xs font-semibold text-brand-600">STEP 4</p>
              <p className="mt-1 text-sm font-bold text-ink">Review</p>
            </div>
          </div>
        </div>
      </section>
      {children}
    </div>
  );
}
