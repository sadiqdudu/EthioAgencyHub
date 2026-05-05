import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Pilgrimage Documentation"
      description="Manage Hajj and Umrah document packages."
      workflows={['Document pack', 'Permit files', 'Medical docs', 'Submission status']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
