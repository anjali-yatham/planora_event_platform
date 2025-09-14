import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onCreateEvent, onViewAnalytics, onManageAttendees }) => {
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
      description: 'Promote your events with marketing campaigns',
      icon: 'Megaphone',
      color: 'success',
      action: () => console.log('Campaign tools clicked')
    },
    {
      id: 'speaker-suggestions',
      title: 'AI Speaker Suggestions',
      description: 'Get AI-powered recommendations for event speakers',
      icon: 'Brain',
      color: 'warning',
      action: () => console.log('Speaker suggestions clicked')
    },
    {
      id: 'sponsorship',
      title: 'Sponsorship Marketplace',
      description: 'Connect with potential sponsors for your events',
      icon: 'Handshake',
      color: 'primary',
      action: () => console.log('Sponsorship marketplace clicked')
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
            className="bg-card rounded-lg border border-border p-6 hover:shadow-elevation-2 transition-smooth cursor-pointer group"
            onClick={item?.action}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg bg-${item?.color}/10 flex items-center justify-center group-hover:bg-${item?.color}/20 transition-smooth`}>
                <Icon name={item?.icon} size={20} color={`var(--color-${item?.color})`} />
              </div>
              <Icon name="ArrowUpRight" size={16} className="text-muted-foreground group-hover:text-foreground transition-smooth" />
            </div>
            <h4 className="font-semibold text-card-foreground mb-2 group-hover:text-primary transition-smooth">
              {item?.title}
            </h4>
            <p className="text-sm text-muted-foreground">
              {item?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Additional Tools */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Additional Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="justify-start h-auto p-4"
            iconName="FileText"
            iconPosition="left"
            onClick={() => console.log('Templates clicked')}
          >
            <div className="text-left">
              <div className="font-medium">Templates</div>
              <div className="text-xs text-muted-foreground">Event templates</div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-4"
            iconName="Share2"
            iconPosition="left"
            onClick={() => console.log('Social sharing clicked')}
          >
            <div className="text-left">
              <div className="font-medium">Social Sharing</div>
              <div className="text-xs text-muted-foreground">Promote events</div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-4"
            iconName="Calendar"
            iconPosition="left"
            onClick={() => console.log('Calendar sync clicked')}
          >
            <div className="text-left">
              <div className="font-medium">Calendar Sync</div>
              <div className="text-xs text-muted-foreground">Google Calendar</div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-4"
            iconName="Leaf"
            iconPosition="left"
            onClick={() => console.log('Sustainability clicked')}
          >
            <div className="text-left">
              <div className="font-medium">Sustainability</div>
              <div className="text-xs text-muted-foreground">Impact tracking</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;