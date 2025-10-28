"use client";

import { useEffect, useRef, useState } from 'react';

export default function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [particles, setParticles] = useState<Array<{x: number, y: number, vx: number, vy: number, size: number, opacity: number}>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Initialize floating particles
    const initParticles = () => {
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 50000));
      const newParticles = [];
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.3 + 0.1
        });
      }
      
      setParticles(newParticles);
    };

    initParticles();

    // Generate enhanced noise with movement
    const generateNoise = (time: number) => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = imageData.data;

      for (let i = 0; i < buffer.length; i += 4) {
        // Animated noise with time-based variation
        const timeNoise = Math.sin(time * 0.001 + i * 0.01) * 127 + 128;
        const baseNoise = Math.random() * 255;
        const noise = (baseNoise * 0.7 + timeNoise * 0.3);
        
        buffer[i] = noise;     // R
        buffer[i + 1] = noise; // G
        buffer[i + 2] = noise; // B
        buffer[i + 3] = 255 * 0.025; // Alpha (2.5% opacity)
      }

      ctx.putImageData(imageData, 0, 0);
    };

    // Animate floating particles
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newX = particle.x + particle.vx;
          let newY = particle.y + particle.vy;
          
          // Wrap around screen edges
          if (newX < 0) newX = canvas.width;
          if (newX > canvas.width) newX = 0;
          if (newY < 0) newY = canvas.height;
          if (newY > canvas.height) newY = 0;
          
          return {
            ...particle,
            x: newX,
            y: newY
          };
        })
      );
    };

    // Draw particles
    const drawParticles = () => {
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });
    };

    // Main animation loop
    let lastTime = 0;
    const fps = 30; // Smooth 30fps for particles
    const interval = 1000 / fps;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime > interval) {
        // Clear canvas with slight alpha for trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Generate noise and draw particles
        generateNoise(currentTime);
        animateParticles();
        
        lastTime = currentTime - (deltaTime % interval);
      }
      
      drawParticles();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100] mix-blend-overlay"
      style={{
        opacity: 0.4,
      }}
    />
  );
}
