import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Agent Performance"
      description="Analyze agent registrations, quality, and deployment outcomes."
      workflows={['KPI score', 'Registrations', 'Deployments', 'Quality checks']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
