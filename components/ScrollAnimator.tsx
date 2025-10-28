"use client";

import { useEffect, useRef } from 'react';

interface ScrollAnimatorProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  distance?: number;
}

export default function ScrollAnimator({ 
  children, 
  className = '', 
  delay = 0, 
  stagger = 0,
  direction = 'up',
  distance = 50
}: ScrollAnimatorProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add('animate-in');
          
          // Add stagger effect to child elements
          const children = el.querySelectorAll('.stagger-item');
          children.forEach((child, index) => {
            const childEl = child as HTMLElement;
            setTimeout(() => {
              childEl.classList.add('animate-in');
            }, delay + (index * stagger));
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [delay, stagger]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`;
      case 'down':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(${distance}px)`;
      case 'right':
        return `translateX(-${distance}px)`;
      case 'fade':
        return 'translateY(0) scale(0.9)';
      default:
        return `translateY(${distance}px)`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`scroll-animate ${className}`}
      style={{
        opacity: 0,
        transform: getInitialTransform(),
        transition: `
          opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms,
          transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms
        `,
      }}
    >
      <style jsx>{`
        .scroll-animate.animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) scale(1) !important;
        }
        
        .scroll-animate .stagger-item {
          opacity: 0;
          transform: inherit;
          transition: inherit;
        }
        
        .scroll-animate .stagger-item.animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) scale(1) !important;
        }
      `}</style>
      {children}
    </div>
  );
}

// Enhanced section wrapper with advanced scroll effects
interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  background?: string;
  parallax?: boolean;
}

export function ScrollSection({ children, className = '', background, parallax = false }: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!parallax) return;

    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        section.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallax]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: background || 'transparent',
        transition: parallax ? 'transform 0.1s linear' : undefined,
      }}
    >
      {children}
    </section>
  );
}
