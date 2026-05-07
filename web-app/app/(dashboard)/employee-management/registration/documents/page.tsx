import { RegistrationWizard } from '@/components/employees/registration-wizard';

export default function RegistrationDocumentsPage() {
  return (
    <div id="wizard">
      <RegistrationWizard initialStep={2} />
    </div>
  );
}
