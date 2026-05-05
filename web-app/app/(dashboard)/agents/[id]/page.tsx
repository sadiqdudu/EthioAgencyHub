import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Agent Record"
      description="View agent record and operational history."
      workflows={['Assignments', 'Performance', 'Training', 'Support']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}