import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="System Settings"
      description="Configure agency and platform settings."
      workflows={['Agency profile', 'Storage settings', 'Telegram settings', 'Notification settings']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
