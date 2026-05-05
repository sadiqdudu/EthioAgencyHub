import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="CV Templates"
      description="Choose agency-branded CV templates for employee profiles."
      workflows={['Template library', 'Brand settings', 'Language variants', 'Preview template']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
