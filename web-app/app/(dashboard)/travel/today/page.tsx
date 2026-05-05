import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Today Departures"
      description="Monitor employees departing today."
      workflows={['Ready list', 'Missing checklist', 'Flight manifest', 'Departure notes']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
