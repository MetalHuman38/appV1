// Desc: Home page
import { Loader, PostCard, UserCard } from '@/components/shared';
import {
  useGetAllPosts,
  useGetAllUsers,
} from '@/lib/react-query/QueriesAndMutatins';
import { IUpdatePost, IUser } from '@/types';

const Home = () => {
  const {
    data: post,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetAllPosts();

  const {
    data: userData,
    isLoading,
    isError: isErrorCreators,
  } = useGetAllUsers({ limit: 10 });

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

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
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
          {isLoading ? (
            <Loader />
          ) : (
            <ul className="user-grid">
              {userData?.users.map((creator: IUser) => (
                <li key={creator.id} className="flex-1 min-w-w[200px] w-full">
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
