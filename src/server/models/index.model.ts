import ImageStorages from './image.model';
import Likes from './likePost.model';
import Posts from './post.model';
import ProfilePictures from './profilePic.model';
import Saves from './savePost.model';
import Users from './user.model';
import UserRegistration from './userRegister.model';

// **
export {
  ImageStorages,
  Likes,
  Posts,
  ProfilePictures,
  Saves,
  UserRegistration,
  Users,
};

const models = {
  Users,
  Posts,
  Likes,
  Saves,
  ProfilePictures,
  ImageStorages,
  UserRegistration,
};

export default models;
