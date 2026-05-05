import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Institution Management"
      description="Maintain embassy, MOLS, overseas partner, and local institution relationships with controlled collaboration."
      workflows={['Partner directory', 'Institution detail', 'Collaboration notes', 'Document exchange', 'Communication log', 'Approval tracking']}
      actions={[{ label: 'Add institution', href: '/institutions' }]}
    />
  );
}
