import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Registration Review"
      description="Review employee registration before final submission."
      workflows={['Data validation', 'Document checklist', 'Interview status', 'Submit employee']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
