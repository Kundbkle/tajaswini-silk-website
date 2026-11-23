import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Decorative effects only. Content remains visible without JavaScript, on
 * touch devices, and for people who request reduced motion.
 */
export const StorefrontEffects = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const isStorefront = !pathname.startsWith('/admin');
    document.body.classList.toggle('boutique-cursor-enabled', isStorefront);
    if (!isStorefront) return () => document.body.classList.remove('boutique-cursor-enabled');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      return () => document.body.classList.remove('boutique-cursor-enabled');
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('main > section, main > div > section, main article, main .grid > a')
    ).slice(0, 80);

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('boutique-revealed');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px 40px 0px' });

    sections.forEach((element) => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.95) {
        return; // Don't hide or animate content already visible on load.
      }
      element.classList.add('boutique-reveal-ready');
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      sections.forEach((element) => {
        element.classList.remove('boutique-reveal-ready');
        element.classList.remove('boutique-revealed');
      });
      document.body.classList.remove('boutique-cursor-enabled');
    };
  }, [pathname]);

  // A faint orbit follows interactive items, complementing the small peacock
  // pointer without obscuring clicks or affecting touch/keyboard users.
  useEffect(() => {
    if (pathname.startsWith('/admin') ||
        !window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;

    const halo = document.createElement('div');
    halo.className = 'ts-cursor-halo';
    halo.setAttribute('aria-hidden', 'true');
    document.body.appendChild(halo);

    const onMove = (event: PointerEvent) => {
      halo.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      const target = event.target;
      const interactive = target instanceof Element &&
        target.closest('a, button, select, [role="button"]');
      halo.style.opacity = interactive ? '1' : '0';
    };
    const onLeave = () => { halo.style.opacity = '0'; };
    window.addEventListener('pointermove', onMove, {passive:true});
    window.addEventListener('blur', onLeave);
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('blur', onLeave);
      document.removeEventListener('pointerleave', onLeave);
      halo.remove();
    };
  }, [pathname]);

  return null;
};
