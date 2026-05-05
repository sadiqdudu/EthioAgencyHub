import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Departure Preparation"
      description="Complete pre-departure checklist and final readiness."
      workflows={['Checklist', 'Document pack', 'Orientation', 'Airport handoff']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
