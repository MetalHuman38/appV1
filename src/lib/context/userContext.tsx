import { useCheckAuthUser } from '@/lib/react-query/QueriesAndMutatins';
import { IUser } from '@/types';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

export type userContexType = {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  auth: {};
  setAuth: Dispatch<SetStateAction<{}>>;
  checkAuthUser: () => Promise<boolean>;
};

const UserContext = createContext<userContexType>({
  user: null,
  setUser: () => null,
  isLoading: false,
  setIsLoading: () => false,
  isAuthenticated: false,
  setIsAuthenticated: () => false,
  auth: {},
  setAuth: () => {},
  checkAuthUser: () => Promise.resolve(false),
});

export const useUserContext = () => useContext(UserContext);

type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const checkAuthUserMutation = useCheckAuthUser();
  const navigate = useNavigate();

  const checkAuthUser = async () => {
    try {
      const response = await checkAuthUserMutation.mutateAsync();
      const currentUser = response.user;
      if (currentUser) {
        setIsAuthenticated(true);
        setUser(currentUser);
        return true;
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isLoggedIn = await checkAuthUser();
        if (!isLoggedIn) {
          console.log('If user not authenticated, return:', ` ${isLoggedIn}`);
          navigate('/sign-in');
        } else {
          console.log('if user is authenticated, return:', ` ${isLoggedIn}`);
        }
      } catch (error: any) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        isAuthenticated,
        setIsAuthenticated,
        auth: {},
        setAuth: () => {},
        checkAuthUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
