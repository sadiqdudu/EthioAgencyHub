import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Financial Reports"
      description="Track agency financial metrics and commissions."
      workflows={['Commission report', 'Cost report', 'Revenue report', 'Agent payout']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
