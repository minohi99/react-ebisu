/* eslint-disable @next/next/no-page-custom-font */
import '@/styles/globals.css';
import React, { ReactNode } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { siteMeta } from '@/lib/constants';
import Layout from '@/components/Layout';
config.autoAddCss = false;

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

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <html lang={siteLang}>
        <body>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap"
            rel="stylesheet"
          />
          <Layout>{children}</Layout>
        </body>
      </html>
    </React.Fragment>
  );
};

export default RootLayout;
