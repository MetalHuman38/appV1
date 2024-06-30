import PostForm from '@/components/forms/PostForm';
import { Loader } from '@/components/shared';
import { useGetPostById } from '@/lib/react-query/QueriesAndMutatins';

import { useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();

  const { data: post, isPending } = useGetPostById(id || '');

  if (isPending) return <Loader />;

  if (!post) return <div>Post not found</div>;

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="Edit-Post"
            loading="lazy"
          />
          <h2 className="h3-bold md:h-2-bold text-left w-full">Edit Post</h2>
        </div>
        <PostForm action="update" post={post} />
      </div>
    </div>
  );
};

export default EditPost;
