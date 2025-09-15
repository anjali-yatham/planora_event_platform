import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/ui/RoleBasedRouter';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import EventsTable from './components/EventsTable';
import AnalyticsWidgets from './components/AnalyticsWidgets';
import QuickActions from './components/QuickActions';
import RevenueTracking from './components/RevenueTracking';
import AttendeeManagement from './components/AttendeeManagement';
import NotificationCenter from './components/NotificationCenter';
import ChatSection from './components/ChatSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

// Profile Form Component
const ProfileForm = ({ profile, onSave }) => {
  const [formData, setFormData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Host Name
            </label>
            <p className="text-muted-foreground">{profile.name || 'Not set'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Email
            </label>
            <p className="text-muted-foreground">{profile.email || 'Not set'}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Bio
          </label>
          <p className="text-muted-foreground">{profile.bio || 'Not set'}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Location
            </label>
            <p className="text-muted-foreground">{profile.location || 'Not set'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Contact Details
            </label>
            <p className="text-muted-foreground">{profile.contactDetails || 'Not set'}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Organization
          </label>
          <p className="text-muted-foreground">{profile.organization || 'Not set'}</p>
        </div>

        <div className="flex justify-end">
          <Button onClick={() => setIsEditing(true)} variant="default">
            Edit Profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Host Name *
          </label>
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Email *
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-card-foreground mb-2">
          Bio
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => handleInputChange('bio', e.target.value)}
          placeholder="Tell us about yourself and your experience"
          className="w-full min-h-[100px] px-3 py-2 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Location
          </label>
          <Input
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="City, State/Country"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Contact Details
          </label>
          <Input
            value={formData.contactDetails}
            onChange={(e) => handleInputChange('contactDetails', e.target.value)}
            placeholder="Phone number"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-card-foreground mb-2">
          Organization
        </label>
        <Input
          value={formData.organization}
          onChange={(e) => handleInputChange('organization', e.target.value)}
          placeholder="Company or organization name"
        />
      </div>

      <div className="flex space-x-4 justify-end">
        <Button onClick={handleCancel} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="default">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

const HostDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hostProfile, setHostProfile] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    contactDetails: '',
    organization: ''
  });

  // Mock data for events
  const mockEvents = [
    {
      id: 1,
      title: "React Advanced Workshop",
      type: "Workshop",
      date: "2025-01-15",
      time: "10:00 AM",
      status: "published",
      attendees: 45,
      capacity: 50,
      revenue: 2250,
      ticketsSold: 45
    },
    {
      id: 2,
      title: "AI in Business Conference",
      type: "Conference",
      date: "2025-01-22",
      time: "9:00 AM",
      status: "published",
      attendees: 120,
      capacity: 150,
      revenue: 12000,
      ticketsSold: 120
    },
    {
      id: 3,
      title: "Startup Networking Event",
      type: "Networking",
      date: "2025-01-28",
      time: "6:00 PM",
      status: "draft",
      attendees: 0,
      capacity: 80,
      revenue: 0,
      ticketsSold: 0
    },
    {
      id: 4,
      title: "Digital Marketing Masterclass",
      type: "Masterclass",
      date: "2025-02-05",
      time: "2:00 PM",
      status: "published",
      attendees: 35,
      capacity: 40,
      revenue: 1750,
      ticketsSold: 35
    },
    {
      id: 5,
      title: "Tech Innovation Summit",
      type: "Summit",
      date: "2024-12-15",
      time: "9:00 AM",
      status: "completed",
      attendees: 200,
      capacity: 200,
      revenue: 25000,
      ticketsSold: 200
    }
  ];

  // Mock analytics data
  const mockAnalyticsData = {
    attendanceData: [
      { month: 'Aug', attendees: 120 },
      { month: 'Sep', attendees: 180 },
      { month: 'Oct', attendees: 240 },
      { month: 'Nov', attendees: 320 },
      { month: 'Dec', attendees: 400 },
      { month: 'Jan', attendees: 450 }
    ],
    revenueData: [
      { month: 'Aug', revenue: 8500 },
      { month: 'Sep', revenue: 12000 },
      { month: 'Oct', revenue: 15500 },
      { month: 'Nov', revenue: 22000 },
      { month: 'Dec', revenue: 28000 },
      { month: 'Jan', revenue: 35000 }
    ],
    demographicData: [
      { name: 'Students', value: 35 },
      { name: 'Professionals', value: 45 },
      { name: 'Entrepreneurs', value: 15 },
      { name: 'Others', value: 5 }
    ],
    totalEvents: 12,
    totalAttendees: 1250,
    totalRevenue: 85000,
    growthRate: 23
  };

  // Mock revenue data
  const mockRevenueData = {
    totalRevenue: 85000,
    monthlyRevenue: {
      current: 35000,
      data: [
        { month: 'Aug', revenue: 8500 },
        { month: 'Sep', revenue: 12000 },
        { month: 'Oct', revenue: 15500 },
        { month: 'Nov', revenue: 22000 },
        { month: 'Dec', revenue: 28000 },
        { month: 'Jan', revenue: 35000 }
      ]
    },
    ticketSales: {
      total: 850,
      recent: [
        { id: 1, event: "React Advanced Workshop", amount: 250, tickets: 5, date: "Jan 14, 2025" },
        { id: 2, event: "AI in Business Conference", amount: 500, tickets: 5, date: "Jan 13, 2025" },
        { id: 3, event: "Digital Marketing Masterclass", amount: 200, tickets: 4, date: "Jan 12, 2025" },
        { id: 4, event: "Tech Innovation Summit", amount: 750, tickets: 6, date: "Jan 11, 2025" }
      ]
    },
    paymentStatus: [
      { status: 'completed', count: 245, amount: 78500 },
      { status: 'pending', count: 12, amount: 4200 },
      { status: 'failed', count: 3, amount: 2300 }
    ],
    revenueByEvent: [
      { name: "Tech Summit", revenue: 25000 },
      { name: "AI Conference", revenue: 12000 },
      { name: "React Workshop", revenue: 2250 },
      { name: "Marketing Class", revenue: 1750 },
      { name: "Networking Event", revenue: 0 }
    ]
  };

  // Mock attendees data
  const mockAttendeesData = {
    totalAttendees: 400,
    attendees: [
      {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        event: "React Advanced Workshop",
        status: "confirmed",
        registrationDate: "Jan 10, 2025",
        checkedIn: true
      },
      {
        id: 2,
        name: "Michael Chen",
        email: "michael.chen@email.com",
        event: "AI in Business Conference",
        status: "confirmed",
        registrationDate: "Jan 8, 2025",
        checkedIn: false
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        email: "emily.rodriguez@email.com",
        event: "Digital Marketing Masterclass",
        status: "pending",
        registrationDate: "Jan 12, 2025",
        checkedIn: false
      },
      {
        id: 4,
        name: "David Thompson",
        email: "david.thompson@email.com",
        event: "Tech Innovation Summit",
        status: "confirmed",
        registrationDate: "Dec 20, 2024",
        checkedIn: true
      },
      {
        id: 5,
        name: "Lisa Wang",
        email: "lisa.wang@email.com",
        event: "React Advanced Workshop",
        status: "cancelled",
        registrationDate: "Jan 5, 2025",
        checkedIn: false
      }
    ],
    registrationTrends: [
      { month: 'Aug', registrations: 45 },
      { month: 'Sep', registrations: 62 },
      { month: 'Oct', registrations: 78 },
      { month: 'Nov', registrations: 95 },
      { month: 'Dec', registrations: 120 },
      { month: 'Jan', registrations: 140 }
    ],
    communicationHistory: [
      { date: "Jan 14, 2025", type: "email", subject: "Event Reminder", recipients: 45 },
      { date: "Jan 12, 2025", type: "sms", subject: "Check-in Instructions", recipients: 120 },
      { date: "Jan 10, 2025", type: "email", subject: "Welcome Message", recipients: 35 }
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Load host profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('hostProfile');
    if (savedProfile) {
      try {
        setHostProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error('Error loading host profile:', error);
        // Set default profile if parsing fails
        setHostProfile({
          name: 'John Smith',
          email: 'john.smith@host.com',
          bio: 'Experienced event organizer specializing in tech conferences and workshops.',
          location: 'San Francisco, CA',
          contactDetails: '+1 (555) 123-4567',
          organization: 'Tech Events Inc.'
        });
      }
    } else {
      // Set default profile for new users
      setHostProfile({
        name: 'John Smith',
        email: 'john.smith@host.com',
        bio: 'Experienced event organizer specializing in tech conferences and workshops.',
        location: 'San Francisco, CA',
        contactDetails: '+1 (555) 123-4567',
        organization: 'Tech Events Inc.'
      });
    }
  }, []);

  const handleSaveProfile = (updatedProfile) => {
    setHostProfile(updatedProfile);
    localStorage.setItem('hostProfile', JSON.stringify(updatedProfile));
    console.log('Host profile saved:', updatedProfile);
  };

  const handleEditEvent = (eventId) => {
    navigate('/event-creation-wizard', { state: { editMode: true, eventId } });
  };

  const handleViewAnalytics = (eventId) => {
    setActiveTab('analytics');
  };

  const handleManageAttendees = (eventId) => {
    setActiveTab('attendees');
  };

  const handleSendMessage = (attendeeIds) => {
    console.log('Sending message to attendees:', attendeeIds);
    // Mock message sending
  };

  const handleExportData = () => {
    // Create and download CSV file
    const csvData = mockEvents.map(event => ({
      'Event Title': event.title,
      'Event Type': event.type,
      'Date': event.date,
      'Time': event.time,
      'Status': event.status,
      'Attendees': event.attendees,
      'Capacity': event.capacity,
      'Revenue': `$${event.revenue}`,
      'Tickets Sold': event.ticketsSold
    }));

    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.keys(csvData[0]).join(",") + "\n" +
      csvData.map(row => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "events_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShowEventsDropdown = () => {
    // Show modal with events list
    console.log('Showing events dropdown with:', mockEvents);
  };

  const handleShowAttendeesPage = () => {
    // Navigate to detailed attendees page
    setActiveTab('attendees');
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'revenue', label: 'Revenue', icon: 'DollarSign' },
    { id: 'attendees', label: 'Attendees', icon: 'Users' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'profile', label: 'Profile', icon: 'User' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        userRole="host" 
        isAuthenticated={true} 
        onLogout={logout}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <NavigationBreadcrumb className="mb-6" />

          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, Host! 👋
                </h1>
                <p className="text-muted-foreground">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
              </div>
              <div className="mt-4 lg:mt-0">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => navigate('/event-creation-wizard')}
                >
                  Create New Event
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <>
                <QuickActions
                  onCreateEvent={() => navigate('/event-creation-wizard')}
                  onViewAnalytics={() => setActiveTab('analytics')}
                  onManageAttendees={() => setActiveTab('attendees')}
                  onExportData={handleExportData}
                />
                <EventsTable
                  events={mockEvents}
                  onEditEvent={handleEditEvent}
                  onViewAnalytics={handleViewAnalytics}
                  onManageAttendees={handleManageAttendees}
                />
              </>
            )}

            {activeTab === 'analytics' && (
              <AnalyticsWidgets 
                analyticsData={mockAnalyticsData}
                onEventsClick={handleShowEventsDropdown}
                onAttendeesClick={handleShowAttendeesPage}
                mockEvents={mockEvents}
              />
            )}

            {activeTab === 'revenue' && (
              <RevenueTracking revenueData={mockRevenueData} />
            )}

            {activeTab === 'attendees' && (
              <AttendeeManagement
                attendeesData={mockAttendeesData}
                onSendMessage={handleSendMessage}
                onExportData={handleExportData}
              />
            )}

            {activeTab === 'notifications' && (
              <NotificationCenter
                onMarkAsRead={(id) => console.log('Mark as read:', id)}
                onClearAll={() => console.log('Clear all notifications')}
              />
            )}

            {activeTab === 'profile' && (
              <div className="max-w-4xl mx-auto">
                <div className="card p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={32} className="text-primary" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-card-foreground">Profile Settings</h1>
                      <p className="text-muted-foreground">Manage your host profile information</p>
                    </div>
                  </div>

                  <ProfileForm 
                    profile={hostProfile}
                    onSave={handleSaveProfile}
                  />
                  
                  {/* Delete Account Section */}
                  <div className="mt-8 border-t border-border pt-8">
                    <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                          <Icon name="AlertTriangle" size={24} className="text-destructive" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-destructive mb-2">
                            Delete Account
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            Permanently delete your host account and all associated data. This action cannot be undone.
                          </p>
                          <ul className="text-sm text-muted-foreground mb-6 space-y-1">
                            <li>• All your events and attendee data will be deleted</li>
                            <li>• Revenue reports and analytics will be lost</li>
                            <li>• You will lose access to all premium features</li>
                            <li>• Your profile and organization data will be removed</li>
                          </ul>
                          <Button
                            variant="destructive"
                            size="sm"
                            iconName="Trash2"
                            iconPosition="left"
                            onClick={() => {
                              if (window.confirm('Are you absolutely sure you want to delete your account? This action cannot be undone and will permanently remove all your data.')) {
                                if (window.confirm('This is your final warning. Type "DELETE" to confirm account deletion.') && 
                                    prompt('Please type DELETE to confirm:') === 'DELETE') {
                                  // Handle account deletion
                                  localStorage.clear();
                                  logout();
                                  navigate('/landing-page', { replace: true });
                                  alert('Your account has been successfully deleted.');
                                }
                              }
                            }}
                          >
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Chat Component */}
      <ChatSection />
    </div>
  );
};

export default HostDashboard;