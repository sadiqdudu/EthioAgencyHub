import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Analytics Overview"
      description="View agency-wide and platform-wide performance analytics."
      workflows={['KPI overview', 'Trend charts', 'Agency comparison', 'Operational health']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
