import { useRef, useEffect, useCallback } from 'react';

/**
 * Subtle parallax effect for video strips.
 * The video translates vertically at a slower rate than the scroll,
 * creating a cinematic depth effect.
 */
export function useParallax(speed = 0.15) {
  const ref = useRef<HTMLElement>(null);

  const handleScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Only apply when element is in viewport
    if (rect.bottom < 0 || rect.top > windowHeight) return;

    // Calculate offset: 0 when element enters bottom, 
    // progresses as it scrolls up
    const centerOffset = rect.top - windowHeight / 2;
    const translateY = centerOffset * speed;

    // Apply transform to the video child
    const video = el.querySelector('video');
    if (video) {
      video.style.transform = `translateY(${translateY}px) scale(1.15)`;
    }
  }, [speed]);

  useEffect(() => {
    // Use passive listener for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return ref;
}
