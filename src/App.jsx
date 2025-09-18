import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BackendHealthCheck from "./pages/BackendHealthCheck";
import StudentDashboard from "./pages/student-dashboard";
import HostDashboard from "./pages/host-dashboard";
// ... other imports

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Your existing routes */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/host-dashboard" element={<HostDashboard />} />

        {/* ✅ Add this test route */}
        <Route path="/backend-test" element={<BackendHealthCheck />} />

        {/* Fallback */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

