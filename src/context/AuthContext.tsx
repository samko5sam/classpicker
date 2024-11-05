import React, { createContext, useState, useEffect, useContext } from 'react';
import { FacebookLoginClient, LoginResponse, ProfileSuccessResponse } from '@greatsumini/react-facebook-login';
import { fbAppId } from '@/constants/openKey';

interface AuthContextType {
  isAuthenticated: boolean;
  user: ProfileSuccessResponse | null;
  logoutAccount?: () => void;
  loginAccount?: () => void;
}

const placeholderUser = {
  email: 'user@example.com',
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<ProfileSuccessResponse | null>(placeholderUser);

  const getFbProfile = () => {
    FacebookLoginClient.getProfile((res: ProfileSuccessResponse) => {
      setUser(res);
    }, {
      fields: "email, picture, name"
    })
  }

  const logoutAccount = () => {
    FacebookLoginClient.logout((res:LoginResponse) => {
      if (res.status === "unknown"){
        setIsAuthenticated(false);
        setUser(placeholderUser)
      }
    });
  }

  const loginAccount = () => {
    FacebookLoginClient.login(() => {
      setIsAuthenticated(true);
      getFbProfile();
    }, {
      scope: 'public_profile, email',
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
