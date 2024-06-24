// Desc: Home page
import Loader from '@/components/shared/Loader';
import PostCard from '@/components/shared/PostCard';
import { useGetAllPosts } from '@/lib/react-query/QueriesAndMutatins';
import { IUpdatePost } from '@/types';

const Home = () => {
  const { data: post, isPending: isPostLoading } = useGetAllPosts();

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
                <PostCard post={post} key={post.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
