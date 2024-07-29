import { GridPostList, Loader } from '@/components/shared';
import { useUserContext } from '@/lib/context/userContext';
import {
  useCurrentUser,
  useGetAllPosts,
  useGetLikedPosts,
} from '@/lib/react-query/QueriesAndMutatins';
import { useParams } from 'react-router-dom';

const LikedPosts = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { data: post } = useGetAllPosts();
  const { data: currentUser } = useCurrentUser({
    user_id: Number(user?.id) || Number(id),
  });
  const {
    data: likedPosts,
    isLoading,
    isError,
  } = useGetLikedPosts({
    user_id: Number(user?.id) || Number(id),
  });

  console.log('Current User post', post);
  console.log('Current User likedPosts', likedPosts);
  if (isLoading) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }
  if (isError) {
    return <p className="text-light-4">Error! Failed to fetch liked posts</p>;
  }

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <>
      {likedPosts?.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}
      <GridPostList posts={likedPosts?.user?.Posts} showStats={false} />
    </>
  );
};

export default LikedPosts;
