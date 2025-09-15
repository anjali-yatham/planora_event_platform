import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onCreateEvent, onViewAnalytics, onManageAttendees, onExportData }) => {
  const navigate = useNavigate();

  const quickActionItems = [
    {
      id: 'create-event',
      title: 'Create New Event',
      description: 'Start planning your next event with our guided wizard',
      icon: 'Plus',
      color: 'primary',
      action: () => navigate('/event-creation-wizard'),
      featured: true
    },
    {
      id: 'view-analytics',
      title: 'View Analytics',
      description: 'Deep dive into your event performance metrics',
      icon: 'BarChart3',
      color: 'secondary',
      action: onViewAnalytics
    },
    {
      id: 'manage-attendees',
      title: 'Manage Attendees',
      description: 'Communicate with and organize your event participants',
      icon: 'Users',
      color: 'accent',
      action: onManageAttendees
    },
    {
      id: 'campaign-tools',
      title: 'Campaign Tools',
      description: 'Create, schedule, and monitor promotional campaigns',
      icon: 'Megaphone',
      color: 'success',
      action: () => navigate('/campaign-management'),
      badge: 'New'
    },
    {
      id: 'speaker-suggestions',
      title: 'AI Speaker Suggestions',
      description: 'Get AI-powered recommendations for event speakers',
      icon: 'Brain',
      color: 'warning',
      action: () => navigate('/ai-speaker-suggestions'),
      badge: 'AI',
      hasSpecialFeature: true
    },
    {
      id: 'sponsorship',
      title: 'Sponsorship Marketplace',
      description: 'Connect with potential sponsors for your events',
      icon: 'Handshake',
      color: 'primary',
      action: () => navigate('/sponsorship-marketplace')
    },
    {
      id: 'marketplace',
      title: 'Event Marketplace',
      description: 'Buy event services and digital assets',
      icon: 'ShoppingCart',
      color: 'secondary',
      action: () => navigate('/event-marketplace')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Featured Action */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
              <Icon name="Plus" size={24} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Ready to create your next event?</h3>
              <p className="text-muted-foreground">Use our intuitive wizard to set up events in minutes</p>
            </div>
          </div>
          <Button
            variant="default"
            size="lg"
            iconName="Plus"
            iconPosition="left"
            onClick={() => navigate('/event-creation-wizard')}
          >
            Create Event
          </Button>
        </div>
      </div>
      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActionItems?.slice(1)?.map((item) => (
          <div
            key={item?.id}
            className="bg-card rounded-lg border border-border p-6 hover:shadow-elevation-2 transition-smooth cursor-pointer group relative"
            onClick={item?.action}
          >
            {item?.badge && (
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  item.badge === 'AI' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {item.badge}
                </span>
              </div>
            )}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg bg-${item?.color}/10 flex items-center justify-center group-hover:bg-${item?.color}/20 transition-smooth`}>
                <Icon name={item?.icon} size={20} color={`var(--color-${item?.color})`} />
              </div>
              <Icon name="ArrowUpRight" size={16} className="text-muted-foreground group-hover:text-foreground transition-smooth" />
            </div>
            <h4 className="font-semibold text-card-foreground mb-2 group-hover:text-primary transition-smooth">
              {item?.title}
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              {item?.description}
            </p>
            {item?.hasSpecialFeature && item?.id === 'speaker-suggestions' && (
              <div className="mt-3 pt-3 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  iconName="Sparkles"
                  iconPosition="left"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Mock surprise me functionality
                    alert('🎉 Surprise! Here are 3 trending speakers in AI & Technology: Sarah Chen (AI Ethics), Marcus Rodriguez (Web3 Innovation), and Dr. Lisa Wang (Quantum Computing)!');
                  }}
                >
                  Surprise Me
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Additional Tools */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Additional Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Button
            variant="outline"
            className="justify-start h-auto p-4"
            iconName="FileText"
            iconPosition="left"
            onClick={() => navigate('/event-templates')}
          >
            <div className="text-left">
              <div className="font-medium">Templates</div>
              <div className="text-xs text-muted-foreground">Ready-made event templates</div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-4"
            iconName="Share2"
            iconPosition="left"
            onClick={() => navigate('/social-sharing')}
          >
            <div className="text-left">
              <div className="font-medium">Social Sharing</div>
              <div className="text-xs text-muted-foreground">One-click promotion</div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-4"
            iconName="Calendar"
            iconPosition="left"
            onClick={() => navigate('/calendar-sync')}
          >
            <div className="text-left">
              <div className="font-medium">Calendar Sync</div>
              <div className="text-xs text-muted-foreground">Google Calendar integration</div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-4"
            iconName="Leaf"
            iconPosition="left"
            onClick={() => navigate('/sustainability-tracking')}
          >
            <div className="text-left">
              <div className="font-medium">Sustainability</div>
              <div className="text-xs text-muted-foreground">Impact tracking dashboard</div>
            </div>
          </Button>
        </div>
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Export Your Events</h4>
              <p className="text-sm text-muted-foreground">Download all hosted event data</p>
            </div>
            <Button
              variant="default"
              size="sm"
              iconName="Download"
              onClick={onExportData}
            >
              Export Data
            </Button>
          </div>
        </div>
      </div>

      {/* AI & Career Tools */}
      <div className="bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-lg border border-purple-200/20 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Brain" size={24} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-card-foreground">AI & Career Tools</h3>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
            Beta
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Button
            variant="outline"
            className="justify-start h-auto p-4 border-purple-200 hover:bg-purple-50"
            iconName="Lightbulb"
            iconPosition="left"
            onClick={() => navigate('/ai-recommendations')}
          >
            <div className="text-left">
              <div className="font-medium">AI Recommendations</div>
              <div className="text-xs text-muted-foreground">Event optimization tips</div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-4 border-blue-200 hover:bg-blue-50"
            iconName="Briefcase"
            iconPosition="left"
            onClick={() => navigate('/internships')}
          >
            <div className="text-left">
              <div className="font-medium">Internships</div>
              <div className="text-xs text-muted-foreground">Event industry opportunities</div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-4 border-green-200 hover:bg-green-50"
            iconName="FileQuestion"
            iconPosition="left"
            onClick={() => navigate('/mock-tests')}
          >
            <div className="text-left">
              <div className="font-medium">Mock Tests</div>
              <div className="text-xs text-muted-foreground">Event management skills</div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-4 border-yellow-200 hover:bg-yellow-50"
            iconName="Trophy"
            iconPosition="left"
            onClick={() => navigate('/gamification')}
          >
            <div className="text-left">
              <div className="font-medium">Gamification</div>
              <div className="text-xs text-muted-foreground">Badges & rewards</div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-4 border-indigo-200 hover:bg-indigo-50"
            iconName="TrendingUp"
            iconPosition="left"
            onClick={() => navigate('/career-insights')}
          >
            <div className="text-left">
              <div className="font-medium">Career Insights</div>
              <div className="text-xs text-muted-foreground">AI predictions & trends</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;