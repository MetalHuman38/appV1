import { Outlet, useNavigate } from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticated = false;
  const Navigate = useNavigate();

  return (
    <>
      {isAuthenticated ? (
        Navigate('/', { replace: true })
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          <img
            src="/assets/images/social.jpg"
            alt="Home-Image"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
