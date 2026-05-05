import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Hajj & Umrah Management"
      description="Manage pilgrim registration, requirements compliance, seasonal groups, and religious travel documentation."
      workflows={['Pilgrim detail', 'Requirements checklist', 'Group coordination', 'Season planning', 'Documentation', 'Compliance review']}
      actions={[{ label: 'Register pilgrim', href: '/hajj-umrah' }]}
    />
  );
}
