import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  checkAuthUserMutation,
  createPostMutation,
  deleteLikedPostMutation,
  deletePostByIdMutation,
  deletePostMutation,
  getAllPostsMutation,
  getAllUsersMutation,
  getCurrentUserMutation,
  getInfinitePostsMutation,
  getPostByIdMutation,
  getPreviewImageUrlMutation,
  getSavedPostsMutation,
  getUserByIDMutation,
  getUserPostsMutation,
  likePostMutation,
  loginUserMutation,
  logOutUserMutation,
  refreshTokenMutation,
  registerUserMutation,
  savePostMutation,
  searchPostsMutation,
  updatePostMutation,
  updateUserMutation,
  uploadImageMutation,
  uploadProfilePicMutation,
} from './ApiWrapper';
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from '@/types';
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

// Wrapper function around checkAuthUserMutation
export const useCheckAuthUser = () => {
  return useMutation({
    mutationFn: () => checkAuthUserMutation(),
  });
};

// Wrapper function around logged in user
export const useCurrentUser = () => {
  return useQuery({
    queryKey: [Query_Keys.GET_CURRENT_USER],
    queryFn: () => getCurrentUserMutation(),
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
    mutationFn: ({ post_id, post }: { post_id: number; post: IUpdatePost }) =>
      updatePostMutation(post_id, post),
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
    onSuccess: data => {
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_IMAGE_PREVIEW, data?.imageUrl],
      });
    },
  });
};

// Wrapper function around upload profile picture Mutation
export const useUploadProfilePic = () => {
  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      uploadProfilePicMutation(formData),
  });
};

// Wrapper function around getAllPostsMutation
export const useGetAllPosts = () => {
  return useQuery({
    queryKey: [Query_Keys.GET_ALL_POSTS],
    queryFn: getAllPostsMutation,
  });
};

// Wrapper function around getSavedPostsMutation
export const useGetSavedPosts = ({ user_id }: { user_id: number }) => {
  return useQuery({
    queryKey: [Query_Keys.GET_SAVED_POSTS],
    queryFn: () => getSavedPostsMutation(user_id),
  });
};

// Wrapper function around likePostMutation
export const useLikePost = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      post_id,
      likes_Count,
    }: {
      post_id: number;
      likes_Count: number;
    }) => likePostMutation(post_id, likes_Count),
    onSuccess: data => {
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_POST_BY_ID, data?.$id],
      });
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_POSTS],
      });
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_POST],
      });
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_CURRENT_USER],
      });
    },
  });
};

// Wrapper function around savePostMutation
export const useSavePost = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ post_id, user_id }: { post_id: number; user_id: number }) =>
      savePostMutation(post_id, user_id),
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_POSTS],
      });

      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.SAVE_POST],
      });
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_POST],
      });
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_CURRENT_USER],
      });
    },
  });
};

// Wrapper function around deleteSavedPostMutation
export const useDeleteSavedPost = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ post_id, user_id }: { post_id: number; user_id: number }) =>
      deleteLikedPostMutation(post_id, user_id),
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_POSTS],
      });
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_POST],
      });
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_CURRENT_USER],
      });
    },
  });
};

// Wrapper function around deletePostMutation
export const useDeletePost = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ post_id, user_id }: { post_id: number; user_id: number }) =>
      deletePostMutation(post_id, user_id),
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_POSTS],
      });
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_RECENT_POSTS],
      });
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_CURRENT_USER],
      });
    },
  });
};

// Wrapper function around deleteLikedPostMutation
export const useDeleteLikePost = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ post_id, user_id }: { post_id: number; user_id: number }) =>
      deleteLikedPostMutation(post_id, user_id),
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_POSTS],
      });
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_POST],
      });
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_CURRENT_USER],
      });
    },
  });
};

// Wrapper function around getPostByIdMutation
export const useGetPostById = ({
  post_id,
  user_id,
}: {
  post_id: string;
  user_id: string;
}) => {
  return useQuery({
    queryKey: [Query_Keys.GET_POST_BY_ID, post_id],
    queryFn: () => getPostByIdMutation(post_id, user_id),
    enabled: !!post_id,
  });
};

// Wrapper function around deletePostMutation
export const useDeletePostById = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ post_id }: { post_id: number }) =>
      deletePostByIdMutation(post_id),
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_POSTS],
      });
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_ALL_POSTS_BY_ID],
      });
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_CURRENT_USER],
      });
    },
  });
};

export const useInfinitePosts = ({ pageParam }: { pageParam: number }) => {
  const lastId = useQueryClient().getQueryData([
    Query_Keys.GET_INFITE_POSTS,
    pageParam - 1,
  ]);
  // use lastId to get the last post id
  if (lastId) {
    console.log(lastId);
  }
  return useInfiniteQuery({
    queryKey: [Query_Keys.GET_INFITE_POSTS, pageParam],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getInfinitePostsMutation(pageParam, 10),
    getNextPageParam: (lastPage: any) => {
      const { nextPage, totalPages } = lastPage;
      if (nextPage <= totalPages) {
        return nextPage <= totalPages ? nextPage : undefined;
      } else {
        return undefined;
      }
    },
    initialPageParam: 1,
  });
};

// Wrapper function around searchPostsMutation
export const useSearchPosts = (searchTerm: string) => {
  return useQuery({
    queryKey: [Query_Keys.SEARCH_POSTS, searchTerm],
    queryFn: () => searchPostsMutation(searchTerm),
    enabled: !!searchTerm,
  });
};

// Wrapper function around getUserPostsMutation
export const useGetUserPosts = (user_id: number) => {
  return useQuery({
    queryKey: [Query_Keys.GET_USER_POSTS, user_id],
    queryFn: () => getUserPostsMutation(user_id),
    enabled: !!user_id,
  });
};

// Wrapper function around getAllPopularPostsMutation
export const useGetPopularPosts = () => {
  return useQuery({
    queryKey: [Query_Keys.GET_POPULAR_POSTS],
    queryFn: () => getAllPostsMutation(),
  });
};

// Wrapper function around getAllUsers Mutation
export const useGetAllUsers = ({ limit }: { limit: number }) => {
  return useQuery({
    queryKey: [Query_Keys.GET_ALL_USERS],
    queryFn: () => getAllUsersMutation(limit),
    enabled: !!limit,
  });
};

// Wrapper function around getUserByIDMutation
export const useGetUserByID = ({ user_id }: { user_id: string }) => {
  return useQuery({
    queryKey: [Query_Keys.GET_USER_BY_ID, user_id],
    queryFn: () => getUserByIDMutation(user_id),
    enabled: !!user_id,
  });
};

// Wrapper function around updateUserMutation
export const useUpdateUser = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ user_id, user }: { user_id: number; user: IUpdateUser }) =>
      updateUserMutation(user_id, user),
    onSuccess: data => {
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_USER_BY_ID, data?.id],
      });
      QueryClient.invalidateQueries({
        queryKey: [Query_Keys.GET_CURRENT_USER],
      });
    },
  });
};
