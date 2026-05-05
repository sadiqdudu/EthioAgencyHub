import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Agent Onboarding"
      description="Guide new agents through onboarding requirements."
      workflows={['Invite', 'Training', 'Documents', 'Activation']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
