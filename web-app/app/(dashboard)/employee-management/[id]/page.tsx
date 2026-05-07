'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Plane, UserRound } from 'lucide-react';

type EmployeeDetail = {
  id: string;
  name: string;
  email?: string;
  role?: string;
  destination?: string;
  status: string;
  contactPhone?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  nationalId?: string;
  laborId?: string;
  passportNumber?: string;
  createdAt: string;
};

export default function EmployeeDetailPage({ params }: { params: { id: string } }) {
  const [employee, setEmployee] = useState<EmployeeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const res = await fetch(`/api/employees/${params.id}`);
        const payload = await res.json();
        if (!res.ok || !payload?.success || !payload.data) {
          throw new Error(payload?.error?.message ?? 'Failed to load employee profile');
        }
        setEmployee(payload.data as EmployeeDetail);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load employee profile');
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();
  }, [params.id]);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/employee-management/profiles"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profiles
        </Link>
      </div>

      {loading ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-slate-500">Loading employee profile...</p>
        </section>
      ) : error ? (
        <section className="rounded-3xl border border-red-200 bg-red-50 p-8 shadow-sm">
          <p className="font-semibold text-red-700">{error}</p>
        </section>
      ) : employee ? (
        <>
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                <UserRound className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-ink">{employee.name}</h1>
                <p className="mt-1 text-slate-600">
                  {employee.role || 'No role'} • {employee.destination || 'No destination'} • {employee.status.replaceAll('_', ' ')}
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-bold text-ink">Contact & Identity</h3>
              <div className="space-y-2 text-sm text-slate-700">
                <p><strong>Email:</strong> {employee.email || '-'}</p>
                <p><strong>Phone:</strong> {employee.contactPhone || '-'}</p>
                <p><strong>Emergency Contact:</strong> {employee.emergencyContact || '-'}</p>
                <p><strong>Emergency Phone:</strong> {employee.emergencyPhone || '-'}</p>
                <p><strong>National ID:</strong> {employee.nationalId || '-'}</p>
                <p><strong>Labor ID:</strong> {employee.laborId || '-'}</p>
                <p><strong>Passport Number:</strong> {employee.passportNumber || '-'}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-bold text-ink">Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/employee-management/cv-generator"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  <FileText className="h-4 w-4" />
                  Generate CV
                </Link>
                <Link
                  href="/travel"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Plane className="h-4 w-4" />
                  View Travel Module
                </Link>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Registered on {new Date(employee.createdAt).toLocaleDateString()}.
              </p>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
