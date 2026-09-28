import healthcastLogo from '../../assets/images/healthcast.png';
import carelinkLogo from '../../assets/images/carelink.png';
import ivsLogo from '../../assets/images/ivs.png';
import { cloudinaryUrl } from '../../services/MediaService';

// Logos bundled with the site, used until a new one is uploaded
export const bundledLogos = { healthcast: healthcastLogo, carelink: carelinkLogo, laundry: ivsLogo };

// Uploaded logo → bundled logo → null (callers show an initial instead)
export const projectLogoSrc = (project, media, size = 160) => {
    const uploaded = media[project.media?.logo]?.url;
    return uploaded ? cloudinaryUrl(uploaded, size) : bundledLogos[project.id] ?? null;
};
