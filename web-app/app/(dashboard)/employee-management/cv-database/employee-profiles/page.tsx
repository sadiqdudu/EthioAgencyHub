import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Employee Profiles"
      description="Browse searchable employee CV profile records."
      workflows={['Profile list', 'Status filters', 'Destination filters', 'Document readiness']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
