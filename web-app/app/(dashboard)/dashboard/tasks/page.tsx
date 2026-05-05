import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Dashboard Tasks"
      description="Manage priority operational tasks and follow-ups."
      workflows={['Pending approvals', 'Document reminders', 'Travel checklist', 'Agent follow-up']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
