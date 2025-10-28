"use client";

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-base ease-out ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-[20px] shadow-card border-b border-neutral-100'
            : 'bg-transparent'
        }`}
        style={{ height: '80px' }}
      >
        <div className="max-w-[1400px] mx-auto px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-neutral-900">
            Autometer
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-neutral-700 hover:text-primary-500 transition-all duration-fast hover:-translate-y-0.5"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-neutral-700 hover:text-primary-500 transition-all duration-fast hover:-translate-y-0.5"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-neutral-700 hover:text-primary-500 transition-all duration-fast hover:-translate-y-0.5"
            >
              Pricing <span className="text-sm">(Free)</span>
            </button>
            <button
              onClick={() => scrollToSection('social-proof')}
              className="text-neutral-700 hover:text-primary-500 transition-all duration-fast hover:-translate-y-0.5"
            >
              Testimonials
            </button>
          </div>

          {/* CTA Button */}
          <button
            className="hidden md:block bg-primary-500 text-white px-6 py-3 rounded-md font-semibold shadow-card hover:bg-primary-600 hover:-translate-y-0.5 hover:scale-105 hover:shadow-card-hover active:bg-primary-900 active:translate-y-0 active:scale-95 transition-all duration-base ease-out"
            style={{ height: '48px' }}
          >
            Start Free
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-neutral-900" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-900" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden" style={{ top: '80px' }}>
          <div className="flex flex-col items-center justify-center gap-6 p-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-xl text-neutral-700 hover:text-primary-500 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-xl text-neutral-700 hover:text-primary-500 transition-colors"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-xl text-neutral-700 hover:text-primary-500 transition-colors"
            >
              Pricing (Free)
            </button>
            <button
              onClick={() => scrollToSection('social-proof')}
              className="text-xl text-neutral-700 hover:text-primary-500 transition-colors"
            >
              Testimonials
            </button>
            <button className="bg-primary-500 text-white px-8 py-4 rounded-md font-semibold text-xl mt-4">
              Start Free
            </button>
          </div>
        </div>
      )}
    </>
  );
}
