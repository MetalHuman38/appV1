export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  id: string;
  file: File[];
  newUser: string;
  bio: string;
  imageURL: string;
  profilePic: string;
};

export type INewPost = {
  id: string | number;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  id: number;
  caption: string;
  imageURL: string;
  location?: string;
  tags: string;
  likes_Count: number;
  creator_Id: string;
  created_At: Date;
  updatedAt: Date;
  User: IUser;
};

export type IUser = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  status: string;
  bio: string;
  join: Date;
  avatarUrl: string;
  imageURL: string;
  profilePic: string;
  label: string;
  last_activity: Date;
  updated_at: Date;
  UserRegistrationID: number;
};

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type ISavedPost = {
  id: number;
  post_id: number;
  user_id: number;
  savedAt: Date;
};
