import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Employee Reports"
      description="Analyze employee registration and deployment performance."
      workflows={['Registration report', 'Deployment report', 'Status report', 'Skill report']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
