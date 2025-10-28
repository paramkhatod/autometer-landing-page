"use client";

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailingCursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const trailingPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('magnetic-button') ||
        target.closest('.magnetic-button')
      ) {
        setIsButton(true);
        setIsHovering(true);
      } else if (
        target.classList.contains('glass-card') ||
        target.closest('.glass-card') ||
        target.classList.contains('card') ||
        target.closest('.card')
      ) {
        setIsButton(false);
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('magnetic-button') ||
        target.closest('.magnetic-button') ||
        target.classList.contains('glass-card') ||
        target.closest('.glass-card') ||
        target.classList.contains('card') ||
        target.closest('.card')
      ) {
        setIsHovering(false);
        setIsButton(false);
      }
    };

    // Smooth cursor animation with buttery smooth easing
    const animate = () => {
      const dx = mousePosition.current.x - cursorPosition.current.x;
      const dy = mousePosition.current.y - cursorPosition.current.y;
      
      // Main cursor follows with high precision (80% of distance for smoothness)
      cursorPosition.current = {
        x: cursorPosition.current.x + dx * 0.8,
        y: cursorPosition.current.y + dy * 0.8,
      };

      // Trailing cursor follows with lag (buttery effect)
      const trailDx = mousePosition.current.x - trailingPosition.current.x;
      const trailDy = mousePosition.current.y - trailingPosition.current.y;
      
      trailingPosition.current = {
        x: trailingPosition.current.x + trailDx * 0.15,
        y: trailingPosition.current.y + trailDx * 0.15,
      };

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorPosition.current.x}px`;
        cursorRef.current.style.top = `${cursorPosition.current.y}px`;
      }

      if (trailingCursorRef.current) {
        trailingCursorRef.current.style.left = `${trailingPosition.current.x}px`;
        trailingCursorRef.current.style.top = `${trailingPosition.current.y}px`;
      }

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    const animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Hide cursor on mobile or if reduced motion is preferred
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isMobile || prefersReducedMotion) {
      document.body.style.cursor = 'auto';
      if (cursorRef.current && trailingCursorRef.current) {
        cursorRef.current.style.display = 'none';
        trailingCursorRef.current.style.display = 'none';
      }
    }
  }, []);

  // Cursor sizes based on interaction (16px default, 32px on hover, 48px on buttons)
  const cursorSize = isButton ? 48 : isHovering ? 32 : 16;
  const cursorOpacity = isClicking ? 0.7 : 1;

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999]"
        style={{
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          borderRadius: '50%',
          border: `2px solid ${isButton ? '#FFD600' : '#000'}`,
          backgroundColor: isButton ? 'rgba(255, 214, 0, 0.1)' : 'transparent',
          mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
          opacity: cursorOpacity,
          transition: 'width 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), height 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />
      
      {/* Trailing cursor for buttery effect */}
      <div
        ref={trailingCursorRef}
        className="pointer-events-none fixed z-[9998]"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: isButton ? '#FFD600' : '#000',
          opacity: 0.3,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
