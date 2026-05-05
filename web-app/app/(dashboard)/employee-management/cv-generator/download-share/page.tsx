import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Download & Share CV"
      description="Export and share employee CVs securely."
      workflows={['PDF export', 'Partner sharing', 'Download history', 'Access control']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
