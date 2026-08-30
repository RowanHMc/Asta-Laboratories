import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicOnlyRoute({ children }) {
  const { currentUser, userRole } = useAuth();
  if (currentUser) {
    return <Navigate to={userRole === "admin" ? "/admin" : "/student"} replace />;
  }
  return children;
}