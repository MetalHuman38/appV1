import { useEffect, useState } from 'react';
import { useUserContext } from '@/lib/context/userContext';
import axiosInstance from '../axios/axiosConfig';
import useRefreshToken from '../hooks/useRefreshToken';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../react-query/QueriesAndMutatins';
import { IUser } from '@/types';

export const User = () => {
  const { user, setIsLoading, isAuthenticated } = useUserContext();
  const [users, setUser] = useState<IUser[] | null>(null);
  const { data, isLoading, refetch } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setUser(data);
      console.log('User data:', users);
    }
  }, [data]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchUserData = async () => {
      try {
        const jwt = sessionStorage.getItem('jwt');
        if (jwt) {
          axiosInstance.defaults.headers.common['Authorization'] =
            `Bearer ${jwt}`;
        }
        const response = await axiosInstance.get('/api/getCurrentUser', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
          signal: controller.signal,
        });
        if (isMounted) {
          await refetch();
          setUser(response.data);
        }
      } catch (error: Error | any) {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized', error.response.data.message);
          try {
            const newAccessToken = await useRefreshToken();
            const response = await axiosInstance.get('/api/getCurrentUser', {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
              signal: controller.signal,
            });
            if (response.status === 200 && response.data.token) {
              sessionStorage.setItem('jwt', JSON.stringify(newAccessToken));
              axiosInstance.defaults.headers.common['Authorization'] =
                `Bearer ${newAccessToken}`;
              fetchUserData();
              setUser(response.data);
            }
          } catch (refreshError) {
            console.error('Error refreshing access token', refreshError);
            navigate('/sign-in', { state: { from: location }, replace: true });
          }
        } else {
          console.error('Error fetching user data:', error);
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
      return () => {
        isMounted = false;
        controller.abort();
      };
    };
  }, [isAuthenticated, setUser, navigate, setIsLoading]);

  return { user, isLoading, isAuthenticated };
};
