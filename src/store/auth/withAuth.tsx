import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentUser } from './authSlice';

const WithAuth = (Component: any) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const user = useSelector(selectCurrentUser);

    useEffect(() => {
      if (!user) {
        router.push('/login');
      }
    }, []);

    if (!user) {
      return (
        <div className="flex h-screen w-screen items-center justify-center bg-indigo-400">
          <h1 className="font-bold text-white">Redirecting...</h1>
        </div>
      );
    }
    return <Component {...Component.props} />;
  };

  return AuthenticatedComponent;
};

export default WithAuth;
