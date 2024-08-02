import { IUser } from '@/types';
import { Link } from 'react-router-dom';

type UserStoryProps = {
  user: IUser;
};

// ** This component is used to display a user story in home page
const UserStory = ({ user }: UserStoryProps) => {
  return (
    <Link to={`/profile/${user?.id}`} className="user-story">
      <img
        src={
          user?.profilePic
            ? `/${user?.profilePic}`
            : user?.avatarUrl
              ? `${user?.avatarUrl}`
              : '/assets/icons/profile-placeholder.svg'
        }
        alt="creator"
        className="rounded-full w-16 h-16"
      />
      <div className="flex-center flex-col gap-0.5 left-4 right-4 top-0">
        <p className="subtle-semibold text-center text-light-3 line-clamp-1 items-center">
          {user?.username}
        </p>
      </div>
    </Link>
  );
};

export default UserStory;
