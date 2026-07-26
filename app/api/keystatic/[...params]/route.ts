import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

export const dynamic = 'force-dynamic'; // <--- TAMBAHKAN LINE INI

export const { POST, GET } = makeRouteHandler({
  config,
});