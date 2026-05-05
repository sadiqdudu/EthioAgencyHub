import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Institution Record"
      description="View institution record and relationship timeline."
      workflows={['Profile', 'Partnership status', 'Documents', 'Activity']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}