import { InterviewUploadForm } from '@/components/telegram/interview-upload-form';

export default function RegistrationDocumentsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Hybrid storage step</p>
        <h2 className="mt-2 text-3xl font-bold text-ink">Documents & interview video</h2>
        <p className="mt-3 max-w-3xl text-slate-600">Upload photos and documents to Teledrive through `/api/upload`, and upload short interview videos to Telegram through the private channel integration.</p>
      </section>
      <InterviewUploadForm />
    </div>
  );
}
