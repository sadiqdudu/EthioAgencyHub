import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Institution Collaboration"
      description="Coordinate collaboration and secure document exchange."
      workflows={['Shared tasks', 'Messages', 'Document exchange', 'Approvals']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
