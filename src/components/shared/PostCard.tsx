import { useUserContext } from '@/lib/context/userContext';
import { timeAgo } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostStats from './PostStats';
import { IUpdatePost } from '@/types';

type PostCardProps = {
  post: IUpdatePost;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  const [isUserLoading, setIsUserLoading] = useState(true);

  // create Useeffect to fetch post data
  useEffect(() => {
    if (!isUserLoading || !user) return;
    setIsUserLoading(false);
  }, [user]);

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post?.creator_Id}`}>
            <img
              src={user?.avatarUrl || '/assets/icons/profile-placeholder.svg'}
              alt="creator"
              loading="lazy"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>
          <div className="flex flex-col">
            <p className="base-meduim lg:body-bold text-light-1">
              {user?.firstName} {user?.lastName}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {post.created_At && timeAgo(post.created_At.toString())}
              </p>
              -
              <p className="sublte-semibold lg:small-regular">
                {post?.location}
              </p>
            </div>
          </div>
        </div>
        <Link
          to={`/update-post/${post.id}`}
          className={`${user?.id !== post.creator_Id && 'hidden'} `}
        >
          <img
            src="/assets/icons/edit.svg"
            alt="Options"
            loading="lazy"
            width={20}
            height={20}
          />
        </Link>
      </div>
      <Link to={`/posts/${post.id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.split(',').map((tag, index) => (
              <li key={index} className="text-light-3">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={post.imageURL || '/assets/icons/image-placeholder.svg'}
          alt="post-image"
          loading="lazy"
          className="post-card_img"
        />
      </Link>
      <PostStats post={post} id={post?.creator_Id.toString()} />
    </div>
  );
};

export default PostCard;
