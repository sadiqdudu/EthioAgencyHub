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
  dashboard: {
    title: string;
    subtitle: string;
    heroTitle: string;
    heroSubtitle: string;
    registerEmployee: string;
    uploadDocuments: string;
    coreModules: string;
    coreModulesDesc: string;
    hybridStorage: string;
    activityFeed: string;
    employeePipeline: string;
    id: string;
    name: string;
    role: string;
    destination: string;
    status: string;
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
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Multi-tenant command center',
    heroTitle: 'Manage registration, documents, travel, pilgrimages, and partners in one secure hub.',
    heroSubtitle: 'Built around the README roadmap with a hybrid Telegram + Teledrive storage model for low operating costs and global interview streaming.',
    registerEmployee: 'Register employee',
    uploadDocuments: 'Upload documents',
    coreModules: 'Core modules',
    coreModulesDesc: 'Route map implemented from the README.',
    hybridStorage: 'Hybrid storage routing',
    activityFeed: 'Activity feed',
    employeePipeline: 'Employee pipeline snapshot',
    id: 'ID',
    name: 'Name',
    role: 'Role',
    destination: 'Destination',
    status: 'Status'
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
  dashboard: {
    title: 'ዳሽቦርድ',
    subtitle: 'ብዙ-ተከራካሪ ትዕዛዝ ማዕከል',
    heroTitle: 'ምዝገባ፣ ሰነዶች፣ ጉዞ፣ መጦር እና ተባባሪዎችን በአንድ ደህንነተኛ ማዕከል ያስተዳድሩ።',
    heroSubtitle: 'በ README ወታደር ዙሪያ የተገነባ ምልልስ ወይም ዝቅተኛ የስራ ወጪዎች እና ዓለምአቀፍ ቆይታ ጉዞ ሞዴል ያለበት።',
    registerEmployee: 'ሰራተኛ ምዝግብ ያድርጉ',
    uploadDocuments: 'ሰነዶች ይስቡ',
    coreModules: 'ዋና ሞጁሎች',
    coreModulesDesc: 'ከ README የተተገበረ ወደ ተመሳሳይ ካርታ።',
    hybridStorage: 'ድብልቅ ማከማቻ ራስጅ',
    activityFeed: 'ተግባር ምግብ',
    employeePipeline: 'ሰራተኛ ምህዳር ስሪት',
    id: 'ታውቅ ቁጥር',
    name: 'ስም',
    role: 'ሚና',
    destination: 'መወደቅ ነጥብ',
    status: 'ሁኔታ'
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
  dashboard: {
    title: 'Gabatee',
    subtitle: 'Tuqaa Ajajaa Multitenant',
    heroTitle: 'Geessu, galmee, imala, hadha fi walii galtee tokkoon qabaa-galma itti eeguu.',
    heroSubtitle: 'Bulchina Telegram + Teledrive malaa kaffaltii giddu galeessaa xiqqaa fi oohinsa sagantaa ijaaraa hedduutin ijaarame.',
    registerEmployee: 'Hojjetta geessu',
    uploadDocuments: 'Galmee seenu',
    coreModules: 'Modiyuulota Ijaaraa',
    coreModulesDesc: 'Kaartaa karaa README irraa eegale.',
    hybridStorage: 'Karaa qabaa-galma haala lamaa',
    activityFeed: 'Miidiyaa socho\'a',
    employeePipeline: 'Muuxannoo paaypiliinii hojjettaa',
    id: 'Lakkoofsa aqaasii',
    name: 'Maqaa',
    role: 'Gawwata',
    destination: 'Bakka geessaa',
    status: 'Haala'
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
  dashboard: {
    title: 'لوحة التحكم',
    subtitle: 'مركز القيادة متعدد المستأجرين',
    heroTitle: 'إدارة التسجيل والمستندات والسفر والحج والشراكات في مركز آمن واحد.',
    heroSubtitle: 'مبني حول خارطة طريق README مع نموذج تخزين هجين من Telegram + Teledrive لتكاليف تشغيلية منخفضة والبث العالمي للمقابلات.',
    registerEmployee: 'تسجيل الموظف',
    uploadDocuments: 'تحميل المستندات',
    coreModules: 'الوحدات الأساسية',
    coreModulesDesc: 'خريطة الطريق المنفذة من README.',
    hybridStorage: 'توجيه التخزين الهجين',
    activityFeed: 'موجز النشاط',
    employeePipeline: 'لقطة خط أنابيب الموظفين',
    id: 'المعرف',
    name: 'الاسم',
    role: 'الدور',
    destination: 'الوجهة',
    status: 'الحالة'
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
