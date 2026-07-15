import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("Loading:", loading);
  console.log("User:", user);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#030712]">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated
  return children;
};

export default ProtectedRoute;