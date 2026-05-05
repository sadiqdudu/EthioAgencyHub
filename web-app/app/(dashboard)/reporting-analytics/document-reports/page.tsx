import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Document Reports"
      description="Analyze document processing and verification metrics."
      workflows={['Pipeline report', 'Missing docs', 'Expiry report', 'Cross-match report']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
