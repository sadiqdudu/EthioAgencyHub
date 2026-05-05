import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Institution Partners"
      description="Manage partner institutions and overseas employers."
      workflows={['Partner list', 'Country filters', 'Status', 'Agreements']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
