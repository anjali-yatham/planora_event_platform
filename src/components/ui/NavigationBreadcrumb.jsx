import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumb = ({ customBreadcrumbs = null, className = "" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const defaultBreadcrumbMap = {
    '/landing-page': [{ label: 'Home', path: '/landing-page' }],
    '/user-authentication': [
      { label: 'Home', path: '/landing-page' },
      { label: 'Authentication', path: '/user-authentication' }
    ],
    '/student-dashboard': [{ label: 'Dashboard', path: '/student-dashboard' }],
    '/host-dashboard': [{ label: 'Dashboard', path: '/host-dashboard' }],
    '/event-creation-wizard': [
      { label: 'Dashboard', path: '/host-dashboard' },
      { label: 'Create Event', path: '/event-creation-wizard' }
    ],
    '/profile-management': [
      { label: 'Dashboard', path: location?.pathname?.includes('student') ? '/student-dashboard' : '/host-dashboard' },
      { label: 'Profile', path: '/profile-management' }
    ]
  };

  const breadcrumbs = customBreadcrumbs || defaultBreadcrumbMap?.[location?.pathname] || [
    { label: 'Dashboard', path: '/dashboard' }
  ];

  const handleBreadcrumbClick = (path, index) => {
    if (index < breadcrumbs?.length - 1) {
      navigate(path);
    }
  };

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((breadcrumb, index) => (
          <li key={breadcrumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-muted-foreground mx-2" 
              />
            )}
            {index < breadcrumbs?.length - 1 ? (
              <button
                onClick={() => handleBreadcrumbClick(breadcrumb?.path, index)}
                className="text-muted-foreground hover:text-foreground transition-smooth font-medium"
              >
                {breadcrumb?.label}
              </button>
            ) : (
              <span className="text-foreground font-medium" aria-current="page">
                {breadcrumb?.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default NavigationBreadcrumb;