/* eslint-disable @next/next/no-page-custom-font */

import '@/styles/globals.css';
import React, { ReactNode, Suspense } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Layout from '@/components/Layout';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import {
  baseMetadata,
  openGraphMetadata,
  twitterMetadata,
} from '@/libs/baseMetadata';
import { siteMeta } from '@/libs/constants';

config.autoAddCss = false;

export const metadata = {
  ...baseMetadata,
  openGraph: {
    ...openGraphMetadata,
  },
  twitter: {
    ...twitterMetadata,
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <html lang={siteMeta.siteLang}>
        <body>
          <Suspense>
            <GoogleAnalytics />
          </Suspense>
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
