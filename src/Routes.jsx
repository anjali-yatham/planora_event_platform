import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { AuthProvider } from "components/ui/RoleBasedRouter";
import NotFound from "pages/NotFound";
import LandingPage from './pages/landing-page';
import HostDashboard from './pages/host-dashboard';
import ProfileManagement from './pages/profile-management';
import StudentDashboard from './pages/student-dashboard';
import EventCreationWizard from './pages/event-creation-wizard';
import UserAuthentication from './pages/user-authentication';

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<EventCreationWizard />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/host-dashboard" element={<HostDashboard />} />
          <Route path="/profile-management" element={<ProfileManagement />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/event-creation-wizard" element={<EventCreationWizard />} />
          <Route path="/user-authentication" element={<UserAuthentication />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;