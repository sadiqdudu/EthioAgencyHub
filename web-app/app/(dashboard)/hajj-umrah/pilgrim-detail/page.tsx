import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Pilgrim Detail"
      description="Manage pilgrim profile and travel requirements."
      workflows={['Pilgrim profile', 'Group assignment', 'Requirement status', 'Travel notes']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
