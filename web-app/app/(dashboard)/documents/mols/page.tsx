import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="MOLS Integration"
      description="Manage Ministry of Labor processing and verification tasks."
      workflows={['Submission queue', 'Cross-match', 'Missing reports', 'Approval status']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
