import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="CV Search"
      description="Search employee CV data across agencies and skills."
      workflows={['Keyword search', 'Advanced filters', 'Saved searches', 'Export results']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
