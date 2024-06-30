import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '@/lib/context/userContext';
import { Loader } from '@/components/shared';

const RequireAuth = () => {
  const { isAuthenticated, isLoading } = useUserContext();
  const location = useLocation();

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate to="/sign-in" state={{ from: location.pathname }} replace />
    );
  }

  return <Outlet />;
};

export default RequireAuth;
