/* eslint-disable @next/next/no-page-custom-font */
import '@/styles/globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React, { ReactNode } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Head from 'next/head';
config.autoAddCss = false;

const siteMeta = {
  siteTitle: 'CUBE',
  siteDesc: 'アウトプットしていくサイト',
  siteURL: 'http://localhost:3000/',
  siteLang: 'ja',
  siteLocale: 'ja-JP',
  siteType: 'website',
  siteIcon: '/favicon.png',
};

export const metadata = {
  title: {
    default: siteMeta.siteTitle,
    template: `%s | ${siteMeta.siteTitle}`,
  },
  description: siteMeta.siteDesc,
  metadataBase: new URL(siteMeta.siteURL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteMeta.siteTitle,
    description: siteMeta.siteDesc,
    url: siteMeta.siteURL,
    siteName: siteMeta.siteTitle,
    locale: siteMeta.siteLocale,
    type: siteMeta.siteType,
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;
