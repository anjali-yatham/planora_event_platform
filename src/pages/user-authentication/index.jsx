import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../components/ui/RoleBasedRouter';
import AuthHeader from './components/AuthHeader';
import AuthForm from './components/AuthForm';
import SocialAuth from './components/SocialAuth';

const UserAuthentication = () => {
  const [mode, setMode] = useState('signin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Mock credentials for testing
  const mockCredentials = {
    student: {
      email: 'student@planora.com',
      password: 'student123'
    },
    host: {
      email: 'host@planora.com',
      password: 'host123'
    }
  };

  useEffect(() => {
    // Clear error when mode changes
    setError('');
  }, [mode]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setError('');
  };

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (mode === 'signin') {
        // Check mock credentials for sign in
        const isValidStudent = formData?.email === mockCredentials?.student?.email && 
                              formData?.password === mockCredentials?.student?.password;
        const isValidHost = formData?.email === mockCredentials?.host?.email && 
                           formData?.password === mockCredentials?.host?.password;

        if (isValidStudent) {
          login('student');
          const from = location?.state?.from?.pathname || '/student-dashboard';
          navigate(from, { replace: true });
        } else if (isValidHost) {
          login('host');
          const from = location?.state?.from?.pathname || '/host-dashboard';
          navigate(from, { replace: true });
        } else {
          setError('Invalid email or password. Use student@planora.com/student123 or host@planora.com/host123');
        }
      } else {
        // Sign up - create new account
        login(formData?.role);
        const dashboardPath = formData?.role === 'student' ? '/student-dashboard' : '/host-dashboard';
        navigate(dashboardPath, { replace: true });
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (providerId) => {
    setLoading(true);
    setError('');

    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, randomly assign role
      const role = Math.random() > 0.5 ? 'student' : 'host';
      login(role);
      
      const dashboardPath = role === 'student' ? '/student-dashboard' : '/host-dashboard';
      navigate(dashboardPath, { replace: true });
    } catch (err) {
      setError(`Failed to authenticate with ${providerId}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-elevation-3 p-8">
            <AuthHeader mode={mode} />
            <AuthForm
              mode={mode}
              onModeChange={handleModeChange}
              onSubmit={handleFormSubmit}
              loading={loading}
              error={error}
            />
            <SocialAuth
              onSocialAuth={handleSocialAuth}
              loading={loading}
            />
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <button
                onClick={() => navigate('/landing-page')}
                className="hover:text-foreground transition-smooth"
              >
                ← Back to Home
              </button>
              <span>•</span>
              <a href="#" className="hover:text-foreground transition-smooth">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-foreground transition-smooth">
                Terms of Service
              </a>
            </div>
            
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} Planora. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthentication;