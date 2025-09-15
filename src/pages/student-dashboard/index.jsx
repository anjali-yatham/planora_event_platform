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
import Toast from '../../components/ui/Toast';
import PaymentModal from '../../components/ui/PaymentModal';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { userRole, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [eventFilter, setEventFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [paymentModal, setPaymentModal] = useState({ show: false, event: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate about technology and learning new skills.',
    interests: ['React', 'AI', 'Machine Learning'],
    location: 'San Francisco, CA'
  });

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
      type: "ONLINE",
      status: "upcoming",
      attendees: 45,
      capacity: 50,
      isPaid: true,
      price: 99,
      category: "Technology",
      certificateAvailable: false,
      meetingLink: "https://zoom.us/j/1234567890?pwd=abcd1234"
    },
    {
      id: 2,
      title: "AI in Healthcare Summit 2025",
      description: "Explore the latest developments in artificial intelligence applications in healthcare, featuring industry experts and case studies.",
      image: "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?w=400&h=300&fit=crop",
      startDate: "2025-01-15T09:00:00Z",
      endDate: "2025-01-15T17:00:00Z",
      location: "Live Stream",
      type: "ONLINE",
      status: "live",
      attendees: 234,
      capacity: 500,
      isPaid: false,
      price: 0,
      category: "Healthcare",
      certificateAvailable: false,
      meetingLink: "https://meet.google.com/xyz-abcd-123"
    },
    {
      id: 3,
      title: "Digital Marketing Masterclass",
      description: "Complete guide to digital marketing strategies, social media optimization, and conversion rate optimization techniques.",
      image: "https://images.pixabay.com/photo/2017/01/14/12/59/iceland-1979445_1280.jpg?w=400&h=300&fit=crop",
      startDate: "2024-12-10T14:00:00Z",
      endDate: "2024-12-10T18:00:00Z",
      location: "San Francisco, CA",
      type: "OFFLINE",
      status: "completed",
      attendees: 89,
      capacity: 100,
      isPaid: true,
      price: 149,
      category: "Marketing",
      certificateAvailable: true,
      venue: {
        name: "SF Convention Center",
        address: "747 Howard St, San Francisco, CA 94103",
        timing: "2:00 PM - 6:00 PM PST"
      }
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
    { id: 'ai-insights', label: 'AI Insights', icon: 'Brain' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' }
  ];

  const filteredEvents = registeredEvents?.filter(event => {
    if (eventFilter === 'all') return true;
    return event?.status === eventFilter;
  });

  const handleJoinEvent = (event) => {
    if (event?.type === 'ONLINE') {
      // For virtual events - redirect to meeting link (Zoom/Google Meet)
      if (event?.meetingLink) {
        window.open(event.meetingLink, '_blank');
        showToast('Redirecting to virtual meeting...', 'success');
      } else {
        showToast('Meeting link not available', 'error');
      }
    } else if (event?.type === 'OFFLINE') {
      // For offline events - show event details page with registration info
      if (event?.isPaid && event?.price > 0) {
        // Show payment + registration option for paid events
        setPaymentModal({ show: true, event });
      } else {
        // Show free registration option for free events
        setSelectedEvent(event);
        setShowEventModal(true);
        showToast(`Event Details Available!\nVenue: ${event?.venue?.name || event?.location}\nDate: ${new Date(event?.startDate).toLocaleDateString()}`, 'info');
      }
    } else if (event?.status === 'completed' && event?.certificateAvailable) {
      // Download certificate
      showToast('Certificate download started!', 'success');
    }
  };

  const handleJoinNow = (event) => {
    if (event?.type === 'ONLINE') {
      if (event?.meetingLink) {
        window.open(event.meetingLink, '_blank');
        showToast('Redirecting to online meeting...', 'success');
      } else {
        showToast('Meeting link not available', 'error');
      }
    } else if (event?.type === 'OFFLINE') {
      // Show offline event registration details
      showToast(`Event Details:\nVenue: ${event?.venue?.name}\nAddress: ${event?.venue?.address}\nTime: ${event?.venue?.timing}`, 'info');
    }
  };

  const handleViewEventDetails = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleRegisterForEvent = (event) => {
    setPaymentModal({ show: true, event });
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  const handlePaymentSuccess = () => {
    showToast('Registration Successful!', 'success');
    setPaymentModal({ show: false, event: null });
  };

  const handleDismissRecommendation = (eventId) => {
    alert(`Recommendation dismissed for event ID: ${eventId}`);
  };

  const handleRefreshInsights = () => {
    alert('AI insights refreshed!');
  };

  const handleViewAllInsights = () => {
    // Navigate to AI Insights tab and show all insights
    setActiveTab('ai-insights');
  };

  const handleTakeAction = (insight) => {
    if (insight?.type === 'recommendation') {
      // Show matching events from recommendations
      const matchedEvents = recommendations.slice(0, 3); // Get first 3 matched events
      setSelectedEvent({ 
        ...insight,
        matchedEvents,
        title: 'Perfect Match Found - 3 Events',
        description: 'We found 3 new events that match your interests. Would you like to register for any of these events?'
      });
      setShowEventModal(true);
    } else if (insight?.type === 'trend') {
      // Navigate to recommendations with filter for trending topic
      setActiveTab('recommendations');
      showToast('Showing trending AI and Machine Learning events', 'success');
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim().length === 0) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    // Search through registered events and recommendations
    const allEvents = [...registeredEvents, ...recommendations];
    const results = allEvents.filter(event => 
      event?.title?.toLowerCase().includes(query.toLowerCase()) ||
      event?.description?.toLowerCase().includes(query.toLowerCase()) ||
      event?.category?.toLowerCase().includes(query.toLowerCase()) ||
      event?.type?.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
    setShowSearchResults(true);
  };

  const handleUpdateProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    // Simulate saving to backend
    localStorage.setItem('student_profile', JSON.stringify(updatedProfile));
    showToast('Profile updated successfully!', 'success');
  };

  const handleSignOut = () => {
    // Clear session data
    localStorage.removeItem('student_dashboard_preferences');
    localStorage.removeItem('student_profile');
    localStorage.removeItem('user_auth');
    // Call logout function
    logout();
    // Redirect to landing page
    navigate('/', { replace: true });
    showToast('Signed out successfully', 'success');
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

    // Load user profile from localStorage
    const savedProfile = localStorage.getItem('student_profile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setUserProfile(profile);
      } catch (error) {
        console.error('Error loading user profile:', error);
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
            onTakeAction={handleTakeAction}
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

  const renderAIInsightsTab = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">AI Insights</h2>
        <Button
          variant="outline"
          iconName="RefreshCw"
          onClick={handleRefreshInsights}
        >
          Refresh
        </Button>
      </div>
      
      <div className="grid gap-6">
        {aiInsights?.map((insight) => (
          <div key={insight?.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                insight?.type === 'recommendation' ? 'bg-primary/10' :
                insight?.type === 'achievement' ? 'bg-success/10' :
                insight?.type === 'trend' ? 'bg-accent/10' : 'bg-muted'
              }`}>
                <Icon
                  name={insight?.type === 'recommendation' ? 'Lightbulb' :
                        insight?.type === 'achievement' ? 'Trophy' :
                        insight?.type === 'trend' ? 'TrendingUp' : 'Info'}
                  size={24}
                  className={
                    insight?.type === 'recommendation' ? 'text-primary' :
                    insight?.type === 'achievement' ? 'text-success' :
                    insight?.type === 'trend' ? 'text-accent' : 'text-muted-foreground'
                  }
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-card-foreground mb-2">{insight?.title}</h3>
                <p className="text-muted-foreground mb-4">{insight?.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {new Date(insight?.timestamp).toLocaleDateString()}
                  </span>
                  {insight?.actionable && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleTakeAction(insight)}
                    >
                      Take Action
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            {insight?.matchedEvents && (
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-medium text-card-foreground mb-4">Matched Events:</h4>
                <div className="grid gap-4">
                  {insight.matchedEvents.map((event) => (
                    <div key={event?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <h5 className="font-medium text-card-foreground">{event?.title}</h5>
                        <p className="text-sm text-muted-foreground">{event?.category} • {event?.location}</p>
                        <p className="text-sm text-muted-foreground">{new Date(event?.startDate).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {event?.isPaid && (
                          <span className="text-sm font-medium">${event?.price}</span>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRegisterForEvent(event)}
                        >
                          Register
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Profile Settings</h2>
        <Button
          variant="outline"
          iconName="LogOut"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </div>
      
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {userProfile?.name?.split(' ').map(n => n[0]).join('') || 'JD'}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-card-foreground">{userProfile?.name}</h3>
              <p className="text-muted-foreground">{userProfile?.email}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={userProfile?.name}
                onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                value={userProfile?.email}
                onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Bio
              </label>
              <textarea
                rows={3}
                value={userProfile?.bio}
                onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Location
              </label>
              <input
                type="text"
                value={userProfile?.location}
                onChange={(e) => setUserProfile(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Interests
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {userProfile?.interests?.map((interest, index) => (
                  <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {interest}
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add interests separated by commas"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    const newInterests = e.target.value.split(',').map(i => i.trim()).filter(i => i);
                    setUserProfile(prev => ({ 
                      ...prev, 
                      interests: [...(prev.interests || []), ...newInterests]
                    }));
                    e.target.value = '';
                  }
                }}
              />
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="default"
                onClick={() => handleUpdateProfile(userProfile)}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
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
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, Student! 👋
                </h1>
                <p className="text-muted-foreground">
                  Discover new events, track your progress, and continue your learning journey.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground"
                  />
                  {showSearchResults && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                      {searchResults?.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">
                          No events found for "{searchQuery}"
                        </div>
                      ) : (
                        searchResults?.map((result) => (
                          <div
                            key={result?.id}
                            className="p-4 hover:bg-muted/30 cursor-pointer border-b border-border last:border-b-0"
                            onClick={() => handleViewEventDetails(result)}
                          >
                            <h4 className="font-medium text-card-foreground">{result?.title}</h4>
                            <p className="text-sm text-muted-foreground">{result?.category} • {result?.location}</p>
                            {result?.isPaid && (
                              <span className="text-sm font-medium text-primary">${result?.price}</span>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  iconName="X"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearchResults(false);
                  }}
                  className={showSearchResults ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                >
                  Clear
                </Button>
              </div>
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
            {activeTab === 'ai-insights' && renderAIInsightsTab()}
            {activeTab === 'progress' && renderProgressTab()}
            {activeTab === 'profile' && renderProfileTab()}
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

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={hideToast}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModal.show}
        onClose={() => setPaymentModal({ show: false, event: null })}
        event={paymentModal.event}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Floating Chat Button */}
      <button
        onClick={() => setActiveTab('chat')}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
        title="Open Chat"
      >
        <Icon name="MessageCircle" size={24} />
      </button>
    </div>
  );
};

export default StudentDashboard;