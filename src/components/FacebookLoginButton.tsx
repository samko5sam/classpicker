/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import FacebookLogin, { FacebookLoginClient } from '@greatsumini/react-facebook-login';
import { Button } from '@/components/ui/button';
import { fbAppId } from '@/constants/openKey';
import { useAuthContext } from '@/context/AuthContext';

const FacebookLoginButton: React.FC = () => {
  const { isAuthenticated, logoutAccount, loginAccount } = useAuthContext();

  return (
    <>
      {isAuthenticated ? (
        <Button variant="default" className='bg-blue-600 hover:bg-blue-500' size="default" onClick={() => {
          logoutAccount()
        }}>
          登出
        </Button>
      ) : (
        <Button variant="default" className='bg-blue-600 hover:bg-blue-500' size="default" onClick={() => {
          loginAccount()
        }}>
          使用 Facebook 登入
        </Button>
      )}
      {/* <FacebookLogin
        appId={fbAppId}
        onSuccess={handleLogin}
        onFail={handleFailure}
        onProfileSuccess={handleProfileSuccess}
        render={({ onClick }) => (
          <Button variant="default" className='bg-blue-600 hover:bg-blue-500' size="default" onClick={onClick}>
            使用 Facebook 登入
          </Button>
        )}
      /> */}
    </>
  );
};

export default FacebookLoginButton;
