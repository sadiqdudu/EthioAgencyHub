import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Profile Settings"
      description="Update user profile information."
      workflows={['Name', 'Email', 'Agency', 'Contact']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
