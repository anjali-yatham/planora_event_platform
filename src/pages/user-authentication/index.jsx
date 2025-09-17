import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';
import AuthForm from './components/AuthForm';

const UserAuthPage = () => {
  const [mode, setMode] = useState('signin'); // signin | signup
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Store role in localStorage (optional)
  const login = (role) => {
    localStorage.setItem('role', role);
  };

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      if (mode === 'signin') {
        // 🔗 Call FastAPI login
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            username: formData.email,
            password: formData.password
          })
        });

        if (!response.ok) throw new Error('Invalid email or password');
        const data = await response.json();

        // Save token in localStorage
        localStorage.setItem('access_token', data.access_token);

        // Get role (backend may need to include this in login response)
        const role = data.role || 'student';
        login(role);

        // Navigate to correct dashboard
        const from = location?.state?.from?.pathname ||
          (role === 'student' ? '/student-dashboard' : '/host-dashboard');
        navigate(from, { replace: true });

      } else {
        // 🔗 Call FastAPI signup
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.email, // backend expects username + email
            email: formData.email,
            password: formData.password,
            role: formData.role || 'student'
          })
        });

        if (!response.ok) throw new Error('Signup failed');
        const data = await response.json();

        console.log("Signup success:", data);
        login(formData.role);

        const dashboardPath = formData.role === 'student' ? '/student-dashboard' : '/host-dashboard';
        navigate(dashboardPath, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Check backend connection on mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/db-health`)
      .then(res => res.json())
      .then(data => console.log("✅ Backend connected:", data))
      .catch(err => console.error("❌ Backend connection failed:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side: header */}
      <div className="flex-1 flex items-center justify-center p-8 bg-muted">
        <AuthHeader mode={mode} />
      </div>

      {/* Right side: form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <AuthForm
          mode={mode}
          onModeChange={setMode}
          onSubmit={handleFormSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default UserAuthPage;
