"use client";

import { useEffect, useRef, useState } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
}

export default function GlassCard({ children, className = '', onClick, delay = 0 }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      // Calculate rotation based on mouse position (2D tilt effect)
      const rotateX = (mouseY / rect.height) * 2; // -2 to 2 degrees
      const rotateY = -(mouseX / rect.width) * 2; // -2 to 2 degrees
      
      setRotation({ x: rotateX, y: rotateY });
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 });
      setIsHovered(false);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Calculate hover intensity for glow effect
  const glowIntensity = Math.min(
    Math.sqrt(
      Math.pow(mousePosition.x - (cardRef.current?.offsetWidth || 0) / 2, 2) +
      Math.pow(mousePosition.y - (cardRef.current?.offsetHeight || 0) / 2, 2)
    ) / 100,
    1
  );

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`glass-card relative overflow-hidden cursor-pointer ${className}`}
      style={{
        // 3D transform effects as specified
        transform: `
          translateY(${isHovered ? '-8px' : '0'}) 
          scale(${isHovered ? '1.02' : '1'}) 
          rotateX(${isHovered ? rotation.x : 0}deg) 
          rotateY(${isHovered ? rotation.y : 0}deg)
        `,
        transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {/* Glassmorphism background */}
      <div 
        className="absolute inset-0 backdrop-blur-xl bg-white/10 border border-white/20"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(255, 255, 255, ${0.1 + glowIntensity * 0.1}) 0%, 
              rgba(255, 255, 255, ${0.05 + glowIntensity * 0.05}) 100%
            )
          `,
          backdropFilter: 'blur(20px)',
        }}
      />
      
      {/* Hover glow effect */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.2 + glowIntensity * 0.3 : 0,
          background: `
            radial-gradient(
              circle at ${(mousePosition.x / (cardRef.current?.offsetWidth || 1)) * 100}% ${(mousePosition.y / (cardRef.current?.offsetHeight || 1)) * 100}%, 
              rgba(255, 255, 255, ${0.3 + glowIntensity * 0.2}) 0%, 
              transparent 50%
            )
          `,
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Subtle border animation on hover */}
      <div 
        className="absolute inset-0 border-2 border-yellow-400/0 transition-all duration-300 rounded-lg"
        style={{
          borderColor: isHovered ? `rgba(255, 212, 0, ${0.3 + glowIntensity * 0.2})` : 'transparent',
          boxShadow: isHovered 
            ? `0 0 20px rgba(255, 212, 0, ${0.2 + glowIntensity * 0.3}), inset 0 0 20px rgba(255, 212, 0, ${0.1 + glowIntensity * 0.2})`
            : 'none',
        }}
      />
      
      {/* Particle effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/60 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
