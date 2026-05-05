import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Ticket Management"
      description="Track ticket bookings and flight details."
      workflows={['Ticket status', 'PNR records', 'Airline details', 'Cost tracking']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
