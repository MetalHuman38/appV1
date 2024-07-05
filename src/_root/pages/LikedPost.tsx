import { GridPostList, Loader } from '@/components/shared';
import { useCurrentUser } from '@/lib/react-query/QueriesAndMutatins';

const LikedPosts = () => {
  const { data: currentUser } = useCurrentUser();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <>
      {currentUser?.user?.liked?.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}
      <GridPostList posts={currentUser?.user?.userLikes} showStats={false} />
    </>
  );
};

export default LikedPosts;
