import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/ui/RoleBasedRouter';
import LandingHeader from './components/LandingHeader';
import AnimatedBackground from './components/AnimatedBackground';
import HeroSection from './components/HeroSection';
import FeatureHighlights from './components/FeatureHighlights';
import HowItWorks from './components/HowItWorks';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import SocialProof from './components/SocialProof';
import CallToAction from './components/CallToAction';
import LandingFooter from './components/LandingFooter';

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
      <LandingHeader />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection onGetStarted={handleGetStarted} />

        {/* Feature Highlights */}
        <FeatureHighlights />

        {/* How It Works */}
        <HowItWorks />

        {/* Pricing */}
        <PricingSection onGetStarted={handleGetStarted} />

        {/* Social Proof */}
        <SocialProof />

        {/* Contact */}
        <ContactSection />

        {/* Call to Action */}
        <CallToAction onGetStarted={handleGetStarted} />
      </main>
      
      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default LandingPage;