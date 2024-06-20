import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  checkAuthUserMutation,
  createPostMutation,
  getCurrentUserMutation,
  getPreviewImageUrlMutation,
  loginUserMutation,
  logOutUserMutation,
  refreshTokenMutation,
  registerUserMutation,
  updatePostMutation,
  uploadImageMutation,
} from './ApiWrapper';
import { INewPost, INewUser, IUpdatePost } from '@/types';
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

// Wrapper function around createPostMutation that accepts post data
export const useCreatePost = () => {
  return useMutation({
    mutationFn: (post: INewPost) => createPostMutation(post),
  });
};

export const useUpdatePost = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, post }: { postId: string; post: IUpdatePost }) =>
      updatePostMutation(postId, post),
    onSuccess: data => {
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_POST_BY_ID, data?.id],
      });
    },
  });
};

// Wrapper function around Upload Image Mutation
export const useUploadImage = () => {
  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      uploadImageMutation(formData),
  });
};


// Wrapper function around getPreviewImage Mutation
export const useGetPreviewImage = () => {
  const QueryClient = useQueryClient();
  return useMutation({
      mutationFn: () => getPreviewImageUrlMutation(),
      onSuccess: (data) => {
          QueryClient.invalidateQueries({
              queryKey: [Query_Keys.GET_IMAGE_PREVIEW, data?.imageUrl],
          });
      }
  });
}
