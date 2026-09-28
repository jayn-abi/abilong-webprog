import { useMedia } from '../../context/MediaContext';
import { projectLogoSrc } from './logos';

const sizes = {
  sm: 'h-9 w-9 text-sm rounded-lg',
  md: 'h-11 w-11 text-base rounded-xl',
  lg: 'h-14 w-14 text-lg rounded-2xl',
};

/* Uploaded logo → bundled logo → gradient initial. */
const ProjectLogo = ({ project, size = 'md', className = '' }) => {
  const { media } = useMedia();
  const src = projectLogoSrc(project, media);
  const box = `${sizes[size]} shrink-0 overflow-hidden border border-(--border) ${className}`;

  if (src) {
    return (
      <span className={`${box} flex items-center justify-center bg-white p-0.5`}>
        <img src={src} alt="" loading="lazy" className="h-full w-full object-contain" />
      </span>
    );
  }
  return (
    <span className={`${box} bg-gradient-accent flex items-center justify-center font-bold text-white`} aria-hidden="true">
      {(project.name || '?').trim().charAt(0).toUpperCase()}
    </span>
  );
};

export default ProjectLogo;
