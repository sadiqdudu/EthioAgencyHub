import { DocumentUpload } from '@/components/documents/document-upload';
import { ModulePage } from '@/components/module-page';

export default function Page() {
  return (
    <div className="space-y-6">
      <ModulePage
        title="Document Upload"
        description="Upload employee documents into the Teledrive-backed archive. Video files route automatically to Telegram."
        workflows={['Photo upload', 'Passport upload', 'PDF upload', 'Storage routing']}
        actions={[{ label: 'Start upload', href: '#upload' }]}
      />
      <div id="upload">
        <DocumentUpload />
      </div>
    </div>
  );
}
