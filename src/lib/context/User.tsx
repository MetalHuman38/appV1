import { useEffect } from 'react';
import { useUserContext } from '@/lib/context/userContext';
import axiosInstance from '../axios/axiosConfig';
import useRefreshToken from '../hooks/useRefreshToken';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentUser } from '../react-query/QueriesAndMutatins';

export const useUserData = () => {
  const { user, setUser, isLoading, isAuthenticated, setIsLoading } =
    useUserContext();
  const { data, refetch } = useGetCurrentUser();

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/api/getUser', {
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
          withCredentials: true,
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
            const response = await axiosInstance.get('/api/getUser', {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
              signal: controller.signal,
            });
            if (response.status === 200 && response.data.token) {
              console.log('Response from server', response.data);
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

    if (!isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, setUser, navigate, setIsLoading]);

  return { user, isLoading, isAuthenticated };
};
