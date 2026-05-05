import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="System Logs"
      description="Review operational and system logs."
      workflows={['API logs', 'Auth logs', 'Upload logs', 'Integration logs']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
