import { ok, serverError } from '@/lib/api/responses';
import { requireRole } from '@/lib/auth/session';
import { getSyncStatus, getPendingFiles, getSyncedFiles } from '@/lib/teledrive';

export async function GET() {
  try {
    requireRole(['SUPER_ADMIN', 'AGENCY_ADMIN', 'AGENT']);

    const uploadPath = process.env.UPLOAD_PATH;
    
    if (!uploadPath) {
      return ok({
        enabled: false,
        message: 'Teledrive sync is not configured. Set UPLOAD_PATH in environment variables.',
        status: { pending: 0, synced: 0, errors: 0, total: 0 }
      });
    }

    const status = getSyncStatus();
    const pending = getPendingFiles();
    const synced = getSyncedFiles();

    return ok({
      enabled: true,
      uploadPath,
      status,
      pendingFiles: pending.map(f => ({
        fileName: f.fileName,
        relativePath: f.relativePath,
        size: f.size,
        createdAt: f.createdAt
      })),
      syncedFiles: synced.map(f => ({
        fileName: f.fileName,
        relativePath: f.relativePath,
        size: f.size,
        syncedAt: f.syncedAt
      }))
    });
  } catch (error) {
    console.error('[TeledriveStatus] Error:', error);
    return serverError();
  }
}