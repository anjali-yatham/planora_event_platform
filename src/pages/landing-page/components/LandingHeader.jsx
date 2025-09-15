import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LandingHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl border-b border-white/10' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                <span className={`text-2xl font-bold transition-all duration-300 ${
                  isScrolled ? 'text-white' : 'text-white drop-shadow-lg'
                }`}>Planora</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`font-semibold transition-all duration-300 hover:scale-105 ${
                    isScrolled 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-white/90 hover:text-white drop-shadow-sm'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/user-authentication')}
                className={`font-semibold transition-all duration-300 hover:scale-105 ${
                  isScrolled 
                    ? 'text-gray-300 hover:text-white hover:bg-white/10' 
                    : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/20'
                }`}
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate('/user-authentication')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-6 py-3 font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300"
              >
                Get Started Free
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                isScrolled 
                  ? 'hover:bg-white/10 text-white' 
                  : 'hover:bg-white/10 text-white backdrop-blur-sm'
              }`}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-6 pt-20">
              <nav className="space-y-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="w-full text-left px-4 py-3 rounded-lg text-foreground hover:bg-muted/50 transition-smooth font-medium"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="border-t border-border mt-6 pt-6 space-y-3">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/user-authentication')}
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/user-authentication')}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-0 font-semibold"
                >
                  Get Started Free
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingHeader;