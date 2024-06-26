import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { IUser } from '@/types';

type UserCardProps = {
  user: IUser;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/profile/${user.id}`} className="user-card">
      <img
        src={user?.avatarUrl || '/assets/icons/profile-placeholder.svg'}
        alt="creator"
        className="rounded-full w-16 h-16"
      />
      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.firstName} {user.lastName}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>
      <Button type="button" size="sm" className="shad-button_primary px-5">
        follow
      </Button>
    </Link>
  );
};

export default UserCard;
