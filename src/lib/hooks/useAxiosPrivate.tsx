import { useEffect } from 'react';
import { instancePrivate } from '../axios/axiosConfig';
import useRefreshToken from './useRefreshToken';
import { useUserContext } from '../context/userContext';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const useAxiosPrivate = () => {
  const { user } = useUserContext();
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = instancePrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          const jwt = JSON.parse(sessionStorage.getItem('jwt') || '{}');
          config.headers['Authorization'] = `Bearer ${jwt}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    const responseInterceptor = instancePrivate.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest.sent
        ) {
          originalRequest.sent = true;
          try {
            const newAccessToken = await refresh;
            originalRequest.headers['Authorization'] =
              `Bearer ${newAccessToken}`;
            return instancePrivate(originalRequest);
          } catch (refreshError) {
            console.error('Error refreshing access token:', refreshError);
            // Handle token refresh error (e.g., redirect to login)
            navigate('/sign-in');
          }
        }
        return Promise.reject(error);
      },
    );
    // Cleanup function to eject interceptors when the component unmounts
    return () => {
      instancePrivate.interceptors.request.eject(requestInterceptor);
      instancePrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [user, auth, refresh, navigate]);

  return instancePrivate;
};

export default useAxiosPrivate;
