import Head from 'next/head';
import React from 'react';

type MetaProps = {
  pageTitle: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
};

const Meta = ({
  pageTitle,
  description,
  canonical,
  ogTitle,
  ogDescription,
}: MetaProps) => {
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={ogTitle || pageTitle} />
      <meta property="og:description" content={ogDescription || description} />
    </Head>
  );
};

export default Meta;
