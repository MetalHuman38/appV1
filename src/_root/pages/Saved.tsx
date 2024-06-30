import { useGetSavedPosts } from '@/lib/react-query/QueriesAndMutatins';
import { GridPostList, Loader } from '@/components/shared';
import { IUpdatePost } from '@/types';
import { useUserContext } from '@/lib/context/userContext';

const Saved = () => {
  const { user } = useUserContext();

  const {
    data: savedPosts,
    isLoading: isLoadingPosts,
    isError,
  } = useGetSavedPosts({
    user_id: user?.UserRegistrationID as number,
  });

  if (isError) {
    return <p>Error! failed to fetch saved posts</p>;
  }

  if (isLoadingPosts) {
    return <Loader />;
  }

  // Ensure savedPostsData.savedPosts is an array and map to extract Post objects
  const posts: IUpdatePost[] = Array.isArray(savedPosts.savedPosts)
    ? savedPosts.savedPosts.map((save: any) => save.Post)
    : [];

  console.log('posts:', posts);

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="save"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>
      {!user ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {posts?.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList posts={posts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
