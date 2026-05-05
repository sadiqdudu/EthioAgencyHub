import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Agent Management"
      description="Track agent onboarding, training, performance, commission readiness, and support workflows."
      workflows={['Agent detail', 'Performance metrics', 'Onboarding', 'Training programs', 'Support tickets', 'Commission tracking']}
      actions={[{ label: 'Onboard agent', href: '/agents' }]}
    />
  );
}
