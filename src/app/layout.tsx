import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { ReactNode } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const siteMeta = {
  siteTitle: "CUBE",
  siteDesc: "アウトプットしていくサイト",
  siteURL: "http://localhost:3000/",
  siteLang: "ja",
  siteLocale: "ja-JP",
  siteType: "website",
  siteIcon: "/favicon.png",
};

export const metadata = {
  title: {
    default: siteMeta.siteTitle,
    template: `%s | ${siteMeta.siteTitle}`,
  },
  description: siteMeta.siteDesc,
  metadataBase: new URL(siteMeta.siteURL),
  alternates: {
    canonical: "/",
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
    <React.Fragment>
      <html lang={siteMeta.siteLang}>
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </React.Fragment>
  );
};

export default RootLayout;
