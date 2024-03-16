import parse from 'html-react-parser';
import Image from 'next/image';
import React from 'react';

type ConvertBodyProps = {
  contentHTML: string;
};

const ConvertBody = ({ contentHTML }: ConvertBodyProps) => {
  const contentReact = parse(contentHTML, {
    replace: (node: DOMElement) => {
      console.log('🚀 ~ ConvertBody ~ node:', node);

      if (node.name === 'img') {
        const { src, alt, width, height } = node.attribs;
        return (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width:768px) 768px, 100vw"
          />
        );
      }
    },
  });

  return <React.Fragment>{contentReact}</React.Fragment>;
};

export default ConvertBody;
