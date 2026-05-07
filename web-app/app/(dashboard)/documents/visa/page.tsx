import { VisaTimeline } from '@/components/documents/visa-timeline';
import { DocumentsVisa } from '@/components/documents/documents-visa';

export default function Page() {
  return (
    <div className="space-y-6">
      <DocumentsVisa />
      <VisaTimeline />
    </div>
  );
}
