import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SideNavLayout from "./SideNavLayout";

export default function ProtectedRoute({allowedRoles, notifications = [] }) {
  const { currentUser, userRole} = useAuth();
  const location = useLocation
      if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={userRole === "admin" ? "/admin" : "/student"} replace />;
  }

  return (
    <SideNavLayout notifications={notifications}>
      <Outlet />
    </SideNavLayout>
  );
}