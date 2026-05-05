'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { supportedLanguages, type SupportedLanguageCode } from '@/config/languages';

type Props = {
  current: SupportedLanguageCode;
};

export function LanguageSwitcher({ current }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [value, setValue] = useState<SupportedLanguageCode>(current);
  const [error, setError] = useState<string | null>(null);

  const onChange = async (code: SupportedLanguageCode) => {
    setValue(code);
    setError(null);
    try {
      const res = await fetch('/api/settings/language', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      if (!res.ok) throw new Error('Failed to save language');
      startTransition(() => router.refresh());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save language');
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold text-slate-700" htmlFor="language-select">Choose language</label>
      <select
        id="language-select"
        value={value}
        disabled={pending}
        onChange={(event) => onChange(event.target.value as SupportedLanguageCode)}
        className="w-full max-w-xs rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-brand-600 focus:outline-none"
      >
        {supportedLanguages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.nativeName} ({language.name})
          </option>
        ))}
      </select>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
