import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Pilgrimage Requirements"
      description="Track religious travel requirements and compliance."
      workflows={['Vaccination', 'Passport', 'Permit', 'Group rules']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
