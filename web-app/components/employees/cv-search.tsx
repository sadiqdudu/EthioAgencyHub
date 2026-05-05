'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export function CvSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/employees?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.success ? data.data : []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="flex items-center gap-2 text-lg font-bold"><Search className="h-5 w-5 text-brand-600" /> CV Database Search</h3>
        <div className="mt-4 flex gap-3">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name, role, destination..." className="flex-1 rounded-2xl border border-slate-300 px-4 py-2 text-sm" />
          <button onClick={search} disabled={loading} className="rounded-2xl bg-brand-600 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50">{loading ? 'Searching...' : 'Search'}</button>
        </div>
      </section>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {results.length === 0 ? <p className="text-sm text-slate-500">No results. Enter a search term above.</p> : (
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-400"><tr><th className="py-2">Name</th><th className="py-2">Role</th><th className="py-2">Destination</th><th className="py-2">Status</th></tr></thead>
            <tbody>{results.map((emp: any) => <tr key={emp.id} className="border-t"><td className="py-2 font-medium">{emp.name}</td><td className="py-2">{emp.role}</td><td className="py-2">{emp.destination}</td><td className="py-2">{emp.status}</td></tr>)}</tbody>
          </table>
        )}
      </section>
    </div>
  );
}