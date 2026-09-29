import { Navigate, useLocation } from 'react-router-dom';

// Old page URLs (/about, /skills#certifications, …) now point at sections of the home page
const SectionRedirect = ({ section }) => {
  const { hash } = useLocation();
  return <Navigate to={`/${hash || `#${section}`}`} replace />;
};

export default SectionRedirect;
