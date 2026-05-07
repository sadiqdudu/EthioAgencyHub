'use client';

import Link from 'next/link';
import { CvSearch } from '@/components/employees/cv-search';
import { Database, Search, UsersRound } from 'lucide-react';

export default function CVDatabasePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-ink">CV Database</h2>
        <p className="mt-2 text-slate-600">
          Search, filter, and review employee CV records across all agency registration pipelines.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/employee-management/cv-database/search"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
        >
          <Search className="mb-3 h-6 w-6 text-brand-600" />
          <h3 className="font-semibold text-ink">Advanced Search</h3>
          <p className="mt-1 text-sm text-slate-600">Find candidates by role, status, and destination.</p>
        </Link>
        <Link
          href="/employee-management/cv-database/employee-profiles"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
        >
          <UsersRound className="mb-3 h-6 w-6 text-brand-600" />
          <h3 className="font-semibold text-ink">Employee Profiles</h3>
          <p className="mt-1 text-sm text-slate-600">Browse profile cards and open detailed records.</p>
        </Link>
        <Link
          href="/employee-management/cv-database/skill-matching"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
        >
          <Database className="mb-3 h-6 w-6 text-brand-600" />
          <h3 className="font-semibold text-ink">Skill Matching</h3>
          <p className="mt-1 text-sm text-slate-600">Shortlist employees based on employer requirements.</p>
        </Link>
      </section>

      <CvSearch />
    </div>
  );
}
