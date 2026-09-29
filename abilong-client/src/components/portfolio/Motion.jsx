import { useEffect, useRef } from 'react';

const MAX_TILT = 6; // degrees

/*
 * Site-wide motion helpers, mounted once by the layout:
 *   - a gradient progress bar that fills as the page scrolls
 *   - `.spotlight` elements glow where the cursor is (sets --mx / --my)
 *   - `.tilt` elements lean toward the cursor (sets --rx / --ry)
 * The CSS turns all of this off for reduced motion and touch-only devices.
 */
const Motion = () => {
  const bar = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.current?.style.setProperty('--progress', max > 0 ? String(window.scrollY / max) : '0');
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    let tilted = null;
    const resetTilt = () => {
      tilted?.style.setProperty('--rx', '0deg');
      tilted?.style.setProperty('--ry', '0deg');
      tilted = null;
    };

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      const target = e.target instanceof Element ? e.target : null;

      const spot = target?.closest('.spotlight');
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
        spot.style.setProperty('--my', `${e.clientY - r.top}px`);
      }

      const tilt = target?.closest('.tilt');
      if (tilt !== tilted) resetTilt();
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty('--rx', `${(-y * MAX_TILT).toFixed(2)}deg`);
        tilt.style.setProperty('--ry', `${(x * MAX_TILT).toFixed(2)}deg`);
        tilted = tilt;
      }
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', resetTilt);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', resetTilt);
    };
  }, []);

  return <div ref={bar} className="scroll-progress" aria-hidden="true" />;
};

export default Motion;
