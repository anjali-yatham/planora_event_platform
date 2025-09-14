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
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const HostDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

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
    console.log('Exporting attendee data...');
    // Mock data export
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
    { id: 'attendees', label: 'Attendees', icon: 'Users' }
  ];

  return (
    <div className="min-h-screen bg-background">
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
              <AnalyticsWidgets analyticsData={mockAnalyticsData} />
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default HostDashboard;