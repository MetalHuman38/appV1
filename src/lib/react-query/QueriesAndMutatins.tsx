import { useMutation, useQuery } from '@tanstack/react-query';
import {
  checkAuthUserMutation,
  getCurrentUserMutation,
  loginUserMutation,
  logOutUserMutation,
  refreshTokenMutation,
  registerUserMutation,
} from './ApiWrapper';
import { INewUser } from '@/types';
import { Query_Keys } from './QueryKeys';
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

// Wrapper function around registerUserMutation that accepts user data and returns a promise
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (user: INewUser) => registerUserMutation(user),
  });
};

// Wrapper function around loginUserMutation that accepts email and password
export const useLoginUser = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      loginUserMutation(user.email, user.password),
  });
};

// Remember to implement logoutUserMutation

// Wrapper function around checkAuthUserMutation
export const useCheckAuthUser = () => {
  return useMutation({
    mutationFn: () => checkAuthUserMutation(),
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [Query_Keys.GET_CURRENT_USER],
    queryFn: getCurrentUserMutation,
  });
};

// Wrapper function around refreshTokenMutation
export const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshTokenMutation,
  });
};

export const useLogOut = () => {
  const { setUser, setIsAuthenticated } = useUserContext();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logOutUserMutation,
    onSuccess: () => {
      // delete token in cookie
      document.cookie =
        'jwt' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie =
        'refreshToken' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      setUser(null);
      setIsAuthenticated(false);
      navigate('/sign-in');
    },
    onError: error => {
      console.error('Logout failed:', error);
    },
  });
};
