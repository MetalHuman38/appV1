import { GridPostList, Loader } from '@/components/shared';
import { useCurrentUser } from '@/lib/react-query/QueriesAndMutatins';
import { useParams } from 'react-router-dom';

const LikedPosts = () => {
  const { id } = useParams();
  const { data: currentUser } = useCurrentUser({
    user_id: Number(id),
    post_id: Number(id),
    creator_id: Number(id),
  });

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
