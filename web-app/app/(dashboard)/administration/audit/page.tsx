import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Audit Trail"
      description="Track sensitive changes for compliance."
      workflows={['User changes', 'Document changes', 'Role changes', 'Export audit']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
