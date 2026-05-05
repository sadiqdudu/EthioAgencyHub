import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Reporting & Analytics"
      description="Analyze employee registration, document processing, travel readiness, financial metrics, and exportable reports."
      workflows={['Overview analytics', 'Employee reports', 'Document reports', 'Financial reports', 'CSV export', 'PDF export']}
      actions={[{ label: 'View reports', href: '/reporting-analytics' }]}
    />
  );
}
