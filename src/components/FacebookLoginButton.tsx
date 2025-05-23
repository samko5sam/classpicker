/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import FacebookLogin, { FacebookLoginClient } from '@greatsumini/react-facebook-login';
import { Button } from '@/components/ui/button';
import { fbAppId } from '@/constants/openKey';
import { useGlobalContext } from '@/context/GlobalContext';
import { FacebookIcon, LogOutIcon } from 'lucide-react';

const FacebookLoginButton: React.FC = () => {
  const { isAuthenticated, logoutAccount, loginAccount } = useGlobalContext();

  return (
    <>
      {isAuthenticated ? (
        <Button variant="default" size="default" onClick={() => {
          logoutAccount()
        }}>
          <LogOutIcon /> 登出
        </Button>
      ) : (
        <Button variant="default" className='bg-blue-600 hover:bg-blue-500' size="default" onClick={() => {
          loginAccount()
        }}>
          <FacebookIcon /> 使用 Facebook 登入
        </Button>
      )}
    </>
  );
};

export default FacebookLoginButton;
