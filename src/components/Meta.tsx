import { siteMeta } from '@/lib/constants';

const { siteTitle, siteDesc, siteUrl, siteLang, siteLocale, siteType } =
  siteMeta;

export const metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDesc,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteTitle,
    description: siteDesc,
    url: siteUrl,
    siteName: siteTitle,
    locale: siteLocale,
    type: siteType,
  },
};

const Meta = () => {
  return;
};

export default Meta;
