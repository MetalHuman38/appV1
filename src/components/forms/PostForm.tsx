import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
// import FileUpLoader from '@/components/shared/FileUpLoader';
import ImageUpload from '../shared/imageUpload';
import { PostValidation } from '@/lib/validation';
import { useToast } from '../ui/use-toast';
import { useState } from 'react';
import {
  useCreatePost,
  useUpdatePost,
} from '@/lib/react-query/QueriesAndMutatins';
import { useUserContext } from '@/lib/context/userContext';
import { IUpdatePost } from '@/types';

type PostFormProps = {
  post?: IUpdatePost;
  action: 'create' | 'update';
};

const PostForm = ({ post, action }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();
  const [isPostLoading, setisPostLoading] = useState(false);
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [fileUrl, setFileUrl] = useState(post?.imageURL || null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption || '' : '',
      file: [],
      location: post?.location || '',
      tags: Array.isArray(post?.tags) ? post?.tags.join(',') : '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    try {
      if (post && action === 'update') {
        setisPostLoading(true);
        const updatedPost = await updatePost({
          postId: post.id,
          post: {
            id: post.id,
            caption: values.caption,
            imageURL: post?.imageURL || '',
            location: values.location,
            tags: Array.isArray(values.tags)
              ? values.tags.join(',')
              : values.tags,
            likes_Count: post.likes_Count,
            creator_Id: post.creator_Id,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
          },
        });

        console.log(updatedPost);
        toast({
          title: 'Post updated successfully',
        });
        if (!updatedPost) {
          toast({
            title: 'Failed to update post',
          });
        }
        return navigate(`/posts/${post.id}`);
      }

      setisPostLoading(true);
      setFileUrl(post?.imageURL || null);

      const newPost = await createPost({
        id: user?.id ?? 0,
        caption: values.caption,
        file: fileUrl ? [new File([fileUrl], 'filename')] : [],
        location: values.location,
        tags: Array.isArray(values.tags) ? values.tags.join(',') : values.tags,
      });
      console.log(newPost);
      toast({
        title: 'Post created successfully',
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: 'Failed to create post',
      });
    } finally {
      setisPostLoading(false);
    }
  }

  if (isLoadingCreate) {
    return <p>Creating post...</p>;
  }

  if (isPostLoading) {
    return <p>Creating post...</p>;
  }

  if (isLoadingUpdate) {
    return <p>Updating post...</p>;
  }

  console.log('imageUrl', post?.imageURL);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="fileInput" className="shad-form_label">
                {' '}
                Add Photo
              </FormLabel>
              <FormControl>
                <ImageUpload
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageURL || ''}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex shad-form_label">
                Add Location
              </FormLabel>
              <FormControl>
                <input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex shad-form_label">
                Add Tags (separated by comma " , "){' '}
              </FormLabel>
              <FormControl>
                <input
                  type="text"
                  className="shad-input"
                  placeholder="e.g. #travel, #nature, #photography"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4">
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {isLoadingCreate || (isLoadingUpdate && 'Loading...')}
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
