'use client';

import { useCallback, useState } from 'react';
import { UploadCloud } from 'lucide-react';

export function DocumentUpload({ employeeId }: { employeeId?: string }) {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const dropped = Array.from(event.dataTransfer.files);
    setFiles((prev) => [...prev, ...dropped]);
  }, []);

  const upload = async () => {
    if (!files.length) return;
    setSubmitting(true);
    setMessage(null);
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        if (employeeId) formData.append('employeeId', employeeId);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error?.message ?? 'Upload failed');
      }
      setMessage(`${files.length} file(s) uploaded successfully.`);
      setFiles([]);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="flex items-center gap-2 text-lg font-bold text-ink"><UploadCloud className="h-5 w-5 text-brand-600" /> Upload documents</h3>
      <p className="mt-1 text-sm text-slate-500">Drop passports, photos, or PDFs. Video files route automatically to Telegram.</p>

      <div
        onDragOver={(event) => { event.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`mt-4 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-10 text-center transition ${
          dragOver ? 'border-brand-600 bg-brand-50' : 'border-slate-300 bg-slate-50'
        }`}
      >
        <UploadCloud className="mb-3 h-10 w-10 text-brand-600" />
        <p className="text-sm font-semibold text-ink">Drop files here or click to browse</p>
        <input
          type="file"
          multiple
          onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
          className="mt-4 text-sm"
        />
      </div>

      {files.length > 0 ? (
        <ul className="mt-4 space-y-1 text-sm text-slate-600">
          {files.map((file) => (
            <li key={file.name} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-2">
              <span className="truncate">{file.name}</span>
              <span className="text-xs text-slate-400">{(file.size / 1024).toFixed(0)} KB</span>
            </li>
          ))}
        </ul>
      ) : null}

      <button
        type="button"
        onClick={upload}
        disabled={submitting || files.length === 0}
        className="mt-4 rounded-2xl bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
      >
        {submitting ? 'Uploading...' : `Upload ${files.length} file(s)`}
      </button>
      {message ? <p className="mt-3 text-sm text-slate-600">{message}</p> : null}
    </section>
  );
}
