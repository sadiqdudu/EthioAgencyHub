import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <ModulePage
      title="Document Management"
      description="Securely route photos, passports, PDFs, visa files, and MOLS records through the Teledrive-backed document pipeline."
      workflows={['Upload documents', 'Visa tracking', 'MOLS integration', 'Missing report', 'Cross-match verification', 'Expiry monitoring']}
      actions={[{ label: 'Upload document', href: '/documents' }]}
    />
  );
}
