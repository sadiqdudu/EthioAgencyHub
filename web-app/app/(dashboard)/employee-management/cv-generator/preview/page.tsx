import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="CV Preview"
      description="Preview generated employee CVs before export."
      workflows={['Profile preview', 'Skill highlights', 'Document summary', 'Partner view']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
