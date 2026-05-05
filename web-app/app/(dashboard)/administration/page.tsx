import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Administration"
      description="Configure users, roles, permissions, settings, audit logs, and platform-level security controls."
      workflows={['User management', 'Roles and permissions', 'System settings', 'Activity logs', 'Audit trail', 'Tenant controls']}
      actions={[{ label: 'Manage users', href: '/administration' }]}
    />
  );
}
