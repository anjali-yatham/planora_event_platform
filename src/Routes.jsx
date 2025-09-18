import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./components/ui/RoleBasedRouter";
import NotFound from "./pages/NotFound";
import LandingPage from './pages/landing-page';
import HostDashboard from './pages/host-dashboard';
import ProfileManagement from './pages/profile-management';
import StudentDashboard from './pages/student-dashboard';
import EventCreationWizard from './pages/event-creation-wizard';
import UserAuthentication from './pages/user-authentication';
import CalendarPage from './pages/calendar';
import CampaignManagement from './pages/campaign-management';
import AISpeakerSuggestions from './pages/ai-speaker-suggestions';
import SponsorshipMarketplace from './pages/sponsorship-marketplace';
import EventMarketplace from './pages/event-marketplace';
import EventTemplates from './pages/event-templates';
import SocialSharing from './pages/social-sharing';
import CalendarSync from './pages/calendar-sync';
import SustainabilityTracking from './pages/sustainability-tracking';
import AttendeesPage from './pages/attendees-page';
import AiRecommendations from './pages/ai-recommendations';
import Internships from './pages/internships';
import MockTests from './pages/mock-tests';
import Gamification from './pages/gamification';
import CareerInsights from './pages/career-insights';
import BackendHealthCheck from './pages/BackendHealthCheck'; // ⬅️ add this import

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/host-dashboard" element={<HostDashboard />} />
          <Route path="/profile-management" element={<ProfileManagement />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/event-creation-wizard" element={<EventCreationWizard />} />
          <Route path="/user-authentication" element={<UserAuthentication />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/campaign-management" element={<CampaignManagement />} />
          <Route path="/ai-speaker-suggestions" element={<AISpeakerSuggestions />} />
          <Route path="/sponsorship-marketplace" element={<SponsorshipMarketplace />} />
          <Route path="/event-marketplace" element={<EventMarketplace />} />
          <Route path="/event-templates" element={<EventTemplates />} />
          <Route path="/social-sharing" element={<SocialSharing />} />
          <Route path="/calendar-sync" element={<CalendarSync />} />
          <Route path="/sustainability-tracking" element={<SustainabilityTracking />} />
          <Route path="/attendees-page" element={<AttendeesPage />} />
          <Route path="/ai-recommendations" element={<AiRecommendations />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/mock-tests" element={<MockTests />} />
          <Route path="/gamification" element={<Gamification />} />
          <Route path="/career-insights" element={<CareerInsights />} />
          <Route path="/backend-test" element={<BackendHealthCheck />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;
