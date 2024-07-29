import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as z from 'zod';

import { Loader } from '@/components/shared';
import { Button, Input, Textarea } from '@/components/ui';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

import ProfilePicUploader from '@/components/shared/ProfilePicUploader';
import { useUserContext } from '@/lib/context/userContext';
import {
  useGetUserByID,
  useUpdateUser,
} from '@/lib/react-query/QueriesAndMutatins';
import { ProfileValidation } from '@/lib/validation';

const UpdateProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useUserContext();

  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: `${user?.firstName} ${user?.lastName}`,
      username: user?.username,
      email: user?.email,
      bio: user?.bio || '',
    },
  });

  // Queries
  const { data: currentUser } = useGetUserByID({
    requestedUserId: Number(id),
  });
  const { mutateAsync: updateUser, isPending: isPendingUpdate } =
    useUpdateUser();

  if (isPendingUpdate) return <Loader />;

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  console.log('user', user);
  console.log('currentUser.imageURL', currentUser?.profilePic);

  // Handler
  const handleUpdate = async (value: z.infer<typeof ProfileValidation>) => {
    const updatedUser = await updateUser({
      user_id: currentUser?.user?.id,
      user: {
        id: currentUser?.user?.id,
        file: value.file,
        newUser: value.name,
        bio: value.bio,
        profilePic: currentUser?.user?.profilePic,
        imageURL: currentUser?.user?.imageURL,
      },
    });

    if (!updatedUser) {
      toast({
        title: `Update user failed. Please try again.`,
      });
    }

    setUser({
      ...currentUser,
      name: updatedUser?.name,
      bio: updatedUser?.bio,
      profilePic: updatedUser?.currentUser?.profilePic,
    });
    return navigate(`/profile/${user?.id}`);
  };

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img
            src="/assets/icons/edit.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="flex flex-col gap-7 w-full mt-4 max-w-5xl"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <ProfilePicUploader
                      fieldChange={field.onChange}
                      mediaUrl={currentUser?.userData?.profilePic}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Bio</FormLabel>
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

            <div className="flex gap-4 items-center justify-end">
              <Button
                type="button"
                className="shad-button_dark_4"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="shad-button_primary whitespace-nowrap"
                disabled={isPendingUpdate}
              >
                {isPendingUpdate && <Loader />}
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
