import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fetchMedia } from '../services/MediaService';

/*
 * Project screenshots uploaded through Dashboard → Media, keyed by slot.
 * If the API is unreachable the map stays empty and every project falls
 * back to its built-in interface preview.
 */
export const MediaContext = createContext({ media: {}, loaded: false });

export const MediaProvider = ({ children }) => {
  const [media, setMedia] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    fetchMedia()
      .then(({ data }) => {
        if (!active) return;
        const map = {};
        (data.media ?? []).forEach((item) => { map[item.slot] = item; });
        setMedia(map);
      })
      .catch(() => {})
      .finally(() => active && setLoaded(true));
    return () => { active = false; };
  }, []);

  const setSlot = useCallback((slot, item) => {
    setMedia((prev) => {
      const next = { ...prev };
      if (item) next[slot] = item;
      else delete next[slot];
      return next;
    });
  }, []);

  return (
    <MediaContext.Provider value={{ media, loaded, setSlot }}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => useContext(MediaContext);
