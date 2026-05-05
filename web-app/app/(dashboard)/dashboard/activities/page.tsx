import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Dashboard Activities"
      description="Review audit-ready activity across the agency workspace."
      workflows={['Recent uploads', 'Status changes', 'Login events', 'Telegram updates']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
