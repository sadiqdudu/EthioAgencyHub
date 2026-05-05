import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Agent Detail"
      description="View agent profile, work queue, and commission readiness."
      workflows={['Profile', 'Assignments', 'Performance', 'Commission']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
