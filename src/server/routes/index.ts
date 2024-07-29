import adminRoutes from './adminRoutes';
import authRoutes from './authRoutes';
import currentUserRoutes from './currentUserRoutes';
import imageRoutes from './imageRoutes';
import postRoutes from './postRoutes';
import userDataRoutes from './userDataRoutes';
import userRoutes from './userRoutes';

export {
  adminRoutes,
  authRoutes,
  currentUserRoutes,
  imageRoutes,
  postRoutes,
  userDataRoutes,
  userRoutes,
};

const Routes = {
  authRoutes,
  userRoutes,
  currentUserRoutes,
  imageRoutes,
  postRoutes,
  userDataRoutes,
  adminRoutes,
};

export default Routes;
