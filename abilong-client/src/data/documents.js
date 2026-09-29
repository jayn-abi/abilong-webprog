import { usePortfolio } from '../context/PortfolioContext';
import { useMedia } from '../context/MediaContext';

/*
 * PDF documents uploaded from Dashboard → Site content. An uploaded file
 * takes the place of the matching link in `links` (cv, transcript).
 */
export const documentSlots = {
  cv: 'document-cv',
  transcript: 'document-transcript',
};

export const isDocumentSlot = (slot) => Object.values(documentSlots).includes(slot);

// Portfolio links with any uploaded documents swapped in
export const useLinks = () => {
  const { links } = usePortfolio();
  const { media } = useMedia();
  const next = { ...links, uploaded: {} };
  for (const [key, slot] of Object.entries(documentSlots)) {
    if (media[slot]?.url) {
      next[key] = media[slot].url;
      next.uploaded[key] = true;
    }
  }
  return next;
};
