import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Agent Support"
      description="Track agent support requests and resources."
      workflows={['Tickets', 'Resources', 'Escalations', 'Resolution']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
