import type { SupportedLanguageCode } from '@/config/languages';

export type Dictionary = {
  common: {
    dashboard: string;
    employees: string;
    documents: string;
    travel: string;
    hajjUmrah: string;
    institutions: string;
    agents: string;
    administration: string;
    reporting: string;
    settings: string;
    signIn: string;
    signOut: string;
    language: string;
    billing: string;
  };
  billing: {
    title: string;
    subtitle: string;
    monthly: string;
    quarterly: string;
    yearly: string;
  };
};

const en: Dictionary = {
  common: {
    dashboard: 'Dashboard',
    employees: 'Employees',
    documents: 'Documents',
    travel: 'Travel',
    hajjUmrah: 'Hajj & Umrah',
    institutions: 'Institutions',
    agents: 'Agents',
    administration: 'Administration',
    reporting: 'Reporting & Analytics',
    settings: 'Settings',
    signIn: 'Sign in',
    signOut: 'Sign out',
    language: 'Language',
    billing: 'Billing'
  },
  billing: {
    title: 'Subscription plans',
    subtitle: 'Plans priced in Ethiopian Birr',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    yearly: 'Yearly'
  }
};

const am: Dictionary = {
  common: {
    dashboard: 'ዳሽቦርድ',
    employees: 'ሰራተኞች',
    documents: 'ሰነዶች',
    travel: 'ጉዞ',
    hajjUmrah: 'ሐጅ እና ዑምራ',
    institutions: 'ተቋማት',
    agents: 'ወኪሎች',
    administration: 'አስተዳደር',
    reporting: 'ሪፖርት እና ትንታኔ',
    settings: 'ቅንጅቶች',
    signIn: 'ግባ',
    signOut: 'ውጣ',
    language: 'ቋንቋ',
    billing: 'ክፍያ'
  },
  billing: {
    title: 'የደንበኝነት ምዝገባ እቅዶች',
    subtitle: 'በኢትዮጵያ ብር የሚከፈል',
    monthly: 'ወርሃዊ',
    quarterly: 'ሩብ ዓመት',
    yearly: 'ዓመታዊ'
  }
};

const om: Dictionary = {
  common: {
    dashboard: 'Gabatee',
    employees: 'Hojjettoota',
    documents: 'Galmee',
    travel: 'Imala',
    hajjUmrah: 'Hajjii fi Umraa',
    institutions: 'Dhaabbilee',
    agents: 'Bakka Bu\'oota',
    administration: 'Bulchiinsa',
    reporting: 'Gabaasa fi Xiinxala',
    settings: 'Qindaa\'ina',
    signIn: 'Seeni',
    signOut: 'Ba\'i',
    language: 'Afaan',
    billing: 'Kaffaltii'
  },
  billing: {
    title: 'Karoora Galmee',
    subtitle: 'Gatiin Birrii Itoophiyaatiin',
    monthly: 'Ji\'aan',
    quarterly: 'Kurmaanaan',
    yearly: 'Waggaan'
  }
};

const ar: Dictionary = {
  common: {
    dashboard: 'لوحة التحكم',
    employees: 'الموظفون',
    documents: 'المستندات',
    travel: 'السفر',
    hajjUmrah: 'الحج والعمرة',
    institutions: 'المؤسسات',
    agents: 'الوكلاء',
    administration: 'الإدارة',
    reporting: 'التقارير والتحليلات',
    settings: 'الإعدادات',
    signIn: 'تسجيل الدخول',
    signOut: 'تسجيل الخروج',
    language: 'اللغة',
    billing: 'الفوترة'
  },
  billing: {
    title: 'خطط الاشتراك',
    subtitle: 'الأسعار بالبر الإثيوبي',
    monthly: 'شهري',
    quarterly: 'ربع سنوي',
    yearly: 'سنوي'
  }
};

export const dictionaries: Record<SupportedLanguageCode, Dictionary> = { en, am, om, ar };

export function getDictionary(code: SupportedLanguageCode): Dictionary {
  return dictionaries[code] ?? dictionaries.en;
}
