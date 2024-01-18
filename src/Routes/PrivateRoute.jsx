import { Navigate } from "react-router-dom";
import { localTokenKey } from "../constants";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem(localTokenKey);

  if (!token) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default PrivateRoute;
