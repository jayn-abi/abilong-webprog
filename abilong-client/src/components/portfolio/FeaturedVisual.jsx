import ProjectVisual from './ProjectVisual';
import { HealthCastWebMockup, HealthCastMobileMockup, GenericMockup, mockups } from './Mockups';
import { useMedia } from '../../context/MediaContext';

/*
 * Featured project's web + mobile visual (hero and case study).
 * Built-in previews overlap for a layered look; once a real screenshot is
 * uploaded they sit side by side, so the phone never covers the screenshot.
 */
const FeaturedVisual = ({ project, width = 1400 }) => {
  const { media } = useMedia();
  const slots = project.media ?? {};
  const isHealthCast = project.id === 'healthcast';
  const hasWeb = Boolean(media[slots.web]?.url);
  const hasMobile = Boolean(media[slots.mobile]?.url);
  const showMobile = isHealthCast || hasMobile;
  const Mockup = mockups[project.mockup];
  const webFallback = isHealthCast ? <HealthCastWebMockup /> : Mockup ? <Mockup /> : <GenericMockup name={project.name} />;

  const web = (
    <ProjectVisual
      slot={slots.web}
      alt={`${project.name} web view`}
      fallback={webFallback}
      width={width}
    />
  );
  const mobile = showMobile && (
    <ProjectVisual
      slot={slots.mobile}
      alt={`${project.name} mobile view`}
      fallback={isHealthCast ? <HealthCastMobileMockup /> : null}
      width={500}
      frame="phone"
      className="rounded-[1.75rem]"
    />
  );

  if (hasWeb || hasMobile) {
    return (
      <div className={`grid w-full items-center gap-3 sm:gap-4 ${showMobile ? 'grid-cols-[1fr_27%]' : 'grid-cols-1'}`}>
        <div className="aspect-[16/11] w-full rounded-xl shadow-(--shadow-lift)">{web}</div>
        {showMobile && <div className="aspect-[9/18.5] w-full">{mobile}</div>}
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3.1] w-full">
      <div className="absolute inset-y-[4%] left-0 w-[85%] rounded-xl shadow-(--shadow-lift)">{web}</div>
      {showMobile && <div className="absolute right-0 bottom-0 aspect-[9/18.5] w-[29%]">{mobile}</div>}
    </div>
  );
};

export default FeaturedVisual;
