import Container from '@/components/Container';
import Hero from '@/components/Hero';
import React from 'react';

const NotFound = () => {
  return (
    <React.Fragment>
      <title>404: ページが見つかりません</title>
      <Container>
        <Hero title="404" subtitle="ページが見つかりません" />
      </Container>
    </React.Fragment>
  );
};

export default NotFound;
