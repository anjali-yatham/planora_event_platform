import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/ui/RoleBasedRouter';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import ProfileHeader from './components/ProfileHeader';
import SkillsSection from './components/SkillsSection';
import ActivityHistory from './components/ActivityHistory';
import AchievementsDisplay from './components/AchievementsDisplay';
import PrivacySettings from './components/PrivacySettings';
import IntegrationSettings from './components/IntegrationSettings';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProfileManagement = () => {
  const { userRole, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState({
    name: "Sarah Johnson",
    title: "Senior Product Manager",
    bio: "Passionate about creating user-centered products that solve real-world problems. I love connecting with fellow professionals and sharing insights about product strategy, user experience, and team leadership.",
    location: "San Francisco, CA",
    joinedDate: "March 2023",
    connections: 247,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  });

  const [skills, setSkills] = useState([
    { id: 1, name: "Product Management", level: "Expert", endorsed: 15 },
    { id: 2, name: "User Experience Design", level: "Advanced", endorsed: 12 },
    { id: 3, name: "Agile Methodology", level: "Expert", endorsed: 18 },
    { id: 4, name: "Data Analysis", level: "Intermediate", endorsed: 8 },
    { id: 5, name: "Team Leadership", level: "Advanced", endorsed: 22 },
    { id: 6, name: "Strategic Planning", level: "Advanced", endorsed: 14 }
  ]);

  const [activities] = useState([
    {
      id: 1,
      type: "events",
      title: "Attended AI in Product Management Workshop",
      description: "Participated in a comprehensive workshop about integrating AI tools into product development workflows.",
      date: "2024-09-10T10:00:00Z",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop",
      metadata: { participants: 45, duration: "3 hours", points: 50 }
    },
    {
      id: 2,
      type: "achievements",
      title: "Earned Product Strategy Certificate",
      description: "Successfully completed the Advanced Product Strategy certification program.",
      date: "2024-09-08T14:30:00Z",
      metadata: { points: 100 }
    },
    {
      id: 3,
      type: "connections",
      title: "Connected with 5 new professionals",
      description: "Expanded network by connecting with product managers from various industries.",
      date: "2024-09-05T09:15:00Z",
      metadata: { participants: 5 }
    },
    {
      id: 4,
      type: "events",
      title: "Hosted Product Roadmap Planning Session",
      description: "Led a collaborative session on effective product roadmap planning techniques.",
      date: "2024-09-03T16:00:00Z",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop",
      metadata: { participants: 28, duration: "2 hours", points: 75 }
    },
    {
      id: 5,
      type: "profile",
      title: "Updated Professional Skills",
      description: "Added new skills and updated proficiency levels based on recent project experience.",
      date: "2024-09-01T11:20:00Z"
    }
  ]);

  const [achievements] = useState([
    {
      id: 1,
      name: "Product Visionary",
      description: "Recognized for exceptional product strategy and vision",
      category: "badges",
      rarity: "epic",
      icon: "Lightbulb",
      earnedDate: "2024-08-15T00:00:00Z",
      criteria: "Lead 3 successful product launches",
      points: 150
    },
    {
      id: 2,
      name: "Team Builder",
      description: "Excellence in building and leading high-performing teams",
      category: "badges",
      rarity: "rare",
      icon: "Users",
      earnedDate: "2024-07-20T00:00:00Z",
      criteria: "Manage a team of 10+ members for 6 months",
      points: 100
    },
    {
      id: 3,
      name: "Innovation Champion",
      description: "Driving innovation and creative solutions",
      category: "recognition",
      rarity: "legendary",
      icon: "Zap",
      earnedDate: "2024-06-10T00:00:00Z",
      criteria: "Implement 5 innovative features that increased user engagement",
      points: 200
    },
    {
      id: 4,
      name: "Product Strategy Certification",
      description: "Completed advanced product strategy program",
      category: "certificates",
      rarity: "common",
      icon: "FileText",
      earnedDate: "2024-09-08T00:00:00Z",
      criteria: "Complete all modules and pass final assessment",
      points: 75
    },
    {
      id: 5,
      name: "Mentor of the Month",
      description: "Outstanding contribution to mentoring junior team members",
      category: "recognition",
      rarity: "rare",
      icon: "Award",
      earnedDate: "2024-05-30T00:00:00Z",
      criteria: "Mentor 3+ junior professionals with positive feedback",
      points: 125
    }
  ]);

  const [privacySettings, setPrivacySettings] = useState({
    profilevisibility: {
      profilePhoto: 'public',
      basicInfo: 'public',
      contactInfo: 'connections',
      location: 'public'
    },
    activityengagement: {
      eventHistory: 'public',
      achievements: 'public',
      skills: 'public',
      connections: 'connections'
    },
    communication: {
      directMessages: 'connections',
      eventInvitations: 'public',
      connectionRequests: 'public'
    }
  });

  const [integrations, setIntegrations] = useState({
    linkedin: { connected: true, connectedAt: "2024-08-15T00:00:00Z", status: 'active', permissions: ['read', 'write'] },
    'google-calendar': { connected: true, connectedAt: "2024-07-20T00:00:00Z", status: 'active', permissions: ['read', 'write', 'notifications'] },
    slack: { connected: false, connectedAt: null, status: 'disconnected', permissions: [] },
    zoom: { connected: true, connectedAt: "2024-06-10T00:00:00Z", status: 'active', permissions: ['read', 'write'] },
    github: { connected: false, connectedAt: null, status: 'disconnected', permissions: [] },
    stripe: { connected: false, connectedAt: null, status: 'disconnected', permissions: [] }
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'skills', label: 'Skills', icon: 'Award' },
    { id: 'activity', label: 'Activity', icon: 'Activity' },
    { id: 'achievements', label: 'Achievements', icon: 'Trophy' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'integrations', label: 'Integrations', icon: 'Zap' },
    { id: 'account', label: 'Account', icon: 'Settings' }
  ];

  const handleAvatarUpdate = (newAvatar) => {
    setUserProfile(prev => ({ ...prev, avatar: newAvatar }));
  };

  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(updatedProfile);
  };

  const handleSkillsUpdate = (updatedSkills) => {
    setSkills(updatedSkills);
  };

  const handlePrivacyUpdate = (updatedSettings) => {
    setPrivacySettings(updatedSettings);
  };

  const handleIntegrationUpdate = (updatedIntegrations) => {
    setIntegrations(updatedIntegrations);
  };

  useEffect(() => {
    document.title = 'Profile Management - Planora';
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileHeader
            userProfile={userProfile}
            onAvatarUpdate={handleAvatarUpdate}
            onProfileUpdate={handleProfileUpdate}
          />
        );
      case 'skills':
        return (
          <SkillsSection
            skills={skills}
            onSkillsUpdate={handleSkillsUpdate}
          />
        );
      case 'activity':
        return (
          <ActivityHistory
            activities={activities}
          />
        );
      case 'achievements':
        return (
          <AchievementsDisplay
            achievements={achievements}
          />
        );
      case 'privacy':
        return (
          <PrivacySettings
            privacySettings={privacySettings}
            onPrivacyUpdate={handlePrivacyUpdate}
          />
        );
      case 'integrations':
        return (
          <IntegrationSettings
            integrations={integrations}
            onIntegrationUpdate={handleIntegrationUpdate}
          />
        );
      case 'account':
        return (
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-6">Account Settings</h2>
            
            {/* Account Information */}
            <div className="space-y-6">
              <div className="border-b border-border pb-6">
                <h3 className="text-lg font-medium text-card-foreground mb-4">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <p className="text-card-foreground">sarah.johnson@email.com</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Account Type</label>
                    <p className="text-card-foreground capitalize">{userRole} Account</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                    <p className="text-card-foreground">{userProfile.joinedDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Account Status</label>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-success text-sm font-medium">Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="border-b border-border pb-6">
                <h3 className="text-lg font-medium text-card-foreground mb-4">Security</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    iconName="Key"
                    iconPosition="left"
                  >
                    Change Password
                  </Button>
                  <Button
                    variant="outline"
                    iconName="Smartphone"
                    iconPosition="left"
                  >
                    Enable Two-Factor Authentication
                  </Button>
                </div>
              </div>

              {/* Data Management */}
              <div className="border-b border-border pb-6">
                <h3 className="text-lg font-medium text-card-foreground mb-4">Data Management</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    iconName="Download"
                    iconPosition="left"
                  >
                    Download My Data
                  </Button>
                  <Button
                    variant="outline"
                    iconName="FileText"
                    iconPosition="left"
                  >
                    Privacy Policy
                  </Button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
                <h3 className="text-lg font-medium text-destructive mb-4 flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={20} />
                  <span>Danger Zone</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                    iconName="UserX"
                    iconPosition="left"
                    onClick={() => {
                      const confirmation = window.confirm(
                        'Are you sure you want to delete your account?\n\nThis action cannot be undone and will:\n• Permanently delete all your events and data\n• Remove your profile and connections\n• Cancel any active subscriptions\n\nType "DELETE" to confirm:'
                      );
                      
                      if (confirmation) {
                        const confirmText = window.prompt('Please type "DELETE" to confirm account deletion:');
                        if (confirmText === 'DELETE') {
                          // Simulate account deletion
                          alert('Account deletion initiated. You will be logged out and redirected to the landing page.');
                          logout();
                          window.location.href = '/';
                        } else if (confirmText !== null) {
                          alert('Account deletion cancelled. Text did not match "DELETE".');
                        }
                      }
                    }}
                  >
                    Delete Account Permanently
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header 
        userRole={userRole} 
        isAuthenticated={true} 
        onLogout={logout} 
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <NavigationBreadcrumb className="mb-6" />
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-card rounded-lg border border-border p-4 sticky top-24">
                <h2 className="font-semibold text-foreground mb-4">Profile Settings</h2>
                <nav className="space-y-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-smooth ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name={tab?.icon} size={18} />
                      <span className="font-medium">{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileManagement;