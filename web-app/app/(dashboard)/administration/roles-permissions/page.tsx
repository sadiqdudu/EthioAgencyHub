import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Roles & Permissions"
      description="Configure RBAC permissions for agency operations."
      workflows={['Role matrix', 'Permission groups', 'Access review', 'Policy updates']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
