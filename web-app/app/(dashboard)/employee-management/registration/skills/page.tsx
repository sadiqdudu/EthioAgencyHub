import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Skills Registration"
      description="Record skills, experience, language ability, and job preferences."
      workflows={['Skills profile', 'Experience history', 'Language level', 'Destination preference']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
