import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Pilgrimage Record"
      description="View individual pilgrimage record and season timeline."
      workflows={['Season data', 'Group details', 'Documents', 'Travel status']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}