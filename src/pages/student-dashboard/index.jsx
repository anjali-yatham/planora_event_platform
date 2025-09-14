import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import { useAuth } from '../../components/ui/RoleBasedRouter';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import EventCard from './components/EventCard';
import RecommendationCard from './components/RecommendationCard';
import ProgressCard from './components/ProgressCard';
import UpcomingEventsList from './components/UpcomingEventsList';
import AchievementBadge from './components/AchievementBadge';
import AIInsightsPanel from './components/AIInsightsPanel';
import QuickStatsGrid from './components/QuickStatsGrid';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { userRole, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [eventFilter, setEventFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  // Mock data for registered events
  const [registeredEvents] = useState([
    {
      id: 1,
      title: "Advanced React Patterns Workshop",
      description: "Deep dive into advanced React patterns including render props, compound components, and custom hooks for building scalable applications.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      startDate: "2025-01-20T10:00:00Z",
      endDate: "2025-01-20T16:00:00Z",
      location: "Virtual - Zoom",
      type: "virtual",
      status: "upcoming",
      attendees: 45,
      capacity: 50,
      isPaid: true,
      price: 99,
      category: "Technology",
      certificateAvailable: false
    },
    {
      id: 2,
      title: "AI in Healthcare Summit 2025",
      description: "Explore the latest developments in artificial intelligence applications in healthcare, featuring industry experts and case studies.",
      image: "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?w=400&h=300&fit=crop",
      startDate: "2025-01-15T09:00:00Z",
      endDate: "2025-01-15T17:00:00Z",
      location: "Live Stream",
      type: "virtual",
      status: "live",
      attendees: 234,
      capacity: 500,
      isPaid: false,
      price: 0,
      category: "Healthcare",
      certificateAvailable: false
    },
    {
      id: 3,
      title: "Digital Marketing Masterclass",
      description: "Complete guide to digital marketing strategies, social media optimization, and conversion rate optimization techniques.",
      image: "https://images.pixabay.com/photo/2017/01/14/12/59/iceland-1979445_1280.jpg?w=400&h=300&fit=crop",
      startDate: "2024-12-10T14:00:00Z",
      endDate: "2024-12-10T18:00:00Z",
      location: "San Francisco, CA",
      type: "in-person",
      status: "completed",
      attendees: 89,
      capacity: 100,
      isPaid: true,
      price: 149,
      category: "Marketing",
      certificateAvailable: true
    }
  ]);

  // Mock data for AI recommendations
  const [recommendations] = useState([
    {
      id: 4,
      title: "Machine Learning Fundamentals",
      description: "Introduction to machine learning concepts, algorithms, and practical applications using Python and scikit-learn.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
      startDate: "2025-01-25T11:00:00Z",
      location: "Virtual - Teams",
      type: "virtual",
      category: "Technology",
      isPaid: true,
      price: 79,
      relevanceScore: 95,
      reason: "Based on your interest in React and previous tech workshops"
    },
    {
      id: 5,
      title: "UX Design Principles Workshop",
      description: "Learn essential UX design principles, user research methods, and prototyping techniques for digital products.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=400&h=300&fit=crop",
      startDate: "2025-01-28T13:00:00Z",
      location: "New York, NY",
      type: "in-person",
      category: "Design",
      isPaid: false,
      price: 0,
      relevanceScore: 87,
      reason: "Complements your technical skills with design knowledge"
    },
    {
      id: 6,
      title: "Blockchain Development Bootcamp",
      description: "Comprehensive bootcamp covering blockchain technology, smart contracts, and decentralized application development.",
      image: "https://images.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_1280.jpg?w=400&h=300&fit=crop",
      startDate: "2025-02-01T09:00:00Z",
      location: "Virtual - Discord",
      type: "virtual",
      category: "Technology",
      isPaid: true,
      price: 299,
      relevanceScore: 78,
      reason: "Emerging technology aligned with your learning goals"
    }
  ]);

  // Mock data for upcoming events
  const [upcomingEvents] = useState([
    {
      id: 1,
      title: "Advanced React Patterns Workshop",
      startDate: "2025-01-20T10:00:00Z",
      location: "Virtual - Zoom",
      type: "virtual"
    },
    {
      id: 7,
      title: "Weekly Tech Meetup",
      startDate: "2025-01-16T18:00:00Z",
      location: "Tech Hub Downtown",
      type: "in-person"
    },
    {
      id: 8,
      title: "Product Management 101",
      startDate: "2025-01-22T15:00:00Z",
      location: "Virtual - Google Meet",
      type: "virtual"
    }
  ]);

  // Mock data for achievements
  const [achievements] = useState([
    {
      id: 1,
      title: "Early Bird",
      description: "Registered for 5 events before early bird deadline",
      icon: "Clock",
      type: "bronze",
      earnedDate: "2024-12-15T10:00:00Z",
      points: 50,
      isRare: false
    },
    {
      id: 2,
      title: "Knowledge Seeker",
      description: "Completed 10 educational workshops",
      icon: "BookOpen",
      type: "silver",
      earnedDate: "2024-12-20T14:30:00Z",
      points: 100,
      isRare: false
    },
    {
      id: 3,
      title: "Community Builder",
      description: "Connected with 50+ professionals at events",
      icon: "Users",
      type: "gold",
      earnedDate: "2024-12-25T09:15:00Z",
      points: 200,
      isRare: true
    }
  ]);

  // Mock data for AI insights
  const [aiInsights] = useState([
    {
      id: 1,
      type: "recommendation",
      title: "Perfect Match Found",
      description: "We found 3 new events that match your interests in React and AI. Check them out!",
      timestamp: "2025-01-14T08:00:00Z",
      actionable: true
    },
    {
      id: 2,
      type: "achievement",
      title: "Streak Achievement",
      description: "You're on a 7-day learning streak! Keep it up to unlock the Learning Champion badge.",
      timestamp: "2025-01-14T07:30:00Z",
      actionable: false
    },
    {
      id: 3,
      type: "trend",
      title: "Trending Topic",
      description: "AI and Machine Learning events are trending in your area. 15 new events added this week.",
      timestamp: "2025-01-13T16:45:00Z",
      actionable: true
    }
  ]);

  // Mock data for quick stats
  const [quickStats] = useState([
    { type: 'events', value: 12, label: 'Events Attended', change: 20 },
    { type: 'hours', value: 48, label: 'Learning Hours', unit: 'hrs', change: 15 },
    { type: 'certificates', value: 8, label: 'Certificates', change: 33 },
    { type: 'points', value: 1250, label: 'Total Points', change: 8 },
    { type: 'streak', value: 7, label: 'Day Streak', unit: 'days', change: 0 },
    { type: 'network', value: 89, label: 'Connections', change: 12 }
  ]);

  const filterOptions = [
    { value: 'all', label: 'All Events' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'live', label: 'Live Now' },
    { value: 'completed', label: 'Completed' }
  ];

  const tabOptions = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'events', label: 'My Events', icon: 'Calendar' },
    { id: 'recommendations', label: 'Recommendations', icon: 'Lightbulb' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' }
  ];

  const filteredEvents = registeredEvents?.filter(event => {
    if (eventFilter === 'all') return true;
    return event?.status === eventFilter;
  });

  const handleJoinEvent = (event) => {
    if (event?.status === 'live') {
      // Simulate joining live event
      window.open('https://zoom.us/j/example', '_blank');
    } else if (event?.status === 'upcoming') {
      // Add to calendar functionality
      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event?.title)}&dates=${event?.startDate?.replace(/[-:]/g, '')?.replace(/\.\d{3}/, '')}&details=${encodeURIComponent(event?.description)}`;
      window.open(calendarUrl, '_blank');
    } else if (event?.status === 'completed' && event?.certificateAvailable) {
      // Download certificate
      alert('Certificate download started!');
    }
  };

  const handleViewEventDetails = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleRegisterForEvent = (event) => {
    alert(`Registration initiated for: ${event?.title}`);
  };

  const handleDismissRecommendation = (eventId) => {
    alert(`Recommendation dismissed for event ID: ${eventId}`);
  };

  const handleRefreshInsights = () => {
    alert('AI insights refreshed!');
  };

  const handleViewAllInsights = () => {
    alert('Viewing all AI insights...');
  };

  const handleAchievementClick = (achievement) => {
    alert(`Achievement details: ${achievement?.title}`);
  };

  const handleProgressAction = (action) => {
    switch (action) {
      case 'view-certificates':
        alert('Viewing all certificates...');
        break;
      case 'view-events': setActiveTab('events');
        break;
      case 'view-achievements': alert('Viewing all achievements...');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Save dashboard preferences to localStorage
    const preferences = {
      activeTab,
      eventFilter,
      lastVisit: new Date()?.toISOString()
    };
    localStorage.setItem('student_dashboard_preferences', JSON.stringify(preferences));
  }, [activeTab, eventFilter]);

  useEffect(() => {
    // Load dashboard preferences from localStorage
    const savedPreferences = localStorage.getItem('student_dashboard_preferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        setActiveTab(preferences?.activeTab || 'overview');
        setEventFilter(preferences?.eventFilter || 'all');
      } catch (error) {
        console.error('Error loading dashboard preferences:', error);
      }
    }
  }, []);

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Your Stats</h2>
        <QuickStatsGrid stats={quickStats} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Events & Recommendations */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Events */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Recent Events</h2>
              <Button
                variant="ghost"
                onClick={() => setActiveTab('events')}
              >
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {registeredEvents?.slice(0, 2)?.map((event) => (
                <EventCard
                  key={event?.id}
                  event={event}
                  onJoinEvent={handleJoinEvent}
                  onViewDetails={handleViewEventDetails}
                />
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Recommended for You</h2>
              <Button
                variant="ghost"
                onClick={() => setActiveTab('recommendations')}
              >
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations?.slice(0, 2)?.map((event) => (
                <RecommendationCard
                  key={event?.id}
                  event={event}
                  onRegister={handleRegisterForEvent}
                  onDismiss={handleDismissRecommendation}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Events</h3>
            <UpcomingEventsList
              events={upcomingEvents}
              onJoinEvent={handleJoinEvent}
              onViewDetails={handleViewEventDetails}
            />
          </div>

          {/* AI Insights */}
          <AIInsightsPanel
            insights={aiInsights}
            onRefresh={handleRefreshInsights}
            onViewAll={handleViewAllInsights}
          />
        </div>
      </div>
    </div>
  );

  const renderEventsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">My Events</h2>
        <div className="flex items-center space-x-4">
          <Select
            options={filterOptions}
            value={eventFilter}
            onChange={setEventFilter}
            placeholder="Filter events"
            className="w-40"
          />
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => navigate('/event-creation-wizard')}
          >
            Create Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents?.map((event) => (
          <EventCard
            key={event?.id}
            event={event}
            onJoinEvent={handleJoinEvent}
            onViewDetails={handleViewEventDetails}
          />
        ))}
      </div>

      {filteredEvents?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Calendar" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
          <p className="text-muted-foreground mb-4">
            {eventFilter === 'all' ? "You haven't registered for any events yet."
              : `No ${eventFilter} events found.`
            }
          </p>
          <Button
            variant="default"
            onClick={() => setActiveTab('recommendations')}
          >
            Discover Events
          </Button>
        </div>
      )}
    </div>
  );

  const renderRecommendationsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Recommended Events</h2>
        <Button
          variant="ghost"
          iconName="RefreshCw"
          iconPosition="left"
          onClick={() => alert('Refreshing recommendations...')}
        >
          Refresh
        </Button>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Brain" size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">AI-Powered Recommendations</h3>
            <p className="text-sm text-muted-foreground">
              These events are personalized based on your interests, past attendance, and learning goals.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations?.map((event) => (
          <RecommendationCard
            key={event?.id}
            event={event}
            onRegister={handleRegisterForEvent}
            onDismiss={handleDismissRecommendation}
          />
        ))}
      </div>
    </div>
  );

  const renderProgressTab = () => (
    <div className="space-y-8">
      {/* Progress Cards */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Your Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProgressCard
            title="Events Completed"
            value={8}
            total={12}
            icon="Calendar"
            color="primary"
            description="Keep attending events to reach your goal"
            actionLabel="View Events"
            onAction={() => handleProgressAction('view-events')}
          />
          <ProgressCard
            title="Certificates Earned"
            value={5}
            total={8}
            icon="Award"
            color="success"
            description="Complete more workshops to earn certificates"
            actionLabel="View All"
            onAction={() => handleProgressAction('view-certificates')}
          />
          <ProgressCard
            title="Learning Hours"
            value={48}
            total={100}
            icon="Clock"
            color="accent"
            description="Total time spent in educational events"
            actionLabel="View Details"
            onAction={() => handleProgressAction('view-events')}
          />
        </div>
      </div>

      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Achievements</h2>
          <Button
            variant="ghost"
            onClick={() => handleProgressAction('view-achievements')}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements?.map((achievement) => (
            <AchievementBadge
              key={achievement?.id}
              achievement={achievement}
              onClick={handleAchievementClick}
            />
          ))}
        </div>
      </div>

      {/* Learning Path */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Learning Path</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Target" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">Full-Stack Developer Path</h3>
              <p className="text-sm text-muted-foreground">Progress: 65% complete</p>
            </div>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2 mb-4">
            <div className="h-2 bg-primary rounded-full transition-all duration-300" style={{ width: '65%' }} />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-success">✓ Frontend Fundamentals</span>
              <span className="text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-success">✓ React Development</span>
              <span className="text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-primary">→ Backend Development</span>
              <span className="text-muted-foreground">In Progress</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Database Design</span>
              <span className="text-muted-foreground">Upcoming</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole={userRole}
        isAuthenticated={true}
        onLogout={logout}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <NavigationBreadcrumb className="mb-6" />

          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, Student! 👋
                </h1>
                <p className="text-muted-foreground">
                  Discover new events, track your progress, and continue your learning journey.
                </p>
              </div>
              <Button
                variant="default"
                iconName="Search"
                iconPosition="left"
                onClick={() => alert('Opening event search...')}
              >
                Find Events
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabOptions?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
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
          <div>
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'events' && renderEventsTab()}
            {activeTab === 'recommendations' && renderRecommendationsTab()}
            {activeTab === 'progress' && renderProgressTab()}
          </div>
        </div>
      </main>
      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg shadow-elevation-3 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-card-foreground pr-4">
                  {selectedEvent?.title}
                </h2>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-smooth"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={selectedEvent?.image}
                    alt={selectedEvent?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} className="text-muted-foreground" />
                    <span>{new Date(selectedEvent.startDate)?.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span>{new Date(selectedEvent.startDate)?.toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <span>{selectedEvent?.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-muted-foreground" />
                    <span>{selectedEvent?.attendees}/{selectedEvent?.capacity} attendees</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-card-foreground mb-2">Description</h3>
                  <p className="text-muted-foreground">{selectedEvent?.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedEvent?.status === 'live' ? 'text-success bg-success/10' :
                      selectedEvent?.status === 'upcoming'? 'text-primary bg-primary/10' : 'text-muted-foreground bg-muted'
                    }`}>
                      {selectedEvent?.status?.charAt(0)?.toUpperCase() + selectedEvent?.status?.slice(1)}
                    </span>
                    {selectedEvent?.isPaid && (
                      <span className="text-lg font-semibold text-card-foreground">
                        ${selectedEvent?.price}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="default"
                    onClick={() => {
                      handleJoinEvent(selectedEvent);
                      setShowEventModal(false);
                    }}
                  >
                    {selectedEvent?.status === 'live' ? 'Join Now' :
                     selectedEvent?.status === 'upcoming'? 'Add to Calendar' : 'Get Certificate'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;