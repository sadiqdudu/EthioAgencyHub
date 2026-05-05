import { ok } from '@/lib/api/responses';

export async function GET(_: Request, { params }: { params: { slug?: string[] } }) {
  return ok({ module: 'hajj-umrah', path: params.slug ?? [], status: 'Hajj and Umrah API scaffold ready for implementation' });
}
