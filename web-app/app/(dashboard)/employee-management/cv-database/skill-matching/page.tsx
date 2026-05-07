import { CvSearch } from '@/components/employees/cv-search';
import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <div className="space-y-6">
      <ModulePage
        title="Skill Matching"
        description="Match employees to deployment opportunities."
        workflows={['Skill filters', 'Opportunity matching', 'Readiness score', 'Partner shortlist']}
        actions={[{ label: 'View all profiles', href: '/employee-management/cv-database/employee-profiles' }]}
      />
      <div className="rounded-3xl border border-brand-200 bg-brand-50/50 p-6 shadow-sm">
        <h3 className="mb-2 text-lg font-bold text-brand-900">AI-Assisted Skill Matching</h3>
        <p className="text-sm text-brand-700">
          Enter job requirements (e.g., "Driver UAE 5 years") in the search bar below. The system will filter available candidates based on their registered roles, destinations, and skills.
        </p>
      </div>
      <CvSearch />
    </div>
  );
}
