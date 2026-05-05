import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Employee Management"
      description="Register employees, generate CVs, match skills to opportunities, and track every worker lifecycle status."
      workflows={['Personal registration', 'Skills and experience', 'Document upload', 'CV templates', 'Skill matching', 'Employee profile review']}
      actions={[{ label: 'Start registration', href: '/employee-management' }]}
    />
  );
}
