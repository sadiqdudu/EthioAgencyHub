import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Document Upload"
      description="Upload employee documents into the Teledrive-backed archive."
      workflows={['Photo upload', 'Passport upload', 'PDF upload', 'Storage routing']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
