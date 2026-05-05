import { LanguageSettings } from '@/components/settings/language-settings';
import { LanguageSwitcher } from '@/components/settings/language-switcher';
import { getLanguage } from '@/lib/i18n/server';

export default function LanguagePage() {
  const current = getLanguage();
  return (
    <div className="space-y-6">
      <LanguageSettings />
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-ink">Select your language</h3>
        <LanguageSwitcher current={current} />
      </section>
    </div>
  );
}
