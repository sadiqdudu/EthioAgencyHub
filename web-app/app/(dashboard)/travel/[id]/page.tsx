import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Travel Detail"
      description="View travel record details and departure history."
      workflows={['Flight detail', 'Employee records', 'Ticket detail', 'Status timeline']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}