export function getTelegramConfig() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const channelId = process.env.TG_CHANNEL_ID;

  if (!botToken || !channelId) {
    throw new Error('TELEGRAM_BOT_TOKEN and TG_CHANNEL_ID are required for Telegram media routing.');
  }

  return { botToken, channelId };
}
