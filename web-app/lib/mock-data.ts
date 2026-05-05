import { Activity, BadgeCheck, BriefcaseBusiness, Building2, CalendarClock, FileCheck2, Plane, UsersRound } from 'lucide-react';

export const kpis = [
  { label: 'Active Employees', value: '2,486', change: '+18.4%', icon: UsersRound },
  { label: 'Documents In Pipeline', value: '742', change: '+9.2%', icon: FileCheck2 },
  { label: "Today's Departures", value: '38', change: '12 ready', icon: Plane },
  { label: 'Partner Agencies', value: '56', change: '+4 this month', icon: Building2 }
];

export const modules = [
  { title: 'Employee Management', href: '/employee-management', icon: UsersRound, summary: 'Registration, CV generation, skill matching, and lifecycle tracking.' },
  { title: 'Documents', href: '/documents', icon: FileCheck2, summary: 'Visa, MOLS, passport, medical, upload, and cross-match workflows.' },
  { title: 'Travel', href: '/travel', icon: Plane, summary: 'Ticketing, departure readiness, schedules, and today views.' },
  { title: 'Hajj & Umrah', href: '/hajj-umrah', icon: CalendarClock, summary: 'Pilgrim registration, requirements, groups, and religious travel docs.' },
  { title: 'Institutions', href: '/institutions', icon: Building2, summary: 'Partner institution records, collaboration, and document exchange.' },
  { title: 'Agents', href: '/agents', icon: BriefcaseBusiness, summary: 'Agent onboarding, training, performance, commissions, and support.' },
  { title: 'Administration', href: '/administration', icon: BadgeCheck, summary: 'Users, roles, permissions, settings, logs, and audit trail.' },
  { title: 'Reporting & Analytics', href: '/reporting-analytics', icon: Activity, summary: 'Operational reports, financial reporting, analytics, and exports.' }
];

export const employees = [
  { id: 'EAH-1024', name: 'Mekdes Tesfaye', role: 'Domestic Worker', status: 'Document Review', destination: 'Saudi Arabia' },
  { id: 'EAH-1025', name: 'Hana Bekele', role: 'Caregiver', status: 'Interview Uploaded', destination: 'UAE' },
  { id: 'EAH-1026', name: 'Selamawit Alemu', role: 'Hospitality Staff', status: 'Travel Ready', destination: 'Qatar' },
  { id: 'EAH-1027', name: 'Rahel Tadesse', role: 'Cleaner', status: 'MOLS Pending', destination: 'Kuwait' }
];

export const activities = [
  'Telegram interview video saved for Hana Bekele',
  'Passport PDF routed to Teledrive sync folder',
  'MOLS cross-match completed for 23 employees',
  'Flight manifest prepared for Addis Ababa departures'
];

export const storageRoutes = [
  { type: 'Photos, Passports, PDFs', destination: 'Local FS → Teledrive Desktop Sync', cost: '~300 ETB/month', purpose: 'Low-cost unlimited document archive' },
  { type: 'Interview Videos', destination: 'Telegram Bot → Private Channel', cost: 'Free', purpose: 'Global CDN streaming for partners' }
];
