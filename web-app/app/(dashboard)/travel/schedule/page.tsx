import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Travel Schedule"
      description="Schedule employee departures and destination timelines."
      workflows={['Calendar view', 'Destination groups', 'Readiness filter', 'Flight planning']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
