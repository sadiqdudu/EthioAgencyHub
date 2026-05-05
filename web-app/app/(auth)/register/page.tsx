import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Register Agency User"
      description="Create a new agency user with role-based access controls."
      workflows={['Invite user', 'Assign agency', 'Choose role', 'Send credentials']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
