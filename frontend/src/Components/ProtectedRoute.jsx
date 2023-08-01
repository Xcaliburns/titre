/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAllowed=false, redirectPath = "/", children }) {
  if (!isAllowed) return <Navigate to={redirectPath} replace />;

  return children ? children : <Outlet />;
}

export default ProtectedRoute;