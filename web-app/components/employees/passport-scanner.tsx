'use client';

import { useState, useCallback, useRef } from 'react';
import {
  ScanLine, ChevronDown, ChevronUp, Upload, X, Check,
  Loader2, AlertTriangle, Camera, Zap, FileImage, Copy
} from 'lucide-react';
import { parsePassportData, mapPassportToFormFields } from '@/lib/utils/passport-parser';
import Tesseract from 'tesseract.js';

interface PassportScannerProps {
  onAutoFill: (data: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    passportNumber: string;
    passportExpiryDate: string;
    fatherName: string;
    motherName: string;
  }) => void;
}

type ScanState = 'idle' | 'scanning' | 'success' | 'error';

export function PassportScanner({ onAutoFill }: PassportScannerProps) {
  const [expanded, setExpanded] = useState(false);
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  const [filledFields, setFilledFields] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [manualText, setManualText] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const runAutoFill = useCallback((text: string) => {
    try {
      const passportData = parsePassportData(text);
      const formData = mapPassportToFormFields(passportData);

      // Always call onAutoFill even if partial data
      onAutoFill(formData);

      const found: string[] = [];
      if (formData.firstName) found.push('First Name');
      if (formData.lastName) found.push('Last Name');
      if (formData.dateOfBirth) found.push('Date of Birth');
      if (formData.gender) found.push('Gender');
      if (formData.nationality) found.push('Nationality');
      if (formData.passportNumber) found.push('Passport No.');
      if (formData.passportExpiryDate) found.push('Expiry Date');
      if (formData.fatherName) found.push("Father's Name");
      if (formData.motherName) found.push("Mother's Name");
      setFilledFields(found);

      if (found.length === 0) {
        setErrorMsg('Could not extract passport fields. Try a clearer image or paste text manually.');
        setScanState('error');
      } else {
        setScanState('success');
        setErrorMsg('');
        // Auto-collapse after success
        setTimeout(() => setExpanded(false), 2500);
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Parsing failed. Try pasting the text manually.');
      setScanState('error');
    }
  }, [onAutoFill]);

  const performOCR = useCallback(async (file: File) => {
    setScanState('scanning');
    setProgress(0);
    setExtractedText('');
    setFilledFields([]);
    setErrorMsg('');

    // Show image preview
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target?.result as string);
    reader.readAsDataURL(file);

    try {
      const result = await Tesseract.recognize(file, 'eng', {
        logger: (m: any) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });

      const text = result.data.text.trim();
      if (!text || text.length < 10) {
        setErrorMsg('No readable text found. Ensure good lighting and a clear, focused image.');
        setScanState('error');
        return;
      }

      setExtractedText(text);
      runAutoFill(text);
    } catch (err) {
      console.error('OCR failed:', err);
      setErrorMsg('OCR engine failed. Please paste the passport text manually below.');
      setScanState('error');
    }
  }, [runAutoFill]);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload an image file (JPG, PNG, WebP).');
      setScanState('error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File too large. Please use an image under 10MB.');
      setScanState('error');
      return;
    }
    performOCR(file);
  }, [performOCR]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleManualFill = () => {
    const text = manualText.trim();
    if (!text || text.length < 5) {
      setErrorMsg('Please enter some passport text first.');
      setScanState('error');
      return;
    }
    setExtractedText(text);
    runAutoFill(text);
  };

  const reset = () => {
    setScanState('idle');
    setExtractedText('');
    setFilledFields([]);
    setErrorMsg('');
    setManualText('');
    setImageSrc(null);
    setProgress(0);
  };

  return (
    <div className={`rounded-2xl border transition-all duration-200 ${
      scanState === 'success'
        ? 'border-emerald-300 bg-emerald-50'
        : scanState === 'error'
        ? 'border-red-200 bg-red-50'
        : 'border-slate-200 bg-slate-50'
    }`}>
      {/* Compact Header — always visible */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            scanState === 'success' ? 'bg-emerald-500' :
            scanState === 'error' ? 'bg-red-500' :
            scanState === 'scanning' ? 'bg-brand-500' :
            'bg-slate-300'
          }`}>
            {scanState === 'scanning' ? (
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            ) : scanState === 'success' ? (
              <Check className="h-4 w-4 text-white" />
            ) : (
              <ScanLine className="h-4 w-4 text-slate-600" />
            )}
          </div>
          <div>
            <span className="text-sm font-semibold text-slate-700">
              Passport Scanner — Auto Fill
            </span>
            {scanState === 'success' && filledFields.length > 0 && (
              <p className="text-xs font-medium text-emerald-600">
                ✓ Filled {filledFields.length} field{filledFields.length !== 1 ? 's' : ''}: {filledFields.slice(0, 3).join(', ')}{filledFields.length > 3 ? '…' : ''}
              </p>
            )}
            {scanState === 'scanning' && (
              <p className="text-xs text-brand-600">Scanning... {progress}%</p>
            )}
            {scanState === 'idle' && (
              <p className="text-xs text-slate-500">Upload passport image to auto-fill the form</p>
            )}
            {scanState === 'error' && (
              <p className="text-xs text-red-600 truncate max-w-xs">{errorMsg}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {scanState !== 'idle' && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); reset(); }}
              className="rounded-lg p-1 text-slate-400 hover:bg-white hover:text-slate-600"
              title="Reset scanner"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </div>
      </button>

      {/* Expandable Body */}
      {expanded && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-3 rounded-b-2xl space-y-3">
          {/* Scanning progress bar */}
          {scanState === 'scanning' && (
            <div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full bg-brand-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1 text-center text-xs text-slate-500">
                Processing image... {progress}%
              </p>
            </div>
          )}

          {/* Success summary */}
          {scanState === 'success' && filledFields.length > 0 && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3">
              <p className="text-xs font-semibold text-emerald-800 mb-2">✨ Auto-filled fields:</p>
              <div className="flex flex-wrap gap-1.5">
                {filledFields.map(f => (
                  <span key={f} className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    <Check className="h-3 w-3" /> {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Error message */}
          {errorMsg && scanState === 'error' && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 flex items-start gap-2 text-xs text-red-700">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Upload zone */}
          {scanState !== 'scanning' && (
            <div
              onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
              onDrop={handleDrop}
            >
              <label
                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-5 transition-colors ${
                  dragActive
                    ? 'border-brand-400 bg-brand-50'
                    : 'border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-100">
                    <FileImage className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      {dragActive ? 'Drop image here' : 'Upload passport photo'}
                    </p>
                    <p className="text-xs text-slate-500">JPG, PNG, WebP — max 10MB</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Camera className="h-3 w-3" /> Camera capture supported
                  </span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                    e.target.value = '';
                  }}
                />
              </label>
            </div>
          )}

          {/* Manual text fallback */}
          {scanState !== 'scanning' && (
            <details className="group">
              <summary className="cursor-pointer list-none text-xs font-medium text-slate-500 hover:text-slate-700 flex items-center gap-1">
                <span className="group-open:hidden">▶</span>
                <span className="hidden group-open:inline">▼</span>
                Can't scan? Paste text manually
              </summary>
              <div className="mt-2 space-y-2">
                <textarea
                  placeholder="Paste passport text here (from OCR app, PDF, or type manually)..."
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700 focus:border-brand-400 focus:outline-none"
                  rows={4}
                />
                <button
                  type="button"
                  onClick={handleManualFill}
                  disabled={!manualText.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-2 text-xs font-bold text-white hover:bg-brand-700 disabled:opacity-40"
                >
                  <Zap className="h-3.5 w-3.5" />
                  Auto-fill from pasted text
                </button>
              </div>
            </details>
          )}

          <p className="text-xs text-slate-400 flex items-center gap-1">
            🔒 Images processed locally. No data sent to external servers.
          </p>
        </div>
      )}
    </div>
  );
}