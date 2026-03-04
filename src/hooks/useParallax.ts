import { useEffect, useCallback, RefObject } from 'react';

/**
 * Applies a subtle parallax effect to video elements inside the referenced container.
 * Attaches to an existing ref (e.g. from useScrollReveal).
 */
export function useParallax(ref: RefObject<HTMLElement | null>, speed = 0.12) {
  const handleScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Only apply when element is in viewport
    if (rect.bottom < 0 || rect.top > windowHeight) return;

    const centerOffset = rect.top - windowHeight / 2;
    const translateY = centerOffset * speed;

    const video = el.querySelector('video');
    if (video) {
      video.style.transform = `translateY(${translateY}px) scale(1.15)`;
      video.style.willChange = 'transform';
    }
  }, [ref, speed]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
}
