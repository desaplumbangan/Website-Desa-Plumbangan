import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../keystatic.config';

// Baris ini SANGAT KRUSIAL. Tanpa ini, Next.js akan men-cache rute API,
// sehingga proses penukaran token OAuth akan selalu gagal di Vercel.
export const dynamic = 'force-dynamic';

export const { POST, GET } = makeRouteHandler({
  config,
});