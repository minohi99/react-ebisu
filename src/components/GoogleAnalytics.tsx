'use client';

import React, { useEffect } from 'react';
import * as gtag from '@/libs/gtag';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';

const GoogleAnalytics = () => {
  const pathname = usePathname();
  console.log('🚀 ~ GoogleAnalytics ~ pathname:', pathname);
  const searchParams = useSearchParams();
  console.log('🚀 ~ GoogleAnalytics ~ searchParams:', searchParams);

  useEffect(() => {
    const url = pathname + searchParams.toString();
    console.log('🚀 ~ useEffect ~ url:', url);
    gtag.pageview(url);
  }, [pathname, searchParams]);

  return (
    <React.Fragment>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      ></Script>
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gtag.GA_MEASUREMENT_ID}');
      `,
        }}
      ></Script>
    </React.Fragment>
  );
};

export default GoogleAnalytics;
