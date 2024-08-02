// Desc: Home page
import { Loader, PostCard, UserCard } from '@/components/shared';
import UserStory from '@/components/shared/UserStory';
import { useUserContext } from '@/lib/context/userContext';
import {
  useFetchUsersForHomeStory,
  useGetAllPosts,
  useGetAllUsers,
} from '@/lib/react-query/QueriesAndMutatins';
import { IUpdatePost } from '@/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// ** Home Component
const Home = () => {
  const { user } = useUserContext();
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useFetchUsersForHomeStory({
    limit,
    offset,
  });

  const handleLoadMore = () => {
    setOffset(offset + limit);
  };

  const {
    data: post,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetAllPosts();

  const {
    data: topCreators,
    isLoading,
    isError: isErrorCreators,
  } = useGetAllUsers({
    limit: 10,
  });

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">
            Something went wrong while fetching posts or creators. Please try
            again!
          </p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">
            Something went wrong while fetching creators. Please try again!
          </p>
        </div>
      </div>
    );
  }

  if (isLoadingUsers) {
    return <Loader />;
  }
  if (errorUsers) {
    return (
      <p className="body-medium text-light-1">
        Something went wrong while fetching users. Please try again!
      </p>
    );
  }

  if (!users) {
    return <p className="body-medium text-light-1">No users found!</p>;
  }

  const creators = topCreators?.user ? Object.values(topCreators.user) : [];
  const allUsers = users?.user ? Object.values(users.user) : [];

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <div className="story-card">
            <div className="inner-story-card">
              <div className="story-items">
                <ul className="story-items relative">
                  {user && (
                    <li key={user?.id} className="user-profile relative">
                      <Link to={`/profile/${user?.id}`} className="user-story">
                        <img
                          src={
                            user?.profilePic
                              ? `/${user?.profilePic}`
                              : user?.avatarUrl
                                ? `${user?.avatarUrl}`
                                : '/assets/icons/profile-placeholder.svg'
                          }
                          alt="creator"
                          className="flex-none order-none flex-grow-0 rounded-full w-16 h-16"
                        />
                        <div className="my-story-text">
                          <p className="subtle-semibold line-clamp-1 items-center text-center">
                            My Story
                          </p>
                        </div>
                        <div className="story-icon">
                          <div className="story-cross-icon">
                            <img
                              src="/assets/icons/cross.svg"
                              alt="add story"
                              width={8}
                              height={8}
                              className="flex-none order-2 flex-grow-0 cursor-pointer"
                            />
                          </div>
                          <div className="story-cover-icon">
                            <img
                              src="/assets/icons/cross-cover.svg"
                              alt="add story"
                              width={18}
                              height={18}
                              className="cursor-pointer"
                            />
                          </div>
                        </div>
                      </Link>
                    </li>
                  )}
                  {isLoadingUsers && !allUsers ? (
                    <Loader />
                  ) : (
                    allUsers?.map((alluser: any) => (
                      <li key={alluser.id} className="user-profile">
                        <UserStory user={alluser} />
                      </li>
                    ))
                  )}
                </ul>
                <div className="story-button">
                  <div className="arrow-button" onClick={handleLoadMore}>
                    <img
                      src="/assets/icons/arrow.svg"
                      alt="filter"
                      width={26}
                      height={26}
                      className="flex-none order-none flex-grow-0 arrow-icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-96 mb-4">
            <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
            <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
              <p className="small-medium md:base-medium text-light-2">All</p>
              <img
                src="/assets/icons/filter.svg"
                alt="filter"
                width={20}
                height={20}
              />
            </div>
          </div>
          {isPostLoading && !post ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {post.map((post: IUpdatePost) => (
                <li key={post.id} className="flex justify-center w-full">
                  <PostCard post={post} key={post.id} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>
        <div className="home-creators">
          <h2 className="h3-bold md:h2-bold text-light-1">Top Creators</h2>
          {isLoading && !creators ? (
            <Loader />
          ) : (
            <ul className="user-grid">
              {creators?.map((creator: any) => (
                <li key={creator?.id} className="flex-1 min-w-w[200px] w-full">
                  <UserCard user={creator} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
