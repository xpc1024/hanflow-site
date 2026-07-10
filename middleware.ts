import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n';

export default createMiddleware(routing);

export const config = {
  // Skip static assets and API; everything else gets locale routing.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
