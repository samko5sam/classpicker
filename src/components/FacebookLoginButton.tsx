/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { Button } from '@/components/ui/button';

const FacebookLoginButton: React.FC = () => {
  const handleLogin = (response: any) => {
    console.log('Login Success!', response);
  };

  const handleFailure = (error: any) => {
    console.log('Login Failed!', error);
  };

  const handleProfileSuccess = (response: any) => {
    console.log('Get Profile Success!', response);
  };

  return (
    <FacebookLogin
      appId="1500928423940478"
      onSuccess={handleLogin}
      onFail={handleFailure}
      onProfileSuccess={handleProfileSuccess}
      render={({ onClick }) => (
        <Button variant="default" className='bg-blue-600 hover:bg-blue-500' size="default" onClick={onClick}>
          使用 Facebook 登入
        </Button>
      )}
    />
  );
};

export default FacebookLoginButton;
