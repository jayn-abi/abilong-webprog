import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedTypes }) => {
  const token = localStorage.getItem('token');
  const type  = localStorage.getItem('type');

  if (!token) return <Navigate to="/auth/signin" replace />;
  if (allowedTypes && !allowedTypes.includes(type)) return <Navigate to="/dashboard" replace />;

  return children;
};

export default PrivateRoute;
