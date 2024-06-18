export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
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
