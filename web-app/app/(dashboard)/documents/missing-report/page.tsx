import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Missing Report"
      description="Prepare and track missing-person reports to MOLS."
      workflows={['Incident details', 'Agency notes', 'Submission status', 'Follow-up timeline']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
