import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/config/site';
import { getTranslations } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { language } = getTranslations();
  return (
    <html lang={language.code} dir={language.direction}>
      <body>{children}</body>
    </html>
  );
}
