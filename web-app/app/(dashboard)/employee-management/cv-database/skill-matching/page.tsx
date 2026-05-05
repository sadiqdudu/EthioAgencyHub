import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Skill Matching"
      description="Match employees to deployment opportunities."
      workflows={['Skill filters', 'Opportunity matching', 'Readiness score', 'Partner shortlist']}
      actions={[{ label: 'Open workflow', href: '#' }]}
    />
  );
}
