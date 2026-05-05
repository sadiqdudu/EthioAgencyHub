import { ok } from '@/lib/api/responses';

export async function GET(_: Request, { params }: { params: { slug?: string[] } }) {
  return ok({ module: 'travel', path: params.slug ?? [], status: 'Travel API scaffold ready for implementation' });
}
