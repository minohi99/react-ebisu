import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';
import Image from 'next/image';
import React from 'react';

type ConvertBodyProps = {
  contentHTML: string;
};

const isImageElement = (node: any): node is Element => {
  return node.type === 'tag' && node.name === 'img' && node.attribs;
};

const ConvertBody = ({ contentHTML }: ConvertBodyProps) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (isImageElement(domNode)) {
        const { src, alt, width, height } = domNode.attribs;
        return (
          <Image
            src={src || ''}
            alt={alt || ''}
            width={parseInt(width, 10) || undefined}
            height={parseInt(height, 10) || undefined}
            sizes="(min-width:768px) 768px, 100vw"
          />
        );
      }
    },
  };

  const contentReact = parse(contentHTML, options);

  return <>{contentReact}</>;
};

export default ConvertBody;
