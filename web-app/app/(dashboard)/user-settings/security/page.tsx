import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Security Settings"
      description="Manage password, sessions, and MFA readiness."
      workflows={['Password', 'Sessions', 'MFA setup', 'Security log']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
