"use client";

import { useEffect, useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function MagneticButton({ children, className = '', onClick, variant = 'primary' }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - buttonCenterX;
      const distanceY = e.clientY - buttonCenterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Magnetic effect within 120px radius (increased for stronger effect)
      const magneticRadius = 120;
      
      if (distance < magneticRadius) {
        // Calculate pull strength (stronger when closer, max 10px offset)
        const strength = 1 - (distance / magneticRadius);
        const maxOffset = 10;
        const pullX = Math.max(-maxOffset, Math.min(maxOffset, distanceX * strength * 0.4));
        const pullY = Math.max(-maxOffset, Math.min(maxOffset, distanceY * strength * 0.4));
        
        setPosition({ x: pullX, y: pullY });
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setIsHovered(true);
      } else {
        // Smooth return to center
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
      setIsHovered(false);
    };

    const handleMouseDown = () => {
      setIsPressed(true);
    };

    const handleMouseUp = () => {
      setIsPressed(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mousedown', handleMouseDown);
    button.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mousedown', handleMouseDown);
      button.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Buttermax-style button with magnetic effect
  const baseStyles = variant === 'primary'
    ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-black font-bold shadow-lg'
    : 'bg-transparent border-2 border-black text-black font-bold hover:bg-black hover:text-white';

  // Calculate shine effect based on mouse position
  const shineX = mousePosition.x / (buttonRef.current?.offsetWidth || 1);
  const shineY = mousePosition.y / (buttonRef.current?.offsetHeight || 1);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`magnetic-button relative overflow-hidden ${baseStyles} px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translateY(${isHovered ? '-3px' : '0'}) scale(${isHovered ? '1.02' : isPressed ? '0.98' : '1'})`,
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionProperty: 'transform, box-shadow, background-color',
        boxShadow: isHovered 
          ? '0 12px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)'
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Shine effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.3 : 0,
          transform: `translateX(${(shineX - 0.5) * 100}%) skewX(-20deg)`,
          transitionProperty: 'transform, opacity',
        }}
      />
      
      {/* Text content */}
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Ripple effect on click */}
      {isPressed && (
        <div 
          className="absolute inset-0 bg-white opacity-20 rounded-lg animate-ping"
          style={{
            animation: 'ripple 0.6s ease-out',
          }}
        />
      )}
    </button>
  );
}
