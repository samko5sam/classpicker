/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useEffect, useContext } from 'react';
import { FacebookLoginClient, LoginResponse, ProfileSuccessResponse } from '@greatsumini/react-facebook-login';
import { fbAppId } from '@/constants/openKey';
import { useToast } from '@/hooks/use-toast';
import { Course } from '@/components/ClassList';
import { Semester } from '@/constants/Metadata';

interface GlobalContextType {
  isAuthenticated: boolean;
  user: ProfileSuccessResponse | null;
  classData: any[];
  setClassData: (data: any[]) => void;
  showedData: any[];
  setShowedData: (data: any[]) => void;
  selectedClasses: Course[];
  setSelectedClasses: (classes: Course[]) => void;
  logoutAccount?: () => void;
  loginAccount?: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
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
  name: "..."
}

const GlobalContext = createContext<GlobalContextType>({
  isAuthenticated: false,
  user: null,
  classData: [],
  setClassData: () => {},
  showedData: [],
  setShowedData: () => {},
  selectedClasses: [],
  setSelectedClasses: () => {},
  loading: false,
  setLoading: () => {}
});

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<ProfileSuccessResponse | null>(placeholderUser);
  const [classData, setClassData] = useState([]);
  const [showedData, setShowedData] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

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
    const getData = async () => {
      const res = await fetch(`./data/${Semester}-class-all.json`);
      const data = await res.json();
      setClassData(data);
      setShowedData(data);
      setLoading(false);
      return data
    }

    getData();
    // Load selected classes from localStorage
    const storedSelectedClasses = localStorage.getItem('selectedCourses');
    if (storedSelectedClasses) {
      setSelectedClasses(JSON.parse(storedSelectedClasses));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rest of the GlobalProvider component...

  const value = {
    isAuthenticated,
    user,
    classData,
    setClassData,
    showedData,
    setShowedData,
    selectedClasses,
    setSelectedClasses,
    logoutAccount,
    loginAccount,
    loading,
    setLoading
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
