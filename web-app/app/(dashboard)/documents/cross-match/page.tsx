import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Document Cross-Match"
      description="Verify consistency across employee documents and MOLS records."
      workflows={['Identity checks', 'Passport checks', 'Visa checks', 'Mismatch report']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
