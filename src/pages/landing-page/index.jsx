import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/ui/RoleBasedRouter';
import Header from '../../components/ui/Header';
import AnimatedBackground from './components/AnimatedBackground';
import HeroSection from './components/HeroSection';
import FeatureHighlights from './components/FeatureHighlights';
import SocialProof from './components/SocialProof';
import CallToAction from './components/CallToAction';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();

  useEffect(() => {
    // Redirect authenticated users to their dashboard
    if (isAuthenticated && userRole) {
      const dashboardPath = userRole === 'student' ? '/student-dashboard' : '/host-dashboard';
      navigate(dashboardPath, { replace: true });
    }
  }, [isAuthenticated, userRole, navigate]);

  const handleGetStarted = () => {
    navigate('/user-authentication');
  };

  // Don't render if user is authenticated (will redirect)
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      {/* Header */}
      <Header 
        isAuthenticated={false}
        userRole={null}
        onLogout={() => {}}
      />
      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection onGetStarted={handleGetStarted} />

        {/* Feature Highlights */}
        <FeatureHighlights />

        {/* Social Proof */}
        <SocialProof />

        {/* Call to Action */}
        <CallToAction onGetStarted={handleGetStarted} />
      </main>
      {/* Footer */}
      <footer className="relative z-10 bg-card border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-semibold text-foreground">Planora</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-muted-foreground text-sm">
                © {new Date()?.getFullYear()} Planora. All rights reserved.
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Empowering events worldwide with AI-driven innovation
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;