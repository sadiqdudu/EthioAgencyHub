import { getTelegramFileUrl } from '@/lib/telegram/bot';
import { serverError } from '@/lib/api/responses';

export async function GET(_: Request, { params }: { params: { fileId: string } }) {
  try {
    const fileUrl = await getTelegramFileUrl(params.fileId);
    const response = await fetch(fileUrl, { cache: 'no-store' });

    if (!response.ok || !response.body) {
      return serverError('Telegram video stream could not be opened.');
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('Content-Type') ?? 'video/mp4',
        'Cache-Control': 'private, max-age=300'
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Telegram video stream failed.';
    return serverError(message);
  }
}
