import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Personal Registration"
      description="Capture employee identity and contact information."
      workflows={['Basic details', 'Contact information', 'Emergency contact', 'Agency assignment']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
