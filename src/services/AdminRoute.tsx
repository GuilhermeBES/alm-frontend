import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
