import { useEffect, useRef, useState, useCallback, type RefCallback, type MutableRefObject } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px', once = true } = options;
  const elementRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [, setMounted] = useState(0); // Force re-run when element mounts

  // Callback ref that updates the ref object AND triggers re-render
  const ref = useCallback((node: T | null) => {
    elementRef.current = node;
    if (node) setMounted(c => c + 1);
  }, []);

  // Expose .current for compatibility with useParallax
  (ref as unknown as MutableRefObject<T | null>).current = elementRef.current;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [elementRef.current, threshold, rootMargin, once]);

  return { ref: ref as RefCallback<T> & MutableRefObject<T | null>, isVisible };
}
