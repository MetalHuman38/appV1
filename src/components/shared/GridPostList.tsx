// Note: GridPostList component
import { useUserContext } from '@/lib/context/userContext';
import { IUpdatePost } from '@/types';
import { Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import PostStats from './PostStats';

// GridPostListProps interface
type GridPostListProps = {
  posts: IUpdatePost[];
  showUser?: boolean;
  showStats?: boolean;
};

// GridPostList component
const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  if (posts.length === 0) {
    return <p>No search results found</p>;
  }
  const { user, isLoading } = useUserContext();
  if (!user) {
    return <Loader />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (posts?.length === 0) {
    return <Loader />;
  }

  return (
    <ul className="grid-container">
      {posts.map(post => (
        <li key={post?.id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.id}`} className="grid-post_link">
            <img
              src={post?.imageURL}
              alt="post image"
              className="w-full h-full object-cover"
            />
          </Link>
          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-3 flex-1">
                <img
                  src={post.imageURL}
                  alt="creator profile pic"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{user?.username}</p>
              </div>
            )}
            {showStats && <PostStats post={post} id={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
