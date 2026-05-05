import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Notification Settings"
      description="Configure operational notification preferences."
      workflows={['Email alerts', 'Document alerts', 'Travel alerts', 'System alerts']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
