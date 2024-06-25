import axiosInstance from '../axios/axiosConfig';
import { INewPost, INewUser, IUpdatePost } from '@/types';

// Wrapper function around registerUserMutation that accepts user data and returns a promise
export const registerUserMutation = async (
  userData: INewUser,
): Promise<unknown> => {
  try {
    const response = await axiosInstance.post('/api/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Wrapper function around loginUserMutation that accepts email and password
export const loginUserMutation = async (
  email: string,
  password: string,
): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      '/api/login',
      JSON.stringify({ email, password }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      sessionStorage.setItem('jwt', JSON.stringify(response.data));
      sessionStorage.setItem(
        'refreshToken',
        JSON.stringify(response.data.refreshToken),
      );
      axiosInstance.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.token}`;
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

// Wrapper function around checkAuthUserMutation
export const checkAuthUserMutation = async (): Promise<any> => {
  try {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    }
    const response = await axiosInstance.get('/api/getUser', {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log('Invalid Token or incorrect login credentials!', error);
  }
};

// Wrapper function around logged in user
export const getCurrentUserMutation = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get('/api/getUser', {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
};

// Wrapper function around refreshTokenMutation
export const refreshTokenMutation = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get('/api/refresh-token', {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

// Wrapper function around logOutUserMutation
export const logOutUserMutation = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get('/api/logout');
    if (response.status === 200) {
      sessionStorage.removeItem('jwt');
      sessionStorage.removeItem('refreshToken');
      delete axiosInstance.defaults.headers.common['Authorization'];
      // delete from cookie
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie =
        'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      return response; // Return success message
    } else {
      throw new Error('Logout failed');
    }
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};

// Wrapper function around createPostMutation that accepts post data
export const createPostMutation = async (post: INewPost): Promise<any> => {
  try {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    }
    const response = await axiosInstance.post('/api/createPost', post, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Wrapper function around to upload image and attach user and post id
export const uploadImageMutation = async (formData: FormData): Promise<any> => {
  try {
    const response = await axiosInstance.post('/api/uploadImage', formData, {
      headers: {
        'Custom-Header': 'image',
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Wrapper function around getPreviewImageUrlMutation
export const getPreviewImageUrlMutation = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get('/api/sendImageUrl', {
      headers: {
        'Custom-Header': 'image',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error getting image preview:', error);
    throw error;
  }
};

// Wrapper function around uploadProfilePicMutation
export const uploadProfilePicMutation = async (
  formData: FormData,
): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      '/api/upload-profilePic',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};

// Wrapper function around getAllPostsMutation
export const getAllPostsMutation = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get('/api/getAllPosts');
    const { posts } = response.data;
    if (posts) {
      return posts;
    }
    return response.data;
  } catch (error) {
    console.error('Error getting posts:', error);
    throw error;
  }
};

// Wrapper function around likePostMutation
export const likePostMutation = async (
  post_id: number,
  likes_Count: number,
): Promise<any> => {
  try {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    }
    const response = await axiosInstance.post(
      '/api/likePost',
      {
        post_id,
        likes_Count,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      if (response.data.token) {
        sessionStorage.setItem('jwt', JSON.stringify(response.data.token));
        axiosInstance.defaults.headers.common['Authorization'] =
          `Bearer ${response.data.token}`;
      }
    }
    return response.data;
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};

// Wrapper function around savePostMutation
export const savePostMutation = async (
  post_id: number,
  user_id: number,
): Promise<any> => {
  try {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    }
    const response = await axiosInstance.post(
      '/api/savePost',
      {
        post_id,
        user_id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
      },
    );
    if (response.status === 200) {
      if (response.data.token) {
        sessionStorage.setItem('jwt', JSON.stringify(response.data.token));
        axiosInstance.defaults.headers.common['Authorization'] =
          `Bearer ${response.data.token}`;
      }
    }
    return response.data;
  } catch (error) {
    console.error('Error saving post:', error);
    throw error;
  }
};

// Wrapper function around deletePostMutation
export const deletePostMutation = async (
  post_id: number,
  user_id: number,
): Promise<any> => {
  try {
    const response = await axiosInstance.delete('/api/deletePost', {
      data: {
        post_id,
        user_id,
      },
    });
    if (response.status === 200) {
      if (response.data.token) {
        sessionStorage.setItem('jwt', JSON.stringify(response.data.token));
        axiosInstance.defaults.headers.common['Authorization'] =
          `Bearer ${response.data.token}`;
      }
    }
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// Wrapper function around deleteSavedPostMutation
export const deleteSavedPostMutation = async (
  post_id: number,
  user_id: number,
): Promise<any> => {
  try {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    }
    const response = await axiosInstance.delete('/api/deleteSavedPost', {
      params: { post_id, user_id },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      withCredentials: true,
    });
    if (response.status === 200) {
      if (response.data.token) {
        sessionStorage.setItem('jwt', JSON.stringify(response.data.token));
        axiosInstance.defaults.headers.common['Authorization'] =
          `Bearer ${response.data.token}`;
      }
    }
    return response.data;
  } catch (error) {
    console.error('Error deleting saved post:', error);
    throw error;
  }
};

// Wrapper function around deleteLikePostMutation
export const deleteLikedPostMutation = async (
  post_id: number,
  user_id: number,
): Promise<any> => {
  try {
    const response = await axiosInstance.delete('/api/deleteLikePost', {
      data: { post_id, user_id },
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log('Error deleting like:', error);
    throw error;
  }
};

// Wrapper function around updatePostMutation
export const getPostByIdMutation = async (post_id: string): Promise<any> => {
  try {
    const response = await axiosInstance.get('/api/getPostById', {
      params: { post_id },
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    const { post } = response.data;
    if (post) {
      return post;
    }
    return response.data;
  } catch (error) {
    console.error('Error getting post by ID:', error);
    throw error;
  }
};

export const updatePostMutation = async (
  post_id: number,
  post: IUpdatePost,
): Promise<any> => {
  try {
    const response = await axiosInstance.put('/api/updatePost', post, {
      params: { post_id },
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// Wrapper function around deletePostMutation
export const deletePostByIdMutation = async (post_id: number): Promise<any> => {
  try {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    }

    const response = await axiosInstance.delete('/api/deletePostById', {
      params: { post_id },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      withCredentials: true,
    });
    if (response.status === 200) {
      if (response.data.token) {
        sessionStorage.setItem('jwt', JSON.stringify(response.data.token));
        axiosInstance.defaults.headers.common['Authorization'] =
          `Bearer ${response.data.token}`;
      }
    }
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// Wrapper function around infinite Posts
export const getInfinitePostsMutation = async (
  page: number,
  limit: number,
): Promise<any> => {
  try {
    const response = await axiosInstance.get('/api/getInfinitePosts', {
      params: { page, limit },
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    const { posts, page: currentPage, totalPages } = response.data;
    return {
      posts: posts.rows,
      nextPage: currentPage + 1,
      totalPages,
    };
  } catch (error) {
    console.error('Error getting infinite posts:', error);
    throw error;
  }
};

// Wrapper function around searchPostsMutation
export const searchPostsMutation = async (
  searchValue: string,
): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      '/api/searchPosts',
      {
        searchValue,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};
