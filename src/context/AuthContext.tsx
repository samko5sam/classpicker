import React, { createContext, useState, useEffect, useContext } from 'react';
import { FacebookLoginClient, LoginResponse, ProfileSuccessResponse } from '@greatsumini/react-facebook-login';
import { fbAppId } from '@/constants/openKey';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  user: ProfileSuccessResponse | null;
  logoutAccount?: () => void;
  loginAccount?: () => void;
}

const placeholderUser = {
  picture: {
    data: {
      url: "https://via.placeholder.com/150",
      height: 50,
      width: "50",
      is_silhouette: false
    }
  },
  name: "Jane Doe"
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<ProfileSuccessResponse | null>(placeholderUser);

  const getFbProfile = () => {
    FacebookLoginClient.getProfile((res: ProfileSuccessResponse) => {
      setUser(res);
    }, {
      fields: "picture, name"
    })
  }

  const logoutAccount = () => {
    FacebookLoginClient.logout((res:LoginResponse) => {
      if (res.status === "unknown"){
        setIsAuthenticated(false);
        setUser(placeholderUser);
        toast({
          title: "登出成功！"
        });
      }
    });
  }

  const loginAccount = () => {
    FacebookLoginClient.login((res: LoginResponse) => {
      if (res.status === "connected"){
        setIsAuthenticated(true);
        getFbProfile();
        toast({
          title: "登入成功！"
        });
      }
    }, {
      scope: 'public_profile',
    })
  }

  const loadFB = async () => {
    FacebookLoginClient.clear();
    await FacebookLoginClient.loadSdk('en_US');
    FacebookLoginClient.init({ appId: fbAppId, version: 'v9.0' });
    FacebookLoginClient.getLoginStatus((res:LoginResponse) => {
      if (res.status === "connected"){
        setIsAuthenticated(true);
        getFbProfile();
      } else {
        setIsAuthenticated(false);
      }
    });
  };

  useEffect(() => {
    loadFB()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logoutAccount, loginAccount }}>
      {children}
    </AuthContext.Provider>
  );
};
