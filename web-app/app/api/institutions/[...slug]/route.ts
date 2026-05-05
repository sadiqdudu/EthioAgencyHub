import { ok } from '@/lib/api/responses';

export async function GET(_: Request, { params }: { params: { slug?: string[] } }) {
  return ok({ module: 'institutions', path: params.slug ?? [], status: 'Institution API scaffold ready for implementation' });
}
