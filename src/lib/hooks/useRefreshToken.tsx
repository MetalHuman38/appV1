import axiosInstance from '../axios/axiosConfig';
import useAuth from './useAuth';

const useRefreshToken = async () => {
  const { setAuth } = useAuth();
  try {
    const refresh = async () => {
      const response = await axiosInstance.get('/api/refresh-token', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setAuth(prev => {
        console.log(JSON.stringify(prev));
        console.log(JSON.stringify(response.data.accessToken));
        return {
          ...prev,
          accessToken: response.data.accessToken,
        };
      });
      const newAccessToken = response.data.accessToken;
      sessionStorage.setItem('jwt', JSON.stringify(newAccessToken));
      axiosInstance.defaults.headers.common['Authorization'] =
        `Bearer ${newAccessToken}`;
      return newAccessToken;
    };
    return refresh();
  } catch (error) {
    console.error('Error refreshing access token', error);
    throw Error('Error refreshing access token');
  }
};

export default useRefreshToken;
