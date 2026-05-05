import { RegistrationWizard } from '@/components/employees/registration-wizard';
import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <div className="space-y-6">
      <ModulePage
        title="Personal Registration"
        description="Capture employee identity and contact information across all registration steps."
        workflows={['Basic details', 'Contact information', 'Emergency contact', 'Agency assignment']}
        actions={[{ label: 'Start registration', href: '#wizard' }]}
      />
      <div id="wizard">
        <RegistrationWizard />
      </div>
    </div>
  );
}
