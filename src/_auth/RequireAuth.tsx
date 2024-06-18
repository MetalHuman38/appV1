import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '@/lib/context/userContext';

const RequireAuth = () => {
  const { isAuthenticated, isLoading } = useUserContext();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a spinner or some other loading component
  }

  if (!isAuthenticated) {
    return (
      <Navigate to="/sign-in" state={{ from: location.pathname }} replace />
    );
  }

  return <Outlet />;
};

export default RequireAuth;
