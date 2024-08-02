import { LikedPost } from '@/_root/pages';
import { GridPostList, Loader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/lib/context/userContext';
import {
  useGetAllPosts,
  useGetUserByID,
} from '@/lib/react-query/QueriesAndMutatins';
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';

// ** StatBlock Component
interface StatBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StatBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

// ** Profile Component
const Profile = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { user } = useUserContext();
  const {
    data: post,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetAllPosts();

  const { data: currentUser, isLoading: userPending } = useGetUserByID({
    requestedUserId: Number(id),
  });

  if (userPending) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  if (isPostLoading && !post) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  if (isErrorPosts) {
    return (
      <div className="flex-center w-full h-full">
        <p className="body-medium text-light-1">
          Something went wrong while fetching posts. Please try again!
        </p>
      </div>
    );
  }

  const isCurrentUser = user?.id === currentUser?.id;
  console.log('Current User Profile', isCurrentUser);

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser?.user?.profilePic
                ? `/${currentUser?.user?.profilePic}`
                : currentUser?.user?.avatarUrl
                  ? `${currentUser?.user?.avatarUrl}`
                  : '/assets/icons/profile-placeholder.svg'
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser?.user?.firstName} {currentUser?.user?.lastName}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser?.user?.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser?.post?.length || 0} label="Posts" />
              <StatBlock value={20} label="Followers" />
              <StatBlock value={20} label="Following" />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser?.user?.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div
              className={`${user?.id !== currentUser?.user?.id && 'hidden'}`}
            >
              <Link
                to={`/update-profile/${currentUser?.user?.id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  user?.id !== currentUser?.user?.id && 'hidden'
                }`}
              >
                <img
                  src={'/assets/icons/edit.svg'}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user?.id === currentUser.user?.id && 'hidden'}`}>
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>
      {currentUser?.user?.id === user?.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${currentUser?.user?.id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${currentUser?.user?.id}` && '!bg-dark-3'
            }`}
          >
            <img
              src={'/assets/icons/posts.svg'}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${currentUser?.user?.id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${currentUser?.user?.id}/liked-posts` &&
              '!bg-dark-3'
            }`}
          >
            <img
              src={'/assets/icons/like.svg'}
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        </div>
      )}
      <Routes>
        <Route index element={<GridPostList posts={post} showUser={false} />} />
        {currentUser?.user?.id === user?.id && (
          <Route path="/liked-posts" element={<LikedPost />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
