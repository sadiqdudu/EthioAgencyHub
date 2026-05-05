import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="User Settings"
      description="Manage personal account preferences."
      workflows={['Profile', 'Security', 'Notifications', 'Session settings']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
