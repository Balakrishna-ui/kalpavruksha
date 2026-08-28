import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const Loading = () => <div className="h-screen w-full flex items-center justify-center bg-white font-bold">Loading...</div>;

export const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAdminAuth();

  if (auth.isCheckingAuth) {
    return <Loading />;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};
