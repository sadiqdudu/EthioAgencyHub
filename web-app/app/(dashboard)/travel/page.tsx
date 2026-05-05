import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Travel Management"
      description="Coordinate departures, ticketing, pre-departure readiness, destination tracking, and today manifests."
      workflows={['Flight schedule', 'Ticket tracking', 'Departure checklist', 'Today departures', 'Destination status', 'Manifest preparation']}
      actions={[{ label: 'Plan departure', href: '/travel' }]}
    />
  );
}
