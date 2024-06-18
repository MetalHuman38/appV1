import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/lib/context/userContext';
import { useLogOut } from '@/lib/react-query/QueriesAndMutatins';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const { user, isLoading } = useUserContext();
  const { mutate: signOut, isSuccess } = useLogOut();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate('/sign-in'); // Navigate to sign-in page on successful logout
      console.log('User logged out');
    }
  }, [isSuccess, navigate]);

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/mylogo1.png"
            alt="logo"
            loading="lazy"
            width={100}
            height={325}
          />
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          {user && ( // Check if user exists before rendering
            <Link to={`/profile/${user.id}`} className="flex-center gap-3">
              <img
                src={user.avatarUrl || '/assets/icons/profile-placeholder.svg'}
                alt="profile"
                className="h-8 w-8 rounded-full"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopBar;
