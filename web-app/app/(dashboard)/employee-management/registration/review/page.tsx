import { RegistrationWizard } from '@/components/employees/registration-wizard';

export default function Page() {
  return (
    <div id="wizard">
      <RegistrationWizard initialStep={3} />
    </div>
  );
}
