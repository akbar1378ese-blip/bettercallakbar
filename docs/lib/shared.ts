export const appName = 'bettercallakbar';
export const appTagline = 'Advanced web panel for managing Xray-core servers';

export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

// The bettercallakbar product repository — used for the navbar GitHub link,
// build-time star/release stats, and install commands.
export const productRepo = {
  user: 'bettercallakbarStudio',
  repo: 'bettercallakbar-Panel',
  branch: 'main',
};

// Where these docs live in the bettercallakbar repository — used for "Edit on GitHub" links.
export const gitConfig = {
  user: 'bettercallakbarStudio',
  repo: 'bettercallakbar-Panel',
  branch: 'main',
  docsDir: 'docs/content/docs',
};

export const productRepoUrl = `https://github.com/${productRepo.user}/${productRepo.repo}`;

// AI-generated interactive view of the bettercallakbar codebase.
export const deepWikiUrl = `https://deepwiki.com/${productRepo.user}/${productRepo.repo}`;

// Upstream 3x-ui community channel on Telegram.
export const telegramChannel = 'XrayUI';
export const telegramChannelUrl = `https://t.me/${telegramChannel}`;

// Support the developer — donation page with funding goals/targets.
export const donateUrl = 'https://reymit.ir/bettercallakbar';

// Public site origin, used for metadataBase / canonical URLs / OG images.
// Defaults to the production domain, so the env var is optional. Use `||` (not
// `??`) so an empty string — e.g. an unset `${{ vars.NEXT_PUBLIC_SITE_URL }}`
// in CI — also falls back instead of shipping a blank origin.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://github.com/akbar1378ese-blip/bettercallakbar';
