import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Agent Training"
      description="Manage training content and completion tracking."
      workflows={['Training modules', 'Progress', 'Assessments', 'Certification']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
