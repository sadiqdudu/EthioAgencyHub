import { Languages } from 'lucide-react';
import { supportedLanguages } from '@/config/languages';

export function LanguageSettings() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <Languages className="h-6 w-6" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Language support</p>
        <h2 className="mt-2 text-3xl font-bold text-ink">Arabic, Amharic, Oromo, and English</h2>
        <p className="mt-3 max-w-3xl text-slate-600">Prepare the platform for multilingual agency operations, including right-to-left Arabic UI support.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {supportedLanguages.map((language) => (
          <article key={language.code} dir={language.direction} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-2xl font-bold text-ink">{language.nativeName}</p>
            <p className="mt-2 text-sm text-slate-500">{language.name}</p>
            <p className="mt-4 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{language.direction.toUpperCase()} layout</p>
          </article>
        ))}
      </section>
    </div>
  );
}
