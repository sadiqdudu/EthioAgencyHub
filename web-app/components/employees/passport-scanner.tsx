'use client';

import { useState } from 'react';
import { Copy, Eye, EyeOff, Upload, X, Check } from 'lucide-react';
import { parsePassportData, mapPassportToFormFields } from '@/lib/utils/passport-parser';

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

export function PassportScanner({ onAutoFill }: PassportScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [showText, setShowText] = useState(false);
  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    setScanning(true);
    setProcessing(true);
    setError(null);
    setExtractedText('');

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          // Create canvas and extract text using basic image analysis
          const img = new Image();
          img.onload = async () => {
            // For production, integrate Tesseract.js or Google Vision API
            // For now, we'll use a placeholder that reads visible text
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Could not get canvas context');

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // In production, call actual OCR service here
            // This is a simulation of extracted text
            const simulatedText = extractTextFromPassportImage(canvas);

            setExtractedText(simulatedText);
            setProcessing(false);
          };
          img.src = event.target?.result as string;
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to process image');
          setProcessing(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scan passport');
      setScanning(false);
      setProcessing(false);
    }
  };

  const handlePasteText = async (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    if (text) {
      setExtractedText(text);
      setError(null);
    }
  };

  const handleAutoFill = () => {
    if (!extractedText.trim()) {
      setError('No extracted text to parse');
      return;
    }

    try {
      const passportData = parsePassportData(extractedText);
      const formData = mapPassportToFormFields(passportData);
      onAutoFill(formData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse passport data');
    }
  };

  const handleCopyExtractedText = () => {
    navigator.clipboard.writeText(extractedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setExtractedText('');
    setError(null);
  };

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-ink">📸 Passport Scanner - Auto Fill</h4>
        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">OCR</span>
      </div>

      {/* Image Upload */}
      <div>
        <label className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white py-6 hover:bg-slate-50">
          <Upload className="h-6 w-6 text-slate-400" />
          <span className="mt-2 text-sm font-medium text-slate-600">Click to scan passport or document</span>
          <span className="mt-1 text-xs text-slate-500">or paste image file</span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            disabled={scanning}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
          />
        </label>
        {scanning && (
          <p className="mt-2 text-sm text-slate-600">
            ⏳ Processing image {processing ? '(analyzing text)...' : '...'}
          </p>
        )}
      </div>

      {/* OR Separator */}
      {!extractedText && (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="flex-1 border-t border-slate-300" />
          <span>OR</span>
          <div className="flex-1 border-t border-slate-300" />
        </div>
      )}

      {/* Manual Text Entry / Paste */}
      {!extractedText && (
        <div>
          <label className="block text-sm font-semibold text-slate-700">Or paste extracted text from passport</label>
          <textarea
            placeholder="Paste passport text here (Ctrl+V or Cmd+V)"
            onPaste={handlePasteText}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-normal focus:border-brand-600 focus:outline-none"
            rows={4}
          />
          <p className="mt-1 text-xs text-slate-500">
            💡 Tip: You can copy text from a PDF reader or screenshot and paste it here
          </p>
        </div>
      )}

      {/* Extracted Text Display */}
      {extractedText && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700">Extracted Passport Text</label>
            <button
              type="button"
              onClick={() => setShowText(!showText)}
              className="inline-flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-100"
            >
              {showText ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              {showText ? 'Hide' : 'Show'}
            </button>
          </div>

          {showText && (
            <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-700">
              <pre className="whitespace-pre-wrap break-words font-mono">{extractedText}</pre>
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopyExtractedText}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
              {copied ? 'Copied!' : 'Copy text'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* Auto Fill Button */}
      {extractedText && (
        <button
          type="button"
          onClick={handleAutoFill}
          className="w-full rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
        >
          ✨ Auto-fill form from passport
        </button>
      )}

      <p className="text-xs text-slate-600">
        💡 <strong>How it works:</strong> Scan or paste your passport text. The system will automatically extract and fill your personal information fields to reduce manual entry errors.
      </p>
    </div>
  );
}

/**
 * Simulate text extraction from passport image
 * In production, integrate with Tesseract.js or cloud vision API
 */
function extractTextFromPassportImage(canvas: HTMLCanvasElement): string {
  // This is a placeholder simulation
  // In production, you would:
  // 1. Use Tesseract.js for client-side OCR
  // 2. Or send image to backend with cloud vision API
  // 3. Return actual extracted text

  // For demo purposes, return a template
  return `ETHIOPIA
FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA
PASSPORT

Surname: 
Given Names:
Nationality: ETHIOPIAN
Date of Birth:
Sex: M/F
Passport Number:
Date of Issue:
Date of Expiry:
Place of Birth:
Father's Name:
Mother's Name:
Issuing Authority:`;
}
