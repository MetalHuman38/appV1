import { LikedPost } from '@/_root/pages';
import { GridPostList, Loader } from '@/components/shared';
import { Button } from '@/components/ui/button';
import {
  useCurrentUser,
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

const Profile = () => {
  const { id } = useParams();
  const { data: currentUser } = useCurrentUser({
    user_id: Number(id),
    post_id: Number(id),
    creator_id: Number(id),
  });
  const { pathname } = useLocation();
  const { data: user_profile, isPending: userPending } = useGetUserByID({
    user_id: String(id),
    post_id: String(id),
  });

  if (!currentUser) {
    return <Loader />;
  }

  if (userPending) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  if (!user_profile) {
    return (
      <div className="flex-center w-full h-full">
        <p>User not found</p>
      </div>
    );
  }

  // Assign the user profile to a variable
  const userProfile = user_profile;
  console.log('userProfile', userProfile);

  const isCurrentUser = userProfile?.user?.id === currentUser?.user?.id;
  console.log('userImage', userProfile?.user?.profilePic);

  console.log('isCurrentUser', isCurrentUser);

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              userProfile?.user?.profilePic
                ? `/${userProfile.user.profilePic}`
                : userProfile?.user?.avatarUrl
                  ? userProfile?.user?.avatarUrl
                  : '/assets/icons/profile-placeholder.svg'
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {userProfile?.user?.firstName} {userProfile?.user?.lastName}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{userProfile?.user?.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock
                value={userProfile?.user?.post?.length || 0}
                label="Posts"
              />
              <StatBlock value={20} label="Followers" />
              <StatBlock value={20} label="Following" />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {userProfile?.user?.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div
              className={`${currentUser?.user?.id !== userProfile?.user?.id && 'hidden'}`}
            >
              <Link
                to={`/update-profile/${userProfile?.user?.id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  currentUser?.user?.id === userProfile?.user?.id && 'hidden'
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
            <div
              className={`${currentUser?.user?.id === userProfile?.user?.id && 'hidden'}`}
            >
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>
      {userProfile?.user?.id === currentUser?.user?.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${userProfile?.user?.id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && '!bg-dark-3'
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
            to={`/profile/${userProfile?.user?.id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${userProfile?.user?.id}/liked-posts` &&
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
        <Route
          index
          element={
            <GridPostList posts={userProfile?.user?.post} showUser={false} />
          }
        />
        {userProfile?.user?.id === currentUser?.user?.id && (
          <Route path="/liked-posts" element={<LikedPost />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
