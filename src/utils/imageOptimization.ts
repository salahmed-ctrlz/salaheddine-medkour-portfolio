import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import React from 'react';

export const convertToWebP = async (imagePath: string): Promise<string> => {
  try {
    const files = await imagemin([imagePath], {
      destination: 'public/optimized',
      plugins: [
        imageminWebp({
          quality: 80,
          method: 6,
        })
      ]
    });
    return files[0].destinationPath;
  } catch (error) {
    console.error('Error converting image to WebP:', error);
    return imagePath;
  }
};

interface ImageComponentProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export const ImageComponent: React.FC<ImageComponentProps> = React.memo(({ 
  src, 
  alt, 
  className, 
  ...props 
}) => {
  return React.createElement('picture', null,
    React.createElement('source', {
      srcSet: src.replace(/\.(png|jpg|jpeg)$/, '.webp'),
      type: 'image/webp'
    }),
    React.createElement('img', {
      src,
      alt,
      className,
      ...props
    })
  );
}); 