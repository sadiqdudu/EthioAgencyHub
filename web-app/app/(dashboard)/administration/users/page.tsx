import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="User Administration"
      description="Manage users across agencies and roles."
      workflows={['User list', 'Invite user', 'Deactivate user', 'Agency assignment']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
