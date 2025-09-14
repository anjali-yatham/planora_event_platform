import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = null, isAuthenticated = false, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: userRole === 'student' ? '/student-dashboard' : '/host-dashboard',
      icon: 'LayoutDashboard',
      roles: ['student', 'host']
    },
    {
      label: 'Create Event',
      path: '/event-creation-wizard',
      icon: 'Plus',
      roles: ['host']
    },
    {
      label: 'Profile',
      path: '/profile-management',
      icon: 'User',
      roles: ['student', 'host']
    }
  ];

  const filteredNavItems = navigationItems?.filter(item => 
    !item?.roles || item?.roles?.includes(userRole)
  );

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event?.target?.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileDropdownOpen]);

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

  const Logo = () => (
    <div 
      className="flex items-center cursor-pointer transition-smooth hover:opacity-80"
      onClick={() => handleNavigation(isAuthenticated ? (userRole === 'student' ? '/student-dashboard' : '/host-dashboard') : '/landing-page')}
    >
      <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center mr-3">
        <Icon name="Calendar" size={20} color="white" />
      </div>
      <span className="text-xl font-semibold text-foreground">Planora</span>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => handleNavigation('/user-authentication')}
              className="text-muted-foreground hover:text-foreground"
            >
              Sign In
            </Button>
            <Button
              variant="default"
              onClick={() => handleNavigation('/user-authentication')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {filteredNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>

          {/* Desktop Profile Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative profile-dropdown">
              <button
                onClick={handleProfileDropdown}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50 transition-smooth"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="User" size={16} color="var(--color-primary)" />
                </div>
                <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 py-2 animate-slide-down">
                  <button
                    onClick={() => handleNavigation('/profile-management')}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50 transition-smooth"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <div className="border-t border-border my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-smooth"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-smooth"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border shadow-elevation-3 animate-slide-up">
            <div className="p-6 pt-20">
              <nav className="space-y-2">
                {filteredNavItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-smooth ${
                      isActivePath(item?.path)
                        ? 'text-primary bg-primary/10' :'text-card-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span className="font-medium">{item?.label}</span>
                  </button>
                ))}
              </nav>

              <div className="border-t border-border mt-6 pt-6">
                <button
                  onClick={() => handleNavigation('/profile-management')}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-card-foreground hover:bg-muted/50 transition-smooth"
                >
                  <Icon name="Settings" size={20} />
                  <span className="font-medium">Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-destructive hover:bg-destructive/10 transition-smooth mt-2"
                >
                  <Icon name="LogOut" size={20} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;