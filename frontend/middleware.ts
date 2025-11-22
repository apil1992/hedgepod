import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Automatically detect user's preferred language
  localeDetection: true,

  // Default locale doesn't need prefix for cleaner URLs
  localePrefix: 'as-needed',
});

export const config = {
  // Match all supported locales (19 languages)
  matcher: ['/', '/(en|zh|es|ar|pt|id|fr|ja|ru|de|hi|ko|pl|ca|ms|th|zh-TW|nl|es-419)/:path*'],
};

