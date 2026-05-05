import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Export Reports"
      description="Export analytics data to CSV and PDF."
      workflows={['CSV export', 'PDF export', 'Scheduled export', 'Export history']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
