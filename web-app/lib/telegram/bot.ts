import { getTelegramConfig } from './config';

type TelegramVideo = {
  file_id: string;
  file_unique_id: string;
  duration?: number;
  mime_type?: string;
  file_size?: number;
};

type TelegramSendVideoResponse = {
  ok: boolean;
  result?: {
    message_id: number;
    video?: TelegramVideo;
  };
  description?: string;
};

type TelegramGetFileResponse = {
  ok: boolean;
  result?: {
    file_id: string;
    file_unique_id: string;
    file_size?: number;
    file_path?: string;
  };
  description?: string;
};

const SHORT_VIDEO_MAX_MB = Number(process.env.TELEGRAM_SHORT_VIDEO_MAX_MB ?? 50);

function getBotApiUrl(method: string) {
  const { botToken } = getTelegramConfig();
  return `https://api.telegram.org/bot${botToken}/${method}`;
}

function getFileApiUrl(filePath: string) {
  const { botToken } = getTelegramConfig();
  return `https://api.telegram.org/file/bot${botToken}/${filePath}`;
}

export function assertShortVideo(file: File) {
  if (!file.type.startsWith('video/')) {
    throw new Error('Only video files are accepted for Telegram interview uploads.');
  }

  const maxBytes = SHORT_VIDEO_MAX_MB * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error(`Short interview video must be ${SHORT_VIDEO_MAX_MB}MB or smaller.`);
  }
}

export async function uploadShortVideoToTelegram(file: File, caption?: string) {
  assertShortVideo(file);

  const { channelId } = getTelegramConfig();
  const formData = new FormData();
  formData.set('chat_id', channelId);
  formData.set('supports_streaming', 'true');
  formData.set('video', file, file.name || 'interview-video.mp4');

  if (caption) {
    formData.set('caption', caption.slice(0, 1024));
  }

  const response = await fetch(getBotApiUrl('sendVideo'), {
    method: 'POST',
    body: formData
  });
  const payload = (await response.json()) as TelegramSendVideoResponse;

  if (!response.ok || !payload.ok || !payload.result?.video?.file_id) {
    throw new Error(payload.description ?? 'Telegram video upload failed.');
  }

  return {
    messageId: payload.result.message_id,
    fileId: payload.result.video.file_id,
    uniqueFileId: payload.result.video.file_unique_id,
    fileSize: payload.result.video.file_size,
    mimeType: payload.result.video.mime_type,
    duration: payload.result.video.duration
  };
}

export async function getTelegramFileUrl(fileId: string) {
  const response = await fetch(getBotApiUrl(`getFile?file_id=${encodeURIComponent(fileId)}`), { cache: 'no-store' });
  const payload = (await response.json()) as TelegramGetFileResponse;

  if (!response.ok || !payload.ok || !payload.result?.file_path) {
    throw new Error(payload.description ?? 'Telegram file lookup failed.');
  }

  return getFileApiUrl(payload.result.file_path);
}
