import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Institution Detail"
      description="View institution profile, contacts, and collaboration history."
      workflows={['Profile', 'Contacts', 'Documents', 'Communication']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
