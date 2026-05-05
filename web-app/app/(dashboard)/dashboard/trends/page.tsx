import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Dashboard Trends"
      description="Track agency performance trends across registration, documents, and travel."
      workflows={['Registration trends', 'Document throughput', 'Travel readiness', 'Agency comparison']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
