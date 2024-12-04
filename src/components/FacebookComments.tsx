import { fbAppId } from '@/constants/openKey';
import { useEffect, useState } from 'react';
import { Comments, FacebookProvider, Like } from 'react-facebook';

interface FacebookCommentsProps {
  pageUrl: string;
}

const FacebookComments: React.FC<FacebookCommentsProps> = ({ pageUrl }) => {
  return (
    <FacebookProvider appId={fbAppId}>
      <div className='w-full min-w-8 min-h-64'>
        <div className='mt-8'>
          <Like href={pageUrl} colorScheme="dark" showFaces share />
        </div>
        <Comments href={pageUrl} width="100%" />
      </div>
    </FacebookProvider>
  );
};

export default FacebookComments;
