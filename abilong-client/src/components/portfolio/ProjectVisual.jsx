import { useState } from 'react';
import { useMedia } from '../../context/MediaContext';
import { cloudinaryUrl } from '../../services/MediaService';

/*
 * How an uploaded screenshot is presented, based on its own proportions,
 * so any size can be uploaded without being cropped or distorted:
 *   screen    — landscape/square: shown whole on a blurred backdrop of itself
 *   phone     — narrow portrait: shown whole inside a slim phone bezel
 *   tall-page — full-page web capture: top shown, scrolls to the bottom on hover
 */
const layoutFor = (item, frame) => {
  if (frame === 'phone') return 'phone';
  const ratio = item.width && item.height ? item.width / item.height : 16 / 10;
  if (ratio >= 0.75) return 'screen';
  return item.width >= 900 ? 'tall-page' : 'phone';
};

/*
 * Shows the uploaded image for a media slot, or the built-in interface
 * preview when none has been uploaded (or it fails to load).
 * `frame="phone"` is for slots that are always a phone (e.g. the mobile view).
 */
const ProjectVisual = ({ slot, alt, fallback, width = 1400, frame = 'auto', className = '' }) => {
  const { media } = useMedia();
  const [failed, setFailed] = useState(false);
  const item = media[slot];

  if (!item?.url || failed) {
    return (
      <div className={`media-zoom relative h-full w-full ${className}`} role="img" aria-label={`${alt} (illustrative preview)`}>
        {fallback}
      </div>
    );
  }

  const layout = layoutFor(item, frame);
  const src = cloudinaryUrl(item.url, width);
  const srcSet = `${cloudinaryUrl(item.url, Math.round(width / 2))} ${Math.round(width / 2)}w, ${src} ${width}w`;
  const imgProps = {
    src, srcSet, alt,
    sizes: `(max-width: 768px) 100vw, ${Math.round(width / 2)}px`,
    loading: 'lazy',
    decoding: 'async',
    onError: () => setFailed(true),
  };

  // Phone slot inside an existing phone-shaped box: just the bezel, no backdrop
  if (frame === 'phone') {
    return (
      <div className={`media-zoom flex h-full w-full items-center justify-center ${className}`}>
        <img {...imgProps} className="max-h-full max-w-full rounded-[1.5rem] border-[5px] border-(--elevated) object-contain shadow-(--shadow-lift) outline outline-(--border-strong)" />
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-xl border border-(--border) bg-(--elevated) ${className}`}>
      {/* Soft backdrop made from the image itself fills any spare space */}
      <img
        src={cloudinaryUrl(item.url, 64)}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-125 object-cover opacity-50 blur-2xl"
      />
      <div className="media-zoom relative flex h-full w-full items-center justify-center p-2.5 sm:p-3">
        {layout === 'screen' && (
          <img {...imgProps} className="max-h-full max-w-full rounded-lg object-contain shadow-(--shadow-lift)" />
        )}
        {layout === 'phone' && (
          <img {...imgProps} className="max-h-full max-w-full rounded-[1.25rem] border-4 border-(--elevated) object-contain shadow-(--shadow-lift)" />
        )}
        {layout === 'tall-page' && (
          <div className="h-full w-full overflow-hidden rounded-lg shadow-(--shadow-lift)">
            <img {...imgProps} className="tall-page-scroll h-full w-full object-cover object-top" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectVisual;
