import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Visa Tracking"
      description="Track visa application status and required documents."
      workflows={['Application status', 'Expiry dates', 'Embassy notes', 'Approval workflow']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
