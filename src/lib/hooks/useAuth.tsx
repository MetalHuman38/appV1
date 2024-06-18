import { useUserContext } from '../context/userContext';

export const useAuth = () => {
  return useUserContext();
};

export default useAuth;
