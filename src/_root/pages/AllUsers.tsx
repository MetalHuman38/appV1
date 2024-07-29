import { Loader, UserCard } from '@/components/shared';
import { useToast } from '@/components/ui/use-toast';
import {
  useGetAllPosts,
  useGetAllUsers,
} from '@/lib/react-query/QueriesAndMutatins';

const AllUsers = () => {
  const { toast } = useToast();
  const { data: post } = useGetAllPosts();
  const {
    data: creatorData,
    isLoading,
    isError: isErrorCreators,
  } = useGetAllUsers({
    limit: 10,
  });

  console.log('post.creator_id:', post?.creator_Id);

  if (isErrorCreators) {
    toast({ title: 'Error! failed to fetch creators!' });
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const creators = creatorData?.user ? Object.values(creatorData.user) : [];

  console.log('userData:', creators);

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {creators?.length === 0 ? (
          <p>No creators found.</p>
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
  );
};

export default AllUsers;
