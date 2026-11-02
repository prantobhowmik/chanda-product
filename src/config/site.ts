/**
 * Single source of truth for the site. Unset optional fields hide the matching
 * UI or show a disabled "Coming soon" state; nothing here is ever rendered as
 * "undefined".
 */

export interface Release {
  version: string;
  /** ISO date (YYYY-MM-DD). Optional: hidden when unset. */
  date?: string | undefined;
  notes: string[];
}

export interface SiteConfig {
  name: string;
  nameBn: string;
  tagline: string;
  description: string;
  /** Canonical origin, no trailing slash. A custom domain is a one-line change. */
  url: string;
  /** Must match releases[0].version. */
  version: string;
  license: string;
  licenseUrl: string;
  webAppUrl: string;
  /** Direct link to the APK (for example a public GitHub Release asset). Unset: the button is disabled. */
  apkUrl?: string | undefined;
  /** APK size in MB. Optional. */
  apkSizeMb?: number | undefined;
  androidMin: string;
  iosStatus: 'coming-soon' | 'available';
  /** Optional. Unset: contact links are hidden. */
  contactEmail?: string | undefined;
  /** Latest first. */
  releases: Release[];
}

export const site: SiteConfig = {
  name: 'Chanda',
  nameBn: 'চান্দা',
  tagline: 'Every taka collected. Every taka accounted for.',
  description:
    'Chanda is an offline-first app for community committees to record donations and expenses and keep everyone’s books in sync.',
  url: 'https://chanda-product.vercel.app',
  version: '2.0.0',
  license: 'Apache 2.0',
  licenseUrl: 'https://www.apache.org/licenses/LICENSE-2.0',
  webAppUrl: 'https://chanda-blush.vercel.app/',
  apkUrl: 'https://github.com/prantobhowmik/chanda-product/releases/download/v2.0.0/Chanda.apk',
  apkSizeMb: 113,
  androidMin: '7.0',
  iosStatus: 'coming-soon',
  contactEmail: undefined,
  releases: [
    {
      version: '2.0.0',
      notes: [
        'Approvals with a notification bell and Android notifications',
        'Archive and restore',
        'Carry a festival’s balance forward',
        'Teal redesign with light, dark and system theme',
        'Email invites, invitation requests and change password',
        'Android keyboard and scrolling fixes',
        'New splash screen',
      ],
    },
  ],
};
