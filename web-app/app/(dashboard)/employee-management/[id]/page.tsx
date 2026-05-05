import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Employee Profile"
      description="View employee lifecycle, documents, video, and travel records."
      workflows={['Profile summary', 'Document timeline', 'Interview video', 'Travel history']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}