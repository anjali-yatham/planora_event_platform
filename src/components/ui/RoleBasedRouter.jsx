import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const authData = localStorage.getItem('planora_auth');
        if (authData) {
          const { isAuthenticated: authStatus, role, timestamp } = JSON.parse(authData);
          
          const now = new Date()?.getTime();
          const authAge = now - timestamp;
          const maxAge = 24 * 60 * 60 * 1000; // 24 hours
          
          if (authAge < maxAge && authStatus && role) {
            setIsAuthenticated(true);
            setUserRole(role);
          } else {
            localStorage.removeItem('planora_auth');
            setIsAuthenticated(false);
            setUserRole(null);
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        localStorage.removeItem('planora_auth');
        setIsAuthenticated(false);
        setUserRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (role) => {
    const authData = {
      isAuthenticated: true,
      role,
      timestamp: new Date()?.getTime()
    };
    
    localStorage.setItem('planora_auth', JSON.stringify(authData));
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem('planora_auth');
    setIsAuthenticated(false);
    setUserRole(null);
    navigate('/landing-page');
  };

  const value = {
    isAuthenticated,
    userRole,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const RoleBasedRouter = ({ children, requiredRole = null, requireAuth = true }) => {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Public routes that don't require authentication
  const publicRoutes = ['/landing-page', '/user-authentication'];
  const isPublicRoute = publicRoutes?.includes(location?.pathname);

  // If route doesn't require auth and user is not authenticated, allow access
  if (!requireAuth && !isAuthenticated) {
    return children;
  }

  // If user is not authenticated and trying to access protected route
  if (requireAuth && !isAuthenticated && !isPublicRoute) {
    return <Navigate to="/user-authentication" state={{ from: location }} replace />;
  }

  // If user is authenticated but trying to access auth pages, redirect to dashboard
  if (isAuthenticated && (location?.pathname === '/user-authentication' || location?.pathname === '/landing-page')) {
    const dashboardPath = userRole === 'student' ? '/student-dashboard' : '/host-dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  // If specific role is required and user doesn't have it
  if (requiredRole && userRole !== requiredRole) {
    const dashboardPath = userRole === 'student' ? '/student-dashboard' : '/host-dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  // Role-based route validation
  if (isAuthenticated && userRole) {
    // Host-only routes
    const hostOnlyRoutes = ['/event-creation-wizard'];
    if (hostOnlyRoutes?.includes(location?.pathname) && userRole !== 'host') {
      return <Navigate to="/student-dashboard" replace />;
    }

    // Student dashboard access
    if (location?.pathname === '/student-dashboard' && userRole !== 'student') {
      return <Navigate to="/host-dashboard" replace />;
    }

    // Host dashboard access
    if (location?.pathname === '/host-dashboard' && userRole !== 'host') {
      return <Navigate to="/student-dashboard" replace />;
    }
  }

  return children;
};

export default RoleBasedRouter;