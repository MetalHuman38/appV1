export enum Query_Keys {
  // Auth Mutations
  REGISTER_USER = 'REGISTER_USER',

  // Auth Mutations
  LOGIN_USER = 'LOGIN_USER',
  LOGOUT_USER = 'LOGOUT_USER',

  // Auth Queries
  CHECK_AUTH_USER = '',
  GET_CURRENT_USER = 'GET_CURRENT_USER',
  GET_ALL_USERS = 'GET_ALL_USERS',
  GET_USER_BY_ID = 'GET_USER_BY_ID',
  GET_USER_DATA = 'GET_USER_DATA',
  FETCH_USERS_FOR_HOME_STORY = 'FETCH_USERS_FOR_HOME_STORY',

  // Post Mutations
  CREATE_POST = 'CREATE_POST',
  GET_POST = 'GET_POST',
  GET_ALL_POSTS = 'GET_ALL_POSTS',
  GET_LIKED_POSTS = 'GET_LIKED_POSTS',
  GET_ALL_POSTS_BY_ID = 'GET_ALL_POSTS_BY_ID',
  GET_RECENT_POSTS = 'GET_RECENT_POSTS',
  GET_POST_BY_ID = 'GET_POST_BY_ID',
  GET_USER_POSTS = 'GET_USER_POSTS',
  GET_INFITE_POSTS = 'GET_INFITE_POSTS',
  DELETE_POST = 'DELETE_POST',
  GET_POPULAR_POSTS = 'GET_POPULAR_POSTS',
  GET_SAVED_POSTS = 'GET_SAVED_POSTS',

  // Put post Mutations
  UPDATE_POST = 'UPDATE_POST',

  // Get preview image
  GET_IMAGE_PREVIEW = 'GET_IMAGE_PREVIEW',
  GET_PROFILE_PIC_PREVIEW = 'GET_PROFILE_PIC_PREVIEW',

  // save post
  SAVE_POST = 'SAVE_POST',

  // SEARCH QUERIES
  SEARCH_POSTS = 'SEARCH_POSTS',
}
